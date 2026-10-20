"use client";

import Badge from "@/components/ui/Badge";
import { TableShell, Td, Th } from "@/components/ui/Table";
import { pricingPlans } from "@/config/pricing";
import { formatAmount } from "@/config/currency";
import OneTimeNotice from "@/components/ui/OneTimeNotice";
import { getTemplateById, lowestUnitPriceEUR, packagePricesLabel, tierRangeLabel } from "@/config/packages";

export default function PricingComparison() {
  return (
    <div>
      <p className="mb-5 text-sm text-slate-600">Every package is sold at a fixed price of {packagePricesLabel}, charged in EUR.</p>
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
          {pricingPlans.map((plan) => {
            const template = plan.packageId ? getTemplateById(plan.packageId) : undefined;
            return (
            <tr key={`${plan.productId}-${plan.name}`}>
              <Td><span className="font-bold text-slate-950 whitespace-nowrap">{plan.name}</span></Td>
              <Td>
                {template ? (
                  <div>
                    <span className="block font-bold text-slate-950 whitespace-nowrap">{packagePricesLabel}</span>
                    <span className="block text-xs text-slate-500 whitespace-nowrap">
                      {tierRangeLabel(template)} · from {formatAmount(lowestUnitPriceEUR(template), "EUR")}{template.priceUnit}
                    </span>
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
            );
          })}
        </tbody>
      </TableShell>
      <OneTimeNotice className="mt-5" />
    </div>
  );
}
