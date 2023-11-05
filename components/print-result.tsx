"use client";

import parse from "html-react-parser";
import { Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";

import { BillType } from "@/app/bills/_components/columns";
import { Button } from "@/components/ui/button";
import { BillSubTest, Gender } from "@prisma/client";
import { Ref, forwardRef, useRef } from "react";
import { Table, TableRow, TableCell } from "./ui/table";
import { Preview } from "./editor/preview";
import { Separator } from "./ui/separator";

interface PrintResultProps {
  // ref: React.Ref<HTMLDivElement> | null;
  bill: BillType;
}

export const PrintResult: React.FC<PrintResultProps> = ({ bill }) => {
  const ref = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
  return (
    <>
      <Button onClick={handlePrint} variant="outline">
        <Printer className="w-4 h-4 mr-2" />
        Print
      </Button>
      <div className="hidden">
        <ComponentToPrint ref={ref} bill={bill} />
      </div>
    </>
  );
};

interface ComponentToPrintProps {
  bill: BillType;
}

export const ComponentToPrint = forwardRef<
  HTMLDivElement,
  ComponentToPrintProps
>(({ bill }, ref: Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} className="mt-16 w-full ">
      <div className="">
        {bill.tests.map((test) => (
          <div key={test.id}>
            {test.subTests.map((subTest) => (
              <div key={subTest.id}>
                {renderSubTest(subTest, bill.patient.gender)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

ComponentToPrint.displayName = "ComponentToPrint";

const renderSubTest = (subTest: BillSubTest, gender: Gender) => {
  if (subTest.type === "ONERESULT") {
    return (
      <>
        <Table className="w-full text-xl table-fixed">
          <TableRow>
            <TableCell className="">
              <p>{subTest.name}</p>
            </TableCell>
            <TableCell className="text-center">
              {gender === "FEMALE"
                ? parse(subTest.femaleNormal || "")
                : parse(subTest.maleNormal || "")}
            </TableCell>
            <TableCell className="text-center">{subTest.result}</TableCell>
          </TableRow>
        </Table>
      </>
    );
  }
  if (subTest.type === "OPTIONS") {
    return (
      <>
        <Table className="w-full text-xl table-fixed">
          <TableRow>
            <TableCell className="">
              <p>{subTest.name}</p>
            </TableCell>
            <TableCell className="text-center">
              {gender === "FEMALE"
                ? parse(subTest.femaleNormal || "")
                : parse(subTest.maleNormal || "")}
            </TableCell>
            <TableCell className="text-center">
              {subTest.selectedOption}
            </TableCell>
          </TableRow>
        </Table>
      </>
    );
  }
  if (subTest.type === "DESCRIPTION") {
    return (
      <div className="w-full text-xl">
        <div>{subTest.name}</div>
        <Preview value={subTest.description || ""} />
        <Separator />
      </div>
    );
  }
};

const OneRes = () => {
  return (
    <Table>
      <TableRow>
        <TableCell></TableCell>
      </TableRow>
    </Table>
  );
};
