"use server";

import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const DeletePatient = async (ids: string[]) => {
  try {
    await prismadb.patient.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    revalidatePath("/patients");
  } catch (error) {
    console.log(error);
  }
};
