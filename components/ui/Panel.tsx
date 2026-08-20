import type { HTMLAttributes } from "react";

interface PanelProps extends HTMLAttributes<HTMLElement> {
  as?: "article" | "div" | "section";
  inset?: "standard" | "large";
}

export function Panel({
  as: Element = "section",
  className = "",
  inset = "standard",
  ...props
}: PanelProps) {
  return (
    <Element
      className={`dcbd-panel dcbd-panel-${inset} ${className}`.trim()}
      {...props}
    />
  );
}
