import { AVATAR_POOL } from "@/config/avatars";
import type { ArchetypeId } from "@/types/archetype";
import type { AvatarDefinition } from "@/types/avatar";

export function matchAvatar(archetypeId: ArchetypeId): AvatarDefinition {
  const exact = AVATAR_POOL.filter((avatar) => avatar.archetypeId === archetypeId);
  if (exact[0]) return exact[0];
  return AVATAR_POOL[0];
}

export function listAvatars() {
  return AVATAR_POOL;
}
