import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "purple" | "gold" | "orange" | "success";
}

const tones = {
  neutral: "border-line-strong bg-surface-raised text-secondary",
  purple: "border-purple-muted bg-purple-wash text-purple-soft",
  gold: "border-gold-muted bg-gold-wash text-gold-soft",
  orange: "border-orange-muted bg-orange-wash text-orange-soft",
  success: "border-success/40 bg-success/10 text-success-soft",
};

export function Badge({
  children,
  className,
  tone = "neutral",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-full border px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
