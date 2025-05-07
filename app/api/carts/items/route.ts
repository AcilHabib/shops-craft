import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";


type cartId = NextRequest & {
    nextUrl: {
        searchParams: {
            get: (key: string) => string | null;
        };
    }
}

export const GET = async () => {

    try {
        const items = await prisma.cartItem.findMany({
            include: {
                merchandise: true,
                cart: true,
                product: true,
            }
        })

        if (!items) {
            return NextResponse.json({ success: false, message: "items Not Found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "items Found Seccessfully" , items }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [GET /carts/items] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [GET /carts/items] ${error.message}` }, { status: 500 });
        }
    }
}

export const POST = async (request: cartId) => {

    const cartId = request.nextUrl.searchParams.get("cartId");
    const productId = request.nextUrl.searchParams.get("productId");

    const { quantity, cost, merchandise } = await request.json();

    if ( !cartId || !productId || !quantity || !cost || !merchandise ) {
        return NextResponse.json({ message: "All Fields are Required!!" }, { status: 400 });
    }

    try {

        const item = await prisma.cartItem.create({
            data: {
                quantity: quantity,
                cost: cost,
                merchandise: {
                    create: merchandise.map((merchandise: any) => ({
                        title: merchandise.title,
                        selectedOptions: {
                            create: merchandise.selectedOptions.map((selectedOption: any) => ({
                                name: selectedOption.name,
                                value: selectedOption.value,
                            }))
                        },
                        product: {
                            create: merchandise.product.map((product: any) => ({
                                title: product.title,
                                handle: product.handle,
                            }))
                        }
                    })),
                },
                cart: {
                    connect: {
                        id: cartId,
                    }
                },
                product: {
                    connect: {
                        id: productId,
                    }
                }
            }
        })

        const cartItem = await prisma.cartItem.findUnique({
            where: {
                id: item.id,
            },
            include: {
                merchandise: { include: { product: true, selectedOptions: true, cartItem: true } },
                cart: true,
                product: { include: { images: true, collection: true, options: true, seo: true, variants: true } },
            }
        })

        return NextResponse.json({ success: true, message: "Cart Item has been created and saved Successfully" , cartItem }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [POST /carts/items?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [POST /carts/items?id=] ${error.message}` }, { status: 500 });
        }
    }
}

export const PUT = async (req: cartId) => {

    const cartItemId = req.nextUrl.searchParams.get("id");

    const { quantity, cost } = await req.json();

    if (!cartItemId) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {

        const item = await prisma.cartItem.update({
            where: {
                id: cartItemId,
            },
            data: {
                quantity: quantity || undefined,
                cost: cost || undefined,
            },
            include: {
                merchandise: true,
                cart: true,
                product: true,
            }
        })

        if (!item) {
            return NextResponse.json({ success: false, message: "Can not update Cart Item" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Cart Item updated Successfully" , item }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [PUT /carts/items?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [PUT /carts/items?id=] ${error.message}` }, { status: 500 });
        }
    }
}

export const DELETE = async (req: cartId) => {

    const cartItemId = req.nextUrl.searchParams.get("id");

    if (!cartItemId) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {

        const item = await prisma.cartItem.delete({
            where: {
                id: cartItemId,
            },
            include: {
                merchandise: true,
                cart: true,
                product: true,
            }
        })

        if (!item) {
            return NextResponse.json({ success: false, message: "Can not delete Cart item" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Cart item has been deleted successfully" , item }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [DELETE /carts/items?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [DELETE /carts/items?id=] ${error.message}` }, { status: 500 });
        }
    }
}