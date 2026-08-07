import { describe, expect, it } from "vitest";
import { calculateProxyPrice } from "@/src/lib/pricing";

describe("proxy pricing", () => {
  it("matches the Datacenter daily ready package for 30 days", () => {
    expect(calculateProxyPrice({ proxyType: "datacenter", duration: "daily", quantity: 1, durationQuantity: 30 }).estimatedPriceEUR).toBe(32.7);
  });

  it("matches the Datacenter traffic ready package for 10 GB", () => {
    expect(calculateProxyPrice({ proxyType: "datacenter", duration: "pay-per-gb", quantity: 1, durationQuantity: 10, bandwidthGb: 10 }).estimatedPriceEUR).toBe(16);
  });
});
