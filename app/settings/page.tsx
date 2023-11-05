import Container from "@/components/container";
import { ThemeCustomizer } from "@/components/theme-customizer";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
  return (
    <Container>
      <ThemeCustomizer />
    </Container>
  );
};

export default Settings;
