import type { LegalDoc } from "./types";

export const acceptableUsePolicy: LegalDoc = {
  slug: "acceptable-use-policy",
  title: "Acceptable Use Policy",
  updated: "August 26, 2026",
  intro: [
    { type: "p", text: "This Policy explains the lawful and responsible use required for Virenza Proxy services." },
    { type: "p", text: "This policy applies to the website, dashboard and services offered under the Virenza Proxy brand. The service provider is VIRENZA LTD, company number 17231719, of Dept 6814, 196 High Road, Wood Green, London, United Kingdom, N22 8HH (\"Virenza Proxy\", \"we\", \"us\" or \"our\"). You may contact us at info@virenzaproxy.com." },
  ],
  sections: [
    {
      title: "Lawful Use",
      blocks: [
        { type: "p", text: "You may use the Service only for lawful, authorised and responsible business, research, testing, monitoring and public-web-data workflows. You are responsible for obtaining all permissions, notices and legal bases required for your activity." },
      ],
    },
    {
      title: "Prohibited Activity",
      blocks: [
        { type: "p", text: "You must not use the Service for spam, phishing, malware, ransomware, credential theft, brute-force activity, account takeover, payment fraud, carding, deception, unlawful surveillance, DDoS attacks, unauthorised vulnerability scanning, exploitation or disruption of systems." },
        { type: "p", text: "You must not use the Service to access non-public systems or data without authorisation, evade access controls, conduct unlawful personal-data collection, infringe intellectual-property rights or manipulate accounts, reviews, advertising or marketplaces." },
      ],
    },
    {
      title: "Third-Party Rules",
      blocks: [
        { type: "p", text: "You must comply with the terms, rules, robots controls and technical restrictions of third-party websites and platforms to the extent applicable to your use. A third party blocking proxy traffic does not make the Service defective." },
      ],
    },
    {
      title: "Credentials and Resale",
      blocks: [
        { type: "p", text: "You must protect credentials and must not share access outside your organisation unless we have expressly approved the arrangement. You remain responsible for all end-user activity conducted through your account." },
      ],
    },
    {
      title: "Enforcement",
      blocks: [
        { type: "p", text: "We may monitor limited technical and usage information, investigate reports and take proportionate action, including warnings, destination blocks, rate limits, suspension and termination. Serious abuse may result in immediate termination and reporting to appropriate providers or authorities." },
      ],
    },
  ],
};
