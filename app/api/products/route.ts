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
                images: true,
                options: true,
                variants: { select: { id: true, selectedOptions: true, availableForSale: true, price: true, title: true } },
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

export const POST = async (request: NextRequest) => {
  const collectionId = request.nextUrl.searchParams.get("collectionId");

  const {
    handle,
    title,
    description,
    descriptionHtml,
    priceRange,
    tags,
    productOption,
    productVariant,
    pictures,
    seo
  } = await request.json();

  if (!description || !descriptionHtml || !handle || !title || !priceRange || !tags || !productOption || !productVariant || !pictures) {
    return NextResponse.json({ message: "All fields are required!" }, { status: 400 });
  }

  productVariant.map((variant: any) => {
    variant.selectedOptions.map((option: any) => {
      console.log("option", option);
    });
  })

  try {
    const Product = await prisma.product.create({
      data: {
        handle,
        title,
        description,
        descriptionHtml,
        priceRange,
        tags,
        images: { createMany: { data: pictures } },
        options: { createMany: { data: productOption } },
        variants: { create: productVariant.map((variant: any) => ({
          title: variant.title,
          price: variant.price,
          availableForSale: variant.availableForSale,
          selectedOptions: { createMany: { data: variant.selectedOptions } },
        })) },
        seo: {
          create: {
            title: seo.title,
            description: seo.description,
          },
        },
        collection: collectionId ? {
          connect: { id: collectionId },
        } : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product has been created and saved successfully",
      product: Product,
    }, { status: 200 });

  } catch (error) {
    if (error instanceof Error) {
      console.error(`[ERROR] [POST /products] ${error.message}`);
      return NextResponse.json({ message: `[ERROR] [POST /products] ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ message: `Unknown server error` }, { status: 500 });
  }
};

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
                collection: { select: { handle: true, description: true, title: true, path: true } },
                images: { select: { url: true, altText: true, width: true, height: true } },
                options: { select: { name: true, values: true } },
                variants: { select: { availableForSale: true, price: true, selectedOptions: true, title: true } },
                seo: { select: { title: true, description: true } },
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