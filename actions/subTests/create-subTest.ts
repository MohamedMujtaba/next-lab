"use server";

import prismadb from "@/lib/prisma";
import { Prisma, SubTest, SubTestNormal, SubTestOption } from "@prisma/client";

interface CreateSubTestProps {
  name: string;
  price: number;
  testId: string;
  unit: string | undefined;
}

export const createSubTest = async ({
  name,
  price,
  testId,
  unit,
}: CreateSubTestProps) => {
  try {
    if (!testId) return { success: false, msg: "You should provide a test !" };

    const subTestsCount = await prismadb.subTest.count({
      where: {
        testId,
      },
    });

    const count = subTestsCount + 1;

    const subTest: SubTest & {
      options: SubTestOption[];
      normals: SubTestNormal[];
    } = await prismadb.subTest.create({
      data: {
        name,
        unit,
        price: price | 0,
        testId,
        order: count,
      },
      include: { options: true, normals: true },
    });
    return { success: true, data: subTest };
  } catch (error) {
    console.log("CREATE_SUBTEST_ACTION", error);
    return { success: false, msg: "Someting went worng" };
  }
};
