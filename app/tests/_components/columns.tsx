"use client";

import { SubTest, Test } from "@prisma/client";
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

export type TestType = Test & { subTests: SubTest[] };
export const columns: ColumnDef<TestType>[] = [
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
    accessorKey: "subTests",
    header: "SubTests",
    cell: ({ row }) => {
      const test = row.original;
      return (
        <HoverCard>
          <HoverCardTrigger>
            <p className="flex gap-1 items-center">
              <QuestionMarkCircledIcon />
              <p>subTests: {test.subTests.length}</p>{" "}
            </p>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex items-center justify-between py-2">
              <p>Name</p>
              <p>Price</p>
            </div>
            {test.subTests.map((subTest: SubTest) => (
              <div
                key={subTest.id}
                className="flex items-center justify-between py-2"
              >
                <p>{subTest.name}</p>
                <Badge>{subTest.price}</Badge>
              </div>
            ))}
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const test = row.original;
      return <B test={test} />;
    },
  },
];

const B = ({ test }: { test: TestType }) => {
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
          onClick={() => navigator.clipboard.writeText(test.id)}
        >
          Copy test ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            router.push(`/tests/${test.id}`);
          }}
        >
          View Test
        </DropdownMenuItem>
        <DropdownMenuItem>Delete test</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
