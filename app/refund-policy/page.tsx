import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { refundPolicy } from "@/config/legal";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
};

export default function RefundPolicyPage() {
  return <LegalPage doc={refundPolicy} />;
}
