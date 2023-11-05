"use client";

import Modal from "@/components/modal";
import { SubTestType } from "@prisma/client";
import SubTestWithOneResult from "./sub-test-with-one-result-form";
import SubTestWithDescriptionResult from "./sub-test-with-description-result-form";
import SubTestWithOptionsResult from "./sub-test-with-options-result-form";
import { useSubTest } from "@/hooks/use-sub-test";

interface SubTestModalProps {}

const SubTestModal: React.FC<SubTestModalProps> = ({}) => {
  const {
    type: subTestType,
    isOpen,
    onClose,
    subTest,
  } = useSubTest((state) => state);

  let st = subTest?.type || subTestType || "ONERESULT";
  const Title = subTest ? "Edit subTest..." : "Create new subTest";
  const Description = subTest ? "Edit subTest..." : "Create new subTest";
  const showForm = () => {
    switch (st) {
      case "ONERESULT":
        return <SubTestWithOneResult />;
      case "DESCRIPTION":
        return <SubTestWithDescriptionResult />;
      case "OPTIONS":
        return <SubTestWithOptionsResult />;

      default:
        return <SubTestWithOneResult />;
    }
  };

  return (
    <Modal
      title={Title}
      description={Description}
      isOpen={isOpen}
      onClose={onClose}
      contentClassName={st === "DESCRIPTION" ? "max-w-full" : ""}
    >
      {showForm()}
    </Modal>
  );
};

export default SubTestModal;
