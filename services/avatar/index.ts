import { AVATAR_POOL } from "@/config/avatars";
import { ARCHETYPES } from "@/config/archetypes";
import type { AvatarDefinition, AvatarMatch, PlayerAvatar } from "@/types/avatar";
import type { ArchetypeMatch } from "@/types/archetype";
import { emptyCosmeticOptions } from "@/utils/format";

export function listAvatarSlots(): readonly AvatarDefinition[] {
  return AVATAR_POOL;
}

/**
 * The player does not pick a starting avatar. The closest configured stock
 * avatar is selected. Cosmetic changes must not alter archetype.
 */
export function matchAvatar(archetype: ArchetypeMatch, pool = AVATAR_POOL): AvatarMatch | null {
  const assigned = pool.filter((avatar) => avatar.archetypeId);
  if (!assigned.length) return null;

  const ranked = assigned
    .map((avatar) => ({
      avatar,
      distance: avatarDistance(avatar, archetype),
    }))
    .sort((a, b) => a.distance - b.distance);

  const winner = ranked[0];
  if (!winner?.avatar.archetypeId) return null;

  return {
    stockAvatarId: winner.avatar.id,
    archetypeId: winner.avatar.archetypeId,
    distance: winner.distance,
  };
}

export function applyCosmetics(
  avatar: PlayerAvatar,
  cosmetics: PlayerAvatar["cosmetics"],
): PlayerAvatar {
  return {
    ...avatar,
    cosmetics: { ...emptyCosmeticOptions(), ...avatar.cosmetics, ...cosmetics },
    archetypeId: avatar.archetypeId,
  };
}

function avatarDistance(avatar: AvatarDefinition, match: ArchetypeMatch): number {
  const avatarArchetype = ARCHETYPES.find((item) => item.id === avatar.archetypeId);
  if (!avatarArchetype) return Number.POSITIVE_INFINITY;
  return Math.hypot(
    match.scores.control - avatarArchetype.vector.control * 100,
    match.scores.attack - avatarArchetype.vector.attack * 100,
    match.scores.defence - avatarArchetype.vector.defence * 100,
  );
}
