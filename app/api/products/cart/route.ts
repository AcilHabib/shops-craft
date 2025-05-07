import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";


type CartProductId = NextRequest & {
    nextUrl: {
        searchParams: {
            get: (key: string) => string | null;
        };
    }
}

export const GET = async () => {

    try {
        const cartProduct = await prisma.cartProduct.findMany({
            include: {
                merchandise: true,
            }
        })

        if (!cartProduct) {
            return NextResponse.json({ success: false, message: "Cart Product Not Found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Cart Product Found Seccessfully" , cartProduct }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [GET /products/cart] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [GET /products/cart] ${error.message}` }, { status: 500 });
        }
    }
}

export const POST = async (request: CartProductId) => {

    const merchandiseId = request.nextUrl.searchParams.get("id");

    const { handle, title } = await request.json();

    if ( !handle || !title || !merchandiseId) {
        return NextResponse.json({ message: "All Fields are Required!!" }, { status: 400 });
    }

    try {

        const cartProduct = await prisma.cartProduct.create({
            data: {
                handle: handle,
                title: title,
                merchandise: {
                    connect: {
                        id: merchandiseId,
                    }
                }
            }
        })

        if (!cartProduct) {
            return NextResponse.json({ success: false, message: "Can not create a Cart Product" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Cart Product has been created and saved Successfully" , cartProduct }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [POST /products/cart?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [POST /products/cart?id=] ${error.message}` }, { status: 500 });
        }
    }
}

export const PUT = async (req: CartProductId) => {

    const id = req.nextUrl.searchParams.get("id");

    const { handle, title } = await req.json();

    if (!id) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {

        const cartProduct = await prisma.cartProduct.update({
            where: {
                id: id,
            },
            data: {
                handle: handle || undefined,
                title: title || undefined,
            },
            include: {
                merchandise: true,
            }
        })

        if (!cartProduct) {
            return NextResponse.json({ success: false, message: "Can not update Cart Product" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Cart Product updated Successfully" , cartProduct }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [PUT /products/cart?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [PUT /products/cart?id=] ${error.message}` }, { status: 500 });
        }
    }
}

export const DELETE = async (req: CartProductId) => {

    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {

        const cartProduct = await prisma.cartProduct.delete({
            where: {
                id: id,
            },
            include: {
                merchandise: true,
            }
        })

        if (!cartProduct) {
            return NextResponse.json({ success: false, message: "Can not delete Cart Product" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Cart Product has been deleted successfully" , cartProduct }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [DELETE /products/cart?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [DELETE /products/cart?id=] ${error.message}` }, { status: 500 });
        }
    }
}