import Link from "next/link";
import PaymentMethods from "@/components/ui/PaymentMethods";
import { siteConfig } from "@/config/site";
import OneTimeNotice from "@/components/ui/OneTimeNotice";

const policies = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/payment-policy", label: "Payment, Billing & Taxes" },
  { href: "/refund-policy", label: "Refund & Cancellation" },
  { href: "/delivery-policy", label: "Digital Delivery" },
  { href: "/acceptable-use-policy", label: "Acceptable Use" },
  { href: "/privacy", label: "Privacy Policy" },
];

/**
 * Merchant identity and policy links shown wherever money changes hands.
 * Card networks require the trading entity, registered address and refund
 * terms to be reachable from the payment screen.
 */
export default function CheckoutLegal({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-5 sm:rounded-[1.5rem] sm:p-6 ${className}`}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="text-xs leading-6 text-slate-500">
          <p className="text-sm font-bold text-slate-950">{siteConfig.companyLegalName}</p>
          <p className="mt-1">
            Trading as {siteConfig.name} · Company number {siteConfig.companyNumber} · Registered in{" "}
            {siteConfig.companyJurisdiction}
          </p>
          <p>{siteConfig.companyAddress}</p>
          <a href={`mailto:${siteConfig.companyEmail}`} className="font-semibold text-sky-700 hover:underline">
            {siteConfig.companyEmail}
          </a>
          {siteConfig.companyPhone && <p>{siteConfig.companyPhone}</p>}
        </div>
        <PaymentMethods variant="checkout" className="shrink-0" />
      </div>

      <OneTimeNotice variant="checkout" className="mt-5" />

      <p className="mt-4 border-t border-slate-100 pt-4 text-xs leading-6 text-slate-500">
        You can buy in EUR, GBP or USD. The final amount payable, including any applicable taxes, is shown before you
        confirm, and it is charged a single time. Proxy access is a digital service delivered on activation and expires
        at the end of the purchased access period or prepaid traffic without renewing — see the digital delivery and
        refund policies below for how cancellation rights apply.
      </p>

      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
        {policies.map((policy) => (
          <li key={policy.href}>
            <Link href={policy.href} className="text-xs font-semibold text-slate-600 transition hover:text-sky-700">
              {policy.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
