"use client";

import { Button } from "@/components/ui/button";
import { usePatient } from "@/hooks/use-patient";
import { Plus } from "lucide-react";

export const AddPatientButton = () => {
  const { onOpen } = usePatient((state) => state);
  return (
    <Button onClick={() => onOpen()}>
      <Plus className="w-4 h-4 mr-2" />
      Add New Patient
    </Button>
  );
};
