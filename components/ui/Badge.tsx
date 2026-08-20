import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "gold" | "purple" | "muted" | "orange";
}

export function Badge({ className = "", tone = "muted", ...props }: BadgeProps) {
  return (
    <span className={`dcbd-badge dcbd-badge-${tone} ${className}`.trim()} {...props} />
  );
}
