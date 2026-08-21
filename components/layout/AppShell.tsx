import { AgeGate } from "@/components/layout/AgeGate";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { EstateProvider } from "@/lib/estate";
import { StashProvider } from "@/lib/stash";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <StashProvider>
      <EstateProvider>
        <AgeGate>
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </AgeGate>
      </EstateProvider>
    </StashProvider>
  );
}
