import { cn } from "@/utils/format";

const variants = {
  pink: "bg-pink-neon text-black shadow-neonPink hover:brightness-110",
  green: "bg-green-neon text-black shadow-neonGreen hover:brightness-110",
  gold: "bg-gradient-to-r from-gold to-gold-bright text-black shadow-gold hover:brightness-110",
  purple: "bg-purple-drip text-white shadow-neonPurple hover:brightness-110",
  ghost: "border border-[var(--line)] bg-white/5 text-cream hover:bg-white/10",
} as const;

export function Button({
  children,
  variant = "gold",
  className,
  type = "button",
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex min-h-touch min-w-touch items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-black uppercase tracking-[0.14em] transition disabled:opacity-50",
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}
