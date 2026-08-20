import type { AvatarCustomization, CosmeticSlot } from "@/domains/avatars/types";

export const COSMETIC_SLOTS: readonly CosmeticSlot[] = [
  "hair",
  "skin",
  "clothing",
  "accessories",
  "colours",
  "details",
];

/**
 * Cosmetics never mutate the player's Blood Test archetype.
 */
export function applyCustomization(
  current: AvatarCustomization,
  patch: AvatarCustomization,
): AvatarCustomization {
  const next: AvatarCustomization = { ...current };
  for (const slot of COSMETIC_SLOTS) {
    const value = patch[slot];
    if (typeof value === "string") next[slot] = value;
  }
  return next;
}
