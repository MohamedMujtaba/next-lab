"use server";

import prismadb from "@/lib/prisma";
import { Bill, SubTest, SubTestNormal, SubTestOption } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface AddBillSubTestProps {
  billId: string;
  testId: string;
  subTest: SubTest & { options: SubTestOption[]; normals: SubTestNormal[] };
}

export const addBillSubTest = async (props: AddBillSubTestProps) => {
  const { billId, testId, subTest } = props;

  const isTestAdded = await prismadb.billTest.findFirst({
    where: { testId, billId },
  });
  let billTestId: string;

  if (isTestAdded) {
    billTestId = isTestAdded.id;
  } else {
    const mt = await prismadb.test.findFirst({
      where: { id: testId },
      include: {
        groups: true,
      },
    });

    const bt = await prismadb.billTest.create({
      data: {
        name: mt?.name || "",
        groups: {
          connect:
            mt?.groups.map((o) => ({
              id: o.id,
            })) || [],
        },
        billId,
        testId,
      },
    });
    billTestId = bt.id;
  }
  const isBillSubTestAlreadyAdded = await prismadb.billSubTest.findFirst({
    where: { billTestId, subTestId: subTest.id },
  });
  if (isBillSubTestAlreadyAdded) {
    return {
      ok: false,
      message: "Sub test already has been added",
    };
  }
  const bst = await prismadb.billSubTest.create({
    data: {
      billTestId,
      subTestId: subTest.id,
      name: subTest.name,
      order: subTest.order,
      price: subTest.price,
      description: subTest.description,
      unit: subTest.unit,
      function: subTest.function,
      group: subTest.group,
      options: {
        connect:
          subTest.options.map((o) => ({
            id: o.id,
          })) || [],
      },
      normals: {
        connect:
          subTest.normals.map((o) => ({
            id: o.id,
          })) || [],
      },
    },
  });
  const bill = (await prismadb.bill.findFirst({
    where: { id: billId },
  })) as Bill;
  let tValue = (bill.total as number) + subTest.price;
  await prismadb.bill.update({
    where: {
      id: billId,
    },
    data: {
      total: tValue,
    },
  });
  revalidatePath("/bill/[billId]", "page");
  return {
    ok: true,
    message: "Test added ",
  };
};
