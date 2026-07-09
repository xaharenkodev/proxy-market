import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { fairUsagePolicy } from "@/config/legal";

export const metadata: Metadata = {
  title: "Proxy Service & Fair Usage Policy",
};

export default function FairUsagePolicyPage() {
  return <LegalPage doc={fairUsagePolicy} />;
}
