"use client";

import * as React from "react";
import { CheckIcon, InfoCircledIcon, ResetIcon } from "@radix-ui/react-icons";

import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { useConfig } from "@/hooks/use-config";
import { Skeleton } from "@/components/ui/skeleton";
import { Theme, themes } from "@/registry/themes";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeWrapper } from "@/providers/theme-wrapper";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { MoonIcon, SunIcon } from "lucide-react";
import { useConfigColorTheme } from "@/hooks/use-config-color-theme";

export function ThemeCustomizer() {
  const [config, setConfig] = useConfig();
  const { configTheme, setColorTheme } = useConfigColorTheme();
  const { resolvedTheme: mode } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {configTheme}
      <div className="flex items-center space-x-2">
        <div className=" flex">
          <div className="mr-2  items-center space-x-0.5 lg:flex">
            {mounted ? (
              <TooltipProvider>
                {themes
                  .map((t) => t.name)
                  .map((color) => {
                    const theme = themes.find((theme) => theme.name === color);
                    const isActive = configTheme === color;
                    if (!theme) {
                      return null;
                    }
                    return (
                      <Tooltip key={theme.name}>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => setColorTheme(theme.name)}
                            className={cn(
                              "flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs",
                              isActive
                                ? "border-[--theme-primary]"
                                : "border-transparent"
                            )}
                            style={
                              {
                                "--theme-primary": `hsl(${
                                  theme?.activeColor[
                                    mode === "dark" ? "dark" : "light"
                                  ]
                                })`,
                              } as React.CSSProperties
                            }
                          >
                            <span
                              className={cn(
                                "flex h-6 w-6 items-center justify-center rounded-full bg-[--theme-primary]"
                              )}
                            >
                              {isActive && (
                                <CheckIcon className="h-4 w-4 text-white" />
                              )}
                            </span>
                            <span className="sr-only">{theme.label}</span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent
                          align="center"
                          className="rounded-[0.5rem] bg-zinc-900 text-zinc-50"
                        >
                          {theme.label}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
              </TooltipProvider>
            ) : (
              <div className="mr-1 flex items-center space-x-3">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
