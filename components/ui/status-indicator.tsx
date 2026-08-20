import { cn } from "@/lib/cn";

interface StatusIndicatorProps {
  label: string;
  status: "online" | "idle" | "offline" | "locked";
}

const dots = {
  online: "bg-success",
  idle: "bg-gold",
  offline: "bg-secondary",
  locked: "bg-orange",
};

export function StatusIndicator({
  label,
  status,
}: StatusIndicatorProps) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-secondary">
      <span
        aria-hidden="true"
        className={cn("size-2.5 rounded-full ring-2 ring-ink", dots[status])}
      />
      {label}
    </span>
  );
}
