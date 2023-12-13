"use client";

import { addAllSubTests } from "@/actions/BillSubTest/addAllSubTests";
import { addBillSubTest } from "@/actions/BillSubTest/addBillSubTest";
import { addBillTest } from "@/actions/BillTest/addBillTest";
import { TestType } from "@/app/tests/_components/columns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { addComma } from "@/lib/addComma";
import { SubTest, SubTestNormal, SubTestOption, Test } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

interface TestsListProps {
  tests: (Test & {
    subTests: (SubTest & {
      options: SubTestOption[];
      normals: SubTestNormal[];
    })[];
  })[];
}

const TestsList: React.FC<TestsListProps> = ({ tests }) => {
  const { billId }: { billId: string } = useParams();
  return (
    <Card className="p-4">
      <ScrollArea className="h-[70vh] pr-8">
        <Accordion type="multiple">
          {tests.map((test) => {
            return (
              <AccordionItem key={test.id} value={test.id}>
                <AccordionTrigger className="relative">
                  <div className="flex items-center gap-4">
                    <Button
                      className="p-0"
                      size="icon"
                      onClick={async () => {
                        const res = await addAllSubTests({
                          billId,
                          testId: test.id,
                          subTests: test.subTests,
                        });
                        if (res?.ok) toast.success(res.message);
                        if (!res?.ok) toast.error(res?.message || "");
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <p>{test.name}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {test.subTests.map((subTest) => (
                    <div
                      key={subTest.id}
                      className="flex items-center justify-between pl-8 pt-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        {/* <Checkbox
                          // checked={subTest.selected}
                          onCheckedChange={() => {
                            switchSubTest(test.id, subTest.id);
                          }}
                        /> */}
                        <Button
                          className="p-0"
                          size="icon"
                          onClick={async () => {
                            const res = await addBillSubTest({
                              billId,
                              testId: test.id,
                              subTest,
                            });
                            if (res.ok) toast.success(res.message);
                            if (!res.ok) toast.error(res.message);
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <p>{subTest.name}</p>
                      </div>
                      <Badge>{addComma(subTest.price || 0)}</Badge>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </ScrollArea>
    </Card>
  );
};

export default TestsList;
