import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";


type CartId = NextRequest & {
    nextUrl: {
        searchParams: {
            get: (key: string) => string | null;
        };
    }
}

export const GET = async (request: CartId) => {

    const cartId = request.nextUrl.searchParams.get("cartId");

    if (!cartId) {
        return NextResponse.json({ message: "cartId is Required!!" }, { status: 400 });
    }

    try {
        const cart = await prisma.cart.findUnique({
            where: {
                id: cartId,
            },
            include: {
                lines: true,
            }
        })

        if (!cart) {
            return NextResponse.json({ success: false, message: "cart Not Found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "cart Found Successfully", cart }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [GET /cart] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [GET /cart] ${error.message}` }, { status: 500 });
        }
    }
}
