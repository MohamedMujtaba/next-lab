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

import "react-quill/dist/quill.bubble.css";
import { PrintHeader } from "./print-header";

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
    <>
      <div ref={ref} className="w-full text-black border-black ">
        <PrintHeader bill={bill} />
        <div className="mx-[10mm]">
          {bill.tests.map((test) => (
            <div key={test.id}>
              <div className="w-full bg-gray-100/50 text-2xl font-semibold px-4">
                {test.name}
              </div>
              {test.subTests.map((subTest) => (
                <>
                  <div className="page-break" />
                  <div key={subTest.id}>
                    {renderSubTest(subTest, bill.patient.gender)}
                  </div>
                </>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
});

ComponentToPrint.displayName = "ComponentToPrint";

const renderSubTest = (subTest: BillSubTest, gender: Gender) => {
  if (subTest.type === "ONERESULT") {
    return (
      <>
        <div className="page-break" />

        <Table className="w-full text-xl table-fixed border-black">
          <TableRow className="border-b-black text-black">
            <TableCell className="">
              <p>{subTest.name}</p>
            </TableCell>
            <TableCell className="text-center">
              {gender === "FEMALE"
                ? parse(subTest.femaleNormal || "")
                : parse(subTest.maleNormal || "")}
            </TableCell>
            <TableCell className="text-center">
              {parse(subTest.result || "")}
            </TableCell>
          </TableRow>
        </Table>
      </>
    );
  }
  if (subTest.type === "OPTIONS") {
    return (
      <>
        <div className="page-break" />

        <Table className="w-full text-xl table-fixed">
          <TableRow className="border-b-black text-black">
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
      <>
        <div className="w-full text-xl break-inside-avoid text-black">
          <div>{subTest.name}</div>
          <Preview value={subTest.description || ""} />
          <Separator className="bg-black" />
        </div>
      </>
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
