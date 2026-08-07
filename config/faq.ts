export interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Products" | "Billing" | "Compliance" | "Dashboard";
}

export const faqItems: FAQItem[] = [
  {
    category: "Products",
    question: "What proxy types do you offer?",
    answer:
      "Datacenter, static residential (ISP), residential and mobile proxies. SERP and eCommerce scraping APIs are on the roadmap and marked as coming soon.",
  },
  {
    category: "Products",
    question: "What is the difference between datacenter and residential proxies?",
    answer:
      "Datacenter proxies run on hosting infrastructure: fast, cheap and ideal for high-throughput work against targets that do not scrutinise network origin. Residential proxies use addresses associated with consumer internet connections, which most websites treat as ordinary traffic. Start with datacenter and move a target to residential only if it blocks you.",
  },
  {
    category: "Products",
    question: "Do you support HTTP and SOCKS5?",
    answer:
      "Yes. Every proxy supports HTTP, HTTPS and SOCKS5, with authentication by username and password or by IP whitelist.",
  },
  {
    category: "Products",
    question: "Can I choose a country?",
    answer:
      "Yes. Country targeting is available across our supported locations, with city and carrier targeting where the product and location support it. Geolocation is derived from third-party databases and is best-effort below country level.",
  },
  {
    category: "Billing",
    question: "How does billing work?",
    answer:
      "You top up your wallet and buy proxy services in EUR, GBP or USD. Your selected currency is used for checkout and your Invoice / Receipt; the final amount is shown before you confirm.",
  },
  {
    category: "Billing",
    question: "Can I get a refund?",
    answer:
      "Proxy access is a digital service, so refund rights are limited once credentials are issued, access is activated or traffic is consumed. Duplicate payments, billing errors and orders that were never activated are refundable. See the Refund & Cancellation Policy for the full position.",
  },
  {
    category: "Dashboard",
    question: "Do you offer rotating sessions?",
    answer:
      "Yes. Rotating exits give you a fresh IP per request, and sticky sessions hold one address across a multi-step flow. Session duration and stability depend on the product and the underlying network.",
  },
  {
    category: "Compliance",
    question: "What activities are prohibited?",
    answer:
      "Spam, phishing, credential stuffing, brute force, carding and payment fraud, malware distribution, unauthorised access, denial-of-service traffic, mass account creation, platform manipulation, sanctions evasion and any unlawful activity. The Acceptable Use Policy sets this out in full.",
  },
  {
    category: "Compliance",
    question: "Will a proxy guarantee access to a specific website?",
    answer:
      "No. Third-party websites may block, rate-limit, challenge or blacklist proxy traffic at any time based on signals we do not control. We do not guarantee that any proxy, IP, location or protocol will work with a particular platform.",
  },
  {
    category: "Products",
    question: "Are scraping APIs available?",
    answer:
      "Not yet. The SERP Scraping API and eCommerce Scraping API are in development. Until they ship, run your own collection through our proxies — contact us to join the waitlist.",
  },
  {
    category: "Dashboard",
    question: "How quickly is an order activated?",
    answer:
      "Standard dashboard products are usually available within a few minutes of successful payment. Orders needing manual configuration typically take up to one business day, and custom or high-volume orders one to five business days. Orders subject to fraud, sanctions or compliance review are delayed until the review completes.",
  },
];

export const homepageFaq = faqItems.slice(0, 8);
