import type { LegalDoc } from "./types";

export const verificationPolicy: LegalDoc = {
  slug: "verification-policy",
  title: "Customer Verification & Compliance Review Policy",
  updated: "August 26, 2026",
  intro: [
    { type: "p", text: "This Policy explains when and how we may review customers, orders and use cases." },
    { type: "p", text: "This policy applies to the website, dashboard and services offered under the Virenza Proxy brand. The service provider is VIRENZA LTD, company number 17231719, of Dept 6814, 196 High Road, Wood Green, London, United Kingdom, N22 8HH (\"Virenza Proxy\", \"we\", \"us\" or \"our\"). You may contact us at info@virenzaproxy.com." },
  ],
  sections: [
    {
      title: "Purpose",
      blocks: [
        { type: "p", text: "Proxy infrastructure can be misused. We may carry out reasonable verification, payment review, fraud prevention, sanctions screening, use-case review and abuse-risk assessment. We are not a bank, payment institution or regulated financial-service provider merely because we conduct such reviews." },
      ],
    },
    {
      title: "When Reviews Occur",
      blocks: [
        { type: "p", text: "A review may occur at registration, before or after a Balance Top-Up or package purchase, before issuing credentials, after unusual traffic, after an abuse report, for high-volume or custom requests, or when a provider or payment processor raises a concern." },
      ],
    },
    {
      title: "Information We May Request",
      blocks: [
        { type: "p", text: "Depending on risk, we may request identity or company details, billing information, authority to act, a website or business profile, intended use case, expected traffic volume, destinations, confirmation of lawful use, payment confirmation or other reasonably necessary information." },
      ],
    },
    {
      title: "Cooperation",
      blocks: [
        { type: "p", text: "You must provide accurate, current and non-misleading information and respond to reasonable requests within the stated timeframe. Failure to cooperate may delay activation, restrict access, cancel an order or lead to suspension." },
      ],
    },
    {
      title: "Outcomes",
      blocks: [
        { type: "p", text: "We may approve, approve with limits, request changes, impose technical controls, delay activation, decline a customer or order, suspend access, preserve records or terminate service. We are not required to disclose detailed internal risk assessments." },
      ],
    },
    {
      title: "Review After Activation",
      blocks: [
        { type: "p", text: "We may review an account after access is activated. A temporary restriction during review does not automatically entitle you to a refund, credit or extension." },
      ],
    },
  ],
};
