import LegalPage from "@/components/legal/LegalPage";
import { legalPages } from "@/config/legal";

export default function PrivacyPage() {
  return <LegalPage page={legalPages.privacy} />;
}
