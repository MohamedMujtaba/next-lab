"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "./Navbar";
import { useState } from "react";

export const SideNav = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="w-56 ">
        <SheetHeader>
          {/* <SheetTitle>Are you sure absolutely sure?</SheetTitle> */}
        </SheetHeader>
        <div className="flex flex-col   mt-10 gap-4">
          {links.map((link) => {
            const activeLink = pathname === link.href;

            return (
              <Link href={link.href} key={link.href}>
                <span
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-sm font-bold px-3 py-2 rounded-sm  hover:text-black dark:hover:text-white transition-colors flex items-center space-x-1",
                    activeLink
                      ? "text-black dark:text-white bg-gray-700/20 "
                      : "text-muted-foreground"
                  )}
                >
                  <div>{link.icon}</div>
                  <div>{link.title}</div>
                </span>
              </Link>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};
