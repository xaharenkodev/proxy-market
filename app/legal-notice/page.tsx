import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { legalNotice } from "@/config/legal";

export const metadata: Metadata = {
  title: "Legal Notice / Company Information",
};

export default function LegalNoticePage() {
  return <LegalPage doc={legalNotice} />;
}
