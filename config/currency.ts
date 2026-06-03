import { SupportedCurrency } from "./site";

type CurrencyCode = SupportedCurrency | "GBP" | "PLN";

const eurRates: Record<CurrencyCode, number> = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.86,
  UAH: 45,
  PLN: 4.3,
};

const currencySymbols: Record<CurrencyCode, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  UAH: "₴",
  PLN: "zł",
};

const currencyLocales: Record<CurrencyCode, string> = {
  EUR: "de-DE",
  USD: "en-US",
  GBP: "en-GB",
  UAH: "uk-UA",
  PLN: "pl-PL",
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

export function getCurrencySymbol(currency: CurrencyCode): string {
  return currencySymbols[currency];
}

export function formatCurrency(amountGBP: number, currency: CurrencyCode): string {
  const converted = convertFromGBP(amountGBP, currency);
  return formatAmount(converted, currency);
}

export function formatCurrencyFromEUR(amountEUR: number, currency: CurrencyCode): string {
  return formatAmount(convertFromEUR(amountEUR, currency), currency);
}

export function formatAmount(amount: number, currency: CurrencyCode): string {
  const fractionDigits = currency === "UAH" ? 0 : 2;
  return new Intl.NumberFormat(currencyLocales[currency], {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
}

export { eurRates as conversionRates };
