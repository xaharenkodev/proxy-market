"use client";

import Badge from "@/components/ui/Badge";
import { TableShell, Td, Th } from "@/components/ui/Table";
import EmptyState from "@/components/dashboard/EmptyState";
import { useCurrency } from "@/context/CurrencyContext";
import { formatCurrencyFromEUR } from "@/config/currency";

export default function DashboardPaymentsPage() {
  const { proxyRequests, displayCurrency } = useCurrency();
  const payments = proxyRequests.filter((request) => request.status === "paid" || request.paidAt);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">Payments / invoices</h1>
        <p className="mt-1.5 text-sm text-slate-600 sm:mt-2">
          One payment per order. Each row is a separate one-time charge — nothing renews and no funds are held on your
          account. Invoices and receipts are issued to the billing details on your account.
        </p>
      </div>
      {payments.length ? (
        <TableShell>
          <thead>
            <tr>
              <Th>Order</Th>
              <Th>Status</Th>
              <Th>Amount</Th>
              <Th>Billing</Th>
              <Th>Invoice</Th>
              <Th>Date</Th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <Td>{payment.id}</Td>
                <Td><Badge variant="success">Paid</Badge></Td>
                <Td>{formatCurrencyFromEUR(payment.estimatedPriceEUR, displayCurrency)}</Td>
                <Td><span className="text-xs font-semibold text-emerald-700">One-time · no auto-renewal</span></Td>
                <Td><span className="text-xs text-slate-500">{payment.invoiceNumber || "On request"}</span></Td>
                <Td>{payment.paidAt ? payment.paidAt.split("T")[0] : payment.date}</Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      ) : (
        <EmptyState
          title="No payment records"
          description="Payments appear here once you buy a proxy package. Each package is paid for individually at checkout."
          ctaHref="/dashboard/buy"
          ctaLabel="Buy a package"
        />
      )}
    </div>
  );
}
