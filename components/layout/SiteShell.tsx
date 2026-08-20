import type { ReactNode } from "react";
import { AgeGate } from "@/components/layout/AgeGate";
import { Footer } from "@/components/layout/Footer";
import { GlobalNav } from "@/components/layout/GlobalNav";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <AgeGate>
      <div className="texture-grit min-h-dvh">
        <GlobalNav />
        <div className="pb-20 md:pb-0">{children}</div>
        <Footer />
      </div>
    </AgeGate>
  );
}
