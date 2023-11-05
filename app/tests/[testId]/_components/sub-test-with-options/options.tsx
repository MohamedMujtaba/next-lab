"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2, X } from "lucide-react";
import { useEffect } from "react";
import { SubTest, SubTestOption } from "@prisma/client";
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

interface OptionsTabProps {}

const optionsFormSchema = z.object({
  value: z.string().min(1, {
    message: "Value is required",
  }),
});

export const OptionsTab: React.FC<OptionsTabProps> = () => {
  const { testId, subTest, setSubTest } = useSubTest((state) => state);
  const router = useRouter();
  const form = useForm<z.infer<typeof optionsFormSchema>>({
    resolver: zodResolver(optionsFormSchema),
    defaultValues: {
      value: "",
    },
  });

  async function onSubmit(values: z.infer<typeof optionsFormSchema>) {
    try {
      if (!subTest?.id) {
        toast.error("Something went wrong ...");
        return;
      }

      const option = await axios.post(
        `/api/tests/${testId}/subTests/${subTest.id}/options`,
        { ...values, subTestId: subTest.id }
      );
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
    };
    setSubTest(st);
  };
  useEffect(() => {
    gt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <div className="flex gap-3 flex-wrap w-full py-4">
        {subTest?.options.map((option) => (
          <Badge key={option.id}>
            <X className="mr-1 w-4 h-4" />
            {option.value}
          </Badge>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Yellow"
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
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
