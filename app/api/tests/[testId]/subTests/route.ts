import prismadb from "@/lib/prisma";
import { SubTest } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params: { testId } }: { params: { testId: string } }
) {
  try {
    const body: SubTest = await req.json();
    const { name, type, description, price, result, femaleNormal, maleNormal } =
      body;

    if (!type) return new NextResponse("Test type is required");

    const subTestsCount = await prismadb.subTest.count({
      where: {
        testId,
      },
    });

    const count = subTestsCount + 1;

    if (type === "ONERESULT") {
      const subTest = await prismadb.subTest.create({
        data: {
          testId,
          name,
          type,
          price,
          description,
          result,
          femaleNormal,
          maleNormal,
          order: count,
        },
      });
      return NextResponse.json(subTest);
    }
    if (type === "DESCRIPTION") {
      const subTest = await prismadb.subTest.create({
        data: {
          testId,
          name,
          type,
          price,
          description,
          order: count,
        },
      });

      return NextResponse.json(subTest);
    }
    if (type === "OPTIONS") {
      const subTest = await prismadb.subTest.create({
        data: {
          testId,
          name,
          type,
          price,
          femaleNormal,
          maleNormal,
          order: count,
        },
        include: { options: true },
      });
      return NextResponse.json(subTest);
    }
    return NextResponse.json({ meg: "ok" });
  } catch (error) {
    return new NextResponse("Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { testId: string } }
) {
  const { testId } = params;

  try {
    const subTests = await prismadb.subTest.findMany({
      where: {
        testId,
      },
      orderBy: {
        order: "asc",
      },
    });
    return NextResponse.json(subTests);
  } catch (error) {
    return new NextResponse("SomeThing went wrong", { status: 500 });
  }
}
