import { RefreshCwOff } from "lucide-react";
import { billingModel } from "@/config/billing";

/**
 * Chip stating that the item next to it is bought once, not subscribed to.
 * Shown on every card that carries a price.
 */
export default function OneTimeBadge({
  long = false,
  className = "",
}: {
  long?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold leading-none text-emerald-700 ${className}`}
    >
      <RefreshCwOff size={12} className="shrink-0" />
      <span>{long ? billingModel.badgeLong : billingModel.badge}</span>
    </span>
  );
}
