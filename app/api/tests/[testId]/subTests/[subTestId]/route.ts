import prismadb from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

// (Without<SubTestUpdateInput, SubTestUncheckedUpdateInput> & SubTestUncheckedUpdateInput)
// (Without<SubTestUpdateInput, SubTestUncheckedUpdateInput> & SubTestUncheckedUpdateInput) | (Without<...> & SubTestUpdateInput)
type BT = Prisma.SubTestUncheckedUpdateInput;

export async function PUT(
  req: Request,
  { params }: { params: { subTestId: string } }
) {
  try {
    const body: BT = await req.json();
    let a: Prisma.SubTestUncheckedUpdateInput = {};

    if (body.name) a.name = body.name;
    if (body.maleNormal) a.maleNormal = body.maleNormal;
    if (body.femaleNormal) a.femaleNormal = body.femaleNormal;
    if (body.result) a.result = body.result;
    if (body.price) a.price = body.price;
    if (body.description) a.description = body.description;
    const subTest = await prismadb.subTest.update({
      where: {
        id: params.subTestId,
      },
      data: a,
    });
    return NextResponse.json({ message: "ok" });
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
