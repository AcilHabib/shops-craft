import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";


type CartId = NextRequest & {
    nextUrl: {
        searchParams: {
            get: (key: string) => string | null;
        };
    }
}

export const GET = async () => {

    try {
        const cart = await prisma.cart.findMany({
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

export const POST = async (request: CartId) => {

    const { checkoutUrl, cost, totalQuantity } = await request.json();

    console.log("checkoutUrl", checkoutUrl);
    console.log("cost", cost);
    console.log("totalQuantity", totalQuantity);

    if ( !checkoutUrl || !cost ) {
        return NextResponse.json({ message: "checkoutUrl, cost and totalQuantity are Required!!" }, { status: 400 });
    }

    console.log("checkoutUrl", checkoutUrl);
    console.log("cost", cost);
    console.log("totalQuantity", totalQuantity);

    try {

        const cart = await prisma.cart.create({
            data: {
                checkoutUrl,
                cost,
                totalQuantity,
            },
            include: {
                lines: true,
            }
        })

        if (!cart) {
            return NextResponse.json({ success: false, message: "Can not create cart" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "cart created Successfully", cart }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [POST /cart] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [POST /cart] ${error.message}` }, { status: 500 });
        }
    }
}

export const PUT = async (req: CartId) => {

    const id = req.nextUrl.searchParams.get("id");

    const { totalQuantity, cost } = await req.json();

    if (!id) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {

        const cart = await prisma.cart.update({
            where: {
                id: id,
            },
            data: {
                totalQuantity,
                cost,
            },
            include: {
                lines: true,
            }
        })

        if (!cart) {
            return NextResponse.json({ success: false, message: "Can not update cart" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "cart updated Successfully", cart }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [PUT /cart?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [PUT /cart?id=] ${error.message}` }, { status: 500 });
        }
    }
}

export const DELETE = async (req: CartId) => {

    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {

        const cart = await prisma.cart.delete({
            where: {
                id: id,
            },
            include: {
                lines: true,
            }
        })

        if (!cart) {
            return NextResponse.json({ success: false, message: "Can not delete cart" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "cart deleted Successfully", cart }, { status: 200 });
        
    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [DELETE /cart?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [DELETE /cart?id=] ${error.message}` }, { status: 500 });
        }
    }
}