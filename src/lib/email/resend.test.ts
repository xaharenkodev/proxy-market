import { beforeEach, describe, expect, it, vi } from "vitest";

const resendMock = vi.hoisted(() => ({ send: vi.fn() }));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: resendMock.send };
  },
}));

vi.mock("@/src/config/env", () => ({
  env: {
    RESEND_API: "test-api-key",
    EMAIL_FROM: "Billing <billing@example.test>",
    APP_URL: "https://example.test",
    COMPANY_EMAIL: "billing@example.test",
    COMPANY_NAME: "Virenza Proxy",
  },
}));

import { sendTopUpEmail } from "@/src/lib/email/resend";

describe("Resend invoice delivery", () => {
  beforeEach(() => {
    resendMock.send.mockReset();
    resendMock.send.mockResolvedValue({ data: { id: "email_123" }, error: null });
  });

  it("attaches the generated PDF invoice and returns the Resend email id", async () => {
    const result = await sendTopUpEmail(
      { name: "Test Customer", email: "customer@example.test" },
      { invoiceNumber: "INV-TEST-001", reference: "TXN-001", amount: 25, currency: "EUR", amountGBP: 21.5 }
    );

    expect(result).toEqual({ sent: true, id: "email_123" });
    const [message, options] = resendMock.send.mock.calls[0];
    expect(message.attachments[0].filename).toBe("INV-TEST-001.pdf");
    expect(Buffer.from(message.attachments[0].content).subarray(0, 4).toString()).toBe("%PDF");
    expect(options).toEqual({ idempotencyKey: "top-up/TXN-001/INV-TEST-001" });
  });
});
