import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "pink" | "lime" | "gold" | "ghost";
};

export function Button({ className, variant = "gold", ...props }: Props) {
  return <button className={cn("btn", `btn-${variant}`, className)} {...props} />;
}
