import { cn } from "@/lib/utils/cn";

type StatusTone = "live" | "later" | "success" | "warning" | "danger";

const tones: Record<StatusTone, string> = {
  live: "bg-success",
  later: "bg-gold",
  success: "bg-success",
  warning: "bg-ember",
  danger: "bg-danger",
};

export function StatusIndicator({
  label,
  tone = "later",
  className,
}: {
  label: string;
  tone?: StatusTone;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm text-muted", className)}>
      <span className={cn("h-2.5 w-2.5 rounded-full", tones[tone])} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}
