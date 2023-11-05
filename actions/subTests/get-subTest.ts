"use server";
import prismadb from "@/lib/prisma";

export async function GetSubTest(id: string) {
  const subTest = await prismadb.subTest.findFirst({
    where: { id },
    include: { options: { orderBy: { order: "asc" } } },
  });
  return subTest;
}
