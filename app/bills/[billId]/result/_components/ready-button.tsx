"use client";

import { markAsReady } from "@/actions/bills/mark-as-ready";
import { BillType } from "@/app/bills/_components/columns";
import { Button } from "@/components/ui/button";
import React from "react";
import toast from "react-hot-toast";
import { ResultBill } from "../page";

interface ReadyButtonProps {
  bill: ResultBill;
}

const ReadyButton: React.FC<ReadyButtonProps> = ({ bill }) => {
  const mar = async () => {
    try {
      const res = await markAsReady(bill.id);
      if (res?.success) {
        toast.success(res.message);
      }
      if (res?.success === false) {
        res.data?.map((m) => {
          toast.error(`Test ${m.name} is not ready`);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return <Button onClick={mar}>Mark as ready </Button>;
};

export default ReadyButton;
