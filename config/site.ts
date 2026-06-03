export const siteConfig = {
  name: "ProxyMarket",
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || "ProxyMarket",
  companyLegalName: process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME || "",
  companyNumber: process.env.NEXT_PUBLIC_COMPANY_NUMBER || "",
  companyVat: process.env.NEXT_PUBLIC_COMPANY_VAT || "",
  companyAddress: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "",
  companyEmail: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "",
  companyPhone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "",
  testMode: process.env.NEXT_PUBLIC_PAYMENT_TEST_MODE === "true",
  baseCurrency: (process.env.NEXT_PUBLIC_BASE_CURRENCY as "EUR" | "USD" | "UAH") || "EUR",
  supportedCurrencies: ["EUR", "USD", "UAH"] as const,
  frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
} as const;

export type SupportedCurrency = (typeof siteConfig.supportedCurrencies)[number];
