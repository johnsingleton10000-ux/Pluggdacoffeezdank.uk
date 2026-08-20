import { cn } from "@/utils/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-gold)] text-[var(--color-matte-black)] border-[var(--color-gold-bright)] hover:bg-[var(--color-gold-bright)]",
  secondary:
    "bg-[var(--color-purple-deep)] text-[var(--color-text)] border-[var(--color-purple-neon)] hover:border-[var(--color-gold)]",
  ghost:
    "bg-transparent text-[var(--color-text)] border-[var(--color-line)] hover:border-[var(--color-gold)]",
  danger:
    "bg-[var(--color-danger)] text-white border-[var(--color-danger)] hover:opacity-90",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-12 px-5 text-sm",
  lg: "min-h-14 px-6 text-base",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] border-2 font-bold uppercase tracking-wide transition disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
