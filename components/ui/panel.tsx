import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

interface PanelProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  tone?: "default" | "purple" | "gold";
}

const tones = {
  default: "border-line bg-surface",
  purple: "border-purple-muted bg-purple-wash",
  gold: "border-gold-muted bg-gold-wash",
};

export function Panel({
  children,
  className,
  tone = "default",
  ...props
}: PanelProps) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border-2 p-5 shadow-panel sm:p-6",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </article>
  );
}
