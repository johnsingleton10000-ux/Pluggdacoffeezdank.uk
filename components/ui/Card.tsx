import { cn } from "@/utils/cn";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-[var(--radius-panel)] border-2 border-[var(--color-line)] bg-[var(--color-matte-black)] shadow-panel",
        className,
      )}
      {...props}
    >
      {children}
    </article>
  );
}
