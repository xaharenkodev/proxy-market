import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { paymentPolicy } from "@/config/legal";

export const metadata: Metadata = {
  title: "Payment, Billing & Taxes Policy",
};

export default function PaymentPolicyPage() {
  return <LegalPage doc={paymentPolicy} />;
}
