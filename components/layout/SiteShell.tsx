"use client";

import { AgeGate } from "@/components/layout/AgeGate";
import { GlobalNav } from "@/components/layout/GlobalNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PlayerProvider } from "@/lib/state/player";
import { WhatsAppDock } from "@/components/layout/WhatsAppDock";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <PlayerProvider>
      <div className="grit-bg min-h-dvh">
        <AgeGate />
        <GlobalNav />
        {children}
        <WhatsAppDock />
        <SiteFooter />
      </div>
    </PlayerProvider>
  );
}
