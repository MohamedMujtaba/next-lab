import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tests = await prismadb.test.findMany({
      // include: {
      //   subTests: {
      //     include: {
      //       options: true,
      //       normals: true,
      //     },
      //   },
      // },
    });
    return NextResponse.json(tests);
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
