import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { cookiePolicy } from "@/config/legal";

export const metadata: Metadata = {
  title: "Cookie Policy",
};

export default function CookiePolicyPage() {
  return <LegalPage doc={cookiePolicy} />;
}
