import { products, ProductId } from "./products";

export interface PricingPlan {
  productId: ProductId;
  name: string;
  /** Ready package sold for this plan at the fixed amounts in PACKAGE_PRICES_EUR. */
  packageId?: string;
  /** Shown instead of a price while the plan is not on sale. */
  price?: string;
  unit?: string;
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
    packageId: "datacenter-daily",
    bestFor: "Speed-focused public data workflows",
    protocol: "HTTP / SOCKS5",
    rotation: "Static or rotating",
    bandwidth: "Daily or pay-per-GB",
    cta: "Configure",
  },
  {
    productId: "datacenter",
    name: "Datacenter GB",
    packageId: "datacenter-traffic",
    bestFor: "Flexible traffic-based usage",
    protocol: "HTTP / SOCKS5",
    rotation: "Pool-based",
    bandwidth: "Pay-per-GB",
    cta: "Configure",
  },
  {
    productId: "static-residential",
    name: "Static ISP",
    packageId: "static-isp-daily",
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
    packageId: "static-isp-traffic",
    bestFor: "Residential-style traffic without commitment",
    protocol: "HTTP / SOCKS5",
    rotation: "Sticky",
    bandwidth: "Pay-per-GB",
    cta: "Configure",
  },
  {
    productId: "residential",
    name: "Residential Pool",
    packageId: "residential-traffic",
    bestFor: "Distributed public web data",
    protocol: "HTTP / SOCKS5",
    rotation: "Rotating / sticky",
    bandwidth: "Pay-per-GB",
    cta: "Configure",
  },
  {
    productId: "mobile",
    name: "Mobile Daily",
    packageId: "mobile-daily",
    bestFor: "Mobile QA and ad verification",
    protocol: "HTTP / SOCKS5",
    rotation: "Manual / API",
    bandwidth: "Daily",
    cta: "Configure",
  },
  {
    productId: "mobile",
    name: "Mobile GB",
    packageId: "mobile-traffic",
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
