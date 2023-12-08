"use client";

import * as z from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { createSubTest } from "@/actions/subTests/create-subTest";
import { getTests } from "@/actions/tests/get-tests";
import { Test } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  testId: z.string().min(1, {
    message: "Normal must be at least 1 characters.",
  }),
  unit: z.string().default(""),
  price: z.number({
    required_error: "You must provide a price",
  }),
});
interface NameNormalPriceProps {}
export const NameNormalPrice: React.FC<NameNormalPriceProps> = ({}) => {
  const { testId, subTest, setSubTest } = useSubTest((state) => state);
  const [tests, setTests] = useState<Test[] | undefined>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: subTest?.name ? subTest.name : "",
      unit: subTest?.unit ? subTest.unit : "",
      testId: subTest?.testId ? subTest.testId : "",
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
        const response = await createSubTest({ ...values });
        if (!response.success && response.msg) {
          toast.error(response.msg);
          return;
        }
        if (response.success && response.data) {
          setSubTest(response.data);
          router.refresh();
          toast.success("Sub test has been created");
        }
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

  useEffect(() => {
    const gt = async () => {
      const ts = await getTests();
      setTests(ts);
    };
    gt();
  }, []);
  useEffect(() => {
    if (testId) {
      form.setValue("testId", testId);
    }
  }, [testId, form]);

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
          name="testId"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Test Name</FormLabel>
              <FormControl>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        disabled={testId ? false : true}
                        variant="outline"
                        className="justify-between w-full"
                      >
                        {field.value
                          ? tests?.find((test) => test.id === field.value)?.name
                          : "Select test"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className=" p-0">
                      <Command>
                        <CommandInput placeholder="Search test..." />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup className="h-[200px] overflow-y-scroll">
                          {tests?.map((test: { name: string; id: string }) => (
                            <CommandItem
                              key={test.id}
                              value={test.name}
                              onSelect={() => {
                                form.setValue("testId", test.id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === test.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {test.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </FormControl>
              <FormDescription>This is your test display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Test unit</FormLabel>
              <FormControl>
                <Input
                  placeholder="unit"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormDescription>This is your test unit.</FormDescription>
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
