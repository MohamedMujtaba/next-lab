"use server";

import prismadb from "@/lib/prisma";

interface GetPatientsProps {}
export const getPatients = async () => {
  // FIXME(validation):
  // validateSchema(patientFormSchema, { gender, name, phoneNumber });
  try {
    const patients = await prismadb.patient.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return patients;
  } catch (error) {
    console.log(error);
    return error;
  }
};
