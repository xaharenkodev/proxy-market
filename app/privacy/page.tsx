import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { privacy } from "@/config/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return <LegalPage doc={privacy} />;
}
