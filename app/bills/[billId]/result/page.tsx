import { getBill } from "@/actions/bills/get-bill";
import Container from "@/components/container";
import Test from "./_components/test";
import { Separator } from "@/components/ui/separator";
import { PrintResult } from "@/components/print-result";
import { BillType } from "../../_components/columns";
import {
  Bill,
  BillSubTest,
  BillTest,
  Patient,
  SubTestOption,
} from "@prisma/client";
import { Button } from "@/components/ui/button";
import { markAsReady } from "@/actions/bills/mark-as-ready";
import { toast } from "react-hot-toast";
import ReadyButton from "./_components/ready-button";

type SubTest = BillSubTest & { options: SubTestOption[] };
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
              {bill.patient.name}
            </h1>
            <p className="text-sm font-bold text-muted-foreground">
              {bill.patient.phoneNumber} - {bill.patient.gender}
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
