"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2, Trash, X } from "lucide-react";
import { useEffect } from "react";
import { SubTest, SubTestNormal, SubTestOption } from "@prisma/client";
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

interface FunctionTabProps {}

const optionsFormSchema = z.object({
  value: z.string().min(1, {
    message: "Value is required",
  }),
});

export const FunctionTab: React.FC<FunctionTabProps> = () => {
  const { testId, subTest, setSubTest } = useSubTest((state) => state);
  const router = useRouter();
  const form = useForm<z.infer<typeof optionsFormSchema>>({
    resolver: zodResolver(optionsFormSchema),
    defaultValues: {
      value: subTest?.function || "",
    },
  });

  async function onSubmit(values: z.infer<typeof optionsFormSchema>) {
    try {
      if (!subTest?.id) {
        toast.error("Something went wrong ...");
        return;
      }

      await updateSubTestFunction(subTest.id, values.value);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1">
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Function</FormLabel>
                <FormControl>
                  <Input
                    placeholder="*6.7"
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormDescription>Option Value</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end gap-4">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Add"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <ScrollArea className="flex-1 h-[250px] py-4 overflow-y-auto">
        {subTest?.options.map((option, index) => (
          <div
            key={option.id}
            className={cn(
              "flex items-center justify-between w-full px-4 py-1 gap-2",
              index % 2 === 0 ? "bg-gray-200" : "bg-gray-400"
            )}
          >
            <p className="text-xs">{option.value}</p>
            <Trash
              onClick={async () => {
                deleteOption(option.id);
                gt();
              }}
              className="mr-1 w-4 h-4 shrink-0 text-destructive cursor-pointer"
            />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};
