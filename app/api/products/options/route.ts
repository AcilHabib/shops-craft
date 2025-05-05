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
        const productOptions = await prisma.productOption.findMany({
            include: {
                product: true,
            }
        })

        if (!productOptions) {
            return NextResponse.json({ success: false, message: "Product Options Not Found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Product Options Found Seccessfully" , productOptions }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [GET /products/options] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [GET /products/options] ${error.message}` }, { status: 500 });
        }
    }
}

export const POST = async (request: ProductId) => {

    const id = request.nextUrl.searchParams.get("id");

    const { name, values } = await request.json();

    if ( !name || !values || !id) {
        return NextResponse.json({ message: "All Fields are Required!!" }, { status: 400 });
    }

    try {

        const productOption = await prisma.productOption.create({
            data: {
                name: name,
                values: values,
                product: {
                    connect: {
                        id: id,
                    }
                }
            }
        })

        if (!productOption) {
            return NextResponse.json({ success: false, message: "Can not create a Product Option" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Product Option has been created and saved Successfully" , productOption }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [POST /products/options?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [POST /products/options?id=] ${error.message}` }, { status: 500 });
        }
    }
}

export const PUT = async (req: ProductId) => {

    const id = req.nextUrl.searchParams.get("id");

    const { values } = await req.json();

    if (!id) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {

        const productOption = await prisma.productOption.update({
            where: {
                id: id,
            },
            data: {
                values: values || undefined,
            },
            include: {
                product: true,
            }
        })

        if (!productOption) {
            return NextResponse.json({ success: false, message: "Can not update Product Option" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Product Option updated Successfully" , productOption }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [PUT /products/options?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [PUT /products/options?id=] ${error.message}` }, { status: 500 });
        }
    }
}

export const DELETE = async (req: ProductId) => {

    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {

        const productOption = await prisma.productOption.delete({
            where: {
                id: id,
            },
            include: {
                product: true,
            }
        })

        if (!productOption) {
            return NextResponse.json({ success: false, message: "Can not delete Product Option" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Product Option has been deleted successfully" , productOption }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [DELETE /products/options?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [DELETE /products/options?id=] ${error.message}` }, { status: 500 });
        }
    }
}