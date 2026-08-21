import Link from "next/link";
import { cn } from "@/utils/format";

const variants = {
  pink: "bg-pink-neon text-black shadow-neonPink hover:brightness-110",
  green: "bg-green-neon text-black shadow-neonGreen hover:brightness-110",
  gold: "bg-gradient-to-r from-gold to-gold-bright text-black shadow-gold hover:brightness-110",
  purple: "bg-purple-drip text-white shadow-neonPurple hover:brightness-110",
  ghost: "border border-[var(--line)] bg-white/5 text-cream hover:bg-white/10",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "gold",
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  external?: boolean;
}) {
  const cls = cn(
    "inline-flex min-h-touch items-center justify-center gap-2 rounded-xl px-6 py-3 text-center text-sm font-black uppercase tracking-[0.14em] transition",
    variants[variant],
    className,
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
