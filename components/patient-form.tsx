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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createPatient } from "@/actions/patients/create-patient";
import { Loader2 } from "lucide-react";
import { usePatient } from "@/hooks/use-patient";

export const patientFormSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  age: z.string().min(1, {
    message: "age must be at least 1 characters.",
  }),
  phoneNumber: z
    .string()
    .min(10, {
      message: "Phone number must be 10 number",
    })
    .max(10, {
      message: "Phone number must be 10 number",
    }),
  gender: z.enum(["MALE", "FEMALE"]),
});

interface PatientFormProps {
  onClose: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onClose }) => {
  const { patient } = usePatient((state) => state);
  const router = useRouter();

  const form = useForm<z.infer<typeof patientFormSchema>>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: patient ? patient.name : "",
      age: patient ? patient?.age : "",
      phoneNumber: patient ? patient.phoneNumber : "",
      gender: patient ? patient.gender : "MALE",
    },
  });
  async function onSubmit(values: z.infer<typeof patientFormSchema>) {
    try {
      const response = await createPatient({ ...values });
      onClose();
      toast.success("Patient has been created");
      form.reset();
      // router.push(`tests/${response.data.id}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormDescription>This is your patient name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Age</FormLabel>
              <FormControl>
                <Input
                  placeholder="69"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormDescription>This is your patient age.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="09xxxxxxxx"
                  {...field}
                  type="number"
                  maxLength={10}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormDescription>
                This is your patient phone number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient gender</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={form.formState.isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MALE">MALE</SelectItem>
                  <SelectItem value="FEMALE">FEMALE</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>This is your patient gender.</FormDescription>
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

export default PatientForm;
