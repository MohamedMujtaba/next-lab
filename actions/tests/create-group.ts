"use server";

import prismadb from "@/lib/prisma";

export const createGroup = async (name: string, testId: string) => {
  try {
    await prismadb.testGroup.create({
      data: {
        name,
        testId,
      },
    });
  } catch (error) {
    return {
      success: false,
      msg: "Something went wrong",
    };
  }
};
