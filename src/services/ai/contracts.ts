import type {
  ArchetypeAssignment,
  BloodTestScoringInput,
} from "@/features/blood-test/domain";
import type { AvatarDefinition } from "@/features/avatars/domain";
import type { ServiceResult } from "@/types/shared";

export interface DeckIdentity {
  readonly name: string;
  readonly personality: string;
}

export interface IdentityGenerationService {
  analyseBloodTest(
    input: BloodTestScoringInput,
  ): Promise<ServiceResult<ArchetypeAssignment, "INVALID_ANSWERS" | "UNAVAILABLE">>;

  matchAvatar(
    assignment: ArchetypeAssignment,
    candidates: readonly AvatarDefinition[],
  ): Promise<ServiceResult<AvatarDefinition, "NO_MATCH" | "UNAVAILABLE">>;

  generateDeckIdentity(
    assignment: ArchetypeAssignment,
  ): Promise<ServiceResult<DeckIdentity, "UNAVAILABLE">>;
}
