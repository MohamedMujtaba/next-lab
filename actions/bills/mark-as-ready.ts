"use server";

import prismadb from "@/lib/prisma";
import { BillSubTest } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const markAsReady = async (id: string) => {
  let isEmpty: BillSubTest[] = [];
  try {
    const bill = await prismadb.bill.findUnique({
      where: { id },
      include: {
        tests: {
          include: {
            subTests: true,
          },
        },
      },
    });

    bill?.tests.map((test) => {
      test.subTests.map((subTest) => {
        if (subTest.type === "ONERESULT") {
          if (!subTest.result) {
            isEmpty.push(subTest);
          }
        }
        if (subTest.type === "DESCRIPTION") {
          if (!subTest.description) {
            isEmpty.push(subTest);
          }
        }
        if (subTest.type === "OPTIONS") {
          if (!subTest.selectedOption) {
            isEmpty.push(subTest);
          }
        }
      });
    });

    if (isEmpty.length === 0) {
      await prismadb.bill.update({
        where: { id },
        data: {
          status: "READY",
        },
      });
      revalidatePath("bills/[id]/result", "page");
      return {
        success: true,
        message: "Bill has been marked as ready",
      };
    }
    return {
      success: false,
      message: "All tests should have result to mark a bill as ready",
    };
  } catch (error) {
    console.log(error);
  }
};
