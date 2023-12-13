"use client";

import {
  Bill,
  BillSubTest,
  BillTest,
  Patient,
  SubTest,
  Test,
} from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { createBill } from "@/actions/bills/createBill";
import toast from "react-hot-toast";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { addComma } from "@/lib/addComma";

export type BillType = Bill & {
  tests: (BillTest & { subTests: BillSubTest[] })[];
} & { patient: Patient };

export const columns: ColumnDef<BillType>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    header: "Patient Name",
    id: "PatientName",
    cell: ({ row }) => {
      const bill: BillType = row.original;
      return <p>{bill.patient.name}</p>;
    },
  },
  {
    header: "Patient Phone",
    accessorKey: "phoneNumber",
    accessorFn: (row) => row.patient.phoneNumber,
    cell: ({ row }) => {
      const bill: BillType = row.original;
      return <p>{bill.patient.phoneNumber}</p>;
    },
  },
  {
    header: "Patient Phone",

    cell: ({ row }) => {
      const bill: BillType = row.original;
      return (
        <HoverCard>
          <HoverCardTrigger>
            <p className="flex gap-1 items-center">
              <QuestionMarkCircledIcon />
              <p>Tests: {bill.tests.length}</p>{" "}
            </p>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex items-center justify-between py-2">
              <p>Name</p>
              <p>Price</p>
            </div>
            {bill.tests.map((test) => (
              <div
                key={test.id}
                className="flex flex-col  justify-between py-2"
              >
                <p>{test.name}</p>
                {test.subTests.map((subTest) => (
                  <div
                    key={subTest.id}
                    className="flex items-center justify-between py-2 pl-4"
                  >
                    <p>{subTest.name}</p>
                    <Badge>{subTest.price}</Badge>
                  </div>
                ))}
                <Separator />
              </div>
            ))}
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const bill: BillType = row.original;
      return <p>{addComma(bill.total || 0)}</p>;
    },
  },
  {
    header: "Created At",
    cell: ({ row }) => {
      const bill: BillType = row.original;
      return <p>{format(bill.createdAt, "dd/MM/yyyy")}</p>;
    },
  },
  // {
  //   header: "Status",
  //   accessorKey: "status",
  //   accessorFn: (row) => row.patient.phoneNumber,
  //   cell: ({ row }) => {
  //     const bill: BillType = row.original;
  //     return <>{bill.status}</>;
  //     // if (bill.status === "CANCELLED")
  //     //   <Badge variant="destructive">CANCELLED</Badge>;
  //     // if (bill.status === "PENDING")
  //     //   <Badge className="bg-yellow-500/50">PENDING</Badge>;
  //     // if (bill.status === "READY")
  //     //   <Badge className="bg-green-500/50">READY</Badge>;
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const bill = row.original;
      return (
        <div className="flex items-center  gap-4">
          <>
            {bill.status == "PENDING" ? (
              // <Badge className="bg-yellow-500/70 text-yellow-700">
              //   PENDING
              // </Badge>
              <div className="w-4 h-4 rounded-full bg-yellow-500" />
            ) : bill.status == "READY" ? (
              // <Badge className="bg-green-500/70 text-green-700">READY</Badge>
              <div className="w-4 h-4 rounded-full bg-green-500" />
            ) : (
              // <Badge className="bg-red-500/70 text-red-700">CANCELLED</Badge>
              <div className="w-4 h-4 rounded-full bg-red-500" />
            )}
          </>
          <B bill={bill} />
        </div>
      );
    },
  },
];

const B = ({ bill }: { bill: BillType }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(bill.id)}
        >
          Copy bill ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {bill.tests.length > 0 ? (
          <DropdownMenuItem
            onClick={async () => {
              router.push(`/bills/${bill.id}/result`);
            }}
          >
            Result
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem disabled>Result</DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            router.push(`/bills/${bill.id}`);
          }}
        >
          Edit Bill
        </DropdownMenuItem>
        <DropdownMenuItem>Delete bill</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
