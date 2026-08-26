import type { LegalDoc } from "./types";

export const paymentPolicy: LegalDoc = {
  slug: "payment-policy",
  title: "Payment, Billing & Taxes Policy",
  updated: "August 26, 2026",
  intro: [
    { type: "p", text: "This Policy explains Balance Top-Ups, service purchases, billing records and payment-related rules." },
    { type: "p", text: "This policy applies to the website, dashboard and services offered under the Virenza Proxy brand. The service provider is VIRENZA LTD, company number 17231719, of Dept 6814, 196 High Road, Wood Green, London, United Kingdom, N22 8HH (\"Virenza Proxy\", \"we\", \"us\" or \"our\"). You may contact us at info@virenzaproxy.com." },
  ],
  sections: [
    {
      title: "Balance Top-Ups",
      blocks: [
        { type: "p", text: "You may add funds to your account Balance using payment methods made available at checkout. A Balance Top-Up is a one-time payment transaction. Funds are credited when the applicable payment provider confirms the transaction, subject to fraud, compliance or technical review." },
        { type: "p", text: "Balance does not expire. The Balance is an account record used to pay for Services; it is not a bank account, payment account or stored-value service." },
      ],
    },
    {
      title: "Purchasing Services",
      blocks: [
        { type: "p", text: "Services are purchased only with available Balance. When you confirm a package purchase, the stated amount is deducted from your Balance once. If your Balance is insufficient, the purchase will not complete." },
        { type: "p", text: "There are no automatic charges, recurring billing, automatic continuation or automatic Balance Top-Ups." },
      ],
    },
    {
      title: "Pricing, Currency and Taxes",
      blocks: [
        { type: "p", text: "The price, currency and applicable unit or package details are shown before confirmation. Display currencies may be estimates or planning displays; the final amount and settlement currency are those shown at checkout or in the payment confirmation." },
        { type: "p", text: "Prices may exclude applicable taxes unless stated otherwise. You are responsible for taxes, duties and bank, card-issuer or currency-conversion charges that apply to you." },
      ],
    },
    {
      title: "Failed, Pending and Duplicate Payments",
      blocks: [
        { type: "p", text: "A pending, failed or reversed payment may delay crediting funds. Do not assume that an attempted payment has been completed until confirmed. If you believe you were charged twice or your Balance was credited incorrectly, contact info@virenzaproxy.com with transaction details." },
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
      title: "Balance Withdrawal",
      blocks: [
        { type: "p", text: "Unused Balance may be requested for withdrawal by emailing info@virenzaproxy.com in free form. Include your account email, the amount requested and sufficient information for us to verify the request. Withdrawal requests are reviewed by support; they are not automatic or immediate, and we may request verification or return funds to the original payment method where appropriate and permitted." },
      ],
    },
  ],
};
