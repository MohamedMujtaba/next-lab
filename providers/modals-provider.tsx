"use client";

import { CreateDoctorModal } from "@/components/modals/create-doctor-modal";
import CreateTestModal from "@/components/modals/create-test-modal";
import CreateUserModal from "@/components/modals/patient-modal";
import EditTestModal from "@/components/modals/edit-test-modal";
import EditUserModal from "@/components/modals/edit-user-modal";
import { useEffect, useState } from "react";
import PatientModal from "@/components/modals/patient-modal";
import { SubTestSheet } from "@/components/subTest-sheet/subTest-sheet";
const ModalsProvider = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) null;
  return (
    <>
      <CreateDoctorModal />
      <CreateTestModal />
      <EditTestModal />
      <PatientModal />
      <SubTestSheet />
    </>
  );
};

export default ModalsProvider;
