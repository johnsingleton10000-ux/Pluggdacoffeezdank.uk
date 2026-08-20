import type { StrategyScores } from "@/features/blood-test/domain";
import type { AuditedEntity, EntityId } from "@/types/shared";

export const CORE_AVATAR_COUNT = 20;

export interface AvatarDefinition extends AuditedEntity {
  readonly name: string;
  readonly strategyProfile: StrategyScores;
  readonly artworkUrl: string;
  readonly isActive: boolean;
}

export interface AvatarCustomization {
  readonly hair?: string;
  readonly skinColour?: string;
  readonly clothing?: string;
  readonly accessories?: readonly string[];
  readonly colours?: Readonly<Record<string, string>>;
  readonly cosmetics?: Readonly<Record<string, string>>;
}

export interface PlayerAvatar extends AuditedEntity {
  readonly userId: EntityId;
  readonly avatarDefinitionId: EntityId;
  readonly sourceBloodTestId: EntityId;
  readonly customization: AvatarCustomization;
}
