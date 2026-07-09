import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { deliveryPolicy } from "@/config/legal";

export const metadata: Metadata = {
  title: "Digital Delivery / Provisioning Policy",
};

export default function DeliveryPolicyPage() {
  return <LegalPage doc={deliveryPolicy} />;
}
