import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";


type PictureId = NextRequest & {
    nextUrl: {
        searchParams: {
            get: (key: string) => string | null;
        };
    }
}

// Get all pictures of a product by productId
export const GET = async (request: PictureId) => {

    const productId = request.nextUrl.searchParams.get("productId");

    if (!productId) {
        return NextResponse.json({ message: "Product ID is Required!!" }, { status: 400 });
    }

    try {
        const pictures = await prisma.image.findMany({
            where: {
                productId: productId,
            },
        })

        if (!pictures) {
            return NextResponse.json({ success: false, message: "Pictures Not Found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Pictures Found Seccessfully" , pictures }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [GET /products/pictures] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [GET /products/pictures] ${error.message}` }, { status: 500 });
        }
    }
}

export const POST = async (request: PictureId) => {

    const productId = request.nextUrl.searchParams.get("productId");

    const { url, altText, width, height } = await request.json();

    if ( !productId || !url || !altText || !width || !height ) {
        return NextResponse.json({ message: "All Fields are Required!!" }, { status: 400 });
    }

    try {

        const picture = await prisma.image.create({
            data: {
                url: url,
                altText: altText,
                width: width,
                height: height,
                product: {
                    connect: {
                        id: productId,
                    }
                }
            }
        })

        if (!picture) {
            return NextResponse.json({ success: false, message: "Can not create a Picture" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Picture has been created and saved Successfully" , picture }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [POST /products/pictures?productId=${productId}] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [POST /products/pictures?productId=${productId}] ${error.message}` }, { status: 500 });
        }
    }
}

export const PUT = async (req: PictureId) => {

    const id = req.nextUrl.searchParams.get("id");

    const { url, altText, width, height, isMain } = await req.json();

    if (!id) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {

        const picture = await prisma.image.update({
            where: {
                id: id,
            },
            data: {
                url: url || undefined,
                altText: altText || undefined,
                width: width || undefined,
                height: height || undefined,
                isFeatured: isMain ? true : false || undefined,
            },
            include: {
                product: true
            }
        })

        if (!picture) {
            return NextResponse.json({ success: false, message: "Can not update Picture" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Picture updated Successfully" , picture }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [PUT /products/pictures?id=${id}] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [PUT /products/pictures?id=${id}] ${error.message}` }, { status: 500 });
        }
    }
}

export const DELETE = async (req: PictureId) => {

    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {

        const picture = await prisma.image.delete({
            where: {
                id: id,
            },
            include: {
                product: true,
            }
        })

        if (!picture) {
            return NextResponse.json({ success: false, message: "Can not delete Picture" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Picture has been deleted successfully" , picture }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [DELETE /products/pictures?id=${id}] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [DELETE /products/pictures?id=${id}] ${error.message}` }, { status: 500 });
        }
    }
}