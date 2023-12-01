"use server";

import prismadb from "@/lib/prisma";
import { format } from "date-fns";

export const getStatus = async ({
  from,
  to,
}: {
  from: Date;
  to?: Date | undefined;
}) => {
  let dateQ: any = {};
  if (!to) {
    dateQ.gte = new Date(format(from, "yyyy/MM/dd"));
    dateQ.lt = new Date(from.getTime() + 24 * 60 * 60 * 1000);
  }
  if (from && to) {
    dateQ.lte = new Date(format(to, "yyyy/MM/dd"));
    dateQ.gte = new Date(format(from, "yyyy/MM/dd"));
  }

  try {
    const bills = await prismadb.bill.count({
      where: {
        createdAt: dateQ,
      },
    });
    const bt = await prismadb.bill.aggregate({
      where: {
        createdAt: dateQ,
      },
      _sum: {
        total: true,
      },
    });
    const patients = await prismadb.patient.count({
      where: {
        createdAt: dateQ,
      },
    });
    const results = await prismadb.bill.count({
      where: {
        status: "READY",
        createdAt: dateQ,
      },
    });
    return { bills, billsTotal: bt._sum.total || 0, patients, results };
  } catch (error) {
    console.log(error);
  }
};
