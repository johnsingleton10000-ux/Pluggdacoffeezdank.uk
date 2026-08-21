import { matchAvatar } from "@/services/avatar";
import { analyseBloodTest } from "@/services/blood-test";
import { planStarterDeck } from "@/services/deck";

/** Local AI layer: language scoring, not a random roll. Swap provider later. */
export function runOnboardingAi(answers: Record<string, string>, estateName: string) {
  const analysis = analyseBloodTest(answers, estateName);
  const avatar = matchAvatar(analysis.match.archetypeId);
  const deck = planStarterDeck(analysis.match.archetypeId);
  return { ...analysis, avatar, deck };
}
