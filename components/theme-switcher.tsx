"use client";

import * as React from "react";
import { useSelectedLayoutSegment } from "next/navigation";

import { useConfig } from "@/hooks/use-config";
import { useConfigColorTheme } from "@/hooks/use-config-color-theme";

export function ThemeSwitcher() {
  const [config] = useConfig();
  const { configTheme } = useConfigColorTheme();
  const segment = useSelectedLayoutSegment();

  React.useEffect(() => {
    document.body.classList.forEach((className) => {
      if (className.match(/^theme.*/)) {
        document.body.classList.remove(className);
      }
    });

    const theme = configTheme;
    if (theme) {
      return document.body.classList.add(`theme-${theme}`);
    }
  }, [segment, configTheme]);

  return null;
}
