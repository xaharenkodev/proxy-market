"use client";

import Badge from "@/components/ui/Badge";
import { TableShell, Td, Th } from "@/components/ui/Table";
import { pricingPlans } from "@/config/pricing";
import { formatCurrencyFromEUR } from "@/config/currency";
import { useCurrency } from "@/context/CurrencyContext";
import CurrencySwitcher from "./CurrencySwitcher";
import OneTimeNotice from "@/components/ui/OneTimeNotice";
import { accessLabel } from "@/config/billing";

export default function PricingComparison() {
  const { displayCurrency } = useCurrency();

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">Prices and checkout use the selected currency: EUR, GBP or USD.</p>
        <CurrencySwitcher />
      </div>
      <TableShell>
        <thead>
          <tr>
            <Th>Plan</Th>
            <Th>One-time price</Th>
            <Th>Billing</Th>
            <Th>Best for</Th>
            <Th>Protocol</Th>
            <Th>Rotation</Th>
            <Th>Bandwidth</Th>
          </tr>
        </thead>
        <tbody>
          {pricingPlans.map((plan) => (
            <tr key={`${plan.productId}-${plan.name}`}>
              <Td><span className="font-bold text-slate-950 whitespace-nowrap">{plan.name}</span></Td>
              <Td>
                {plan.amountEUR ? (
                  <div>
                    <span className="block font-bold text-slate-950 whitespace-nowrap">
                      {formatCurrencyFromEUR(plan.totalEUR ?? plan.amountEUR, displayCurrency)}
                      {plan.totalEUR ? " one-time" : ` ${plan.unit}`}
                    </span>
                    {plan.totalEUR ? (
                      <span className="block text-xs text-slate-500 whitespace-nowrap">
                        {accessLabel(plan.accessDays, plan.packageGb)} · {formatCurrencyFromEUR(plan.amountEUR, displayCurrency)}{plan.unit}
                      </span>
                    ) : null}
                  </div>
                ) : (
                  <Badge variant="warning">Coming Soon</Badge>
                )}
              </Td>
              <Td>
                <span className="whitespace-nowrap font-semibold text-emerald-700">One-time · no auto-renewal</span>
              </Td>
              <Td>{plan.bestFor}</Td>
              <Td>{plan.protocol}</Td>
              <Td>{plan.rotation}</Td>
              <Td>{plan.bandwidth}</Td>
            </tr>
          ))}
        </tbody>
      </TableShell>
      <OneTimeNotice className="mt-5" />
    </div>
  );
}
