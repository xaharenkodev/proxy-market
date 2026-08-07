import { describe, expect, it } from "vitest";
import { generateInvoicePdf } from "@/src/lib/invoice";

describe("invoice PDF", () => {
  it("creates a PDF attachment", async () => {
    const pdf = await generateInvoicePdf({
      invoiceNumber: "INV-20260101-TEST",
      issuedAt: new Date("2026-01-01T00:00:00.000Z"),
      customer: { name: "Test Customer", email: "test@example.com" },
      description: "Wallet top-up",
      amount: 25,
      currency: "EUR",
      amountGBP: 21.5,
      reference: "TXN-TEST",
    });
    expect(Buffer.from(pdf).subarray(0, 4).toString()).toBe("%PDF");
  });
});
