import { describe, expect, it } from "vitest";
import { migrateStoredCurrency } from "@/config/currency";

describe("stored currency migration", () => {
  it("keeps supported checkout currencies", () => {
    expect(migrateStoredCurrency("GBP")).toBe("GBP");
    expect(migrateStoredCurrency("USD")).toBe("USD");
  });

  it("migrates retired currencies and invalid values to EUR", () => {
    expect(migrateStoredCurrency("UAH")).toBe("EUR");
    expect(migrateStoredCurrency("PLN")).toBe("EUR");
    expect(migrateStoredCurrency(null)).toBe("EUR");
  });
});
