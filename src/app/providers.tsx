"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "../_components/ui/toaster";
import { ThemeProvider } from "@/_components/theme-provider";
import ModalProvider from "./providers/modal-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={false}
      storageKey="ds-theme"
      disableTransitionOnChange
    >
      <SessionProvider refetchInterval={5 * 60}>
        <Toaster />
        <ModalProvider />
        {children}
      </SessionProvider>
    </ThemeProvider>
  );
}
