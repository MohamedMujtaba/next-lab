"use server";

import prismadb from "@/lib/prisma";
import { Bill, SubTest, SubTestOption } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface AddBillSubTestProps {
  billId: string;
  testId: string;
  subTest: SubTest & { options: SubTestOption[] };
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
    });

    const bt = await prismadb.billTest.create({
      data: {
        name: mt?.name || "",
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
      type: subTest.type,
      description: subTest.description,
      femaleNormal: subTest.femaleNormal,
      maleNormal: subTest.maleNormal,
      options: {
        connect:
          subTest.options.map((o) => ({
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
