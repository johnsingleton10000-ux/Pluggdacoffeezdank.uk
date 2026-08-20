import type {
  ArchetypeCode,
  ArchetypeScores,
  Avatar,
} from "../../../types/dcbd";

export interface AvatarMatcher {
  match(input: {
    archetype: ArchetypeCode;
    scores: ArchetypeScores;
    candidates: Avatar[];
  }): Promise<Avatar>;
}

export class UnconfiguredAvatarMatcher implements AvatarMatcher {
  async match(): Promise<never> {
    throw new Error("Avatar matching is not configured yet.");
  }
}
