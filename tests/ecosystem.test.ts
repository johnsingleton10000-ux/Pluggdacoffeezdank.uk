import { quoteCart } from "@/services/ecommerce";
import { analyseBloodTest } from "@/services/blood-test";
import { resolveFlip } from "@/services/flip";
import { describe, expect, it } from "vitest";

describe("commerce quote", () => {
  it("uses catalogue prices instead of client numbers", () => {
    const quote = quoteCart([{ id: "p050", qty: 2 }]);
    expect(quote.subtotalGbp).toBe(29.98);
    expect(quote.lines[0]?.unitPriceGbp).toBe(14.99);
  });

  it("marks £40+ orders as card-exchange eligible", () => {
    const quote = quoteCart([{ id: "p051", qty: 1 }]);
    expect(quote.cardExchangeEligible).toBe(true);
  });
});

describe("blood test", () => {
  it("prefers attack language over a random roll", () => {
    const result = analyseBloodTest(
      {
        war: "I charge the front line first and strike with force.",
        philosophy: "Power is something I take by force on the flip.",
        society: "Every man lives or dies by his own holster.",
      },
      "SHADOW",
    );
    expect(result.match.archetypeId === "attack" || result.match.leadingDimensions[0] === "attack").toBe(true);
  });

  it("prefers control language", () => {
    const result = analyseBloodTest(
      {
        war: "I wait for the smoke and read the table with a calm plan.",
        philosophy: "Power is grown by staying silent until the moment is perfect.",
        society: "The strong protect the weak and master the crease with patience.",
      },
      "LOTUS",
    );
    expect(["control", "defence_control", "defence"].includes(result.match.archetypeId)).toBe(true);
  });
});

describe("flip resolve", () => {
  it("rejects an incomplete hand", () => {
    expect(() =>
      resolveFlip({ seed: "x", choice: "attack", handCardIds: ["f3-fist", "f3-shield"] as unknown as [string, string, string] }),
    ).toThrow();
  });
});
