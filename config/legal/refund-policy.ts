import type { LegalDoc } from "./types";

export const refundPolicy: LegalDoc = {
  slug: "refund-policy",
  title: "Refund & Cancellation Policy",
  updated: "August 26, 2026",
  intro: [
    { type: "p", text: "This Policy explains refund and cancellation requests concerning individual proxy package purchases." },
    { type: "p", text: "This policy applies to the website, dashboard and services offered under the Virenza Proxy brand. The service provider is VIRENZA LTD, company number 17231719, of Dept 6814, 196 High Road, Wood Green, London, United Kingdom, N22 8HH (\"Virenza Proxy\", \"we\", \"us\" or \"our\"). You may contact us at info@virenzaproxy.com." },
  ],
  sections: [
    {
      title: "How to Request Help",
      blocks: [
        { type: "p", text: "Send refund or cancellation requests to info@virenzaproxy.com with your account email, order or transaction reference, product, date, reason and relevant evidence. We may request additional information to verify the request." },
      ],
    },
    {
      title: "Unactivated Orders",
      blocks: [
        { type: "p", text: "Where a package has not been activated or provisioned, we may cancel it and provide an appropriate remedy after review. We are not required to cancel an order once activation, configuration or delivery has begun." },
      ],
    },
    {
      title: "Activated Digital Services",
      blocks: [
        { type: "p", text: "Proxy services are digital services that may be provided immediately through credentials, endpoints, dashboard access or configuration. Once a package is activated, used or materially configured, a cash refund may be unavailable except where required by law or where we confirm a material service issue." },
        { type: "p", text: "For traffic packages, used traffic is not refundable. For time-based packages, time that has already elapsed is not refundable." },
      ],
    },
    {
      title: "Approved Service Refunds",
      blocks: [
        { type: "p", text: "Where we approve a refund or service remedy for a proxy package, the approved amount is returned to the original payment method used for that purchase, unless mandatory law requires another method." },
      ],
    },
    {
      title: "Payment Errors and Duplicates",
      blocks: [
        { type: "p", text: "A payment may be reviewed for error, duplication or fraud. As every payment is collected for a specific order, there is no spendable credit on your account; where an amount cannot be applied to the order it was taken for, it is returned to the original payment method. We may require identity, payment or account verification before processing a refund." },
      ],
    },
    {
      title: "No Refund Cases",
      blocks: [
        { type: "p", text: "We may refuse a refund to the extent permitted by law where the issue results from abuse, prohibited use, inaccurate customer information, fraud, a sanctions concern, breach of policy, third-party platform blocking, your configuration or failure to cooperate with reasonable troubleshooting." },
      ],
    },
    {
      title: "Consumer Rights",
      blocks: [
        { type: "p", text: "Nothing in this Policy limits mandatory consumer rights. If you are entitled by law to cancel or receive a remedy, this Policy will be applied consistently with those rights." },
      ],
    },
  ],
};
