import { RARITY_LABELS } from "@/config/rarity";
import type { CardRarityToken } from "@/types/card";
import { cn } from "@/utils/cn";

const rarityVars: Record<CardRarityToken, string> = {
  common: "var(--color-rarity-common)",
  uncommon: "var(--color-rarity-uncommon)",
  rare: "var(--color-rarity-rare)",
  epic: "var(--color-rarity-epic)",
  legendary: "var(--color-rarity-legendary)",
};

interface RarityIndicatorProps {
  rarity: CardRarityToken;
}

export function RarityIndicator({ rarity }: RarityIndicatorProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center gap-2 rounded-full border px-3 text-[0.7rem] font-bold uppercase tracking-[0.16em]",
      )}
      style={{ borderColor: rarityVars[rarity], color: rarityVars[rarity] }}
    >
      <span className="h-2 w-2 rounded-full" style={{ background: rarityVars[rarity] }} aria-hidden="true" />
      {RARITY_LABELS[rarity]}
    </span>
  );
}
