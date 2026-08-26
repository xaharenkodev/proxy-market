import { RefreshCwOff } from "lucide-react";
import { billingModel } from "@/config/billing";

/**
 * Full statement of the billing model, placed under any grid or table of
 * prices so the non-recurring nature of every purchase is visible without
 * opening the payment or legal pages.
 */
export default function OneTimeNotice({
  variant = "default",
  className = "",
}: {
  variant?: "default" | "checkout";
  className?: string;
}) {
  return (
    <div
      className={`flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-sm leading-6 text-emerald-950 sm:rounded-2xl ${className}`}
    >
      <RefreshCwOff size={18} className="mt-0.5 shrink-0 text-emerald-600" />
      <div>
        <p className="font-bold">{billingModel.badgeLong}</p>
        <p className="mt-1 text-emerald-900">
          {variant === "checkout" ? billingModel.checkoutNotice : billingModel.notice}
        </p>
      </div>
    </div>
  );
}
