"use server";

import prismadb from "@/lib/prisma";
import { Bill } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const removeBillSubTest = async (
  subTestId: string,
  testId: string,
  billId: string
) => {
  try {
    const subTest = await prismadb.billSubTest.delete({
      where: { id: subTestId },
    });
    const stc = await prismadb.billSubTest.findMany({
      where: { billTestId: testId },
    });
    const bill = (await prismadb.bill.findFirst({
      where: { id: billId },
    })) as Bill;
    let tValue = (bill.total as number) - subTest.price;
    await prismadb.bill.update({
      where: {
        id: billId,
      },
      data: {
        total: tValue,
      },
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
