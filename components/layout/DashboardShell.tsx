import type { ReactNode } from "react";
import { TopNav } from "./TopNav";

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="dcbd-app-shell">
      <TopNav />
      <main>{children}</main>
      <footer className="dcbd-footer">
        <span>DCBD / FOUNDATION BUILD</span>
        <span>Identity · Community · Collection · Play</span>
      </footer>
    </div>
  );
}
