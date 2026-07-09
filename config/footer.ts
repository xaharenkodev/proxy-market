import { legalIndex } from "./legal";

export const footerColumns = [
  {
    title: "Products",
    links: [
      { href: "/products/datacenter-proxies", label: "Datacenter Proxies" },
      { href: "/products/static-residential-proxies", label: "Static Residential / ISP" },
      { href: "/products/residential-proxies", label: "Residential Proxies" },
      { href: "/products/mobile-proxies", label: "Mobile Proxies" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Use Cases",
    links: [
      { href: "/use-cases/web-scraping", label: "Web Scraping" },
      { href: "/use-cases/seo-monitoring", label: "SEO Monitoring" },
      { href: "/use-cases/ecommerce-monitoring", label: "Ecommerce Monitoring" },
      { href: "/use-cases/ad-verification", label: "Ad Verification" },
      { href: "/use-cases/market-research", label: "Market Research" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/locations", label: "Locations" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
      { href: "/dashboard", label: "Dashboard" },
    ],
  },
  {
    title: "Legal",
    links: legalIndex.map((doc) => ({ href: doc.href, label: doc.label })),
  },
];

export const complianceNote =
  "Virenza Proxy services are intended for lawful business workflows, public data access, testing and monitoring. Abuse, unauthorised access and illegal activity are prohibited.";
