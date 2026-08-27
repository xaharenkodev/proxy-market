"use client";

import { siteConfig, SupportedCurrency } from "@/config/site";
import { useCurrency } from "@/context/CurrencyContext";

export default function CurrencySwitcher({ compact = false }: { compact?: boolean }) {
  const { displayCurrency, setDisplayCurrency } = useCurrency();

  return (
    <div className={`inline-flex shrink-0 items-center rounded-xl border border-slate-200 bg-white/85 p-1 shadow-sm backdrop-blur sm:rounded-2xl ${compact ? "gap-0" : "gap-0.5"}`}>
      {siteConfig.supportedCurrencies.map((currency) => (
        <button
          key={currency}
          type="button"
          onClick={() => setDisplayCurrency(currency as SupportedCurrency)}
          className={`rounded-lg px-2 py-1.5 text-[11px] font-bold transition sm:rounded-xl sm:px-3 sm:py-2 sm:text-xs ${
            displayCurrency === currency
              ? "bg-slate-950 text-white shadow-sm"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-950"
          }`}
        >
          {currency}
        </button>
      ))}
    </div>
  );
}
