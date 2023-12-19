"use server";

import prismadb from "@/lib/prisma";

export const getGroups = async (testId: string) => {
  try {
    const groups = await prismadb.testGroup.findMany({
      where: { testId },
    });
    return {
      success: true,
      data: groups,
      msg: "OK",
    };
  } catch (error) {
    return {
      success: false,
      msg: "Something went wrong",
    };
  }
};
