import Container from "@/components/container";
import { ThemeCustomizer } from "@/components/theme-customizer";
import { Copyright } from "lucide-react";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
  return (
    <Container className="h-[400px]">
      <ThemeCustomizer />
      <div className="flex gap-1 absolute bottom-0 items-center w-full justify-center self-end">
        Developed by{" "}
        <div className="bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 text-xl font-bold bg-clip-text text-transparent">
          MJ
        </div>
        all rights reserved
        <Copyright className="text-primary" />
        2023
      </div>
    </Container>
  );
};

export default Settings;
