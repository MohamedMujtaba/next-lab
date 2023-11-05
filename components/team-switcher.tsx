"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Dialog } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDoctorStore } from "@/hooks/use-doctor-store";
import { cn } from "@/lib/utils";
import { Doctor } from "@prisma/client";
import { PlusCircle } from "lucide-react";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {
  doctors: Doctor[];
}

export default function TeamSwitcher({
  className,
  doctors,
}: TeamSwitcherProps) {
  const {
    doctor: selectedDoctor,
    setDoctor,
    onOpen,
    isOpen,
  } = useDoctorStore((state) => state);
  const [open, setOpen] = React.useState(false);

  return (
    // <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className={cn("w-[200px] justify-between", className)}
        >
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage
              src={`https://avatar.vercel.sh/${selectedDoctor.name}.png`}
              alt={selectedDoctor.name}
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          {selectedDoctor.name}
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              {doctors.map((doctor) => {
                return (
                  <CommandItem
                    key={doctor.id}
                    onSelect={() => {
                      setDoctor(doctor);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    {doctor.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedDoctor.id === doctor.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandList>
          </CommandGroup>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                className="cursor-pointer"
                onSelect={() => {
                  onOpen();
                }}
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Add New Doctor
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    // </Dialog>
  );
}
