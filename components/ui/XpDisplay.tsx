import { formatXp } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

type XpDisplayProps = {
  currentXp: number;
  earnedXp?: number;
  spentXp?: number;
  className?: string;
};

export function XpDisplay({ currentXp, earnedXp, spentXp, className }: XpDisplayProps) {
  return (
    <div className={cn("rounded-xl border-3 border-ink bg-ink p-4", className)}>
      <p className="font-display text-xs uppercase tracking-[0.2em] text-gold">XP ledger</p>
      <p className="mt-2 font-mono text-4xl text-cream">{formatXp(currentXp)}</p>
      {(earnedXp !== undefined || spentXp !== undefined) && (
        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm text-muted">
          {earnedXp !== undefined ? (
            <div>
              <dt>Earned</dt>
              <dd className="font-mono text-cream">{formatXp(earnedXp)}</dd>
            </div>
          ) : null}
          {spentXp !== undefined ? (
            <div>
              <dt>Spent</dt>
              <dd className="font-mono text-cream">{formatXp(spentXp)}</dd>
            </div>
          ) : null}
        </dl>
      )}
    </div>
  );
}
