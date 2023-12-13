"use server";

import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const DeleteSubTest = async (id: string) => {
  try {
    await prismadb.subTest.delete({
      where: { id },
    });
    revalidatePath("tests/[testId]", "page");
  } catch (error) {
    console.log(error);
  }
};
