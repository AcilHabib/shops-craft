import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";


type OptiontId = NextRequest & {
    nextUrl: {
        searchParams: {
            get: (key: string) => string | null;
        };
    }
}

export const GET = async () => {

    try {
        const selectedOption = await prisma.selectedOption.findMany({
            include: {
                merchandise: true,
                productVariant: true,
            }
        })

        if (!selectedOption) {
            return NextResponse.json({ success: false, message: "Selected Option Not Found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Selected Option Found Seccessfully" , selectedOption }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [GET /products/options/selected] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [GET /products/options/selected] ${error.message}` }, { status: 500 });
        }
    }
}

export const POST = async (request: OptiontId) => {

    const variantId = request.nextUrl.searchParams.get("variantId");
    const merchandiseId = request.nextUrl.searchParams.get("merchandiseId");

    const { name, values } = await request.json();

    if ( !name || !values || !variantId || !merchandiseId) {
        return NextResponse.json({ message: "All Fields are Required!!" }, { status: 400 });
    }

    try {

        const selectedOption = await prisma.selectedOption.create({
            data: {
                name: name,
                value: values,
                productVariant: {
                    connect: {
                        id: variantId,
                    }
                },
                merchandise: {
                    connect: {
                        id: merchandiseId,
                    }
                }
            }
        })

        if (!selectedOption) {
            return NextResponse.json({ success: false, message: "Can not create a Selecte Option" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Selecte Option has been created and saved Successfully" , selectedOption }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [POST /products/options/selected?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [POST /products/options/selected?id=] ${error.message}` }, { status: 500 });
        }
    }
}

export const PUT = async (req: OptiontId) => {

    const id = req.nextUrl.searchParams.get("id");

    const { values } = await req.json();

    if (!id) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {

        const selectedOption = await prisma.selectedOption.update({
            where: {
                id: id,
            },
            data: {
                value: values || undefined,
            },
            include: {
                merchandise: true,
                productVariant: true,
            }
        })

        if (!selectedOption) {
            return NextResponse.json({ success: false, message: "Can not update Selected Option" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Selected Option updated Successfully" , selectedOption }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [PUT /products/options/selected?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [PUT /products/options/selected?id=] ${error.message}` }, { status: 500 });
        }
    }
}

export const DELETE = async (req: OptiontId) => {

    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {

        const selectedOption = await prisma.selectedOption.delete({
            where: {
                id: id,
            },
            include: {
                merchandise: true,
                productVariant: true,
            }
        })

        if (!selectedOption) {
            return NextResponse.json({ success: false, message: "Can not delete Selected Option" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Selected Option has been deleted successfully" , selectedOption }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [DELETE /products/options/selected?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [DELETE /products/options/selected?id=] ${error.message}` }, { status: 500 });
        }
    }
}