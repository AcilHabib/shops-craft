import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";


type ProductId = NextRequest & {
    nextUrl: {
        searchParams: {
            get: (key: string) => string | null;
        };
    }
}

export const GET = async (request: ProductId) => {

    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {
        const product = await prisma.product.findUnique({
            where: {
                id: id,
            },
            include: {
                options: true,
                variants: true,
            }
        })

        if (!product) {
            return NextResponse.json({ success: false, message: "Products Not Found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Product Found Seccessfully" , product }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [GET /products/product?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [GET /products/product?id=] ${error.message}` }, { status: 500 });
        }
    }
}