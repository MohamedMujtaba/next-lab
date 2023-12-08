"use server";

import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteOption = async (id: string) => {
  try {
    await prismadb.subTestOption.delete({ where: { id } });
    revalidatePath("/tests");
    revalidatePath("/tests/[testId]", "page");
  } catch (error) {
    console.log(error);
  }
};
