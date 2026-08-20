import { cn } from "@/lib/cn";

interface BrandMarkProps {
  className?: string;
  compact?: boolean;
}

export function BrandMark({ className, compact = false }: BrandMarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className="grid size-10 -rotate-3 place-items-center rounded-lg border-2 border-gold bg-purple font-display text-lg text-white shadow-[3px_3px_0_var(--color-gold)]"
      >
        D
      </span>
      {compact ? null : (
        <span className="grid leading-none">
          <span className="font-display text-xl tracking-[0.08em] text-primary">
            DCBD
          </span>
          <span className="mt-1 text-[0.58rem] font-black uppercase tracking-[0.25em] text-gold-soft">
            One ecosystem
          </span>
        </span>
      )}
    </span>
  );
}
