"use server";

import prismadb from "@/lib/prisma";

export const updateSubTestFunction = async (id: string, func: string) => {
  try {
    await prismadb.subTest.update({
      where: { id },
      data: { function: func },
    });
  } catch (error) {
    console.log(error);
    return {
      success: false,
      msg: "Something went wrong",
    };
  }
};
