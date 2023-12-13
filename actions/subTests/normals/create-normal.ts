"use server";

import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createNormal = async (
  subTestId: string,
  values: { label: string; value: string }
) => {
  try {
    const normal = await prismadb.subTestNormal.create({
      data: { subTestId, ...values },
    });
    revalidatePath("bills/[billId]/result", "page");
    return { success: true, msg: "Normal has been created" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      msg: "Something went wrong",
    };
  }
};
