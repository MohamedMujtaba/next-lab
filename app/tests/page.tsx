import { Separator } from "@/components/ui/separator";
import CreateTestModal from "./_components/create-test-modal";
import Container from "@/components/container";
import { DataTable } from "./_components/table";
import { TestType, columns } from "./_components/columns";
import { getTests } from "@/actions/tests/get-tests";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const Tests = async () => {
  const data = (await getTests()) as TestType[];
  return (
    <Container>
      <div className="w-full">
        <div className="pb-4 w-full flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tests</h1>
            <p className="text-sm font-bold text-muted-foreground">
              Mange all you&apos;r tests
            </p>
          </div>
          <CreateTestModal />
        </div>
        <Separator />
      </div>
      <DataTable columns={columns} data={data} />
    </Container>
  );
};

export default Tests;
