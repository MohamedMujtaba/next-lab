"use client";

import { Patient, SubTest, Test } from "@prisma/client";
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
import { usePatient } from "@/hooks/use-patient";

export type PatientType = Patient;
export const columns: ColumnDef<PatientType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const patient = row.original;
      return <B patient={patient} />;
    },
  },
];

const B = ({ patient }: { patient: PatientType }) => {
  const router = useRouter();
  const { onOpen, setPatient } = usePatient((state) => state);
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
          onClick={() => navigator.clipboard.writeText(patient.id)}
        >
          Copy test ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            const res = await createBill(patient.id);
            if (res.ok) {
              router.push(`/bills/${res.data?.id}`);
            }
            if (!res.ok) {
              toast.error("Something went wrong");
            }
          }}
        >
          Create new bill
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setPatient(patient);
            onOpen();
          }}
        >
          Edit patient
        </DropdownMenuItem>
        <DropdownMenuItem>Delete patient</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
