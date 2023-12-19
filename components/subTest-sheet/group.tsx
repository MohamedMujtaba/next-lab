"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  SubTest,
  SubTestNormal,
  SubTestOption,
  TestGroup,
} from "@prisma/client";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { useSubTest } from "@/hooks/use-sub-test";

import { GetSubTest } from "@/actions/subTests/get-subTest";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";
import { deleteOption } from "@/actions/subTests/options/delete-option";
import { updateSubTestFunction } from "@/actions/subTests/update-function";
import { updateSubTestGroup } from "@/actions/subTests/update-group";
import { getGroups } from "@/actions/tests/get-groups";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface GroupTabProps {}

const groupFormSchema = z.object({
  value: z.string().min(1, {
    message: "Value is required",
  }),
});

export const GroupTab: React.FC<GroupTabProps> = () => {
  const { testId, subTest, setSubTest } = useSubTest((state) => state);
  const [g, setG] = useState<TestGroup[] | undefined>([]);
  const router = useRouter();
  const form = useForm<z.infer<typeof groupFormSchema>>({
    resolver: zodResolver(groupFormSchema),
    defaultValues: {
      value: subTest?.group || "",
    },
  });

  async function onSubmit(values: z.infer<typeof groupFormSchema>) {
    try {
      if (!subTest?.id) {
        toast.error("Something went wrong ...");
        return;
      }

      await updateSubTestGroup(subTest.id, values.value);
      form.reset();
      gt();
      router.refresh();
      toast.success("Option has been created");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }

  const gt = async () => {
    let st = (await GetSubTest(subTest?.id || "")) as SubTest & {
      options: SubTestOption[];
      normals: SubTestNormal[];
    };
    setSubTest(st);
  };
  useEffect(() => {
    gt();
    const getG = async () => {
      const res = await getGroups(testId);
      if (res.success) {
        setG(res.data);
      }
    };
    getG();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(subTest);

  return (
    <div className="w-full flex gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1">
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem className="">
                <Select
                  onValueChange={(value) => {
                    form.setValue("value", value);
                    // form.handleSubmit(onSubmit);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="group" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {g?.map((gMap) => (
                      <SelectItem key={gMap.id} value={gMap.name}>
                        {gMap.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end gap-4 mt-4">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Set"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
