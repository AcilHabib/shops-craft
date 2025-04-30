import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";


type CollectionId = NextRequest & {
    nextUrl: {
        searchParams: {
            get: (key: string) => string | null;
        };
    }
}

export const GET = async (request: CollectionId) => {

    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {
        const products = await prisma.product.findMany({
            where: {
                collectionId: id,
            },
            include: {
                options: true,
                variants: true,
            }
        })

        if (!products) {
            return NextResponse.json({ success: false, message: "Products Not Found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Products Found Seccessfully" , products }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [GET /products/collection?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [GET /products/collection?id=] ${error.message}` }, { status: 500 });
        }
    }
}