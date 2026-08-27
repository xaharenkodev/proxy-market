import type { LegalDoc } from "./types";

export const privacy: LegalDoc = {
  slug: "privacy",
  title: "Privacy Policy",
  updated: "August 26, 2026",
  intro: [
    { type: "p", text: "This Policy explains how VIRENZA LTD processes personal data in connection with Virenza Proxy." },
    { type: "p", text: "This policy applies to the website, dashboard and services offered under the Virenza Proxy brand. The service provider is VIRENZA LTD, company number 17231719, of Dept 6814, 196 High Road, Wood Green, London, United Kingdom, N22 8HH (\"Virenza Proxy\", \"we\", \"us\" or \"our\"). You may contact us at info@virenzaproxy.com." },
  ],
  sections: [
    {
      title: "Data We Collect",
      blocks: [
        { type: "p", text: "We may collect account and contact details, billing and payment-related records, support communications, device and login data, dashboard activity, technical usage information, security logs, proxy allocation records and information supplied for verification or compliance review." },
        { type: "p", text: "We do not intentionally require the content of your third-party traffic for ordinary operation, but we may process limited technical metadata where necessary for security, billing, abuse prevention, troubleshooting, legal compliance or enforcement." },
      ],
    },
    {
      title: "Purposes and Legal Bases",
      blocks: [
        { type: "p", text: "We process data to provide the Service, maintain accounts, process individual package payments, provide support, secure systems, prevent fraud and abuse, comply with legal obligations and protect or defend legal claims." },
        { type: "p", text: "Depending on the context, our legal bases include contract performance, legitimate interests, legal obligations, consent and the establishment, exercise or defence of legal claims." },
      ],
    },
    {
      title: "Sharing",
      blocks: [
        { type: "p", text: "We may share relevant data with payment processors, hosting and infrastructure providers, security and fraud-prevention providers, professional advisers, service providers and competent authorities where lawfully required or appropriate. We require service providers to handle data in accordance with applicable requirements." },
      ],
    },
    {
      title: "International Transfers",
      blocks: [
        { type: "p", text: "Where data is transferred outside the United Kingdom or European Economic Area, we use lawful transfer mechanisms and appropriate safeguards where required, such as adequacy regulations, standard contractual clauses or the UK international data transfer arrangements." },
      ],
    },
    {
      title: "Retention",
      blocks: [
        { type: "p", text: "We retain personal data only for as long as reasonably necessary for the purposes described in this Policy, including service provision, security, abuse prevention, financial records, dispute resolution, legal claims and compliance. Retention periods vary by record type and legal requirement." },
      ],
    },
    {
      title: "Your Rights",
      blocks: [
        { type: "p", text: "Subject to applicable law, you may have rights to request access, correction, deletion, restriction, objection, portability or withdrawal of consent. To make a request, email info@virenzaproxy.com. You may also have the right to complain to the relevant data-protection authority." },
      ],
    },
    {
      title: "Security and Updates",
      blocks: [
        { type: "p", text: "We use reasonable technical and organisational measures to protect data, but no online system is completely secure. We may update this Policy as our Service, legal obligations or practices change." },
      ],
    },
  ],
};
