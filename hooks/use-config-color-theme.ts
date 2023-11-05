import { Theme } from "@/registry/themes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ConfigColorThemeState {
  configTheme: Theme["name"];
  setColorTheme: (name: Theme["name"]) => void;
}

export const useConfigColorTheme = create<ConfigColorThemeState>()(
  persist(
    (set) => ({
      configTheme: "neutral",
      setColorTheme: (name) => set({ configTheme: name }),
    }),
    { name: "configColorTheme" }
  )
);
