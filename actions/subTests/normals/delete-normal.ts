"use server";

import prismadb from "@/lib/prisma";

export const deleteNormal = async (id: string) => {
  try {
    await prismadb.subTestNormal.delete({ where: { id } });
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
