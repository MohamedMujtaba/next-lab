import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "max-w-screen relative flex flex-col space-y-4 p-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
