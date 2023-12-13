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
    <div className="w-full px-[10mm]  text-black border-black">
      <div
        className={cn(
          "w-full h-44 flex items-center justify-between border border-black rounded-md px-4",
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
          <h4> 0915599405</h4>
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
      <Card className="flex flex-col w-full  p-2 border-black ">
        <p className="not-prose flex ">
          <b className="not-prose">Name:</b> {bill.patient.name}
        </p>
        <div className="flex justify-between w-full">
          <p className="not-prose">
            <b className="not-prose">Number:</b> {bill.patient.phoneNumber}
          </p>
          <p className="not-prose">
            <b className="not-prose">Gender:</b> {bill.patient.gender}
          </p>
          <p className="not-prose">
            <b className="not-prose">age</b>: {bill.patient.age}
          </p>
        </div>
      </Card>
    </div>
  );
};
