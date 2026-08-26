import { products, ProductId } from "./products";

export interface PricingPlan {
  productId: ProductId;
  name: string;
  amountEUR?: number;
  price: string;
  unit: string;
  /** Access period covered by a single one-time payment (day-based plans). */
  accessDays?: number;
  /** Prepaid traffic covered by a single one-time payment (GB-based plans). */
  packageGb?: number;
  /** Full amount charged once at checkout. Never recurring. */
  totalEUR?: number;
  bestFor: string;
  protocol: string;
  rotation: string;
  bandwidth: string;
  cta: string;
  highlighted?: boolean;
  status?: "available" | "coming-soon";
}

export const pricingPlans: PricingPlan[] = [
  {
    productId: "datacenter",
    name: "Datacenter Daily",
    amountEUR: 1.09,
    price: "€1.09",
    unit: "/day",
    accessDays: 30,
    totalEUR: 32.7,
    bestFor: "Speed-focused public data workflows",
    protocol: "HTTP / SOCKS5",
    rotation: "Static or rotating",
    bandwidth: "Daily or pay-per-GB",
    cta: "Configure",
  },
  {
    productId: "datacenter",
    name: "Datacenter GB",
    amountEUR: 1.6,
    price: "€1.60",
    unit: "/GB",
    packageGb: 10,
    totalEUR: 16,
    bestFor: "Flexible traffic-based usage",
    protocol: "HTTP / SOCKS5",
    rotation: "Pool-based",
    bandwidth: "Pay-per-GB",
    cta: "Configure",
  },
  {
    productId: "static-residential",
    name: "Static ISP",
    amountEUR: 1.39,
    price: "€1.39",
    unit: "/day",
    accessDays: 30,
    totalEUR: 41.7,
    bestFor: "Stable long-session workflows",
    protocol: "HTTP / SOCKS5",
    rotation: "Sticky",
    bandwidth: "Daily or monthly",
    cta: "Configure",
    highlighted: true,
  },
  {
    productId: "static-residential",
    name: "Static ISP GB",
    amountEUR: 3.49,
    price: "€3.49",
    unit: "/GB",
    packageGb: 5,
    totalEUR: 17.45,
    bestFor: "Residential-style traffic without commitment",
    protocol: "HTTP / SOCKS5",
    rotation: "Sticky",
    bandwidth: "Pay-per-GB",
    cta: "Configure",
  },
  {
    productId: "residential",
    name: "Residential Pool",
    amountEUR: 2.19,
    price: "€2.19",
    unit: "/GB",
    packageGb: 5,
    totalEUR: 10.95,
    bestFor: "Distributed public web data",
    protocol: "HTTP / SOCKS5",
    rotation: "Rotating / sticky",
    bandwidth: "Pay-per-GB",
    cta: "Configure",
  },
  {
    productId: "mobile",
    name: "Mobile Daily",
    amountEUR: 5.99,
    price: "€5.99",
    unit: "/day",
    accessDays: 30,
    totalEUR: 179.7,
    bestFor: "Mobile QA and ad verification",
    protocol: "HTTP / SOCKS5",
    rotation: "Manual / API",
    bandwidth: "Daily",
    cta: "Configure",
  },
  {
    productId: "mobile",
    name: "Mobile GB",
    amountEUR: 6.49,
    price: "€6.49",
    unit: "/GB",
    packageGb: 2,
    totalEUR: 12.98,
    bestFor: "Flexible mobile network traffic",
    protocol: "HTTP / SOCKS5",
    rotation: "Manual / API",
    bandwidth: "Pay-per-GB",
    cta: "Configure",
  },
  {
    productId: "serp-api",
    name: "SERP Scraping API",
    price: "Coming",
    unit: "soon",
    bestFor: "Search result monitoring",
    protocol: "API",
    rotation: "Managed",
    bandwidth: "API usage",
    cta: "Join waitlist",
    status: "coming-soon",
  },
  {
    productId: "ecommerce-api",
    name: "eCommerce Scraping API",
    price: "Coming",
    unit: "soon",
    bestFor: "Price and availability monitoring",
    protocol: "API",
    rotation: "Managed",
    bandwidth: "API usage",
    cta: "Join waitlist",
    status: "coming-soon",
  },
];

export const pricingByProduct = products.map((product) => ({
  product,
  plans: pricingPlans.filter((plan) => plan.productId === product.id),
}));
