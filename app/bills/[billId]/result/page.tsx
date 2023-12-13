import { getBill } from "@/actions/bills/get-bill";
import Container from "@/components/container";
import { PrintResult } from "@/components/print-result";
import { Separator } from "@/components/ui/separator";
import {
  Bill,
  BillSubTest,
  BillTest,
  Patient,
  SubTestNormal,
  SubTestOption,
} from "@prisma/client";
import ReadyButton from "./_components/ready-button";
import Test from "./_components/test";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

type SubTest = BillSubTest & {
  options: SubTestOption[];
  normals: SubTestNormal[];
};
type TTest = BillTest & { subTests: SubTest[] };

const ResultPage = async ({ params }: { params: { billId: string } }) => {
  const billId = params.billId;
  const bill = (await getBill(billId)) as Bill & {
    tests: TTest[];
  } & { patient: Patient };

  return (
    <Container>
      <div className="w-full">
        <div className="pb-4 w-full flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {bill.patient?.name}
            </h1>
            <p className="text-sm font-bold text-muted-foreground">
              {bill.patient?.phoneNumber} - {bill.patient?.gender}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {bill.status === "PENDING" ? (
              <ReadyButton bill={bill} />
            ) : bill.status === "READY" ? (
              <PrintResult bill={bill} />
            ) : (
              <>TODO</>
            )}
          </div>
        </div>
        <Separator />
      </div>
      {bill?.tests.map((test) => (
        <Test key={test.id} test={test} />
      ))}
    </Container>
  );
};

export default ResultPage;
