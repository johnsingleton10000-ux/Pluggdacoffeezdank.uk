import { nullAiProvider } from "@/domains/ai/null-provider";
import type { DcbdAiProvider } from "@/domains/ai/types";

let currentProvider: DcbdAiProvider = nullAiProvider;

export function getAiProvider(): DcbdAiProvider {
  return currentProvider;
}

export function setAiProvider(provider: DcbdAiProvider): void {
  currentProvider = provider;
}

export type {
  AvatarMatchInput,
  BloodTestAnalysisInput,
  DcbdAiProvider,
  DeckNameInput,
  StarterDeckPersonalityInput,
} from "@/domains/ai/types";
export { nullAiProvider } from "@/domains/ai/null-provider";
