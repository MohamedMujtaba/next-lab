"use client";

import { seedTests } from "@/actions/seed/tests";
import Container from "@/components/container";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface SettingsProps {}

const formSchema = z.object({
  text: z.string().min(10),
});

const Settings: React.FC<SettingsProps> = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await seedTests(values.text);
      toast.success("Test has been updated");
    } catch {
      toast.error("Something went wrong");
    }
  }
  return (
    <Container className="h-[400px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data</FormLabel>
                <FormControl>
                  <Textarea {...field} disabled={form.formState.isSubmitting} />
                </FormControl>
                <FormDescription>Data that u want to seed to</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-4">Seed</Button>
        </form>
      </Form>
    </Container>
  );
};

export default Settings;
