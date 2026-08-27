import { convertFromEUR, convertToGBP, CurrencyCode } from "@/config/currency";

const PENDING_ORDER_KEY = "virenza_pending_order";

export interface PendingOrder {
  /** Hosted payment attempt this order is waiting on (absent in test mode). */
  attemptId?: string;
  amount: number;
  currency: CurrencyCode;
  label: string;
  payload: Record<string, unknown>;
  createdAt: number;
}

/**
 * The single amount charged at checkout for one order. Currency rounding can
 * otherwise leave the order a cent short of its own price, so the charge is
 * nudged up until it fully covers it.
 */
export function oneTimeChargeAmount(priceEUR: number, currency: CurrencyCode) {
  const requiredGBP = convertFromEUR(priceEUR, "GBP");
  let amount = convertFromEUR(priceEUR, currency);
  for (let step = 0; step < 5 && convertToGBP(amount, currency) < requiredGBP; step += 1) {
    amount = +(amount + 0.01).toFixed(2);
  }
  return amount;
}

export function savePendingOrder(order: Omit<PendingOrder, "createdAt">) {
  try {
    localStorage.setItem(PENDING_ORDER_KEY, JSON.stringify({ ...order, createdAt: Date.now() }));
  } catch {}
}

export function readPendingOrder(): PendingOrder | null {
  try {
    const stored = localStorage.getItem(PENDING_ORDER_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as PendingOrder;
    // Drop anything left over from an abandoned checkout more than a day ago.
    if (!parsed?.payload || Date.now() - parsed.createdAt > 86_400_000) {
      clearPendingOrder();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearPendingOrder() {
  try { localStorage.removeItem(PENDING_ORDER_KEY); } catch {}
}

export interface CompletedOrder {
  id: string;
  label: string;
  user: unknown;
}

/**
 * Turns a paid checkout into the actual proxy order. Called after the gateway
 * confirms the payment, so it always runs once per completed payment.
 */
export async function completePendingOrder(
  userId: string,
  displayCurrency: CurrencyCode
): Promise<{ ok: true; order: CompletedOrder } | { ok: false; error: string } | null> {
  const pending = readPendingOrder();
  if (!pending) return null;
  try {
    const response = await fetch("/api/proxy-requests/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, displayCurrency, ...pending.payload }),
    });
    const data = await response.json();
    if (!data.success) return { ok: false, error: data.error || "The order could not be created." };
    clearPendingOrder();
    return { ok: true, order: { id: data.proxyRequest.id, label: data.proxyRequest.packageName || pending.label, user: data.user } };
  } catch {
    return { ok: false, error: "The order could not be created. Please contact support." };
  }
}
