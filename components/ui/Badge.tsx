import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes, ReactNode } from "react";

type BadgeTone = "gold" | "purple" | "ember" | "muted";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: BadgeTone;
};

const tones: Record<BadgeTone, string> = {
  gold: "bg-gold text-ink border-ink",
  purple: "bg-purple-deep text-cream border-purple-neon",
  ember: "bg-ember text-cream border-ink",
  muted: "bg-raised text-muted border-line",
};

export function Badge({ children, tone = "muted", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center rounded-full border-2 px-3 py-1 text-xs font-display uppercase tracking-[0.14em]",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
