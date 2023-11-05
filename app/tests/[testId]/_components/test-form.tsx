"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Test } from "@prisma/client";
import { Plus, Trash } from "lucide-react";

interface TestFormProps {
  test: Test | null;
}

const TestForm: React.FC<TestFormProps> = ({ test }) => {
  const title = test ? "Edit the test" : "Create new test";
  const description = test ? "Edit the test" : "Create new test";
  const action = test ? "Save" : "Create";

  return (
    <div className="w-full flex flex-col space-y-4 ">
      <div className="w-full">
        <div className="pb-4 w-full flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-sm font-bold text-muted-foreground">
              {description}
            </p>
          </div>
          <Button variant="destructive" size="icon" onClick={() => {}}>
            <Trash className="w-4 h-4" />
          </Button>
        </div>
        <Separator />
      </div>
      <div className="w-[200px]">
        <Label>Test Name</Label>
        <Input />
      </div>
      <div />
    </div>
  );
};

export default TestForm;
