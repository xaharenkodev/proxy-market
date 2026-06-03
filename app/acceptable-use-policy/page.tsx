import LegalPage from "@/components/legal/LegalPage";
import { legalPages } from "@/config/legal";

export default function AcceptableUsePolicyPage() {
  return <LegalPage page={legalPages.acceptableUse} />;
}
