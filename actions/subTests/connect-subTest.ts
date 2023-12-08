"use server";

import prismadb from "@/lib/prisma";

export const connectSubTest = async (subTestId: string, testId: string) => {
  try {
    const subTest = await prismadb.subTest.update({
      where: { id: subTestId },
      data: { testId },
    });
  } catch (error) {
    console.log(error);
  }
};
