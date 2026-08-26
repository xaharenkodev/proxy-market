import type { LegalDoc } from "./types";

export const abusePolicy: LegalDoc = {
  slug: "abuse-policy",
  title: "Abuse Reporting Policy",
  updated: "August 26, 2026",
  intro: [
    { type: "p", text: "This Policy explains how to report suspected misuse of Virenza Proxy infrastructure." },
    { type: "p", text: "This policy applies to the website, dashboard and services offered under the Virenza Proxy brand. The service provider is VIRENZA LTD, company number 17231719, of Dept 6814, 196 High Road, Wood Green, London, United Kingdom, N22 8HH (\"Virenza Proxy\", \"we\", \"us\" or \"our\"). You may contact us at info@virenzaproxy.com." },
  ],
  sections: [
    {
      title: "Reporting Channel",
      blocks: [
        { type: "p", text: "Send abuse reports to info@virenzaproxy.com with the subject line \"Abuse Report — [brief description]\". Reports may be submitted by affected websites, platforms, network operators, rights holders, security researchers, providers, authorities or other persons with a legitimate concern." },
      ],
    },
    {
      title: "Information to Include",
      blocks: [
        { type: "p", text: "Please include your contact details and authority to report, a clear description, relevant IPs or endpoints, URLs, timestamps with time zone, logs, request samples, screenshots, affected systems and the action requested. Do not send unnecessary sensitive data, passwords, private keys or payment-card data." },
      ],
    },
    {
      title: "Examples of Abuse",
      blocks: [
        { type: "p", text: "Abuse includes spam, phishing, malware, ransomware, unauthorised access, credential stuffing, DDoS attacks, fraud, unlawful scraping, unlawful personal-data collection, intellectual-property infringement, sanctions evasion and activity that harms or overloads third-party systems." },
      ],
    },
    {
      title: "Review and Investigation",
      blocks: [
        { type: "p", text: "We may review account, allocation, authentication, usage, security and support records to assess a report. Our ability to investigate depends on the quality of the report, availability of records and legal or privacy limits." },
      ],
    },
    {
      title: "Possible Action",
      blocks: [
        { type: "p", text: "We may request more information, contact a customer, warn the customer, block traffic or destinations, apply limits, disable credentials, suspend or terminate access, preserve records or cooperate with providers and authorities where appropriate." },
      ],
    },
    {
      title: "Confidentiality",
      blocks: [
        { type: "p", text: "Submitting a report does not create a right to customer identity, payment records, internal logs or detailed enforcement information. We may keep investigations confidential to protect privacy, security and legal interests." },
      ],
    },
  ],
};
