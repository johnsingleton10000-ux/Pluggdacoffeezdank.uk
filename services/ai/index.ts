import { DcbdConfigError } from "@/lib/errors";
import type { DcbdAiProvider } from "@/types/ai";

export class UnconfiguredAiProvider implements DcbdAiProvider {
  analyseBloodTest(): Promise<never> {
    return this.unavailable();
  }
  matchAvatar(): Promise<never> {
    return this.unavailable();
  }
  generateStarterDeckPersonality(): Promise<never> {
    return this.unavailable();
  }
  generateDeckName(): Promise<never> {
    return this.unavailable();
  }
  planStarterDeck(): Promise<never> {
    return this.unavailable();
  }

  private unavailable(): Promise<never> {
    return Promise.reject(
      new DcbdConfigError("No AI provider is configured. The provider can be swapped without rewriting DCBD services."),
    );
  }
}

let provider: DcbdAiProvider = new UnconfiguredAiProvider();

export function setAiProvider(next: DcbdAiProvider): void {
  provider = next;
}

export function getAiProvider(): DcbdAiProvider {
  return provider;
}
