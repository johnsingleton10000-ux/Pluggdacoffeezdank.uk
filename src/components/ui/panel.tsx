import type { HTMLAttributes } from "react";

import { classNames } from "@/utils/styles";

interface PanelProps extends HTMLAttributes<HTMLElement> {
  readonly as?: "article" | "div" | "section";
  readonly accent?: "purple" | "gold" | "orange" | "none";
}

const accentClasses = {
  purple: "before:bg-purple-400",
  gold: "before:bg-gold",
  orange: "before:bg-orange",
  none: "before:hidden",
} as const;

export function Panel({
  accent = "none",
  as: Component = "div",
  className,
  ...props
}: PanelProps) {
  return (
    <Component
      className={classNames(
        "relative overflow-hidden rounded-lg border-2 border-line bg-surface p-5 shadow-hard before:absolute before:inset-x-0 before:top-0 before:h-1 sm:p-6",
        accentClasses[accent],
        className,
      )}
      {...props}
    />
  );
}
