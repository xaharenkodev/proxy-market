import type { LegalDoc } from "./types";

export const sanctionsPolicy: LegalDoc = {
  slug: "sanctions-policy",
  title: "Sanctions & Restricted Jurisdictions Policy",
  updated: "August 26, 2026",
  intro: [
    { type: "p", text: "This Policy describes restrictions that protect the Service from sanctions and restricted-jurisdiction risk." },
    { type: "p", text: "This policy applies to the website, dashboard and services offered under the Virenza Proxy brand. The service provider is VIRENZA LTD, company number 17231719, of Dept 6814, 196 High Road, Wood Green, London, United Kingdom, N22 8HH (\"Virenza Proxy\", \"we\", \"us\" or \"our\"). You may contact us at info@virenzaproxy.com." },
  ],
  sections: [
    {
      title: "Compliance Principle",
      blocks: [
        { type: "p", text: "As a UK company, we consider applicable UK sanctions and other restrictions relevant to the Service, including requirements of payment providers, infrastructure providers and lawful authorities." },
      ],
    },
    {
      title: "Prohibited Customers",
      blocks: [
        { type: "p", text: "You must not use the Service if you are sanctioned, owned or controlled by a sanctioned person, acting for a sanctioned person, located in a prohibited jurisdiction, or otherwise prohibited from receiving the Service." },
      ],
    },
    {
      title: "Restricted Connections",
      blocks: [
        { type: "p", text: "We may restrict access based on residence, incorporation, beneficial ownership, billing details, payment source, IP or login location, traffic destination, declared use case, provider alert or another relevant risk indicator." },
      ],
    },
    {
      title: "No Circumvention",
      blocks: [
        { type: "p", text: "You must not bypass restrictions through a false identity, nominee, intermediary, misleading company information, third-party payment method, VPN, proxy, resale arrangement or any method intended to conceal the true user or location." },
      ],
    },
    {
      title: "Screening and Action",
      blocks: [
        { type: "p", text: "We may request information, screen accounts and payments, delay activation, block access, reject a transaction, suspend service or terminate an account where the risk cannot be resolved. A successful payment does not guarantee approval or activation." },
      ],
    },
    {
      title: "Customer Duty",
      blocks: [
        { type: "p", text: "You must promptly tell us if your location, ownership, payment source or use case changes in a way that creates a sanctions or restriction concern. Suspected evasion may result in immediate action without refund to the extent permitted by law." },
      ],
    },
  ],
};
