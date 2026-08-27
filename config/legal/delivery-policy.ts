import type { LegalDoc } from "./types";

export const deliveryPolicy: LegalDoc = {
  slug: "delivery-policy",
  title: "Digital Delivery / Provisioning Policy",
  updated: "August 26, 2026",
  intro: [
    { type: "p", text: "This Policy explains how digital proxy access is delivered." },
    { type: "p", text: "This policy applies to the website, dashboard and services offered under the Virenza Proxy brand. The service provider is VIRENZA LTD, company number 17231719, of Dept 6814, 196 High Road, Wood Green, London, United Kingdom, N22 8HH (\"Virenza Proxy\", \"we\", \"us\" or \"our\"). You may contact us at info@virenzaproxy.com." },
  ],
  sections: [
    {
      title: "Digital Delivery Only",
      blocks: [
        { type: "p", text: "The Service is delivered digitally. No physical goods are shipped. Delivery may occur through your dashboard, proxy credentials, endpoint details, API keys, account activation, email confirmation or manual configuration." },
      ],
    },
    {
      title: "Purchase Flow",
      blocks: [
        { type: "p", text: "The usual flow is: select a proxy package; confirm the individual order; pay for that one order at checkout; receive digital access after successful provisioning. Access is delivered only after that single payment is confirmed." },
      ],
    },
    {
      title: "Activation Timing",
      blocks: [
        { type: "p", text: "Many packages are provisioned promptly after purchase, but activation may be delayed by payment review, fraud prevention, compliance review, technical configuration, provider availability, maintenance or a request for additional information." },
      ],
    },
    {
      title: "Delivery Confirmation",
      blocks: [
        { type: "p", text: "Delivery is deemed to occur when the relevant access details or functionality are made available in the dashboard, provided by email, or otherwise made accessible to your account. You must check your dashboard and account email and promptly report missing access." },
      ],
    },
    {
      title: "Access End and Replacement Purchase",
      blocks: [
        { type: "p", text: "A package ends when its access period expires or its traffic allowance is used, as applicable. Nothing renews automatically. To continue using the Service, you must place a new individual order and pay for it separately." },
      ],
    },
    {
      title: "Technical Issues",
      blocks: [
        { type: "p", text: "If you cannot access a delivered product, contact info@virenzaproxy.com with your account email, order reference, product, timestamps, error message and relevant configuration details. We may troubleshoot, repair, replace access or apply another appropriate remedy." },
      ],
    },
  ],
};
