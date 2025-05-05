import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";


type merchandiseId = NextRequest & {
    nextUrl: {
        searchParams: {
            get: (key: string) => string | null;
        };
    }
}

export const GET = async () => {

    try {
        const merchandise = await prisma.merchandise.findMany({
            include: {
                cartItem: true,
                product: true,
                selectedOptions: true,
            }
        })

        if (!merchandise) {
            return NextResponse.json({ success: false, message: "Merchandise Not Found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Merchandise Found Seccessfully" , merchandise }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [GET /merchandise] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [GET /merchandise] ${error.message}` }, { status: 500 });
        }
    }
}

export const POST = async (request: merchandiseId) => {

    const cartItemId = request.nextUrl.searchParams.get("id");

    const { title } = await request.json();

    if ( !title ) {
        return NextResponse.json({ message: "All Fields are Required!!" }, { status: 400 });
    }

    try {

        const merchandise = await prisma.merchandise.create({
            data: {
                title: title,
                cartItem: cartItemId ? {
                    connect: {
                        id: cartItemId,
                    }
                } : undefined
            }
        })

        if (!merchandise) {
            return NextResponse.json({ success: false, message: "Can not create a Merchandise" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Merchandise has been created and saved Successfully" , merchandise }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [POST /merchandise] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [POST /merchandise] ${error.message}` }, { status: 500 });
        }
    }
}

export const PUT = async (req: merchandiseId) => {

    const id = req.nextUrl.searchParams.get("id");

    const { title } = await req.json();

    if (!id) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {

        const merchandise = await prisma.merchandise.update({
            where: {
                id: id,
            },
            data: {
                title: title || undefined,
            },
            include: {
                cartItem: true,
                product: true,
                selectedOptions: true,
            }
        })

        if (!merchandise) {
            return NextResponse.json({ success: false, message: "Can not update Merchandise" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Merchandise updated Successfully" , merchandise }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [PUT /merchandise?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [PUT /merchandise?id=] ${error.message}` }, { status: 500 });
        }
    }
}

export const DELETE = async (req: merchandiseId) => {

    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {

        const merchandise = await prisma.merchandise.delete({
            where: {
                id: id,
            },
            include: {
                cartItem: true,
                product: true,
                selectedOptions: true,
            }
        })

        if (!merchandise) {
            return NextResponse.json({ success: false, message: "Can not delete Merchandise" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Merchandise has been deleted successfully" , merchandise }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [DELETE /merchandise?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [DELETE /merchandise?id=] ${error.message}` }, { status: 500 });
        }
    }
}