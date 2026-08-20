import { describe, expect, it } from "vitest";

import { isValidStrategyScores } from "@/features/blood-test/domain";

describe("weighted strategy scores", () => {
  it("accepts finite non-negative dimension scores", () => {
    expect(
      isValidStrategyScores({ control: 46, attack: 34, defence: 20 }),
    ).toBe(true);
  });

  it("rejects negative and non-finite scores", () => {
    expect(
      isValidStrategyScores({ control: -1, attack: 34, defence: 20 }),
    ).toBe(false);
    expect(
      isValidStrategyScores({
        control: Number.NaN,
        attack: 34,
        defence: 20,
      }),
    ).toBe(false);
  });
});
