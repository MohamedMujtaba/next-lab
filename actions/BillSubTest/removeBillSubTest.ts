"use server";

import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const removeBillSubTest = async (subTestId: string, testId: string) => {
  try {
    await prismadb.billSubTest.delete({ where: { id: subTestId } });
    const stc = await prismadb.billSubTest.findMany({
      where: { billTestId: testId },
    });
    if (stc.length === 0) {
      await prismadb.billTest.delete({ where: { id: testId } });
    }
    revalidatePath("/bill/[billId]", "page");

    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
};
