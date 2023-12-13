"use server";

import prismadb from "@/lib/prisma";
import { Bill, SubTest, SubTestNormal, SubTestOption } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface AddBillSubTestProps {
  billId: string;
  testId: string;
  subTests: (SubTest & {
    options: SubTestOption[];
    normals: SubTestNormal[];
  })[];
}
export const addAllSubTests = async (props: AddBillSubTestProps) => {
  const { billId, testId, subTests } = props;

  try {
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
    for (let index = 0; index < subTests.length; index++) {
      const subTest = subTests[index];
      const isBillSubTestAlreadyAdded = await prismadb.billSubTest.findFirst({
        where: { billTestId, subTestId: subTest.id },
      });
      if (!isBillSubTestAlreadyAdded) {
        const bst = await prismadb.billSubTest.create({
          data: {
            billTestId,
            subTestId: subTest.id,
            name: subTest.name,
            order: subTest.order,
            price: subTest.price,
            description: subTest.description,
            unit: subTest.unit,
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
      }

      revalidatePath("/bill/[billId]", "page");
    }
    return {
      ok: true,
      message: "Test added ",
    };
  } catch (error) {
    console.log(error);
  }
};
