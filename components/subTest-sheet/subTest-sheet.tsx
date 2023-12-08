"use client";

import { Check, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Combobox } from "../ui/combobox";
import { InputWithOptions } from "../input-with-options";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { TipTapEditor } from "../tipTap-editor/editor";
import { useSubTest } from "@/hooks/use-sub-test";
import { OptionsTab } from "./options";
import { NameNormalPrice } from "./name-normal-price";
import Description from "./description";

export const SubTestSheet = () => {
  const { subTest, isOpen, onClose, onOpen } = useSubTest((state) => state);
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Sheet open={isOpen} onOpenChange={onChange}>
      <SheetContent side="left" className="w-4/5 sm:max-w-none overflow-y-auto">
        <SheetHeader>
          <SheetTitle>SubTest</SheetTitle>
        </SheetHeader>

        <div className="mt-4 flex flex-col items-center justify-center">
          {/* <Input /> */}
          {/* <InputWithOptions /> */}

          <Tabs defaultValue="Details" className="mt-4 w-full px-4">
            <TabsList>
              <TabsTrigger value="Details">Details</TabsTrigger>
              <TabsTrigger value="Options" disabled={!subTest}>
                Options
              </TabsTrigger>
              <TabsTrigger value="Description" disabled={!subTest}>
                Description
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Details" className="">
              <NameNormalPrice />
            </TabsContent>
            <TabsContent value="Options" className="flex gap-2">
              <OptionsTab />
            </TabsContent>
            <TabsContent value="Description">
              <Description />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};
