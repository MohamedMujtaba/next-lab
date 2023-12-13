"use server";
import {
  Prisma,
  SubTest,
  SubTestNormal,
  SubTestOption,
  Test,
} from "@prisma/client";

import prismadb from "@/lib/prisma";

export const seedTests = async (data: string) => {
  try {
    const d: [] = JSON.parse(data);
    const a = await prismadb.test.deleteMany();
    d.map(
      async (
        test: Test & {
          subTests: (SubTest & {
            options: SubTestOption[];
            normals: SubTestNormal[];
          })[];
        }
      ) => {
        await prismadb.test.create({
          data: {
            id: test.id,
            name: test.name,
          },
        });
        test.subTests?.map(async (subTest) => {
          await prismadb.subTest.create({
            data: {
              id: subTest.id,
              name: subTest.name,
              order: subTest.order,
              testId: subTest.testId,
              description: subTest.description,
              result: subTest.result,
              price: subTest.price,
              unit: subTest.unit,
              normals: {
                createMany: {
                  data: subTest.normals.map((n) => ({
                    label: n.label,
                    value: n.value,
                  })),
                },
              },
              options: {
                createMany: {
                  data: subTest.options.map((o) => ({
                    value: o.value,
                    order: o.order,
                    id: o.id,
                  })),
                },
              },
            },
          });
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
