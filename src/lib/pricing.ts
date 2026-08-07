import { packageTemplates } from "@/config/packages";

export type ProxyDuration = "daily" | "weekly" | "monthly" | "pay-per-gb";

export interface ProxyPriceInput {
  proxyType: string;
  duration: ProxyDuration;
  quantity: number;
  durationQuantity: number;
  bandwidthGb?: number;
}

export interface ProxyPriceResult {
  estimatedPriceEUR: number;
  billableDays?: number;
  billableGb?: number;
  unitPriceEUR: number;
}

const DAYS_PER_DURATION: Record<Exclude<ProxyDuration, "pay-per-gb">, number> = {
  daily: 1,
  weekly: 7,
  monthly: 30,
};

function getPackageRate(proxyType: string, duration: ProxyDuration) {
  const template = packageTemplates.find(
    (item) => item.proxyType === proxyType && item.duration === duration
  ) || (duration !== "pay-per-gb" ? packageTemplates.find((item) => item.proxyType === proxyType && item.duration === "daily") : undefined);

  if (!template) {
    throw new Error("The selected product does not support this billing model.");
  }

  return template.unitPriceEUR;
}

export function calculateProxyPrice(input: ProxyPriceInput): ProxyPriceResult {
  const quantity = Math.max(1, Math.floor(Number(input.quantity) || 0));
  const durationQuantity = Math.max(1, Math.floor(Number(input.durationQuantity) || 0));
  const unitPriceEUR = getPackageRate(input.proxyType, input.duration);

  if (input.duration === "pay-per-gb") {
    const bandwidthGb = Math.max(1, Number(input.bandwidthGb) || 0);
    return {
      estimatedPriceEUR: +(quantity * bandwidthGb * unitPriceEUR).toFixed(2),
      billableGb: bandwidthGb,
      unitPriceEUR,
    };
  }

  const billableDays = durationQuantity * DAYS_PER_DURATION[input.duration];
  return {
    estimatedPriceEUR: +(quantity * billableDays * unitPriceEUR).toFixed(2),
    billableDays,
    unitPriceEUR,
  };
}

export function getDefaultDurationQuantity(duration: ProxyDuration): number {
  if (duration === "daily") return 30;
  if (duration === "weekly") return 4;
  return 1;
}
