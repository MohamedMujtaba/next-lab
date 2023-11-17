"use client";

import localFont from "next/font/local";
import Image from "next/image";
import QRCode from "react-qr-code";

import { cn } from "@/lib/utils";
import { Patient } from "@prisma/client";
import { Card } from "./ui/card";
import { BillType } from "@/app/bills/_components/columns";

const myFont = localFont({ src: "./Kufam-VariableFont_wght.ttf" });

interface PrintHeaderProps {
  bill: BillType;
}

export const PrintHeader: React.FC<PrintHeaderProps> = ({ bill }) => {
  return (
    <div className="w-full px-[10mm] mb-4 text-black border-black">
      <div
        className={cn(
          "w-full h-44 flex items-center justify-between  ",
          myFont.className
        )}
      >
        <div className="relative w-44 h-44">
          <Image
            fill={true}
            src="/logo.png"
            alt="logo"
            style={{
              objectFit: "contain", // cover, contain, none
            }}
          />
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold"> مختبر الرهام الطبي الحديث</h2>
          <h4> خلف مجمع طارق الطبي وجوار</h4>
          <h4> مركز الصدى للسمع </h4>
          <h4> 0912345678</h4>
        </div>
        <div className="w-44 h-44 flex items-center justify-end">
          <QRCode
            // size={256}

            className="h-28 w-28"
            value={bill.id}
            // viewBox={`0 0 256 256`}
          />
        </div>
      </div>
      <Card className="flex w-full items-center justify-between p-2 ">
        <p>
          <b>Name:</b> {bill.patient.name}
        </p>
        <p>
          <b>Number:</b> {bill.patient.phoneNumber}
        </p>
        <p>
          <b>Gender:</b> {bill.patient.gender}
        </p>
        <p>
          <b>age</b>: {69}
        </p>
      </Card>
    </div>
  );
};
