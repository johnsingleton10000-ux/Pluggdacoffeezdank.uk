import { CARD_RARITIES, type CardRarity } from "@/domains/cards";
import { cn } from "@/lib/utils/cn";

const rarityVariables: Record<CardRarity, string> = {
  common: "var(--rarity-common)",
  uncommon: "var(--rarity-uncommon)",
  rare: "var(--rarity-rare)",
  epic: "var(--rarity-epic)",
  legendary: "var(--rarity-legendary)",
  wonder: "var(--rarity-wonder)",
};

export function RarityIndicator({
  rarity,
  className,
}: {
  rarity: CardRarity;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border-2 border-ink px-3 py-1 font-display text-xs uppercase tracking-[0.14em]",
        className,
      )}
      style={{ background: rarityVariables[rarity], color: "var(--color-ink)" }}
    >
      {rarity}
    </span>
  );
}

export function RarityLegend() {
  return (
    <div className="flex flex-wrap gap-2">
      {CARD_RARITIES.map((rarity) => (
        <RarityIndicator key={rarity} rarity={rarity} />
      ))}
    </div>
  );
}
