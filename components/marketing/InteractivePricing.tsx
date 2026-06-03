"use client";

import { useState } from "react";
import PricingCards from "./PricingCards";
import { ProductId } from "@/config/products";

const tabs: { label: string; value: "all" | ProductId }[] = [
  { label: "All", value: "all" },
  { label: "Datacenter", value: "datacenter" },
  { label: "Static ISP", value: "static-residential" },
  { label: "Residential", value: "residential" },
  { label: "Mobile", value: "mobile" },
  { label: "APIs", value: "serp-api" },
];

export default function InteractivePricing() {
  const [active, setActive] = useState<(typeof tabs)[number]["value"]>("all");

  return (
    <div>
      <div className="mb-6 flex overflow-x-auto rounded-2xl border border-slate-200 bg-white/85 p-1.5 shadow-sm backdrop-blur sm:rounded-3xl sm:p-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActive(tab.value)}
            className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition sm:rounded-2xl sm:px-4 sm:text-sm ${
              active === tab.value ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <PricingCards productId={active === "all" ? undefined : active} showSwitcher />
    </div>
  );
}
