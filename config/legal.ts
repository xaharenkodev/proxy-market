import { siteConfig } from "./site";

export const legalPages = {
  terms: {
    title: "Terms of Service",
    updated: "June 1, 2026",
    sections: [
      {
        title: "Service scope",
        content: `${siteConfig.companyName} provides a proxy marketplace interface for lawful business use cases such as public data collection, SEO monitoring, ecommerce monitoring, ad verification and geo-specific testing. Some provisioning features are not connected in this frontend phase.`,
      },
      {
        title: "Accounts and balance",
        content:
          "Users are responsible for maintaining accurate account information and protecting account access. The existing balance system may be used for supported purchases and top-ups where enabled.",
      },
      {
        title: "Orders and provisioning",
        content:
          "Orders shown in the dashboard may include pending provisioning states until backend proxy fulfillment is connected. Do not rely on placeholder screens as production proxy credentials.",
      },
      {
        title: "Acceptable use",
        content:
          "You may not use the service for spam, phishing, brute force, credential stuffing, carding, malware, unauthorized access, attacks against third-party systems, illegal activity or violation of third-party rights.",
      },
      {
        title: "Contact",
        content:
          "Questions about these terms can be sent through the contact page or the support area in the dashboard.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    updated: "June 1, 2026",
    sections: [
      {
        title: "Information we collect",
        content:
          "We collect account, contact and billing-related information required to operate the service. The current project stores account and balance data using the existing backend.",
      },
      {
        title: "How information is used",
        content:
          "Information is used to provide account access, support, transaction history, service notifications and operational security.",
      },
      {
        title: "Service communications",
        content:
          "Transactional email may be sent through the existing email integration for account, top-up, order and contact events.",
      },
      {
        title: "Security",
        content:
          "We apply reasonable safeguards and recommend strong passwords. Users are responsible for keeping credentials confidential.",
      },
    ],
  },
  acceptableUse: {
    title: "Acceptable Use Policy",
    updated: "June 1, 2026",
    sections: [
      {
        title: "Lawful use only",
        content:
          "Services may only be used for lawful business purposes, public data workflows, testing, monitoring, research and legitimate operational tasks.",
      },
      {
        title: "Prohibited activity",
        content:
          "Spam, phishing, brute force, credential stuffing, carding, malware, illegal activity, unauthorized access, attacks against third-party systems, platform abuse and violation of third-party rights are prohibited.",
      },
      {
        title: "Investigation and suspension",
        content:
          "Accounts associated with abusive or unlawful activity may be limited, suspended or terminated. We may request additional context for high-risk usage.",
      },
      {
        title: "Reporting abuse",
        content:
          "Potential abuse can be reported through the contact page. Include relevant account, order or traffic details where available.",
      },
    ],
  },
  refund: {
    title: "Refund Policy",
    updated: "June 1, 2026",
    sections: [
      {
        title: "Balance top-ups",
        content:
          "Top-up behavior follows the existing balance system. Where test mode is enabled, no real payment is processed.",
      },
      {
        title: "Proxy provisioning",
        content:
          "Because real proxy provisioning is not connected in this frontend phase, proxy purchase controls clearly show pending or disabled states instead of pretending to deliver credentials.",
      },
      {
        title: "Support review",
        content:
          "If a payment or order issue occurs after backend provisioning is connected, contact support for review.",
      },
    ],
  },
};
