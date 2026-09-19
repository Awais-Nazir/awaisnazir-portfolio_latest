"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScroll } from "@/components/SmoothScroll";
import { NavigationProgressBar } from "@/components/NavigationProgressBar";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <NavigationProgressBar />
        <Toaster />
        <SmoothScroll>{children}</SmoothScroll>
      </TooltipProvider>
    </ThemeProvider>
  );
}
