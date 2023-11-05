import prismadb from "@/lib/prisma";
import { SubTest } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const body: SubTest[] = await req.json();
    for (let index = 0; index < body.length; index++) {
      const newOrder = index + 1;
      let st = body[index];
      const newSubTest = await prismadb.subTest.update({
        where: {
          id: st.id,
        },
        data: {
          order: newOrder,
        },
      });
    }
    return NextResponse.json({ message: "OK" });
  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
