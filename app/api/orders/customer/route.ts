import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

type CustomerOrderID = NextRequest & {
  nextUrl: {
    searchParams: {
      get: (key: string) => string | null;
    };
  };
};

export const GET = async () => {
  try {
    const adresses = await prisma.customer.findMany();
    return NextResponse.json({ success: true, adresses }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("error getting adresses", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
};

export const POST = async (request: CustomerOrderID) => {
  const { lastName, email, phone, address } = await request.json();
  if (!lastName || !email || !address || !phone) {
    return NextResponse.json(
      { message: "All required fields are missing " },
      { status: 400 }
    );
  }
  try {
    const cstmr = await prisma.customer.create({
      data: { lastName, email, phone, address },
    });
    return NextResponse.json({ success: true, cstmr }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("error creatin customer ", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
};

export const PUT = async (request: CustomerOrderID) => {
  const id = request.nextUrl.searchParams.get("id");
  const data = await request.json();
  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }
  try {
    const updated = await prisma.customer.update({ where: { id }, data });
    return NextResponse.json({ success: true, updated }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("error updating address", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
};

export const DELETE = async (request: CustomerOrderID) => {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }
  try {
    const deleted = await prisma.customer.delete({ where: { id } });
    return NextResponse.json({ success: true, deleted }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("error deleting address", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
};
