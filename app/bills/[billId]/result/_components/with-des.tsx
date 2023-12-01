"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BillSubTest } from "@prisma/client";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { saveResult } from "@/actions/results/save-result";
import { Editor } from "@/components/editor/editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { TipTapEditor } from "@/components/tipTap-editor/editor";

const formSchema = z.object({
  description: z.string().min(10, {
    message: "Result must be at least 2 characters.",
  }),
});

interface OneResPops {
  subTest: BillSubTest;
}

export const WithDes: React.FC<OneResPops> = ({ subTest }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: subTest.description || "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      saveResult(subTest.id, subTest.type, values.description);
      toast.success("Result has been saved");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }

  return (
    <>
      <div className="page-break" />
      <div className="flex flex-col items-start  justify-between w-full px-14  mb-2 gap-4">
        <div className="flex-1 flex  justify-center ">
          <p>{subTest.name}</p>
        </div>
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 flex-1 flex flex-col justify-between items-end w-full "
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      {/* <Tiptap
                        content={subTest.description || ""}
                        placeholder="Result"
                        onChange={() => {
                          field.onChange();
                          form.handleSubmit(onSubmit);
                        }}
                      /> */}
                      {/* <Editor
                        value={subTest.description || ""}
                        onChange={field.onChange}
                      /> */}
                      <TipTapEditor
                        content={subTest.description || ""}
                        placeholder="Result"
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button size="icon" className="m-0 mt-0 shrink-0 " type="submit">
                <Check className="w-4 h-4" />
              </Button>
            </form>
          </Form>
        </div>
        <Separator />
      </div>
    </>
  );
};
