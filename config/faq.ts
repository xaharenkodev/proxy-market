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
      "The frontend presents datacenter, static residential/ISP, residential and mobile proxies. SERP and eCommerce scraping APIs are marked as coming soon.",
  },
  {
    category: "Products",
    question: "What is the difference between datacenter and residential proxies?",
    answer:
      "Datacenter proxies prioritize speed and cost efficiency. Residential proxies provide broader network diversity for public data workflows and regional research.",
  },
  {
    category: "Products",
    question: "Do you support HTTP and SOCKS5?",
    answer:
      "The product UI supports HTTP and SOCKS5 selections. Actual provisioning is not connected in this frontend phase.",
  },
  {
    category: "Products",
    question: "Can I choose a country?",
    answer:
      "Yes, the buying UI supports country selection and shows city/carrier placeholders where relevant.",
  },
  {
    category: "Billing",
    question: "How does billing work?",
    answer:
      "The interface uses EUR pricing. The existing backend balance/top-up flow is preserved and proxy provisioning remains pending until backend support is connected.",
  },
  {
    category: "Dashboard",
    question: "Do you offer rotating sessions?",
    answer:
      "The UI supports rotating and sticky session choices. Real rotation controls require future provisioning integration.",
  },
  {
    category: "Compliance",
    question: "What activities are prohibited?",
    answer:
      "Spam, phishing, brute force, credential stuffing, carding, malware, unauthorized access, illegal activity and attacks against third-party systems are prohibited.",
  },
  {
    category: "Products",
    question: "Are scraping APIs available?",
    answer:
      "SERP Scraping API and eCommerce Scraping API pages are included as coming soon with waitlist/contact CTAs only.",
  },
  {
    category: "Dashboard",
    question: "Will the dashboard show real credentials?",
    answer:
      "Not in this phase. Credential and whitelist screens are clearly marked as UI placeholders until backend provisioning is connected.",
  },
];

export const homepageFaq = faqItems.slice(0, 8);
