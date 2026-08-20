import Link from "next/link";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { classNames } from "@/utils/styles";

type ButtonVariant = "primary" | "secondary" | "quiet";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-purple-300 bg-purple-300 text-ink hover:bg-purple-200 focus-visible:outline-purple-200",
  secondary:
    "border-gold bg-gold text-ink hover:bg-gold-soft focus-visible:outline-gold",
  quiet:
    "border-line bg-surface-raised text-text hover:border-purple-300 hover:text-white focus-visible:outline-purple-300",
};

function buttonClasses(variant: ButtonVariant, className?: string): string {
  return classNames(
    "inline-flex min-h-12 items-center justify-center rounded-md border-2 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] shadow-hard transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-45",
    variantClasses[variant],
    className,
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
}

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClasses(variant, className)}
      type={type}
      {...props}
    />
  );
}

interface ButtonLinkProps extends PropsWithChildren {
  readonly href: "/" | `#${string}`;
  readonly variant?: ButtonVariant;
  readonly className?: string;
}

export function ButtonLink({
  children,
  className,
  href,
  variant = "primary",
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, className)} href={href}>
      {children}
    </Link>
  );
}
