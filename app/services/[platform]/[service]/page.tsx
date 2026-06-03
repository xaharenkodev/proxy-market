import { redirect } from "next/navigation";

export default function LegacyServicesRedirect() {
  redirect("/products/datacenter-proxies");
}
