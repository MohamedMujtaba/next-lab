"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { Doctor } from "@prisma/client";
import {
  FileCheck,
  FileText,
  LineChart,
  Settings,
  TestTube2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TeamSwitcher from "./team-switcher";

const links = [
  {
    title: "Overview",
    description: "lormem epsom loral",
    href: "/",
    icon: <LineChart className="w-6 h-6" />,
  },
  {
    title: "Patients",
    description: "lormem epsom loral",
    href: "/patients",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Tests",
    description: "lormem epsom loral",
    href: "/tests",
    icon: <TestTube2 className="w-6 h-6" />,
  },
  {
    title: "Bills",
    description: "lormem epsom loral",
    href: "/bills",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    title: "Results",
    description: "lormem epsom loral",
    href: "/results",
    icon: <FileCheck className="w-6 h-6" />,
  },
  {
    title: "Settings",
    description: "lormem epsom loral",
    href: "/settings",
    icon: <Settings className="w-6 h-6" />,
  },
];

interface NavbarProps {
  doctors: Doctor[];
}

const Navbar: React.FC<NavbarProps> = ({ doctors }) => {
  const pathname = usePathname();
  return (
    <div className="h-16 w-full border-b flex items-center justify-between px-4">
      <div className="flex space-x-8">
        {/* <h2 className="text-xl font-bold">Logo</h2> */}
        {/* <SelectDoctorComponent doctors={doctors} /> */}
        <TeamSwitcher doctors={doctors} />
        <div className="flex items-center space-x-6">
          {links.map((link) => {
            const activeLink = pathname === link.href;

            return (
              <Link href={link.href} key={link.href}>
                <span
                  className={cn(
                    "text-sm font-bold hover:text-black dark:hover:text-white transition-colors flex items-center space-x-1",
                    activeLink
                      ? "text-black dark:text-white"
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
      </div>

      <ModeToggle />
    </div>
  );
};

export default Navbar;
