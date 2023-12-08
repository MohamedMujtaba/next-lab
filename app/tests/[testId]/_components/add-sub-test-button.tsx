"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSubTest } from "@/hooks/use-sub-test";
import {
  AlignLeft,
  Circle,
  File,
  Option,
  OptionIcon,
  PlusCircle,
  Split,
} from "lucide-react";

interface AddSubTestButtonProps {}

const AddSubTestButton: React.FC<AddSubTestButtonProps> = ({}) => {
  const { onOpen } = useSubTest((state) => state);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Test
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Select test type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            onOpen();
          }}
        >
          <Circle className="w-4 h-4 mr-2" />
          Direct Result
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            onOpen();
          }}
        >
          <AlignLeft className="w-4 h-4 mr-2" />
          {/* <File className="w-4 h-4 mr-2" /> */}
          Description
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            onOpen();
          }}
        >
          <Split className="w-4 h-4 mr-2" />
          Options
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddSubTestButton;
