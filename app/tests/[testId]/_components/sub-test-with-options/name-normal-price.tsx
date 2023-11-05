"use client";

import * as z from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

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

import { useSubTest } from "@/hooks/use-sub-test";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  maleNormal: z.string().min(1, {
    message: "Normal must be at least 1 characters.",
  }),
  femaleNormal: z.string().min(1, {
    message: "Normal must be at least 1 characters.",
  }),
  result: z.string().optional(),
  price: z.number({
    required_error: "You must provide a price",
  }),
});
interface NameNormalPriceProps {
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
}
export const NameNormalPrice: React.FC<NameNormalPriceProps> = ({
  setDisabled,
  setTab,
}) => {
  const { testId, type, subTest, setSubTest } = useSubTest((state) => state);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: subTest?.name ? subTest.name : "",
      maleNormal: subTest?.maleNormal ? subTest.maleNormal : "",
      femaleNormal: subTest?.femaleNormal ? subTest.femaleNormal : "",
      price: subTest?.price ? subTest.price : 0,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (subTest) {
        const response = await axios.put(
          `/api/tests/${testId}/subTests/${subTest.id}`,
          {
            ...values,
          }
        );
        toast.success("Sub test has been updated");
        router.refresh();
      }
      if (!subTest) {
        const response = await axios.post(`/api/tests/${testId}/subTests`, {
          ...values,
          type,
        });

        setSubTest(response.data);
        setTab("tab2");
        setDisabled(false);
        router.refresh();
        toast.success("Sub test has been created");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }
  useEffect(() => {
    if (!subTest) {
      form.reset;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subTest]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Test Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="CBC"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormDescription>This is your test display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maleNormal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Test maleNormal</FormLabel>
              <FormControl>
                <Input
                  placeholder="Normal"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormDescription>This is your test maleNormal.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="femaleNormal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Test femaleNormal</FormLabel>
              <FormControl>
                <Input
                  placeholder="Normal"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormDescription>This is your test femaleNormal.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Test Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Price"
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                  disabled={form.formState.isSubmitting}
                  type="number"
                />
              </FormControl>
              <FormDescription>This is your test price</FormDescription>
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
  );
};
