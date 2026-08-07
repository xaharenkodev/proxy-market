"use client";

import Badge from "@/components/ui/Badge";
import { TableShell, Td, Th } from "@/components/ui/Table";
import { pricingPlans } from "@/config/pricing";
import { formatCurrencyFromEUR } from "@/config/currency";
import { useBalance } from "@/context/BalanceContext";
import CurrencySwitcher from "./CurrencySwitcher";

export default function PricingComparison() {
  const { displayCurrency } = useBalance();

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
            <Th>Price</Th>
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
                  <span className="font-bold text-slate-950 whitespace-nowrap">{formatCurrencyFromEUR(plan.amountEUR, displayCurrency)} {plan.unit}</span>
                ) : (
                  <Badge variant="warning">Coming Soon</Badge>
                )}
              </Td>
              <Td>{plan.bestFor}</Td>
              <Td>{plan.protocol}</Td>
              <Td>{plan.rotation}</Td>
              <Td>{plan.bandwidth}</Td>
            </tr>
          ))}
        </tbody>
      </TableShell>
    </div>
  );
}
