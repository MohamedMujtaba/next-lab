"use server";

import prismadb from "@/lib/prisma";

export const updateSubTestGroup = async (id: string, group: string) => {
  try {
    await prismadb.subTest.update({
      where: { id },
      data: { group },
    });
  } catch (error) {
    console.log(error);
    return {
      success: false,
      msg: "Something went wrong",
    };
  }
};
