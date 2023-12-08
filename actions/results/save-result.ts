"use server";

import prismadb from "@/lib/prisma";
import { SubTestType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const saveResult = async (
  id: string,
  //  type: SubTestType,
  // value: string
  values: { result?: string | undefined; description?: string | undefined }
) => {
  console.log(values);

  try {
    const subTest = await prismadb.billSubTest.findFirst({
      where: { id },
      select: { name: true },
    });
    if (!values.result && !values.description) {
      return {
        success: false,
        msg: `You should provide a result value or a description for test "${subTest?.name}" `,
      };
    }
    await prismadb.billSubTest.update({
      where: { id },
      data: {
        result: values.result,
        description: values.description,
      },
    });
    revalidatePath("/bills/[billId]/result", "page");
    return {
      success: true,
      msg: "Result has been saved",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      msg: "Something went wrong",
    };
  }
};

// export const saveResult = async (
//   id: string,
//   // type: SubTestType,
//   value: string
// ) => {
//   try {
//     if (type === "ONERESULT") {
//       const result = await prismadb.billSubTest.update({
//         where: {
//           id,
//         },
//         data: {
//           result: value,
//         },
//       });
//       revalidatePath("/bills/[billId]/result", "page");
//     }
//     if (type === "DESCRIPTION") {
//       const result = await prismadb.billSubTest.update({
//         where: {
//           id,
//         },
//         data: {
//           description: value,
//         },
//       });
//       revalidatePath("/bills/[billId]/result", "page");
//     }
//     if (type === "OPTIONS") {
//       const result = await prismadb.billSubTest.update({
//         where: {
//           id,
//         },
//         data: {
//           selectedOption: value,
//         },
//       });
//       revalidatePath("/bills/[billId]/result", "page");
//     }
//     return {};
//   } catch (error) {
//     console.log(error);
//   }
// };
