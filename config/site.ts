export const siteConfig = {
  name: "Virenza Proxy",
  companyName: "Virenza Proxy",
  companyLegalName: "VIRENZA LTD",
  companyNumber: "17231719",
  companyType: "Private limited company",
  companyVat: "",
  companyAddress: "Dept 6814, 196 High Road, Wood Green, London, United Kingdom, N22 8HH",
  companyEmail: "info@virenzaproxy.com",
  // No published business phone number yet. Rendered only when set.
  companyPhone: "",
  companyJurisdiction: "England and Wales",
  testMode: process.env.NEXT_PUBLIC_PAYMENT_TEST_MODE === "true",
  baseCurrency: (process.env.NEXT_PUBLIC_BASE_CURRENCY as "EUR" | "USD" | "UAH") || "EUR",
  supportedCurrencies: ["EUR", "USD", "UAH"] as const,
  frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || "https://www.virenzaproxy.com",
} as const;

export type SupportedCurrency = (typeof siteConfig.supportedCurrencies)[number];
