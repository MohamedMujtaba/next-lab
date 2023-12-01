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
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { addComma } from "@/lib/addComma";

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
            {bill.tests.length > 0 ? (
              <Link
                href={`/bills/${billId}/result`}
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                  "border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2"
                )}
              >
                Result
              </Link>
            ) : null}
            {/* <Button
              variant="outline"
              className={cn(buttonVariants({ size: "icon" }))}
              onClick={() => router.push(`bills/${billId}/result`)}
            >
              Result
            </Button> */}
          </div>
        </div>
        <Separator />
      </div>
      <div className="w-full grid grid-cols-10 gap-4  ">
        <div className="col-span-5  space-y-4">
          <TestsList tests={tests} />
          {/* <Insurance /> */}
        </div>
        <div className="col-span-5 h-[30vh] ">
          <SelectedTests bill={bill} />
          <div className=" mt-4 flex flex-col">
            <Separator />
            <div className="flex items-center justify-between text-xl p-2">
              <p>Total:</p>
              <p>{addComma(bill.total || 0)}</p>
            </div>
            <Separator className="mb-1" />
            <Separator />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BillPage;
