import { describe, expect, it } from "vitest";
import { getTier, packageTemplates, PACKAGE_PRICES_EUR } from "@/config/packages";

describe("ready packages", () => {
  it("sells every package only at the fixed amounts", () => {
    for (const template of packageTemplates) {
      expect(template.tiers.map((tier) => tier.priceEUR)).toEqual([...PACKAGE_PRICES_EUR]);
    }
  });

  it("gives more access for every larger amount", () => {
    for (const template of packageTemplates) {
      const amounts = template.tiers.map((tier) => tier.amount);
      expect(amounts).toEqual([...amounts].sort((a, b) => a - b));
      expect(new Set(amounts).size).toBe(amounts.length);
    }
  });

  it("rejects an amount that is not a package price", () => {
    expect(getTier(packageTemplates[0], 32.7)).toBeUndefined();
  });
});
