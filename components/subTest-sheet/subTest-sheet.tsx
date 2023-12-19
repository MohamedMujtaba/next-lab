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
import { LabelTab } from "./normals";
import { FunctionTab } from "./function";
import { GroupTab } from "./group";

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
              <TabsTrigger value="Normals" disabled={!subTest}>
                Normals
              </TabsTrigger>
              <TabsTrigger value="Options" disabled={!subTest}>
                Options
              </TabsTrigger>
              <TabsTrigger value="Description" disabled={!subTest}>
                Description
              </TabsTrigger>
              <TabsTrigger value="Function" disabled={!subTest}>
                Function
              </TabsTrigger>
              <TabsTrigger value="Group" disabled={!subTest}>
                Group
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Details" className="">
              <NameNormalPrice />
            </TabsContent>
            <TabsContent value="Normals" className="">
              <LabelTab />
            </TabsContent>
            <TabsContent value="Options" className="flex gap-2">
              <OptionsTab />
            </TabsContent>
            <TabsContent value="Description">
              <Description />
            </TabsContent>
            <TabsContent value="Function">
              <FunctionTab />
            </TabsContent>
            <TabsContent value="Group">
              <GroupTab />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};
