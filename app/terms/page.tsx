import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { terms } from "@/config/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  return <LegalPage doc={terms} />;
}
