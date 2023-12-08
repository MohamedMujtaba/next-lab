"use client";

import { BillSubTest, BillTest, SubTestOption } from "@prisma/client";
import { OneResult } from "./one-res";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Grip, GripHorizontal } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { InputWithOptions } from "@/components/input-with-options";

type SubTest = BillSubTest & { options: SubTestOption[] };
type Test = BillTest & { subTests: SubTest[] };

interface TestProps {
  test: Test;
}

const Test: React.FC<TestProps> = ({ test }) => {
  const [open, setOpen] = useState(true);

  return (
    <Collapsible
      className="flex flex-col gap-3"
      open={open}
      onOpenChange={setOpen}
      defaultOpen
    >
      <CollapsibleTrigger className="flex items-center justify-between gap-2">
        <div className="flex gap-4 items-center justify-center">
          <div className={cn(buttonVariants({ size: "icon" }), "cursor-grab")}>
            <GripHorizontal className="w-6 h-6" />
          </div>
          <p className="text-xl font-semibold">{test.name}</p>
        </div>
        <div className="">
          <ChevronDown />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4">
        {test.subTests.map((subTest) => {
          return <OneResult subTest={subTest} key={subTest.id} />;
          // if (subTest.type === "DESCRIPTION")
          //   return <WithDes subTest={subTest} />;
          // if (subTest.type === "OPTIONS")
          //   return <WithOptions subTest={subTest} />;
          // return <InputWithOptions key={subTest.id} />;
        })}
      </CollapsibleContent>
      <Separator />
    </Collapsible>
  );
};

export default Test;
