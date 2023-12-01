"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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

import { useSubTest } from "@/hooks/use-sub-test";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { SubTest } from "@prisma/client";
import { Editor } from "@/components/editor/editor";
import { Preview } from "@/components/editor/preview";
import { TipTapEditor } from "@/components/tipTap-editor/editor";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  price: z.number({
    required_error: "You must provide a price",
  }),
});

interface SubTestWithDescriptionResultProps {}

const SubTestWithDescriptionResult: React.FC<
  SubTestWithDescriptionResultProps
> = ({}) => {
  const { testId, onClose, type, subTest } = useSubTest((state) => state);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: subTest?.name ? subTest.name : "",
      description: subTest?.description ? subTest.description : "",
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
      }
      if (!subTest) {
        const response = await axios.post(`/api/tests/${testId}/subTests`, {
          ...values,
          type,
        });
        toast.success("Sub test has been created");
      }
      form.reset();
      onClose();
      // window.location.reload();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }

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
                <Input placeholder="CBC" {...field} />
              </FormControl>
              <FormDescription>This is your test display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Test Default Result</FormLabel>
              <FormControl>
                <TipTapEditor
                  content={field.value || ""}
                  placeholder="Result"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                {`This is your test Default Result 
                "If the test dose not have a default result leave it empty".`}
              </FormDescription>
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
                  type="number"
                />
              </FormControl>
              <FormDescription>This is your test price</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center  justify-end gap-4">
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

export default SubTestWithDescriptionResult;
