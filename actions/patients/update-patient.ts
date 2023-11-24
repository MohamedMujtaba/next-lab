"use server";

import { Prisma } from "@prisma/client";
import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updatePatient = async (
  id: string,
  data: Prisma.PatientUpdateInput
) => {
  try {
    await prismadb.patient.update({
      where: { id },
      data: data,
    });
    revalidatePath("/patients");
  } catch (error) {
    console.log(error);
  }
};
