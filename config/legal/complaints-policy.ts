import type { LegalDoc } from "./types";

export const complaintsPolicy: LegalDoc = {
  slug: "complaints-policy",
  title: "Complaints Policy",
  updated: "August 26, 2026",
  intro: [
    { type: "p", text: "This Policy explains how to submit and resolve complaints about the Service." },
    { type: "p", text: "This policy applies to the website, dashboard and services offered under the Virenza Proxy brand. The service provider is VIRENZA LTD, company number 17231719, of Dept 6814, 196 High Road, Wood Green, London, United Kingdom, N22 8HH (\"Virenza Proxy\", \"we\", \"us\" or \"our\"). You may contact us at info@virenzaproxy.com." },
  ],
  sections: [
    {
      title: "How to Complain",
      blocks: [
        { type: "p", text: "Email info@virenzaproxy.com with the subject line \"Complaint — [brief description]\". Include your account email, relevant order or transaction reference, product, dates, clear explanation, requested resolution and relevant evidence." },
      ],
    },
    {
      title: "Types of Complaint",
      blocks: [
        { type: "p", text: "You may raise complaints about account access, technical delivery, service quality, Balance Top-Ups, incorrect Balance deductions, duplicate payments, invoices, withdrawal requests, an approved refund credited to Balance, support or policy enforcement." },
      ],
    },
    {
      title: "Review Process",
      blocks: [
        { type: "p", text: "We will acknowledge and review a complaint within a commercially reasonable time. We may request records, logs, screenshots, verification or clarification. We may provide an explanation, technical remedy, replacement access, correction, Balance adjustment or another appropriate outcome." },
      ],
    },
    {
      title: "Escalation",
      blocks: [
        { type: "p", text: "If you believe the first response has not resolved the issue, reply to the same email thread with the subject \"Complaint Escalation\" and explain the point you want reviewed. We may conduct a further review where appropriate." },
      ],
    },
    {
      title: "Limits",
      blocks: [
        { type: "p", text: "We may not be able to resolve matters caused by third-party platforms, your configuration, incomplete information, prohibited use, fraud, abuse or issues outside our reasonable control. Nothing in this Policy limits mandatory legal rights." },
      ],
    },
  ],
};
