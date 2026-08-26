import type { LegalDoc } from "./types";

export const legalNotice: LegalDoc = {
  slug: "legal-notice",
  title: "Legal Notice / Company Information",
  updated: "August 26, 2026",
  intro: [
    { type: "p", text: "This Legal Notice provides company and contact information for Virenza Proxy." },
    { type: "p", text: "This policy applies to the website, dashboard and services offered under the Virenza Proxy brand. The service provider is VIRENZA LTD, company number 17231719, of Dept 6814, 196 High Road, Wood Green, London, United Kingdom, N22 8HH (\"Virenza Proxy\", \"we\", \"us\" or \"our\"). You may contact us at info@virenzaproxy.com." },
  ],
  sections: [
    {
      title: "Company Details",
      blocks: [
        { type: "p", text: "Legal company name: VIRENZA LTD" },
        { type: "p", text: "Trading name: Virenza Proxy" },
        { type: "p", text: "Company number: 17231719" },
        { type: "p", text: "Registered office: Dept 6814, 196 High Road, Wood Green, London, United Kingdom, N22 8HH" },
        { type: "p", text: "Website: virenzaproxy.com" },
        { type: "p", text: "Email: info@virenzaproxy.com" },
      ],
    },
    {
      title: "Service Description",
      blocks: [
        { type: "p", text: "Virenza Proxy provides digital proxy infrastructure and related technical services for lawful business, research, testing, monitoring and public-web-data workflows. The Service is delivered digitally; no physical goods are shipped." },
      ],
    },
    {
      title: "Contact Channels",
      blocks: [
        { type: "p", text: "General, support, billing, complaints, withdrawal requests, abuse reports and legal requests may be sent to info@virenzaproxy.com. Include sufficient information to identify the relevant account, transaction or event." },
      ],
    },
    {
      title: "Applicable Policies",
      blocks: [
        { type: "p", text: "Use of the Service is subject to the policies in this document, including the Terms & Conditions, Acceptable Use Policy, Privacy Policy, Payment Policy, Refund Policy, Digital Delivery Policy, Fair Usage Policy, Sanctions Policy, Compliance Review Policy, Abuse Reporting Policy and Complaints Policy." },
      ],
    },
    {
      title: "Governing Law",
      blocks: [
        { type: "p", text: "Unless mandatory law provides otherwise, this Legal Notice and the Service are governed by the laws of England and Wales. The courts of England and Wales have jurisdiction, subject to any mandatory consumer protections." },
      ],
    },
    {
      title: "Updates",
      blocks: [
        { type: "p", text: "We may update these policies from time to time. Updated versions will state an effective date and be posted on the website or made available through the dashboard." },
      ],
    },
  ],
};
