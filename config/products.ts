import {
  Boxes,
  Building2,
  Globe2,
  RadioTower,
  Search,
  ShoppingCart,
} from "lucide-react";

export type ProductStatus = "available" | "coming-soon";
export type ProductId =
  | "datacenter"
  | "static-residential"
  | "residential"
  | "mobile"
  | "serp-api"
  | "ecommerce-api";

export interface ProductConfig {
  id: ProductId;
  slug: string;
  name: string;
  shortName: string;
  category: "Proxies" | "Scraping APIs";
  status: ProductStatus;
  description: string;
  longDescription: string;
  startingPriceLabel: string;
  pricing: string[];
  features: string[];
  protocols: string[];
  rotationSupport: string;
  authMethods: string[];
  bestFor: string[];
  useCases: string[];
  ctaLabel: string;
  icon: typeof Boxes;
}

export const products: ProductConfig[] = [
  {
    id: "datacenter",
    slug: "datacenter-proxies",
    name: "Datacenter Proxies",
    shortName: "Datacenter",
    category: "Proxies",
    status: "available",
    description:
      "Fast, cost-efficient proxies for high-volume public data workflows, automation and QA.",
    longDescription:
      "Datacenter proxies are built for throughput. Use them when speed, low latency and predictable pricing matter more than residential network characteristics.",
    startingPriceLabel: "from €1.09/day or €1.60/GB",
    pricing: ["€1.09/day", "€1.60/GB"],
    features: ["High speed", "Low latency", "Dedicated or shared options", "Country selection", "Pay-per-day and pay-per-GB"],
    protocols: ["HTTP", "SOCKS5"],
    rotationSupport: "Static and rotating options",
    authMethods: ["Username/password", "IP whitelist"],
    bestFor: ["High-volume public data", "Automation workflows", "QA and localization testing"],
    useCases: ["Web scraping", "SEO monitoring", "Ecommerce monitoring"],
    ctaLabel: "Configure datacenter proxies",
    icon: Building2,
  },
  {
    id: "static-residential",
    slug: "static-residential-proxies",
    name: "Static Residential / ISP Proxies",
    shortName: "Static ISP",
    category: "Proxies",
    status: "available",
    description:
      "Stable long-session residential-style IPs for monitoring tools, account workflows and business operations.",
    longDescription:
      "Static ISP proxies provide a consistent IP identity with a residential-style trust profile. They are best when long sessions and predictable endpoints are more important than large rotating pools.",
    startingPriceLabel: "from €1.39/day or €3.49/GB",
    pricing: ["€1.39/day", "€3.49/GB"],
    features: ["Stable IP identity", "Long sessions", "Country targeting", "Daily and monthly options", "ISP/residential trust profile"],
    protocols: ["HTTP", "SOCKS5"],
    rotationSupport: "Sticky sessions",
    authMethods: ["Username/password", "IP whitelist"],
    bestFor: ["Account workflows", "Monitoring dashboards", "Geo-specific testing"],
    useCases: ["Ad verification", "Market research", "Social media management"],
    ctaLabel: "Configure static ISP proxies",
    icon: RadioTower,
  },
  {
    id: "residential",
    slug: "residential-proxies",
    name: "Residential Proxies",
    shortName: "Residential",
    category: "Proxies",
    status: "available",
    description:
      "Rotating residential proxy pool for public web data, research and geo-specific access.",
    longDescription:
      "Residential proxies route requests through a flexible pool with country targeting and sticky session options. They are suited to distributed public data collection and regional research.",
    startingPriceLabel: "from €2.19/GB",
    pricing: ["€2.19/GB"],
    features: ["Rotating IP pool", "Sticky sessions", "Country targeting", "Flexible bandwidth", "Good for research workflows"],
    protocols: ["HTTP", "SOCKS5"],
    rotationSupport: "Rotating and sticky sessions",
    authMethods: ["Username/password", "IP whitelist"],
    bestFor: ["Public web data", "Market research", "Regional analytics"],
    useCases: ["Web scraping", "Market research", "Geo-specific testing"],
    ctaLabel: "Configure residential proxies",
    icon: Globe2,
  },
  {
    id: "mobile",
    slug: "mobile-proxies",
    name: "Mobile Proxies",
    shortName: "Mobile",
    category: "Proxies",
    status: "available",
    description:
      "High-trust 4G/5G mobile proxy workflows for mobile testing, ad verification and regional QA.",
    longDescription:
      "Mobile proxies route traffic through IP addresses associated with mobile carrier networks, which is the context mobile-targeted content and advertising is actually served in. Carrier and region targeting is available where the location supports it.",
    startingPriceLabel: "from €5.99/day or €6.49/GB",
    pricing: ["€5.99/day", "€6.49/GB"],
    features: ["4G/5G networks", "Carrier targeting", "Manual and API rotation", "Daily and GB-based pricing", "High trust score"],
    protocols: ["HTTP", "SOCKS5"],
    rotationSupport: "Manual and API rotation",
    authMethods: ["Username/password", "IP whitelist"],
    bestFor: ["Mobile QA", "Ad verification", "Geo-specific mobile workflows"],
    useCases: ["Ad verification", "Geo-specific testing", "Market research"],
    ctaLabel: "Configure mobile proxies",
    icon: RadioTower,
  },
  {
    id: "serp-api",
    slug: "serp-scraping-api",
    name: "SERP Scraping API",
    shortName: "SERP API",
    category: "Scraping APIs",
    status: "coming-soon",
    description:
      "A future API for collecting structured search engine result data at scale.",
    longDescription:
      "The SERP Scraping API is planned for teams that need search result monitoring without managing proxy routing directly.",
    startingPriceLabel: "Coming soon",
    pricing: ["Coming soon"],
    features: ["Structured SERP data", "Regional search checks", "API-first workflow", "Waitlist available"],
    protocols: ["API"],
    rotationSupport: "Managed by API",
    authMethods: ["API key"],
    bestFor: ["SEO reporting", "Search visibility", "Rank monitoring"],
    useCases: ["SEO monitoring", "Market research"],
    ctaLabel: "Join waitlist",
    icon: Search,
  },
  {
    id: "ecommerce-api",
    slug: "ecommerce-scraping-api",
    name: "eCommerce Scraping API",
    shortName: "eCommerce API",
    category: "Scraping APIs",
    status: "coming-soon",
    description:
      "A future API for ecommerce product, price and availability monitoring.",
    longDescription:
      "The eCommerce Scraping API is planned for catalog, price and stock monitoring teams that want structured data without operating crawler infrastructure.",
    startingPriceLabel: "Coming soon",
    pricing: ["Coming soon"],
    features: ["Product data", "Price monitoring", "Availability checks", "Waitlist available"],
    protocols: ["API"],
    rotationSupport: "Managed by API",
    authMethods: ["API key"],
    bestFor: ["Price monitoring", "Catalog intelligence", "Stock checks"],
    useCases: ["Ecommerce monitoring", "Market research"],
    ctaLabel: "Join waitlist",
    icon: ShoppingCart,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export const availableProducts = products.filter((product) => product.status === "available");
export const comingSoonProducts = products.filter((product) => product.status === "coming-soon");
