"use server";

import prismadb from "@/lib/prisma";
import { BillSubTest, BillTest } from "@prisma/client";

interface CreateBillProps {
  patientId: string;
  // tests: (BillTest & { billSubTests: BillSubTest[] })[];
}

export const createBill = async (patientId: string) => {
  try {
    if (!patientId) {
      return {
        ok: false,
        message: "PatientId is required",
      };
    }
    const bill = await prismadb.bill.create({
      data: {
        patientId,
      },
    });
    return {
      ok: true,
      data: bill,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
};
