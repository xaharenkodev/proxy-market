import LegalPage from "@/components/legal/LegalPage";
import { legalPages } from "@/config/legal";

export default function TermsPage() {
  return <LegalPage page={legalPages.terms} />;
}
