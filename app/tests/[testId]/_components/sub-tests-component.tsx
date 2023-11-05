"use client";

import { Loader2, TestTubes } from "lucide-react";
import AddSubTestButton from "./add-sub-test-button";
import SubTestsList from "./sub-tests-list";
import { useEffect } from "react";
import { SubTest, SubTestOption } from "@prisma/client";
import SubTestModal from "./sub-test-modal";
import { useSubTest } from "@/hooks/use-sub-test";
import { useParams } from "next/navigation";

interface SubTestsComponentProps {
  subTests: (SubTest & { options: SubTestOption[] })[];
}

const SubTestsComponent: React.FC<SubTestsComponentProps> = ({ subTests }) => {
  const { setTestId, isLoading } = useSubTest((state) => state);
  const params: { testId: string } = useParams();
  useEffect(() => {
    setTestId(params.testId);
  }, [params.testId, setTestId]);

  return (
    <div className="relative rounded-md">
      <div className="relative p-4 border border-border rounded-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="rounded-full  bg-sky-500/20 w-14 h-14 flex items-center justify-center ">
              <TestTubes className="text-sky-500 w-7 h-7" />
            </div>
            <p className="text-2xl font-bold">Tests: </p>
          </div>
          <AddSubTestButton />
        </div>
        <SubTestsList subTests={subTests} />
        <SubTestModal />
      </div>
      {isLoading && (
        <div className="absolute inset-0 top-0 z-50 bg-sky-500/30 m-0 flex items-center justify-center rounded-md cursor-not-allowed">
          <Loader2 className="text-sky-500 animate-spin w-10 h-10" />
        </div>
      )}
    </div>
  );
};

export default SubTestsComponent;
