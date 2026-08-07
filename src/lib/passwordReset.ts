import crypto from "crypto";

export const PASSWORD_RESET_TTL_MS = 60 * 60 * 1000;

export function createPasswordResetToken(now = Date.now()) {
  const token = crypto.randomBytes(32).toString("hex");
  return {
    token,
    tokenHash: hashPasswordResetToken(token),
    expiresAt: new Date(now + PASSWORD_RESET_TTL_MS),
  };
}

export function hashPasswordResetToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
