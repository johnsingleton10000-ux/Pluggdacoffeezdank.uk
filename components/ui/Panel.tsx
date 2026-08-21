import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  drip?: boolean;
};

export function Panel({ className, drip, children, ...props }: Props) {
  return (
    <div className={cn("gold-frame rounded-2xl p-5 sm:p-6", drip && "drip", className)} {...props}>
      {children}
    </div>
  );
}
