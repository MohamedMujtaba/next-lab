import prismadb from "@/lib/prisma";
import { Test, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

type t = Prisma.TestUpdateInput;

export async function PATCH(
  req: Request,
  { params }: { params: { testId: string } }
) {
  const { testId } = params;
  const body: t = await req.json();
  const { name } = body;
  try {
    const test = await prismadb.test.update({
      where: {
        id: testId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(test);
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
