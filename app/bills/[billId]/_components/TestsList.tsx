"use client";

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
import { useBill } from "@/hooks/use-bill";
import { addComma } from "@/lib/addComma";
import { SubTest, SubTestOption, Test } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

interface TestsListProps {
  tests: (Test & { subTests: (SubTest & { options: SubTestOption[] })[] })[];
}

const TestsList: React.FC<TestsListProps> = ({ tests }) => {
  const { billId }: { billId: string } = useParams();
  const { addTest, tests: bTests, switchSubTest } = useBill();
  return (
    <Card className="p-4">
      <ScrollArea className="h-[70vh] pr-8">
        <Accordion type="single">
          {tests.map((test) => {
            return (
              <AccordionItem key={test.id} value={test.id}>
                <AccordionTrigger className="relative">
                  <p>{test.name}</p>
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
