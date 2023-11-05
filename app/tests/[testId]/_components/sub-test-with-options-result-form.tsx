"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useSubTest } from "@/hooks/use-sub-test";

import { NameNormalPrice } from "./sub-test-with-options/name-normal-price";
import { OptionsTab } from "./sub-test-with-options/options";

const SubTestWithOptionsResult = () => {
  const [disabled, setDisabled] = useState(false);
  const [tab, setTab] = useState("tab1");
  const { subTest } = useSubTest((state) => state);

  const onTabChange = (value: string) => {
    setTab(value);
  };
  return (
    <div>
      <Tabs className="" value={tab} onValueChange={onTabChange}>
        <TabsList>
          <TabsTrigger value="tab1" disabled={disabled}>
            Details
          </TabsTrigger>
          <TabsTrigger value="tab2" disabled={!subTest || disabled}>
            Options
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <NameNormalPrice
            setTab={setTab}
            disabled={disabled}
            setDisabled={setDisabled}
          />
        </TabsContent>
        <TabsContent value="tab2">
          <OptionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubTestWithOptionsResult;
