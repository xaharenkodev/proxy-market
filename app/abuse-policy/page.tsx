import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { abusePolicy } from "@/config/legal";

export const metadata: Metadata = {
  title: "Abuse Reporting Policy",
};

export default function AbusePolicyPage() {
  return <LegalPage doc={abusePolicy} />;
}
