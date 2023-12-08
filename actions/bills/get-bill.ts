"use server";

import prismadb from "@/lib/prisma";

export const getBill = async (billId: string) => {
  try {
    const bill = await prismadb.bill.findFirst({
      where: {
        id: billId,
      },
      include: {
        patient: true,
        tests: {
          orderBy: { createdAt: "desc" },
          include: {
            subTests: {
              orderBy: { order: "asc" },
              include: { options: true, normals: true },
            },
          },
        },
      },
    });
    return bill;
  } catch (error) {
    console.log(error);
  }
};
