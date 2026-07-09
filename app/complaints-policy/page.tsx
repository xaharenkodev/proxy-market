import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { complaintsPolicy } from "@/config/legal";

export const metadata: Metadata = {
  title: "Complaints Policy",
};

export default function ComplaintsPolicyPage() {
  return <LegalPage doc={complaintsPolicy} />;
}
