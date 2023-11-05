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
import { SubTestType } from "@prisma/client";
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
  const { onOpen, setType } = useSubTest((state) => state);

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
            setType("ONERESULT");
            onOpen();
          }}
        >
          <Circle className="w-4 h-4 mr-2" />
          Direct Result
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setType("DESCRIPTION");
            onOpen();
          }}
        >
          <AlignLeft className="w-4 h-4 mr-2" />
          {/* <File className="w-4 h-4 mr-2" /> */}
          Description
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setType("OPTIONS");
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
