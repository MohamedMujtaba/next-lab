import Image from "next/image";
import HomeItem from "./_components/home-item";
import { ModeToggle } from "@/components/mode-toggle";
import { LineChart, Printer, Settings, TestTube2, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

const links = [
  {
    title: "Patient",
    description: "lormem epsom loral",
    herf: "/patients",
    icon: <Users size={30} />,
  },
  {
    title: "Tests",
    description: "lormem epsom loral",
    herf: "/tests",
    icon: <TestTube2 size={30} />,
  },
  {
    title: "Stats",
    description: "lormem epsom loral",
    herf: "/",
    icon: <LineChart size={30} />,
  },
  {
    title: "Settings",
    description: "lormem epsom loral",
    herf: "/",
    icon: <Settings size={30} />,
  },
];

interface ItemType {
  title: string;
  description: string;
  herf: string;
  icon: React.ReactNode;
}

export default function Home() {
  return (
    <div className="w-screen flex items-center flex-col space-y-4 p-4">
      <div className="w-full">
        <div className="pb-4 w-full flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Overview</h1>
            <p className="test-sm font-bold text-muted-foreground">
              See all progress of you&apos;r work
            </p>
          </div>
          <DatePickerWithRange />
        </div>
        <Separator />
      </div>
    </div>
  );
}

{
  /* <div className="w-screen h-screen  flex items-center justify-center">
      <div className="w-full fixed flex self-start justify-end p-4 "></div>
      <div className="grid grid-cols-2 gap-2">
        {links.map((item: ItemType) => (
          <HomeItem
            description={item.description}
            href={item.herf}
            icon={item.icon}
            title={item.title}
            key={item.title}
          />
        ))}
      </div>
    </div> */
}
