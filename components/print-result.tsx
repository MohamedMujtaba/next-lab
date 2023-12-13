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
import { TipTapMainPreview } from "./tipTap-editor/preview";
import { TiptapPreview } from "./TipTap-preview";

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
      <div className="not-prose hidden">
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
      <div ref={ref} className="w-full text-black border-black prose-sm">
        <PrintHeader bill={bill} />
        <div className="mx-[10mm]">
          <div className="w-full flex items-center justify-between not-prose ">
            <p className="flex-1 font-bold">Test Name</p>
            <p className="flex-1 text-center flex items-center justify-center not-prose font-bold">
              Test result
            </p>
            <p className="flex-1 flex items-center text-center  justify-center not-prose font-bold">
              Test Normal
            </p>
            <p className="flex-1 justify-end text-end not-prose font-bold">
              Test Unit
            </p>
          </div>
          {bill.tests.map((test) => (
            <div key={test.id} className=" break-inside-avoid">
              <div className="print:mt-4 block w-full" />
              <div className="w-full bg-black/70 text-2xl font-semibold px-4 not-prose">
                {test.name}
              </div>
              {test.subTests.map((subTest) => (
                <div className="w-full text-sm" key={subTest.id}>
                  {/* <div className="page-break" /> */}
                  <div key={subTest.id} className="not-prose">
                    {renderSubTest(subTest, bill.patient.gender)}
                  </div>
                </div>
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
  return (
    <>
      {/* <div className="page-break" /> */}
      <div className="w-full flex items-center justify-between not-prose">
        <p className="text-base font-semibold flex-1">{subTest.name}</p>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-base font-semibold not-prose">
            {parse(subTest.result || "")}
          </p>
        </div>
        <div className="flex-1 text-base font-semibold  flex items-center justify-center not-prose">
          {parse(subTest.selectedNormal || "")}
        </div>
        <p className="flex-1 flex justify-end not-prose">
          {subTest.unit || ""}
        </p>
      </div>
      {subTest.description && (
        <div className="w-full flex items-center justify-between not-prose">
          <TipTapMainPreview content={subTest.description || ""} />
        </div>
      )}
      <Separator className="bg-black" />
    </>
  );
};
// const renderSubTest = (subTest: BillSubTest, gender: Gender) => {
//   if (subTest.type === "ONERESULT") {
//     return (
//       <>
//         <div className="page-break" />

//         <Table className="w-full not-prose table-fixed border-black">
//           <TableRow className="border-b-black text-black prose">
//             <TableCell className="p-1">
//               <p>{subTest.name}</p>
//             </TableCell>
//             <TableCell className="text-center p-1">
//               {gender === "FEMALE"
//                 ? parse(subTest.femaleNormal || "")
//                 : parse(subTest.maleNormal || "")}
//             </TableCell>
//             <TableCell className="text-center p-1">
//               {parse(subTest.result || "")}
//             </TableCell>
//           </TableRow>
//         </Table>
//       </>
//     );
//   }
//   if (subTest.type === "OPTIONS") {
//     return (
//       <>
//         <div className="page-break" />

//         <Table className="w-full text-xl table-fixed not-prose">
//           <TableRow className="border-b-black text-black">
//             <TableCell className="p-1">
//               <p>{subTest.name}</p>
//             </TableCell>
//             <TableCell className="text-center p-1">
//               {gender === "FEMALE"
//                 ? parse(subTest.femaleNormal || "")
//                 : parse(subTest.maleNormal || "")}
//             </TableCell>
//             <TableCell className="text-center p-1">
//               {subTest.selectedOption}
//             </TableCell>
//           </TableRow>
//         </Table>
//       </>
//     );
//   }
//   if (subTest.type === "DESCRIPTION") {
//     return (
//       <>
//         <div className="w-full text-xl break-inside-avoid text-black">
//           <div>{subTest.name}</div>
//           <TipTapMainPreview content={subTest.description || ""} />
//           <Separator className="bg-black" />
//         </div>
//       </>
//     );
//   }
// };

const OneRes = () => {
  return (
    <Table>
      <TableRow>
        <TableCell></TableCell>
      </TableRow>
    </Table>
  );
};
