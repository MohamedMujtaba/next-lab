"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useSubTest } from "@/hooks/use-sub-test";

export const SubTestSheetButton = () => {
  const { onOpen } = useSubTest((state) => state);

  return (
    <Button onClick={onOpen}>
      <Plus className="w-4 h-4 mr-2" />
      Add SubTest
    </Button>
  );
};
