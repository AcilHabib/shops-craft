import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";


type CollectionId = NextRequest & {
    nextUrl: {
        searchParams: {
            get: (key: string) => string | null;
        };
    }
}

export const GET = async () => {

    try {
        const collections = await prisma.collection.findMany({
            include: {
                product: true,
            }
        })

        if (!collections) {
            return NextResponse.json({ success: false, message: "collections Not Found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "collections Found Seccessfully" , collections }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [GET /collections] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [GET /collections] ${error.message}` }, { status: 500 });
        }
    }
}

export const POST = async (request: CollectionId) => {

    const { handle, title, description, seo, path } = await request.json();

    if ( !description || !handle || !title || !seo || !path) {
        return NextResponse.json({ message: "All Fields are Required!!" }, { status: 400 });
    }

    try {

        const collection = await prisma.collection.create({
            data: {
                handle: handle,
                title: title,
                description: description,
                seo: seo,
                path: path,
            }
        })

        if (!collection) {
            return NextResponse.json({ success: false, message: "Can not create a Collection" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Collection has been created and saved Successfully" , collection }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [POST /collections] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [POST /collections] ${error.message}` }, { status: 500 });
        }
    }
}

export const PUT = async (req: CollectionId) => {

    const id = req.nextUrl.searchParams.get("id");

    const { handle, title, description, seo, path } = await req.json();

    if (!id) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {

        const collection = await prisma.collection.update({
            where: {
                id: id,
            },
            data: {
                handle: handle || undefined,
                title: title || undefined,
                description: description || undefined,
                seo: seo || undefined,
            },
            include: {
                product: true,
            },
        })

        if (!collection) {
            return NextResponse.json({ success: false, message: "Can not update Collection" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Collection updated Successfully" , collection }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [PUT /collections?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [PUT /collections?id=] ${error.message}` }, { status: 500 });
        }
    }
}

export const DELETE = async (req: CollectionId) => {

    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {

        const collection = await prisma.collection.delete({
            where: {
                id: id,
            },
            include: {
                product: true,

            }
        })

        if (!collection) {
            return NextResponse.json({ success: false, message: "Can not delete Collection" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Collection has been deleted successfully" , collection }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [DELETE /collections?id=] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [DELETE /collections?id=] ${error.message}` }, { status: 500 });
        }
    }
}