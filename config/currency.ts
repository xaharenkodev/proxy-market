import { SupportedCurrency } from "./site";

export type CurrencyCode = SupportedCurrency;

export function migrateStoredCurrency(value: unknown): CurrencyCode {
  return value === "EUR" || value === "GBP" || value === "USD" ? value : "EUR";
}

const eurRates: Record<CurrencyCode, number> = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.86,
};

const currencyLocales: Record<CurrencyCode, string> = {
  EUR: "de-DE",
  USD: "en-US",
  GBP: "en-GB",
};

export function convertFromEUR(amountEUR: number, currency: CurrencyCode): number {
  return +(amountEUR * eurRates[currency]).toFixed(2);
}

export function convertToEUR(amount: number, currency: CurrencyCode): number {
  return +(amount / eurRates[currency]).toFixed(2);
}

export function convertFromGBP(amountGBP: number, currency: CurrencyCode): number {
  const amountEUR = amountGBP / eurRates.GBP;
  return convertFromEUR(amountEUR, currency);
}

export function convertToGBP(amount: number, currency: CurrencyCode): number {
  const amountEUR = convertToEUR(amount, currency);
  return +(amountEUR * eurRates.GBP).toFixed(2);
}

export function formatCurrency(amountGBP: number, currency: CurrencyCode): string {
  return formatAmount(convertFromGBP(amountGBP, currency), currency);
}

export function formatCurrencyFromEUR(amountEUR: number, currency: CurrencyCode): string {
  return formatAmount(convertFromEUR(amountEUR, currency), currency);
}

export function formatAmount(amount: number, currency: CurrencyCode): string {
  return new Intl.NumberFormat(currencyLocales[currency], {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export { eurRates as conversionRates };
