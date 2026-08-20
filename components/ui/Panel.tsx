import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes, ReactNode } from "react";

type PanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  padded?: boolean;
};

export function Panel({ children, className, padded = true, ...props }: PanelProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-panel)] border-3 border-ink bg-panel shadow-stamp",
        padded && "p-5 sm:p-7",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function Card({ children, className, ...props }: CardProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-[var(--radius-card)] border-3 border-ink bg-raised shadow-stamp",
        className,
      )}
      {...props}
    >
      {children}
    </article>
  );
}
