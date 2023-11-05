"use server";

import prismadb from "@/lib/prisma";

export const getBills = async () => {
  try {
    const bills = await prismadb.bill.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        patient: true,
        tests: {
          include: {
            subTests: {
              orderBy: { order: "asc" },
            },
          },
        },
      },
    });
    return bills;
  } catch (error) {
    console.log(error);
    return error;
  }
};
