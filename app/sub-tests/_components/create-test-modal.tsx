"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { CreateTestForm } from "./create-test-form";

const CreateTestModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="w-4 h-4 mr-2" />
        Add New Test
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        title="Create a test"
        description="Create a test by providing a name"
      >
        <CreateTestForm />
      </Modal>
    </>
  );
};

export default CreateTestModal;
