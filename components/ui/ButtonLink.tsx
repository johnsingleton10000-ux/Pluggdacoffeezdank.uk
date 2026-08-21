import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & {
  variant?: "pink" | "lime" | "gold" | "ghost";
};

export function ButtonLink({ className, variant = "gold", ...props }: Props) {
  return <Link className={cn("btn", `btn-${variant}`, className)} {...props} />;
}
