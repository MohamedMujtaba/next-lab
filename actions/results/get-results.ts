"use server";

import prismadb from "@/lib/prisma";

export const getResults = async () => {
  try {
    const results = await prismadb.bill.findMany({
      where: {
        status: "READY",
      },
      include: {
        patient: true,
        tests: {
          include: {
            subTests: {
              include: { normals: true },
              orderBy: { order: "asc" },
            },
          },
        },
      },
    });
    return results;
  } catch (error) {
    console.log(error);
  }
};
