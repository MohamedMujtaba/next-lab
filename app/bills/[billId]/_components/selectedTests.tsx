"use client";

import { removeBillSubTest } from "@/actions/BillSubTest/removeBillSubTest";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { addComma } from "@/lib/addComma";
import { Bill, BillSubTest, BillTest } from "@prisma/client";
import { Trash, X } from "lucide-react";
import React from "react";

interface SelectedTestsProps {
  bill: (Bill & { tests: (BillTest & { subTests: BillSubTest[] })[] }) | null;
}

const SelectedTests: React.FC<SelectedTestsProps> = ({ bill }) => {
  return (
    <Card>
      <ScrollArea className="w-full h-[50vh] p-4 ">
        {bill?.tests.map((test) => (
          <Card key={test.id} className="p-4 mb-3">
            <h2 className="text-xl font-semibold">{test.name}</h2>
            <ul className="list-disc p-2">
              {test.subTests.map((t) => (
                <i key={t.id} className="flex pl-8 justify-center flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center py-1">
                      <Trash
                        onClick={async () => {
                          removeBillSubTest(t.id, test.id, bill?.id);
                        }}
                        className="w-4 h-4 mr-4 text-destructive cursor-pointer"
                      />
                      {t.name}
                    </div>
                    <Badge>{addComma(t.price || 0)}</Badge>
                  </div>
                  <Separator />
                </i>
              ))}
            </ul>
            {/* <Separator /> */}
          </Card>
        ))}
      </ScrollArea>
    </Card>
  );
};

export default SelectedTests;
