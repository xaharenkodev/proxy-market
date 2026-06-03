"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, LockKeyhole, Network, RadioTower } from "lucide-react";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { products } from "@/config/products";
import { pricingPlans } from "@/config/pricing";
import { formatCurrencyFromEUR } from "@/config/currency";
import { useBalance } from "@/context/BalanceContext";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SupportedCurrency } from "@/config/site";

function productPriceLabel(productId: string, fallback: string, currency: SupportedCurrency) {
  const plans = pricingPlans.filter((plan) => plan.productId === productId && plan.amountEUR);
  if (!plans.length) return fallback;
  return plans.map((plan) => `${formatCurrencyFromEUR(plan.amountEUR || 0, currency)}${plan.unit}`).join(" / ");
}

export default function ProductCards() {
  const { displayCurrency } = useBalance();

  return (
    <StaggerContainer className="grid gap-4 sm:gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => {
        const Icon = product.icon;
        return (
          <StaggerItem key={product.id}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="group relative flex min-h-full flex-col overflow-hidden rounded-2xl border border-white/80 bg-white/80 p-5 shadow-lg shadow-slate-200/70 backdrop-blur-xl sm:rounded-[1.75rem] sm:p-6"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.1),transparent_32%)] opacity-0 transition group-hover:opacity-100" />
              <div className="relative flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white shadow-lg shadow-sky-100 sm:h-14 sm:w-14 sm:rounded-2xl">
                    <Icon size={22} />
                  </div>
                  <Badge variant={product.status === "coming-soon" ? "warning" : "info"}>
                    {product.status === "coming-soon" ? "Coming Soon" : "Available"}
                  </Badge>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-950 sm:mt-6 sm:text-xl">{product.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 sm:mt-3">{product.description}</p>
                <div className="mt-4 rounded-xl border border-slate-200 bg-white/75 p-3 sm:mt-5 sm:rounded-2xl sm:p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Starting at</p>
                  <p className="mt-1 text-base font-bold text-sky-700 sm:text-lg">
                    {productPriceLabel(product.id, product.startingPriceLabel, displayCurrency)}
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
                  {[
                    { icon: Network, label: product.protocols.join("/") },
                    { icon: RadioTower, label: product.rotationSupport },
                    { icon: LockKeyhole, label: product.authMethods[0] },
                  ].map(({ icon: ChipIcon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-600">
                      <ChipIcon className="h-3 w-3 shrink-0 text-sky-600" />
                      <span className="truncate">{label}</span>
                    </div>
                  ))}
                </div>
                <ul className="mt-4 space-y-2 sm:mt-5">
                  {product.bestFor.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5 sm:pt-6">
                  <Link href={`/products/${product.slug}`}>
                    <Button fullWidth variant={product.status === "coming-soon" ? "outline" : "primary"} size="sm">
                      {product.status === "coming-soon" ? "View roadmap" : product.ctaLabel}
                      <ArrowRight size={14} />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}
