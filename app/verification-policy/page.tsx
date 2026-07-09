import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { verificationPolicy } from "@/config/legal";

export const metadata: Metadata = {
  title: "Customer Verification & Compliance Review Policy",
};

export default function VerificationPolicyPage() {
  return <LegalPage doc={verificationPolicy} />;
}
