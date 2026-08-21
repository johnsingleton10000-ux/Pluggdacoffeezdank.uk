import { cn } from "@/utils/format";

export function Badge({
  children,
  tone = "gold",
  className,
}: {
  children: React.ReactNode;
  tone?: "gold" | "pink" | "green" | "purple";
  className?: string;
}) {
  const tones = {
    gold: "text-gold border-gold/40",
    pink: "text-pink-neon border-pink-neon/40",
    green: "text-green-neon border-green-neon/40",
    purple: "text-purple-neon border-purple-neon/40",
  };
  return (
    <span className={cn("inline-flex rounded-full border px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.22em]", tones[tone], className)}>
      {children}
    </span>
  );
}
