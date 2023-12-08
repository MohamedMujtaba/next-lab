import { Separator } from "@/components/ui/separator";
// import CreateTestModal from "./_components/create-test-modal";
import Container from "@/components/container";
import { DataTable } from "./_components/table";
import { SubTestType, columns } from "./_components/columns";
import { getSubTests } from "@/actions/subTests/get-subTests";
import { SubTest } from "@prisma/client";
import { SubTestSheet } from "@/components/subTest-sheet/subTest-sheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SubTestSheetButton } from "@/components/sub-test-sheet-button";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const SubTests = async () => {
  const data = (await getSubTests()) as SubTestType[];

  return (
    <Container>
      <div className="w-full">
        <div className="pb-4 w-full flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sub Tests</h1>
            <p className="text-sm font-bold text-muted-foreground">
              Mange all you&apos;r tests
            </p>
          </div>
          <SubTestSheetButton />
        </div>
        <Separator />
      </div>
      <DataTable columns={columns} data={data} />
    </Container>
  );
};

export default SubTests;
