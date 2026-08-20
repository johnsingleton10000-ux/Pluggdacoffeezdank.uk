import { cn } from "@/utils/cn";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const variantClass =
    variant === "primary"
      ? "bg-[var(--color-gold)] text-[var(--color-matte-black)] border-[var(--color-gold-bright)]"
      : variant === "secondary"
        ? "bg-[var(--color-purple-deep)] text-[var(--color-text)] border-[var(--color-purple-neon)]"
        : "bg-transparent text-[var(--color-text)] border-[var(--color-line)]";

  const sizeClass = size === "lg" ? "min-h-14 px-6 text-base" : "min-h-12 px-5 text-sm";

  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] border-2 font-bold uppercase tracking-wide",
        variantClass,
        sizeClass,
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}