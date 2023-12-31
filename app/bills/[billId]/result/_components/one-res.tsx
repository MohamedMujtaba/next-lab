"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BillSubTest, SubTestNormal, SubTestOption } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { saveResult } from "@/actions/results/save-result";
import { TiptapPreview } from "@/components/TipTap-preview";
import Tiptap from "@/components/Tiptap";
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
import { Input } from "@/components/ui/input";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  result: z.string().optional(),
  description: z.string().optional(),
  selectedNormal: z.string().optional(),
});

interface OneResPops {
  subTest: BillSubTest & { options: SubTestOption[]; normals: SubTestNormal[] };
}

export const OneResult: React.FC<OneResPops> = ({ subTest }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    reValidateMode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      result: subTest.result?.trim() || undefined,
      description: subTest.description?.trim() || undefined,
      selectedNormal:
        subTest.selectedNormal?.trim() || subTest.normals[0]?.value || "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await saveResult(subTest.id, values);
      // if (res.success) {
      //   toast.success(res.msg);
      // }
      if (!res.success) {
        toast.error(res.msg);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }
  return (
    <>
      <div className="page-break" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="w-full flex items-center justify-between mb-2 gap-4">
            <div className="flex-1">
              <p>{subTest.name}</p>
            </div>
            <div className="flex-1 flex ">
              {/* FIXME: Add normal select */}
              <FormField
                control={form.control}
                name="selectedNormal"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Select
                      onValueChange={(value) => {
                        form.setValue("selectedNormal", value);
                        form.handleSubmit(onSubmit);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Normal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subTest.normals.map((normal) => (
                          <SelectItem key={normal.id} value={normal.value}>
                            {normal.label} : {normal.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="result"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-2 relative ">
                        <div className="w-full">
                          <Tiptap
                            content={field.value || ""}
                            placeholder="Result"
                            onChange={field.onChange}
                            save={form.handleSubmit(onSubmit)}
                          />
                        </div>
                        {subTest.function && (
                          <div className="absolute right-0">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  // role="combobox"
                                  // aria-expanded={open}
                                >
                                  <QuestionMarkCircledIcon className="h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="p-0" align="end">
                                <Input
                                  type="number"
                                  onChange={(e) => {
                                    let f = eval(
                                      `${+e.target.value} ${
                                        subTest.function
                                      }` || ""
                                    );

                                    form.setValue(
                                      "result",
                                      `${e.target.value} ` +
                                        `(${f.toFixed(2).toString()})` +
                                        "%"
                                    );
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        )}
                        {subTest.options.length !== 0 ? (
                          <div className="absolute right-0">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  // role="combobox"
                                  // aria-expanded={open}
                                >
                                  <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="p-0" align="end">
                                <Command>
                                  <CommandInput placeholder="Search..." />
                                  <CommandEmpty>No result found.</CommandEmpty>
                                  <CommandGroup>
                                    {subTest.options.map((option) => (
                                      <CommandItem
                                        key={option.id}
                                        value={option.value}
                                        onSelect={() => {
                                          // setValue(currentValue === value ? "" : currentValue);
                                          form.setValue("result", option.value);
                                          form.handleSubmit(onSubmit);
                                        }}
                                      >
                                        {option.value}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </div>
                        ) : null}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {subTest.description && (
            <div className="w-full mb-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <TipTapEditor
                        content={subTest.description || ""}
                        placeholder="Result"
                        onChange={field.onChange}
                        save={form.handleSubmit(onSubmit)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {/* <div className="flex items-center justify-end">
            <Button size="icon" className="m-0 mt-0 shrink-0 " type="submit">
              <Check className="w-4 h-4" />
            </Button>
          </div> */}
        </form>
      </Form>
    </>
  );
};

// const t = ()=>{
//   return (
//     <>
//       <div className="page-break" />
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
//           <div className="w-full flex items-center justify-between">
//             <div className="flex-1">
//               <p>{subTest.name}</p>
//             </div>
//             <div className="flex-1 flex ">
//               <TiptapPreview content={subTest.maleNormal || ""} />
//             </div>
//             <div className="flex-1">
//               <FormField
//                 control={form.control}
//                 name="result"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <div className="flex gap-2 relative ">
//                         <div className="w-full">
//                           <Tiptap
//                             content={field.value || ""}
//                             placeholder="Result"
//                             onChange={field.onChange}
//                           />
//                         </div>
//                         <div className="absolute right-0">
//                           <Popover>
//                             <PopoverTrigger asChild>
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 // role="combobox"
//                                 // aria-expanded={open}
//                               >
//                                 <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
//                               </Button>
//                             </PopoverTrigger>
//                             <PopoverContent className="p-0" align="end">
//                               <Command>
//                                 <CommandInput placeholder="Search..." />
//                                 <CommandEmpty>No result found.</CommandEmpty>
//                                 <CommandGroup>
//                                   {subTest.options.map((option) => (
//                                     <CommandItem
//                                       key={option.id}
//                                       value={option.value}
//                                       onSelect={() => {
//                                         // setValue(currentValue === value ? "" : currentValue);
//                                         form.setValue("result", option.value);
//                                       }}
//                                     >
//                                       {option.value}
//                                     </CommandItem>
//                                   ))}
//                                 </CommandGroup>
//                               </Command>
//                             </PopoverContent>
//                           </Popover>
//                         </div>
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </div>
//           <div className="w-full">
//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   <FormControl>
//                     <TipTapEditor
//                       content={subTest.description || ""}
//                       placeholder="Result"
//                       onChange={field.onChange}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <Button size="icon" className="m-0 mt-0 shrink-0 " type="submit">
//             <Check className="w-4 h-4" />
//           </Button>
//         </form>
//       </Form>
//     </>
//   );
// }
