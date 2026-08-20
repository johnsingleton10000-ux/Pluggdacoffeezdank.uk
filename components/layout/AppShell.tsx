import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:bg-[var(--color-gold)] focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <SiteHeader />
      <div id="main" className="flex-1">
        {children}
      </div>
      <SiteFooter />
    </div>
  );
}
