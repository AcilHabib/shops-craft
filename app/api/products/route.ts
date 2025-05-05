import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";


type ProductId = NextRequest & {
    nextUrl: {
        searchParams: {
            get: (key: string) => string | null;
        };
    }
}

export const GET = async () => {

    try {
        const products = await prisma.product.findMany({
            include: {
                cartitem: true,
                collection: true,
                options: true,
                images: true,
                variants: true,
                seo: true,
            }
        })

        if (!products) {
            return NextResponse.json({ success: false, message: "Products Not Found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Products Found Seccessfully" , products }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [GET /products] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [GET /products] ${error.message}` }, { status: 500 });
        }
    }
}

export const POST = async (request: ProductId) => {

    const collectionId = request.nextUrl.searchParams.get("collectionId");

    const { handle, title, description, descriptionHtml, priceRange, tags } = await request.json();

    if ( !description || !descriptionHtml || !handle || !title || !priceRange || !tags) {
        return NextResponse.json({ message: "All Fields are Required!!" }, { status: 400 });
    }

    try {

        const product = await prisma.product.create({
            data: {
                handle: handle,
                title: title,
                description: description,
                descriptionHtml: descriptionHtml,
                priceRange: priceRange,
                tags: tags,
                collection: collectionId ? {
                    connect: {
                        id: collectionId,
                    }
                } : undefined,
            }
        })

        if (!product) {
            return NextResponse.json({ success: false, message: "Can not create a Product" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Product has been created and saved Successfully" , product }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [POST /products] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [POST /products] ${error.message}` }, { status: 500 });
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

        const product = await prisma.product.update({
            where: {
                id: id,
            },
            data: {
                availableForSale: availableForSale || undefined,
            },
            include: {
                cartitem: true,
                collection: true,
                images: true,
                options: true,
                variants: true,
                seo: true,
            }
        })

        if (!product) {
            return NextResponse.json({ success: false, message: "Can not update Product" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Product updated Successfully" , product }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [PUT /products?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [PUT /products?id=] ${error.message}` }, { status: 500 });
        }
    }
}

export const DELETE = async (req: ProductId) => {

    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {

        const product = await prisma.product.delete({
            where: {
                id: id,
            },
            include: {
                cartitem: true,
                collection: true,
                images: true,
                options: true,
                variants: true,
                seo: true,
            }
        })

        if (!product) {
            return NextResponse.json({ success: false, message: "Can not delete Product" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Product has been deleted successfully" , product }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [DELETE /products?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [DELETE /products?id=] ${error.message}` }, { status: 500 });
        }
    }
}