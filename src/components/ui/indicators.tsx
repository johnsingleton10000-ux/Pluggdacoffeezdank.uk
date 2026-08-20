import type { PropsWithChildren } from "react";

import { classNames } from "@/utils/styles";

type Tone = "neutral" | "purple" | "gold" | "orange" | "positive";

const toneClasses: Record<Tone, string> = {
  neutral: "border-line bg-surface-raised text-text-muted",
  purple: "border-purple-300/60 bg-purple-500/15 text-purple-200",
  gold: "border-gold/60 bg-gold/10 text-gold-soft",
  orange: "border-orange/60 bg-orange/10 text-orange-soft",
  positive: "border-positive/60 bg-positive/10 text-positive",
};

interface BadgeProps extends PropsWithChildren {
  readonly tone?: Tone;
  readonly className?: string;
}

export function Badge({
  children,
  className,
  tone = "neutral",
}: BadgeProps) {
  return (
    <span
      className={classNames(
        "inline-flex min-h-7 items-center rounded-full border px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.15em]",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

interface StatusIndicatorProps {
  readonly label: string;
  readonly status: "online" | "offline" | "pending";
}

export function StatusIndicator({ label, status }: StatusIndicatorProps) {
  const dotClass =
    status === "online"
      ? "bg-positive"
      : status === "pending"
        ? "bg-gold"
        : "bg-text-subtle";

  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-text-muted">
      <span
        aria-hidden="true"
        className={classNames("size-2.5 rounded-full", dotClass)}
      />
      {label}
    </span>
  );
}

interface XpDisplayProps {
  readonly current: number;
  readonly label?: string;
}

export function XpDisplay({ current, label = "Current XP" }: XpDisplayProps) {
  return (
    <div className="rounded-md border-2 border-purple-300/50 bg-purple-500/10 px-4 py-3">
      <span className="block text-[0.65rem] font-black uppercase tracking-[0.18em] text-purple-200">
        {label}
      </span>
      <strong className="mt-1 block font-display text-2xl text-white">
        {new Intl.NumberFormat("en-GB").format(current)}
      </strong>
    </div>
  );
}

interface RarityIndicatorProps {
  readonly label: string;
  readonly tone?: Exclude<Tone, "positive">;
}

export function RarityIndicator({
  label,
  tone = "neutral",
}: RarityIndicatorProps) {
  return (
    <span className={classNames("rarity-stripe", toneClasses[tone])}>
      <span>{label}</span>
    </span>
  );
}
