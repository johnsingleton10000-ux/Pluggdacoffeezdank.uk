import { STOCK_AVATAR_POOL_SIZE } from "@/lib/config/ecosystem";
import type { DimensionScores } from "@/domains/blood-test/types";
import { DIMENSION_IDS } from "@/domains/blood-test/types";
import type { StockAvatar } from "@/domains/avatars/types";

export function assertCoreStockLimit(avatars: readonly StockAvatar[]): void {
  const coreCount = avatars.filter((avatar) => avatar.isCoreStock).length;
  if (coreCount > STOCK_AVATAR_POOL_SIZE) {
    throw new Error(`DCBD supports exactly ${STOCK_AVATAR_POOL_SIZE} core stock avatars.`);
  }
}

function biasVector(avatar: StockAvatar): DimensionScores {
  return {
    control: avatar.bias?.control ?? 0,
    attack: avatar.bias?.attack ?? 0,
    defence: avatar.bias?.defence ?? 0,
  };
}

export function distanceToScores(avatar: StockAvatar, scores: DimensionScores): number {
  const bias = biasVector(avatar);
  return DIMENSION_IDS.reduce((total, dimension) => {
    const delta = (bias[dimension] ?? 0) - scores[dimension];
    return total + delta * delta;
  }, 0);
}

/**
 * The player does not choose a starting avatar. The closest stock match wins.
 * Characters and artwork are supplied later; an empty pool returns null.
 */
export function matchClosestAvatar(
  scores: DimensionScores,
  pool: readonly StockAvatar[],
): StockAvatar | null {
  const core = pool.filter((avatar) => avatar.isCoreStock && avatar.bias);
  if (core.length === 0) return null;

  return [...core].sort((a, b) => {
    const delta = distanceToScores(a, scores) - distanceToScores(b, scores);
    return delta !== 0 ? delta : a.sortOrder - b.sortOrder;
  })[0] ?? null;
}
