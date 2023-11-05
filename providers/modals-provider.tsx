"use client";

import { CreateDoctorModal } from "@/components/modals/create-doctor-modal";
import CreateTestModal from "@/components/modals/create-test-modal";
import CreateUserModal from "@/components/modals/patient-modal";
import EditTestModal from "@/components/modals/edit-test-modal";
import EditUserModal from "@/components/modals/edit-user-modal";
import { useEffect, useState } from "react";
import PatientModal from "@/components/modals/patient-modal";
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
    </>
  );
};

export default ModalsProvider;
