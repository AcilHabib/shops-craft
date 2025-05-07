import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";


type SeoId = NextRequest & {
    nextUrl: {
        searchParams: {
            get: (key: string) => string | null;
        };
    }
}

export const GET = async () => {

    try {
        const seo = await prisma.sEO.findMany({
            include: {
                product: true,
            }
        })

        if (!seo) {
            return NextResponse.json({ success: false, message: "SEO Not Found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "SEO Found Seccessfully" , seo }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [GET /seo] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [GET /seo] ${error.message}` }, { status: 500 });
        }
    }
}

export const POST = async (request: SeoId) => {

    const productId = request.nextUrl.searchParams.get("productId");
    const collectionId = request.nextUrl.searchParams.get("collectionId");

    const { title, description } = await request.json();

    if ( !title || !description || !productId ) {
        return NextResponse.json({ message: "All Fields are Required!!" }, { status: 400 });
    }

    try {

        const seo = await prisma.sEO.create({
            data: {
                title: title,
                description: description,
                product: {
                    connect: {
                        id: productId,
                    }
                },
            }
        })

        if (!seo) {
            return NextResponse.json({ success: false, message: "Can not create a SEO" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "SEO has been created and saved Successfully" , seo }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [POST /seo?productId=${productId}&collectionId=${collectionId}] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [POST /seo?productId=${productId}&collectionId=${collectionId}] ${error.message}` }, { status: 500 });
        }
    }
}

export const PUT = async (req: SeoId) => {

    const id = req.nextUrl.searchParams.get("id");

    const { title, description } = await req.json();

    if (!id) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {

        const seo = await prisma.sEO.update({
            where: {
                id: id,
            },
            data: {
                title: title || undefined,
                description: description || undefined,
            },
            include: {
                product: true,
            }
        })

        if (!seo) {
            return NextResponse.json({ success: false, message: "Can not update SEO" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "SEO updated Successfully" , seo }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [PUT /seo?id=${id}] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [PUT /seo?id=${id}] ${error.message}` }, { status: 500 });
        }
    }
}

export const DELETE = async (req: SeoId) => {

    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "ID is Required!!" }, { status: 400 });
    }

    try {

        const seo = await prisma.sEO.delete({
            where: {
                id: id,
            },
            include: {
                product: true,
            }
        })

        if (!seo) {
            return NextResponse.json({ success: false, message: "Can not delete SEO" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "SEO has been deleted successfully" , seo }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error(`[ERROR] [DELETE /seo?id=${id}] ${error.message}`);
            return NextResponse.json({ message: `[ERROR] [DELETE /seo?id=${id}] ${error.message}` }, { status: 500 });
        }
    }
}