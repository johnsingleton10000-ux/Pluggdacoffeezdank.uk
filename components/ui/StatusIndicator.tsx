import { cn } from "@/utils/cn";

type StatusTone = "live" | "later" | "ok" | "warn" | "off";

const tones: Record<StatusTone, string> = {
  live: "bg-[var(--color-success)]",
  later: "bg-[var(--color-text-muted)]",
  ok: "bg-[var(--color-success)]",
  warn: "bg-[var(--color-burnt-orange)]",
  off: "bg-[var(--color-line)]",
};

interface StatusIndicatorProps {
  tone?: StatusTone;
  label: string;
}

export function StatusIndicator({ tone = "live", label }: StatusIndicatorProps) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
      <span className={cn("h-2.5 w-2.5 rounded-full", tones[tone])} aria-hidden="true" />
      {label}
    </span>
  );
}
