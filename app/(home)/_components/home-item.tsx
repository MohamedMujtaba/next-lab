import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface HomeItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const HomeItem: React.FC<HomeItemProps> = ({
  description,
  icon,
  title,
  href,
}) => {
  return (
    <Link href={href}>
      <Card className="w-[200px] h-[200px] hover:shadow-md dark:shadow-white transition-shadow ">
        <CardHeader>
          <div className="mb-4">{icon}</div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="">
            <ArrowRight />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </Link>
  );
};

export default HomeItem;
