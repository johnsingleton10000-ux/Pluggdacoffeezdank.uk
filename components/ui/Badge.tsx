import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-gold/40 px-3 py-1 text-[0.7rem] font-black uppercase tracking-[0.18em] text-gold", className)}>
      {children}
    </span>
  );
}
