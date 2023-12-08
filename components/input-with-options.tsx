"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";

export const InputWithOptions = () => {
  const [value, setValue] = React.useState("");
  return (
    <div className="flex gap-2 relative ">
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <div className="absolute right-0">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              // role="combobox"
              // aria-expanded={open}
            >
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="end">
            <Command>
              <CommandInput placeholder="Search..." />
              <CommandEmpty>No result found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value={"test1"}
                  onSelect={(currentValue) => {
                    // setValue(currentValue === value ? "" : currentValue);
                    setValue((v) => `${v} ${currentValue}`);
                  }}
                >
                  test1
                </CommandItem>
                <CommandItem
                  value={"test2"}
                  onSelect={(currentValue) => {
                    // setValue(currentValue === value ? "" : currentValue);
                    setValue((v) => `${v} ${currentValue}`);
                  }}
                >
                  test2
                </CommandItem>
                <CommandItem
                  value={"test3"}
                  onSelect={(currentValue) => {
                    // setValue(currentValue === value ? "" : currentValue);
                    setValue((v) => `${v} ${currentValue}`);
                  }}
                >
                  test3
                </CommandItem>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
