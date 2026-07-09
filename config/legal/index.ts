import type { LegalDoc } from "./types";
import { terms } from "./terms";
import { acceptableUsePolicy } from "./acceptable-use-policy";
import { privacy } from "./privacy";
import { paymentPolicy } from "./payment-policy";
import { refundPolicy } from "./refund-policy";
import { deliveryPolicy } from "./delivery-policy";
import { fairUsagePolicy } from "./fair-usage-policy";
import { sanctionsPolicy } from "./sanctions-policy";
import { verificationPolicy } from "./verification-policy";
import { abusePolicy } from "./abuse-policy";
import { complaintsPolicy } from "./complaints-policy";
import { cookiePolicy } from "./cookie-policy";
import { legalNotice } from "./legal-notice";

export type { LegalBlock, LegalDoc, LegalSection } from "./types";

/** Every legal document, in the order they are referenced in the Terms. */
export const legalDocs: LegalDoc[] = [
  terms,
  acceptableUsePolicy,
  fairUsagePolicy,
  paymentPolicy,
  refundPolicy,
  deliveryPolicy,
  privacy,
  cookiePolicy,
  sanctionsPolicy,
  verificationPolicy,
  abusePolicy,
  complaintsPolicy,
  legalNotice,
];

/** Short labels used in navigation, where the full legal title is too long. */
const navLabels: Record<string, string> = {
  terms: "Terms & Conditions",
  "acceptable-use-policy": "Acceptable Use Policy",
  "fair-usage-policy": "Fair Usage Policy",
  "payment-policy": "Payment & Billing",
  "refund-policy": "Refund & Cancellation",
  "delivery-policy": "Digital Delivery",
  privacy: "Privacy Policy",
  "cookie-policy": "Cookie Policy",
  "sanctions-policy": "Sanctions & Restrictions",
  "verification-policy": "Customer Verification",
  "abuse-policy": "Abuse Reporting",
  "complaints-policy": "Complaints",
  "legal-notice": "Legal Notice",
};

export const legalIndex = legalDocs.map((doc) => ({
  slug: doc.slug,
  href: `/${doc.slug}`,
  title: doc.title,
  label: navLabels[doc.slug] ?? doc.title,
  updated: doc.updated,
}));

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return legalDocs.find((doc) => doc.slug === slug);
}

export {
  terms,
  acceptableUsePolicy,
  privacy,
  paymentPolicy,
  refundPolicy,
  deliveryPolicy,
  fairUsagePolicy,
  sanctionsPolicy,
  verificationPolicy,
  abusePolicy,
  complaintsPolicy,
  cookiePolicy,
  legalNotice,
};
