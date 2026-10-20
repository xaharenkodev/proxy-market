"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { pricingPlans } from "@/config/pricing";
import { products, ProductId } from "@/config/products";
import { formatAmount, formatCurrencyFromEUR } from "@/config/currency";
import { billingModel } from "@/config/billing";
import { getTemplateById, lowestUnitPriceEUR, PACKAGE_PRICES_EUR, packagePricesLabel, tierRangeLabel } from "@/config/packages";
import OneTimeBadge from "@/components/ui/OneTimeBadge";
import OneTimeNotice from "@/components/ui/OneTimeNotice";
import { useCurrency } from "@/context/CurrencyContext";
import CurrencySwitcher from "./CurrencySwitcher";

export default function PricingCards({
  limit,
  productId,
  showSwitcher = false,
}: {
  limit?: number;
  productId?: ProductId;
  showSwitcher?: boolean;
}) {
  const { displayCurrency } = useCurrency();
  const filtered = productId ? pricingPlans.filter((plan) => plan.productId === productId) : pricingPlans;
  const plans = limit ? filtered.slice(0, limit) : filtered;

  const gridCols = plans.length === 1
    ? "sm:grid-cols-1 max-w-lg"
    : plans.length === 2
    ? "sm:grid-cols-2 max-w-3xl"
    : "sm:grid-cols-2 xl:grid-cols-3";

  return (
    <div>
      {showSwitcher && (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">Packages are priced and charged in EUR. Pick GBP or USD to see approximate amounts.</p>
          <CurrencySwitcher />
        </div>
      )}
      <div className={`grid gap-4 sm:gap-5 ${gridCols}`}>
        {plans.map((plan) => {
          const product = products.find((item) => item.id === plan.productId);
          const href = product ? `/products/${product.slug}` : "/contact";
          const template = plan.packageId ? getTemplateById(plan.packageId) : undefined;
          return (
            <motion.div
              key={`${plan.productId}-${plan.name}`}
              whileHover={{ y: -5 }}
              className={`relative flex flex-col overflow-hidden rounded-2xl border bg-white/85 p-5 shadow-lg shadow-slate-200/70 backdrop-blur sm:rounded-[1.75rem] sm:p-6 ${
                plan.highlighted ? "border-sky-300" : "border-white/80"
              }`}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-500" />
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-bold text-slate-950">{plan.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{plan.bestFor}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  {plan.highlighted && <Badge variant="info">Popular</Badge>}
                  {plan.status === "coming-soon" && <Badge variant="warning">Soon</Badge>}
                  <OneTimeBadge />
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                {template ? (
                  <>
                    {/* The headline is the smallest fixed amount charged once at checkout. */}
                    <div className="flex items-end gap-1">
                      <span className="pb-1 text-sm font-semibold text-slate-500">from</span>
                      <span className="text-3xl font-bold text-slate-950 sm:text-4xl">{formatAmount(PACKAGE_PRICES_EUR[0], "EUR")}</span>
                      <span className="pb-1 text-sm font-semibold text-slate-500">one-time</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-slate-600">{packagePricesLabel} packages</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {tierRangeLabel(template)} · from {formatAmount(lowestUnitPriceEUR(template), "EUR")}{template.priceUnit}
                    </p>
                    {displayCurrency !== "EUR" && (
                      <p className="mt-1 text-xs text-slate-500">≈ {formatCurrencyFromEUR(PACKAGE_PRICES_EUR[0], displayCurrency)} · charged in EUR</p>
                    )}
                  </>
                ) : (
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-bold text-slate-950 sm:text-4xl">{plan.price}</span>
                    <span className="pb-1 text-sm font-semibold text-slate-500">{plan.unit}</span>
                  </div>
                )}
                <p className="mt-1 text-xs font-semibold text-emerald-700">{billingModel.priceHint}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                {[plan.protocol, plan.rotation, plan.bandwidth].map((item) => (
                  <span key={item} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 sm:px-3 sm:py-1.5">
                    {item}
                  </span>
                ))}
              </div>
              <ul className="mt-5 space-y-2 text-sm text-slate-600 sm:mt-6">
                {["No subscription — pay once per order", "Access ends automatically, nothing renews", "Country and protocol selected per order"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="shrink-0 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href={plan.status === "coming-soon" ? "/contact" : href} className="mt-auto block pt-5 sm:pt-6">
                <Button fullWidth variant={plan.status === "coming-soon" ? "outline" : "primary"} size="sm">
                  {plan.cta}
                  <ArrowRight size={14} />
                </Button>
              </Link>
            </motion.div>
          );
        })}
        {productId && plans.length < 3 && plans.length > 0 && Array.from({ length: 3 - plans.length }).map((_, index) => (
          <motion.div
            key={`support-${productId}-${index}`}
            whileHover={{ y: -5 }}
            className="relative flex flex-col overflow-hidden rounded-2xl border border-sky-100 bg-sky-50/70 p-5 shadow-lg shadow-slate-200/50 sm:rounded-[1.75rem] sm:p-6"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_34%)]" />
            <div className="relative">
              <Badge variant="info">{index === 0 ? "Planning" : "Integration"}</Badge>
              <h3 className="mt-5 text-lg font-bold text-slate-950">
                {index === 0 ? "Usage model" : "Provisioning phase"}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {index === 0
                  ? `Every package is sold at a fixed price: ${packagePricesLabel}. Location and protocol are chosen per order.`
                  : "Checkout, inventory and credential delivery can be connected without changing this visual flow."}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Dashboard-ready", "Currency-aware", "Safe-use copy"].map((item) => (
                  <span key={item} className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-600 sm:px-3 sm:py-1.5">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <OneTimeNotice className="mt-5" />
    </div>
  );
}
