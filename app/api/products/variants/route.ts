import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";


type ProductId = NextRequest & {
    nextUrl: {
        searchParams: {
            get: (key: string) => string | null;
        };
    }
}

export const GET = async () => {

    try {
        const productVariant = await prisma.productVariant.findMany({
            include: {
                product: true,
                selectedOptions: true,
            }
        })

        if (!productVariant) {
            return NextResponse.json({ success: false, message: "Product Variant Not Found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Product Variant Found Seccessfully" , productVariant }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [GET /products/variants] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [GET /products/variants] ${error.message}` }, { status: 500 });
        }
    }
}

export const POST = async (request: ProductId) => {

    const id = request.nextUrl.searchParams.get("id");

    const { title, price, availableForSale } = await request.json();

    if ( title || price || !id) {
        return NextResponse.json({ message: "All Fields are Required!!" }, { status: 400 });
    }

    try {

        const productVariant = await prisma.productVariant.create({
            data: {
                title: title,
                price: price,
                availableForSale: availableForSale || undefined,
                product: {
                    connect: {
                        id: id,
                    }
                }
            }
        })

        if (!productVariant) {
            return NextResponse.json({ success: false, message: "Can not create a Product Variant" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Product Variant has been created and saved Successfully" , productVariant }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [POST /products/variants?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [POST /products/variants?id=] ${error.message}` }, { status: 500 });
        }
    }
}

export const PUT = async (req: ProductId) => {

    const id = req.nextUrl.searchParams.get("id");

    const { availableForSale } = await req.json();

    if (!id) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {

        const productVariant = await prisma.productVariant.update({
            where: {
                id: id,
            },
            data: {
                availableForSale: availableForSale || undefined,
            },
            include: {
                selectedOptions: true,
                product: true,
            }
        })

        if (!productVariant) {
            return NextResponse.json({ success: false, message: "Can not update Product Variant" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Product Variant updated Successfully" , productVariant }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [PUT /products/variants?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [PUT /products/variants?id=] ${error.message}` }, { status: 500 });
        }
    }
}

export const DELETE = async (req: ProductId) => {

    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {

        const productVariant = await prisma.productVariant.delete({
            where: {
                id: id,
            },
            include: {
                selectedOptions: true,
                product: true,
            }
        })

        if (!productVariant) {
            return NextResponse.json({ success: false, message: "Can not delete Product Variant" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Product Variant has been deleted successfully" , productVariant }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [DELETE /products/variants?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [DELETE /products/variants?id=] ${error.message}` }, { status: 500 });
        }
    }
}