import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) return new NextResponse("Test Name is required");

    const test = await prismadb.test.create({
      data: {
        name,
      },
    });
    return NextResponse.json(test);
  } catch {
    return new NextResponse("Error", { status: 500 });
  }
}
