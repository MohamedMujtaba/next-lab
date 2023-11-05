import Container from "@/components/container";
import prismadb from "@/lib/prisma";
import React from "react";
import TestsList from "./_components/TestsList";
import SelectedTests from "./_components/selectedTests";

const BillPage = async ({ params }: { params: { billId: string } }) => {
  const { billId } = params;
  const tests = await prismadb.test.findMany({
    include: {
      subTests: { orderBy: { order: "asc" }, include: { options: true } },
    },
  });
  const bill = await prismadb.bill.findUnique({
    where: { id: billId },
    include: {
      tests: {
        include: {
          subTests: {
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });
  return (
    <Container>
      <div className="w-full grid grid-cols-10 gap-4 ">
        <div className="col-span-5  ">
          <TestsList tests={tests} />
        </div>
        <div className="col-span-5 h-[30vh] ">
          <SelectedTests bill={bill} />
        </div>
      </div>
    </Container>
  );
};

export default BillPage;
