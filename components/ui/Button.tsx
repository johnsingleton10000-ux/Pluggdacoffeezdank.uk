import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

export const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-ink border-ink hover:bg-[color:var(--color-cream)] disabled:bg-gold-dim",
  secondary:
    "bg-purple-deep text-cream border-purple-neon hover:bg-[color:var(--color-raised)]",
  ghost: "bg-transparent text-cream border-line hover:bg-raised",
  danger: "bg-danger text-cream border-ink hover:opacity-90",
};

export const buttonSizes: Record<ButtonSize, string> = {
  md: "min-h-touch px-5 py-3 text-sm",
  lg: "min-h-12 px-6 py-4 text-base",
};

export function buttonClassName(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-xl border-3 font-display uppercase tracking-[0.08em]",
    "shadow-stamp transition-colors disabled:cursor-not-allowed disabled:opacity-60",
    buttonVariants[variant],
    buttonSizes[size],
    className,
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonClassName(variant, size, className)} {...props}>
      {children}
    </button>
  );
}
