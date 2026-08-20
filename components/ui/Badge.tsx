import { cn } from "@/utils/cn";
import type { HTMLAttributes, ReactNode } from "react";

type BadgeTone = "gold" | "purple" | "orange" | "muted";

const tones: Record<BadgeTone, string> = {
  gold: "border-[var(--color-gold)] text-[var(--color-gold-bright)]",
  purple: "border-[var(--color-purple-neon)] text-[var(--color-purple-neon)]",
  orange: "border-[var(--color-burnt-orange)] text-[var(--color-burnt-orange)]",
  muted: "border-[var(--color-line)] text-[var(--color-text-muted)]",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  children: ReactNode;
}

export function Badge({ tone = "gold", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center rounded-full border px-3 text-[0.7rem] font-bold uppercase tracking-[0.16em]",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
