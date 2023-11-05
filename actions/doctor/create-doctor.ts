"use server";

import prismadb from "@/lib/prisma";

export const createDoctor = async (name: string) => {
  await prismadb.doctor.create({
    data: {
      name,
    },
  });
};
