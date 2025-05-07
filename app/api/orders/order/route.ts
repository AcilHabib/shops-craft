import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

type OrderID = NextRequest & {
  nextUrl: {
    searchParams: {
      get: (key: string) => string | null;
    };
  };
};
export const GET = async () => {
  try {
    const orders = await prisma.order.findMany({
      include: { cart: true, customer: true },
    });
    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      console.error("error getting orders", e);
      return NextResponse.json({ message: e.message }, { status: 500 });
    }
  }
};

export const POST = async (req: OrderID) => {

  const cartId = req.nextUrl.searchParams.get("cartId");
  const customerId = req.nextUrl.searchParams.get("customerId");
  const { deliveryType } = await req.json();

  if (!deliveryType || !cartId || !customerId) {
    return NextResponse.json(
      { message: "deliveryType, cartId, customerId are required" },
      { status: 400 }
    );
  }
  try {
    const order = await prisma.order.create({
      data: { deleveryType: deliveryType, cart: { connect: { id: cartId } }, customer: { connect: { id: customerId } } },
      include: { cart: true, customer: true },
    });
    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (e) {
    if (e instanceof Error) {
      console.error("error creating order", e);
      return NextResponse.json({ message: e.message }, { status: 500 });
    }
  }
};
export const PUT = async (req: OrderID) => {
  const id = req.nextUrl.searchParams.get("id");
  const { deliveryType } = await req.json();
  if (!id)
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  try {
    const updated = await prisma.order.update({
      where: { id },
      data: { deleveryType: deliveryType },
      include: { cart: true, customer: true },
    });
    return NextResponse.json({ success: true, updated }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      console.error("error updating order", e);
      return NextResponse.json({ message: e.message }, { status: 500 });
    }
  }
};

export const DELETE = async (req: OrderID) => {
  const id = req.nextUrl.searchParams.get("id");
  if (!id)
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  try {
    const deleted = await prisma.order.delete({ where: { id } });
    return NextResponse.json({ success: true, deleted }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      console.error("error deleting order", e);
      return NextResponse.json({ message: e.message }, { status: 500 });
    }
  }
};
