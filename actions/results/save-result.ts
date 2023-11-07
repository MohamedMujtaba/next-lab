"use server";

import prismadb from "@/lib/prisma";
import { SubTestType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const saveResult = async (
  id: string,
  type: SubTestType,
  value: string
) => {
  try {
    if (type === "ONERESULT") {
      const result = await prismadb.billSubTest.update({
        where: {
          id,
        },
        data: {
          result: value,
        },
      });
    }
    if (type === "DESCRIPTION") {
      const result = await prismadb.billSubTest.update({
        where: {
          id,
        },
        data: {
          description: value,
        },
      });
    }
    if (type === "OPTIONS") {
      const result = await prismadb.billSubTest.update({
        where: {
          id,
        },
        data: {
          selectedOption: value,
        },
      });
    }
    revalidatePath("bills/[id]/result");
    return {};
  } catch (error) {
    console.log(error);
  }
};
