import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

type AdressOrderId = NextRequest & {
  nextUrl: {
    searchParams: {
      get: (key: string) => string | null;
    };
  };
};

export const GET = async () => {
  try {
    const adresses = await prisma.address.findMany();
    return NextResponse.json({ success: true, adresses }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("error getting adresses", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
};

export const POST = async (request: AdressOrderId) => {
  const { state, city, address, zipCode, appartment, customerId } =
    await request.json();
  if (!state || !city || !address || !zipCode || !appartment || !customerId) {
    return NextResponse.json(
      { message: "All required fields are missing " },
      { status: 400 }
    );
  }
  try {
    const adr = await prisma.address.create({
      data: { state, city, address, zipCode, appartment, customerId },
    });
    return NextResponse.json({ success: true, adr }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("error creating address", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
};

export const PUT = async (request: AdressOrderId) => {
  const id = request.nextUrl.searchParams.get("id");
  const data = await request.json();
  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }
  try {
    const updated = await prisma.address.update({ where: { id }, data });
    return NextResponse.json({ success: true, updated }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("error updating address", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
};

export const DELETE = async (request: AdressOrderId) => {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }
  try {
    const deleted = await prisma.address.delete({ where: { id } });
    return NextResponse.json({ success: true, deleted }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("error deleting address", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
};
