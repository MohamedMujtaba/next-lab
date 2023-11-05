"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Test } from "@prisma/client";
import { Loader2, Pencil } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});

interface TestNameFormProps {
  test: Test;
}

export const TestNameForm: React.FC<TestNameFormProps> = ({ test }) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: test.name,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.patch(`/api/tests/${test.id}`, values);
      setIsEditing(false);
      toast.success("Test has been updated");

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }
  return (
    // bg-gray-100 dark:bg-gray-700
    <div className="p-4 border-border border rounded-md ">
      {isEditing ? (
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
                  <FormDescription>
                    This is your test display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center  justify-end gap-4">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Test Name: </h1>
            <h2 className="text-xl font-semibold text-sky-500">{test.name}</h2>
          </div>
          <div>
            <Button className="space-x-2" onClick={() => setIsEditing(true)}>
              <Pencil className="w-4 h-4" />
              <p>Edit</p>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
