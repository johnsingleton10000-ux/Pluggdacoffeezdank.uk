import type { AvatarDefinition } from "@/domains/avatars/types";
import type {
  BloodTestResult,
  StrategyScores,
} from "@/domains/blood-test/types";

export interface StarterDeckConcept {
  name: string;
  personality: string;
}

export interface IdentityGenerationRequest {
  result: BloodTestResult;
  availableAvatars: readonly AvatarDefinition[];
}

export interface IdentityGenerationResult {
  strategicScores: StrategyScores;
  selectedAvatarId: string;
  starterDeck: StarterDeckConcept;
  providerReference: string | null;
}

export interface IdentityProvider {
  generateIdentity(
    request: IdentityGenerationRequest,
  ): Promise<IdentityGenerationResult>;
}

export class IdentityProviderNotConfiguredError extends Error {
  constructor() {
    super("No DCBD identity provider has been configured.");
    this.name = "IdentityProviderNotConfiguredError";
  }
}

export function getIdentityProvider(): IdentityProvider {
  throw new IdentityProviderNotConfiguredError();
}
