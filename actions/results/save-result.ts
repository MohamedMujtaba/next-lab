"use server";

import prismadb from "@/lib/prisma";
import { SubTestType } from "@prisma/client";

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
    return {};
  } catch (error) {
    console.log(error);
  }
};
