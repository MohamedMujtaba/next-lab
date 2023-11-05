"use server";

import prismadb from "@/lib/prisma";

export const getResults = async () => {
  try {
    const results = await prismadb.bill.findMany({
      where: {
        status: "READY",
      },
    });
    return results;
  } catch (error) {
    console.log(error);
  }
};
