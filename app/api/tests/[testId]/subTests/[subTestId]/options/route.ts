import prismadb from "@/lib/prisma";
import { SubTestOption } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

interface POSTProps {
  subTestId: string;
}

export async function POST(req: Request, params: POSTProps) {
  // const { subTestId } = params;
  const body: SubTestOption = await req.json();
  const { value, subTestId } = body;

  try {
    if (!subTestId)
      return new NextResponse("SubTest id not found", { status: 404 });
    const optionCount = await prismadb.subTestOption.count({
      where: { id: subTestId },
    });
    const count = optionCount + 1;
    const option = await prismadb.subTestOption.create({
      data: {
        subTestId,
        value,
        order: count,
      },
    });
    // await prismadb.billSubTest.updateMany({
    //   where: { subTestId },
    //   data: {
    //     options:
    //   },
    // });
    revalidatePath("/tests");
    revalidatePath("/tests/[testId]", "page");
    revalidatePath("/bills/[billId]/result", "page");

    return NextResponse.json({ option });
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
