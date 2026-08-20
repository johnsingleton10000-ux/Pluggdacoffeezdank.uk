import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-gold bg-gold text-ink shadow-[0_5px_0_var(--color-gold-shadow)] hover:-translate-y-0.5 hover:shadow-[0_7px_0_var(--color-gold-shadow)]",
  secondary:
    "border-purple-bright bg-purple text-white shadow-[0_5px_0_var(--color-purple-shadow)] hover:-translate-y-0.5",
  ghost:
    "border-line bg-surface-raised text-primary hover:border-line-strong hover:bg-surface-overlay",
};

interface SharedProps {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

type ButtonLinkProps = SharedProps & {
  href: string;
  disabled?: boolean;
};

export function ButtonLink({
  children,
  className,
  disabled = false,
  href,
  variant = "primary",
}: ButtonLinkProps) {
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={cn(
          "inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-xl border-2 px-5 py-3 text-sm font-black uppercase tracking-[0.08em] opacity-45",
          variants[variant],
          className,
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-xl border-2 px-5 py-3 text-sm font-black uppercase tracking-[0.08em] transition-[transform,background-color,border-color,box-shadow] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
        variants[variant],
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
}

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
  };

export function Button({
  children,
  className,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-xl border-2 px-5 py-3 text-sm font-black uppercase tracking-[0.08em] transition-[transform,background-color,border-color,box-shadow] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-45",
        variants[variant],
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
