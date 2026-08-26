/**
 * Single source of truth for how we describe the billing model.
 *
 * Every product on this site is sold as a one-time purchase: the customer pays
 * once, receives a fixed access period or a fixed amount of prepaid traffic,
 * and nothing is charged again unless a new order is placed. Card networks and
 * acquiring banks need that to be unambiguous on every screen where a price is
 * shown, so the wording lives here instead of being retyped per component.
 */
export const billingModel = {
  /** Compact chip used on product and pricing cards. */
  badge: "One-time purchase",
  /** Chip variant with room for the auto-renewal statement. */
  badgeLong: "One-time purchase · No auto-renewal",
  /** One-line clarifier placed directly under a price. */
  priceHint: "One-time payment · no subscription · no auto-renewal",
  /** Paragraph shown under a grid of cards or a pricing table. */
  notice:
    "Every plan on this site is a one-time purchase. We do not sell subscriptions, we do not store card details for recurring billing, and your payment method is never charged automatically. Access ends when the paid period or prepaid traffic runs out — buying again is always a new, separate order.",
  /** Paragraph shown on the payment screen itself. */
  checkoutNotice:
    "This is a one-time payment. No subscription is created, no recurring or renewal charge is scheduled, and your payment method will not be charged again unless you place a new order yourself.",
  /** Order summary rows. */
  billingTypeLabel: "Billing type",
  billingTypeValue: "One-time payment",
  autoRenewalLabel: "Auto-renewal",
  autoRenewalValue: "No",
} as const;

/** Label for a one-time access period, e.g. "30 days access". */
export function accessLabel(accessDays?: number, packageGb?: number) {
  if (accessDays) return `${accessDays} days access`;
  if (packageGb) return `${packageGb} GB prepaid traffic`;
  return "one-time access";
}
