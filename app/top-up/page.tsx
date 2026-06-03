import { redirect } from "next/navigation";

export default function TopUpRedirect() {
  redirect("/dashboard/balance");
}
