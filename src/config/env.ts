function optional(key: string, fallback: string): string {
  return process.env[key] || fallback;
}

export const env = {
  get MONGODB_URI() {
    return process.env.MONGODB_URI;
  },
  get RESEND_API() {
    return process.env.RESEND_API;
  },
  get EMAIL_FROM() {
    return process.env.EMAIL_FROM;
  },
  get APP_URL() {
    return optional("APP_URL", "http://localhost:3000");
  },
  get PAYMENT_TEST_MODE() {
    return process.env.PAYMENT_TEST_MODE === "true";
  },
  get BASE_CURRENCY() {
    return optional("NEXT_PUBLIC_BASE_CURRENCY", "EUR") as "EUR" | "GBP" | "USD";
  },
  get COMPANY_EMAIL() {
    return optional("COMPANY_EMAIL", process.env.EMAIL_FROM || "");
  },
  get COMPANY_NAME() {
    return optional("NEXT_PUBLIC_COMPANY_NAME", "Virenza Proxy");
  },
};
