/**
 * Every package is sold at one of these fixed amounts, so each checkout charges
 * a standard figure instead of a total that depends on the chosen quantity.
 */
export const PACKAGE_PRICES_EUR = [20, 25, 50, 100] as const;

/** "€20 · €25 · €50 · €100", for price lists and plan cards. */
export const packagePricesLabel = PACKAGE_PRICES_EUR.map((price) => `€${price}`).join(" · ");

export interface PackageTier {
  priceEUR: number;
  /** Access days for daily packages, GB of prepaid traffic for traffic packages. */
  amount: number;
}

export interface PackageTemplate {
  id: string;
  name: string;
  proxyType: string;
  protocol: string;
  rotation: string;
  authMethod: string;
  quantity: number;
  duration: "daily" | "pay-per-gb";
  priceUnit: string;
  /** Fixed one-time packages, one per amount in PACKAGE_PRICES_EUR. */
  tiers: PackageTier[];
  bestFor: string;
  features: string[];
  highlighted?: boolean;
  productLabel: string;
}

function tiersOf(...amounts: number[]): PackageTier[] {
  return PACKAGE_PRICES_EUR.map((priceEUR, index) => ({ priceEUR, amount: amounts[index] }));
}

export const packageTemplates: PackageTemplate[] = [
  {
    id: "datacenter-daily",
    name: "Datacenter Proxies — Daily",
    productLabel: "Datacenter",
    proxyType: "datacenter",
    protocol: "HTTP",
    rotation: "rotating",
    authMethod: "Username/password",
    quantity: 1,
    duration: "daily",
    priceUnit: "/day",
    tiers: tiersOf(18, 23, 48, 100),
    bestFor: "High-speed automation and scraping",
    features: ["HTTP/SOCKS5", "Rotating or static", "1 dedicated proxy"],
  },
  {
    id: "datacenter-traffic",
    name: "Datacenter Proxies — Traffic",
    productLabel: "Datacenter",
    proxyType: "datacenter",
    protocol: "HTTP",
    rotation: "rotating",
    authMethod: "Username/password",
    quantity: 1,
    duration: "pay-per-gb",
    priceUnit: "/GB",
    tiers: tiersOf(12, 16, 33, 70),
    bestFor: "Pay-per-use data collection",
    features: ["HTTP/SOCKS5", "Pool-based", "Prepaid traffic"],
  },
  {
    id: "static-isp-daily",
    name: "Static Residential / ISP — Daily",
    productLabel: "Static ISP",
    proxyType: "static-residential",
    protocol: "HTTP",
    rotation: "sticky",
    authMethod: "Username/password",
    quantity: 1,
    duration: "daily",
    priceUnit: "/day",
    tiers: tiersOf(14, 18, 38, 80),
    bestFor: "Stable sessions and account management",
    features: ["HTTP/SOCKS5", "Sticky session", "1 dedicated proxy"],
    highlighted: true,
  },
  {
    id: "static-isp-traffic",
    name: "Static Residential / ISP — Traffic",
    productLabel: "Static ISP",
    proxyType: "static-residential",
    protocol: "SOCKS5",
    rotation: "sticky",
    authMethod: "Username/password",
    quantity: 1,
    duration: "pay-per-gb",
    priceUnit: "/GB",
    tiers: tiersOf(6, 7, 15, 32),
    bestFor: "ISP-grade trust without daily commitment",
    features: ["HTTP/SOCKS5", "Sticky session", "Prepaid traffic"],
  },
  {
    id: "residential-traffic",
    name: "Residential Proxies — Traffic",
    productLabel: "Residential",
    proxyType: "residential",
    protocol: "HTTP",
    rotation: "rotating",
    authMethod: "Username/password",
    quantity: 1,
    duration: "pay-per-gb",
    priceUnit: "/GB",
    tiers: tiersOf(9, 11, 24, 50),
    bestFor: "Market research and public web data",
    features: ["HTTP/SOCKS5", "Rotating pool", "Prepaid traffic"],
  },
  {
    id: "mobile-daily",
    name: "Mobile Proxies — Daily",
    productLabel: "Mobile",
    proxyType: "mobile",
    protocol: "HTTP",
    rotation: "rotating",
    authMethod: "Username/password",
    quantity: 1,
    duration: "daily",
    priceUnit: "/day",
    tiers: tiersOf(3, 4, 9, 18),
    bestFor: "Ad verification and mobile QA",
    features: ["HTTP/SOCKS5", "4G/5G network", "1 dedicated proxy"],
  },
  {
    id: "mobile-traffic",
    name: "Mobile Proxies — Traffic",
    productLabel: "Mobile",
    proxyType: "mobile",
    protocol: "HTTP",
    rotation: "rotating",
    authMethod: "Username/password",
    quantity: 1,
    duration: "pay-per-gb",
    priceUnit: "/GB",
    tiers: tiersOf(3, 4, 8, 17),
    bestFor: "Flexible mobile network access",
    features: ["HTTP/SOCKS5", "4G/5G network", "Prepaid traffic"],
  },
];

export function getTemplateById(id: string) {
  return packageTemplates.find((t) => t.id === id);
}

export function getTemplatesForProductLabel(label: string) {
  return packageTemplates.filter((t) => t.productLabel === label);
}

export function getTier(template: PackageTemplate, priceEUR: number) {
  return template.tiers.find((tier) => tier.priceEUR === priceEUR);
}

/** What one tier delivers, e.g. "18 days access" or "12 GB prepaid traffic". */
export function tierAccessLabel(template: PackageTemplate, tier: PackageTier) {
  return template.duration === "daily" ? `${tier.amount} days access` : `${tier.amount} GB prepaid traffic`;
}

/** Effective per-day / per-GB rate of one tier. */
export function tierUnitPriceEUR(tier: PackageTier) {
  return +(tier.priceEUR / tier.amount).toFixed(2);
}

/** Range across all tiers, e.g. "18–100 days access". */
export function tierRangeLabel(template: PackageTemplate) {
  const amounts = template.tiers.map((tier) => tier.amount);
  const range = `${Math.min(...amounts)}–${Math.max(...amounts)}`;
  return template.duration === "daily" ? `${range} days access` : `${range} GB prepaid traffic`;
}

/** Lowest effective per-day / per-GB rate across all tiers. */
export function lowestUnitPriceEUR(template: PackageTemplate) {
  return Math.min(...template.tiers.map(tierUnitPriceEUR));
}
