"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

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
import { Button } from "@/components/ui/button";

import { useSubTest } from "@/hooks/use-sub-test";
import { SubTest } from "@prisma/client";
import { Editor } from "@/components/editor/editor";
import { ContextMenu } from "@/components/ui/context-menu";
import { ContextMenuComponent } from "@/components/context-menu-component";
import Tiptap from "@/components/Tiptap";

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

interface SubTestWithOneResultProps {}

const SubTestWithOneResult: React.FC<SubTestWithOneResultProps> = ({}) => {
  const { testId, onClose, type, subTest } = useSubTest((state) => state);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: subTest?.name ? subTest.name : "",
      maleNormal: subTest?.maleNormal ? subTest.maleNormal : "",
      femaleNormal: subTest?.femaleNormal ? subTest.femaleNormal : "",
      result: subTest?.result ? subTest.result : undefined,
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
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="maleNormal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Male normal</FormLabel>
                <FormControl>
                  <Tiptap
                    content={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Right click to format the text
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="femaleNormal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Female normal</FormLabel>
                <FormControl>
                  <Tiptap
                    content={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Right click to format the text
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="result"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Test Default Result</FormLabel>
              <FormControl>
                <Input placeholder="Default Result" {...field} />
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

export default SubTestWithOneResult;
