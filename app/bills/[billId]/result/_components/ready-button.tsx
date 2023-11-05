"use client";

import { markAsReady } from "@/actions/bills/mark-as-ready";
import { BillType } from "@/app/bills/_components/columns";
import { Button } from "@/components/ui/button";
import React from "react";
import toast from "react-hot-toast";

interface ReadyButtonProps {
  bill: BillType;
}

const ReadyButton: React.FC<ReadyButtonProps> = ({ bill }) => {
  const mar = async () => {
    try {
      const res = await markAsReady(bill.id);
      if (res?.success) {
        toast.success(res.message);
      }
      if (res?.success === false) {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return <Button onClick={mar}>Mark as ready </Button>;
};

export default ReadyButton;
