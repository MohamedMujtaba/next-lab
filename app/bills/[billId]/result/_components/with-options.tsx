"use client";

import { TiptapPreview } from "@/components/TipTap-preview";
import { zodResolver } from "@hookform/resolvers/zod";
import { BillSubTest, SubTestOption } from "@prisma/client";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { saveResult } from "@/actions/results/save-result";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  selectedOption: z.string().min(2, {
    message: "selectedOption must be at least 2 characters.",
  }),
});

interface OneResPops {
  subTest: BillSubTest & { options: SubTestOption[] };
}

export const WithOptions: React.FC<OneResPops> = ({ subTest }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedOption: subTest.selectedOption || "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      saveResult(subTest.id, subTest.type, values.selectedOption);
      toast.success("Result has been saved");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }

  return (
    <>
      <div className="page-break" />
      <div className="w-full px-14 mb-2 gap-4">
        <div className="flex items-center justify-between w-full  mb-3 gap-4">
          <div className="flex-1 flex   ">
            <p>{subTest.name}</p>
          </div>
          <div className="flex-1 flex ">
            <TiptapPreview content={subTest.maleNormal || ""} />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex-1 flex gap-4 items-start justify-center"
            >
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="selectedOption"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subTest.options.map((option) => {
                            return (
                              <SelectItem key={option.id} value={option.value}>
                                {option.value}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button size="icon" className="m-0 mt-0" type="submit">
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
