"use server";

import prismadb from "@/lib/prisma";
import { SubTest, Test } from "@prisma/client";

interface getTestsType {
  (): Promise<(Test & { subTests: SubTest[] })[] | undefined>;
}
export const getTests: getTestsType = async () => {
  try {
    const tests = await prismadb.test.findMany({
      include: { subTests: { orderBy: { order: "asc" } } },
    });
    return tests;
  } catch (error) {
    console.log(error);
    return [];
  }
};
