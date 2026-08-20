import { describe, expect, it } from "vitest";

import {
  formatMembershipPrice,
  MEMBERSHIP_PLANS,
} from "@/config/memberships";

describe("membership configuration", () => {
  it("contains only the four specified tiers", () => {
    expect(Object.keys(MEMBERSHIP_PLANS)).toEqual([
      "FREE",
      "ESTATE",
      "ELITE",
      "FOUNDER",
    ]);
  });

  it("stores prices in minor currency units", () => {
    expect(MEMBERSHIP_PLANS.FREE.pricePence).toBe(0);
    expect(MEMBERSHIP_PLANS.ESTATE.pricePence).toBe(599);
    expect(MEMBERSHIP_PLANS.ELITE.pricePence).toBe(1299);
    expect(MEMBERSHIP_PLANS.FOUNDER.pricePence).toBe(2000);
  });

  it("formats configured prices for display", () => {
    expect(formatMembershipPrice(MEMBERSHIP_PLANS.FREE)).toBe("£0");
    expect(formatMembershipPrice(MEMBERSHIP_PLANS.ESTATE)).toBe(
      "£5.99/month",
    );
  });
});
