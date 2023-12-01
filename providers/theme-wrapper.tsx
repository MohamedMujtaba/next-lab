"use client";

import { cn } from "@/lib/utils";
import { useConfig } from "@/hooks/use-config";
import { useConfigColorTheme } from "@/hooks/use-config-color-theme";
import { useEffect, useState } from "react";

interface ThemeWrapperProps extends React.ComponentProps<"body"> {
  defaultTheme?: string;
}

export function ThemeWrapper({
  defaultTheme,
  children,
  className,
}: ThemeWrapperProps) {
  const [config] = useConfig();
  const { configTheme, setColorTheme } = useConfigColorTheme();

  return (
    <body
      className={cn(
        `theme-${configTheme || defaultTheme}`,
        // "w-full",
        className
      )}
      style={
        {
          "--radius": `${defaultTheme ? 0.5 : config.radius}rem`,
        } as React.CSSProperties
      }
    >
      {children}
    </body>
  );
}
