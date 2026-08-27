import type { LegalDoc } from "./types";

export const paymentPolicy: LegalDoc = {
  slug: "payment-policy",
  title: "Payment, Billing & Taxes Policy",
  updated: "August 26, 2026",
  intro: [
    { type: "p", text: "This Policy explains how individual service purchases are paid for, billing records and payment-related rules." },
    { type: "p", text: "This policy applies to the website, dashboard and services offered under the Virenza Proxy brand. The service provider is VIRENZA LTD, company number 17231719, of Dept 6814, 196 High Road, Wood Green, London, United Kingdom, N22 8HH (\"Virenza Proxy\", \"we\", \"us\" or \"our\"). You may contact us at info@virenzaproxy.com." },
  ],
  sections: [
    {
      title: "One-Time Purchases",
      blocks: [
        { type: "p", text: "Each proxy package is bought individually and paid for directly at checkout using the payment methods made available there. Every purchase is a single one-time payment collected for that one order. We do not sell subscriptions and we do not offer prepaid credit: you cannot load funds for later use, and no amount is taken except the price of the order you are placing." },
        { type: "p", text: "The order is placed only when the applicable payment provider confirms that single payment, subject to fraud, compliance or technical review. If the payment is not approved, the order does not take effect and you are not charged." },
      ],
    },
    {
      title: "No Recurring Billing",
      blocks: [
        { type: "p", text: "There are no automatic charges, recurring billing, subscriptions or automatic continuation. We do not store your card details for repeat charges and your payment method is never charged automatically. When a package ends or its traffic allowance is used, you must place a new, separate order and make a new one-time payment to continue using the Service." },
      ],
    },
    {
      title: "Pricing, Currency and Taxes",
      blocks: [
        { type: "p", text: "The price, currency and applicable unit or package details are shown before confirmation. You choose whether you are charged in EUR, GBP or USD; the final amount and settlement currency are those shown at checkout and on your Invoice / Receipt." },
        { type: "p", text: "Prices may exclude applicable taxes unless stated otherwise. You are responsible for taxes, duties and bank, card-issuer or currency-conversion charges that apply to you." },
      ],
    },
    {
      title: "Failed, Pending and Duplicate Payments",
      blocks: [
        { type: "p", text: "A pending, failed or reversed payment may delay or prevent an order taking effect. Do not assume that an attempted payment has been completed until confirmed. If you believe you were charged twice or charged an incorrect amount, contact info@virenzaproxy.com with transaction details." },
      ],
    },
    {
      title: "Billing Records and Invoices",
      blocks: [
        { type: "p", text: "We may provide transaction records, receipts or invoices through the dashboard or by email. You must promptly report billing inaccuracies and provide information reasonably required to investigate them." },
      ],
    },
    {
      title: "Fraud, Chargebacks and Review",
      blocks: [
        { type: "p", text: "We may delay, reject, reverse or review a transaction where we identify fraud, unauthorised use, sanctions risk, misleading information or a payment-provider concern. You should contact us before initiating a chargeback so we can review the issue. Unjustified chargebacks or payment abuse may lead to account restriction." },
      ],
    },
    {
      title: "No Prepaid Credit",
      blocks: [
        { type: "p", text: "Because every payment is collected for a specific order, there is no spendable credit on your account and no amount is retained for future purchases. If, for technical reasons, a payment cannot be applied to the order it was taken for, contact info@virenzaproxy.com and it will be returned to the original payment method. Approved refunds under the Refund & Cancellation Policy are likewise returned to the original payment method." },
      ],
    },
  ],
};
