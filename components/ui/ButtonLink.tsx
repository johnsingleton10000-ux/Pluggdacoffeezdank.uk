import Link from "next/link";
import type { ReactNode } from "react";
import { buttonClassName, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  external?: boolean;
}) {
  const classes = buttonClassName(variant, size, className);
  const isExternal =
    external ||
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("#");

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
