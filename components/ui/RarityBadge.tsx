import { RARITY_GLOW, RARITY_LABELS } from "@/config/rarity";
import type { CardRarity } from "@/types/card";

export function RarityBadge({ rarity }: { rarity: CardRarity }) {
  return (
    <span
      className="inline-flex rounded-md border px-2 py-1 text-[0.65rem] font-black uppercase tracking-[0.16em]"
      style={{ color: RARITY_GLOW[rarity], borderColor: RARITY_GLOW[rarity] }}
    >
      {RARITY_LABELS[rarity]}
    </span>
  );
}
