import type {
  ProfileUpdate,
  UserProfile,
} from "@/domains/account/types";
import type {
  PlayerMembership,
  MembershipTierId,
} from "@/domains/membership/types";
import type { XpLedger } from "@/domains/xp/types";
import type { EntityId } from "@/types/core";

export interface ProfileRepository {
  findByUserId(userId: EntityId): Promise<UserProfile | null>;
  update(userId: EntityId, update: ProfileUpdate): Promise<UserProfile>;
}

export interface MembershipRepository {
  findCurrent(userId: EntityId): Promise<PlayerMembership | null>;
  assignTier(
    userId: EntityId,
    tierId: MembershipTierId,
    actorId: EntityId,
  ): Promise<PlayerMembership>;
}

export interface DataServices {
  profiles: ProfileRepository;
  memberships: MembershipRepository;
  xp: XpLedger;
}
