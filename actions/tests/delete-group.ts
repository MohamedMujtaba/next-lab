"use server";

import prismadb from "@/lib/prisma";

export const deleteGroup = async (id: string) => {
  try {
    await prismadb.testGroup.delete({ where: { id } });
    return {
      success: true,
      msg: "Normal has been deleted",
    };
  } catch (error) {
    return {
      success: false,
      msg: "Something went wrong",
    };
  }
};
