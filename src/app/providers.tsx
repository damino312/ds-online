"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "../_components/ui/toaster";
import ModalProvider from "./providers/modal-provider";
import { ThemeProvider } from "./providers/theme-provider";

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
