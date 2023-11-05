"use server";

import prismadb from "@/lib/prisma";
import { Test } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface AddBillTestProps {
  test: Test;
  billId: string;
}

export const addBillTest = async ({ test, billId }: AddBillTestProps) => {
  try {
    const billHaveThisTest = await prismadb.billTest.findFirst({
      where: { testId: test.id, billId },
    });
    if (billHaveThisTest)
      return {
        ok: false,
        message: "Test already added ",
      };

    const billTest = await prismadb.billTest.create({
      data: {
        name: test.name,
        testId: test.id,
        billId,
      },
    });
    revalidatePath("/bill/[billId]", "page");
    return {
      ok: true,
      message: "Test added ",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
};
