"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { PublicLinksContext } from "@/contexts/PublicLinksContext";
import type { PublicLinks } from "@/lib/publicLinks";

export function AppProviders({
  children,
  publicLinks,
}: {
  children: ReactNode;
  publicLinks: PublicLinks;
}) {
  return (
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <PublicLinksContext.Provider value={publicLinks}>
          {children}
        </PublicLinksContext.Provider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
