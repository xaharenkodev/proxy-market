import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { sanctionsPolicy } from "@/config/legal";

export const metadata: Metadata = {
  title: "Sanctions & Restricted Jurisdictions Policy",
};

export default function SanctionsPolicyPage() {
  return <LegalPage doc={sanctionsPolicy} />;
}
