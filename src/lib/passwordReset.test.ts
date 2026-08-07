import { describe, expect, it } from "vitest";
import { createPasswordResetToken, hashPasswordResetToken, PASSWORD_RESET_TTL_MS } from "@/src/lib/passwordReset";

describe("password reset tokens", () => {
  it("stores only a token hash and gives a one-hour expiry", () => {
    const now = Date.UTC(2026, 0, 1);
    const reset = createPasswordResetToken(now);
    expect(reset.token).not.toBe(reset.tokenHash);
    expect(hashPasswordResetToken(reset.token)).toBe(reset.tokenHash);
    expect(reset.expiresAt.getTime()).toBe(now + PASSWORD_RESET_TTL_MS);
  });
});
