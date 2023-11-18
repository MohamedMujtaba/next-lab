import Container from "@/components/container";
import prismadb from "@/lib/prisma";
import React from "react";
import TestsList from "./_components/TestsList";
import SelectedTests from "./_components/selectedTests";
import { Insurance } from "./_components/insurance";
import {
  Bill,
  BillSubTest,
  BillTest,
  Patient,
  SubTestOption,
} from "@prisma/client";
import { getBill } from "@/actions/bills/get-bill";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type SubTest = BillSubTest & { options: SubTestOption[] };
type TTest = BillTest & { subTests: SubTest[] };

const BillPage = async ({ params }: { params: { billId: string } }) => {
  const { billId } = params;
  const tests = await prismadb.test.findMany({
    include: {
      subTests: { orderBy: { order: "asc" }, include: { options: true } },
    },
  });
  const bill = (await getBill(billId)) as Bill & {
    tests: TTest[];
  } & { patient: Patient };
  console.log(bill);

  return (
    <Container>
      <div className="w-full">
        <div className="pb-4 w-full flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {bill.patient.name}
            </h1>
            <p className="text-sm font-bold text-muted-foreground">
              {bill.patient.phoneNumber} - {bill.patient.gender} -{" "}
              {bill.patient.age}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button>TODO:</Button>
          </div>
        </div>
        <Separator />
      </div>
      <div className="w-full grid grid-cols-10 gap-4  ">
        <div className="col-span-5  space-y-4">
          <TestsList tests={tests} />
          <Insurance />
        </div>
        <div className="col-span-5 h-[30vh] ">
          <SelectedTests bill={bill} />
          <div>{bill.total}</div>
        </div>
      </div>
    </Container>
  );
};

export default BillPage;
