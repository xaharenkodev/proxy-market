export interface PackageTemplate {
  id: string;
  name: string;
  proxyType: string;
  protocol: string;
  rotation: string;
  authMethod: string;
  quantity: number;
  bandwidthGb: number;
  duration: string;
  durationDays?: number;
  unitPriceEUR: number;
  priceUnit: string;
  priceEUR: number;
  bestFor: string;
  features: string[];
  highlighted?: boolean;
  productLabel: string;
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
    bandwidthGb: 0,
    duration: "daily",
    durationDays: 30,
    unitPriceEUR: 1.09,
    priceUnit: "/day",
    priceEUR: 32.70,
    bestFor: "High-speed automation and scraping",
    features: ["HTTP/SOCKS5", "Rotating or static", "1 proxy × 30 days"],
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
    bandwidthGb: 10,
    duration: "pay-per-gb",
    unitPriceEUR: 1.60,
    priceUnit: "/GB",
    priceEUR: 16.00,
    bestFor: "Pay-per-use data collection",
    features: ["HTTP/SOCKS5", "Pool-based", "10 GB traffic"],
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
    bandwidthGb: 0,
    duration: "daily",
    durationDays: 30,
    unitPriceEUR: 1.39,
    priceUnit: "/day",
    priceEUR: 41.70,
    bestFor: "Stable sessions and account management",
    features: ["HTTP/SOCKS5", "Sticky session", "1 proxy × 30 days"],
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
    bandwidthGb: 5,
    duration: "pay-per-gb",
    unitPriceEUR: 3.49,
    priceUnit: "/GB",
    priceEUR: 17.45,
    bestFor: "ISP-grade trust without daily commitment",
    features: ["HTTP/SOCKS5", "Sticky session", "5 GB traffic"],
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
    bandwidthGb: 5,
    duration: "pay-per-gb",
    unitPriceEUR: 2.19,
    priceUnit: "/GB",
    priceEUR: 10.95,
    bestFor: "Market research and public web data",
    features: ["HTTP/SOCKS5", "Rotating pool", "5 GB traffic"],
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
    bandwidthGb: 0,
    duration: "daily",
    durationDays: 30,
    unitPriceEUR: 5.99,
    priceUnit: "/day",
    priceEUR: 179.70,
    bestFor: "Ad verification and mobile QA",
    features: ["HTTP/SOCKS5", "4G/5G network", "1 proxy × 30 days"],
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
    bandwidthGb: 2,
    duration: "pay-per-gb",
    unitPriceEUR: 6.49,
    priceUnit: "/GB",
    priceEUR: 12.98,
    bestFor: "Flexible mobile network access",
    features: ["HTTP/SOCKS5", "4G/5G network", "2 GB traffic"],
  },
];

export function getTemplateById(id: string) {
  return packageTemplates.find((t) => t.id === id);
}

export function getTemplatesForProductLabel(label: string) {
  return packageTemplates.filter((t) => t.productLabel === label);
}
