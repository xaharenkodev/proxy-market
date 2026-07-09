import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { acceptableUsePolicy } from "@/config/legal";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
};

export default function AcceptableUsePolicyPage() {
  return <LegalPage doc={acceptableUsePolicy} />;
}
