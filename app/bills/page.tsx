import Container from "@/components/container";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prisma";
import React from "react";
import { DataTable } from "./_components/table";
import { BillType, columns } from "./_components/columns";
import { getBills } from "@/actions/bills/get-bills";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Bills = async () => {
  const bills = (await getBills()) as BillType[];
  return (
    <Container>
      <div className="w-full">
        <div className="pb-4 w-full flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bills</h1>
            <p className="text-sm font-bold text-muted-foreground">
              Mange all you&apos;r bills
            </p>
          </div>
          {/* <CreateTestModal /> */}
        </div>
        <Separator />
      </div>
      <DataTable data={bills} columns={columns} />
    </Container>
  );
};

export default Bills;
