import LegalPage from "@/components/legal/LegalPage";
import { legalPages } from "@/config/legal";

export default function RefundPolicyPage() {
  return <LegalPage page={legalPages.refund} />;
}
