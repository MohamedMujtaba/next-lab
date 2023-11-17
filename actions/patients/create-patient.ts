"use server";

import { patientFormSchema } from "@/components/patient-form";
import prismadb from "@/lib/prisma";
import { validateSchema } from "@/lib/validateSchema";
import { Gender } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface CreatePatientProps {
  name: string;
  phoneNumber: string;
  gender: Gender;
  age: string;
}
export const createPatient = async ({
  gender,
  name,
  phoneNumber,
  age,
}: CreatePatientProps) => {
  // FIXME(validation):
  // validateSchema(patientFormSchema, { gender, name, phoneNumber });
  try {
    const allReadyExist = await prismadb.patient.findFirst({
      where: {
        phoneNumber,
      },
    });
    if (allReadyExist) {
      console.log("in");

      throw new Error("Patient phone number must be unique");
    }

    const patient = await prismadb.patient.create({
      data: {
        gender,
        name,
        age,
        phoneNumber,
      },
    });
    revalidatePath("/patients");
    return patient;
  } catch (error) {
    console.log(error);
    return error;
  }
};
