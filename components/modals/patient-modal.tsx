"use client";

import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import PatientForm from "../patient-form";
import { usePatient } from "@/hooks/use-patient";

interface PatientModalProps {}

const PatientModal: React.FC<PatientModalProps> = () => {
  const { isOpen, onClose } = usePatient((state) => state);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Add new patient"
        description="Add new patient by providing there info"
      >
        <PatientForm onClose={onClose} />
      </Modal>
    </>
  );
};

export default PatientModal;
