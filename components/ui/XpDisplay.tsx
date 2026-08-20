import type { XpBalance } from "@/types/xp";

interface XpDisplayProps {
  xp: XpBalance;
  compact?: boolean;
}

export function XpDisplay({ xp, compact = false }: XpDisplayProps) {
  if (compact) {
    return (
      <p className="font-mono text-lg font-semibold text-[var(--color-gold-bright)]" aria-label={`${xp.current} XP`}>
        {xp.current.toLocaleString("en-GB")} XP
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3" aria-label="XP ledger summary">
      <XpStat label="Current" value={xp.current} />
      <XpStat label="Earned" value={xp.earned} />
      <XpStat label="Spent" value={xp.spent} />
    </div>
  );
}

function XpStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[var(--radius-control)] border-2 border-[var(--color-line)] bg-[var(--color-matte-black)] p-3">
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">{label}</p>
      <p className="mt-1 font-mono text-xl font-semibold text-[var(--color-gold-bright)]">
        {value.toLocaleString("en-GB")}
      </p>
    </div>
  );
}
