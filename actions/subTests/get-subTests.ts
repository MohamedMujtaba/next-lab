"use server";

import prismadb from "@/lib/prisma";

export const getSubTests = async () => {
  try {
    const subTests = await prismadb.subTest.findMany({
      orderBy: {
        test: { name: "asc" },
      },
      include: {
        test: true,
      },
    });
    return subTests;
  } catch (error) {
    console.log(error);
  }
};
