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
import { Test, TestGroup } from "@prisma/client";
import { Loader2, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { createGroup } from "@/actions/tests/create-group";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});

interface GroupsProps {
  test: Test & { groups: TestGroup[] };
}

export const Groups: React.FC<GroupsProps> = ({ test }) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createGroup(values.name, test.id);
      toast.success("Group has been updated");
      form.reset();

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }
  return (
    // bg-gray-100 dark:bg-gray-700
    <div className="p-4 border-border border rounded-md mt-4 ">
      <h1 className="text-2xl font-bold mb-2">Groups: </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-4 mb-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                {/* <FormLabel>Group Name</FormLabel> */}
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center  justify-end gap-4">
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
      <div className="space-y-2">
        {test.groups.map((group) => (
          <div
            key={group.id}
            className="bg-sky-500/20 w-full rounded-md  border-sky-500/40 border flex items-center  "
          >
            <div
              className={cn(
                "p-3 border-r border-sky-500/40  w-fit cursor-pointer text-destructive"
              )}
            >
              <Trash className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between w-full px-4">
              <div>
                <p className="text-lg font-semibold">{group.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
