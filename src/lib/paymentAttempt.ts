import type { IPaymentAttempt } from "@/src/lib/db/models/User";
import type { CurrencyCode } from "@/config/currency";

export function canApprovePaymentAttempt(
  attempt: Pick<IPaymentAttempt, "status" | "amount" | "currency">,
  amount: number,
  currency: CurrencyCode
) {
  return attempt.status === "pending" && attempt.amount === +amount.toFixed(2) && attempt.currency === currency;
}
