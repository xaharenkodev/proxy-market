import { describe, expect, it } from "vitest";
import { canApprovePaymentAttempt } from "@/src/lib/paymentAttempt";

describe("payment attempt approval", () => {
  const pending = { status: "pending" as const, amount: 25, currency: "EUR" as const };

  it("accepts only a matching pending payment", () => {
    expect(canApprovePaymentAttempt(pending, 25, "EUR")).toBe(true);
    expect(canApprovePaymentAttempt(pending, 25, "USD")).toBe(false);
    expect(canApprovePaymentAttempt(pending, 26, "EUR")).toBe(false);
  });

  it("does not approve an already approved payment again", () => {
    expect(canApprovePaymentAttempt({ ...pending, status: "approved" }, 25, "EUR")).toBe(false);
  });
});
