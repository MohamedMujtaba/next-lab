"use server";

import prismadb from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface CreateSubTestProps {
  name: string;
  price: number;
  testId: string;
  femaleNormal: string | undefined;
  maleNormal: string | undefined;
}

export const createSubTest = async ({
  name,
  price,
  testId,
  femaleNormal,
  maleNormal,
}: CreateSubTestProps) => {
  try {
    if (!testId) return { success: false, msg: "You should provide a test !" };

    const subTestsCount = await prismadb.subTest.count({
      where: {
        testId,
      },
    });

    const count = subTestsCount + 1;

    const subTest = await prismadb.subTest.create({
      data: {
        name,
        price: price | 0,
        testId,
        femaleNormal,
        maleNormal,
        order: count,
      },
      include: { options: true },
    });
    return { success: true, data: subTest };
  } catch (error) {
    console.log("CREATE_SUBTEST_ACTION", error);
    return { success: false, msg: "Someting went worng" };
  }
};
