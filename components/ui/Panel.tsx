import { cn } from "@/utils/cn";
import type { HTMLAttributes, ReactNode } from "react";

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padded?: boolean;
}

export function Panel({ children, className, padded = true, ...props }: PanelProps) {
  return (
    <div
      className={cn(
        "outline-frame rounded-[var(--radius-panel)] bg-[var(--color-panel)]",
        padded && "p-5 sm:p-7",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
