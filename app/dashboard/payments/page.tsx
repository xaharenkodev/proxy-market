"use client";

import Badge from "@/components/ui/Badge";
import { TableShell, Td, Th } from "@/components/ui/Table";
import EmptyState from "@/components/dashboard/EmptyState";
import { useBalance } from "@/context/BalanceContext";
import { formatCurrency } from "@/config/currency";

export default function DashboardPaymentsPage() {
  const { transactions, displayCurrency } = useBalance();
  const topUps = transactions.filter((txn) => txn.type === "top_up");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">Payments / invoices</h1>
        <p className="mt-1.5 text-sm text-slate-600 sm:mt-2">Payment history and invoice records. Full invoices will be available once payment backend is integrated.</p>
      </div>
      {topUps.length ? (
        <TableShell>
          <thead>
            <tr>
              <Th>Payment</Th>
              <Th>Status</Th>
              <Th>Amount</Th>
              <Th>Method</Th>
              <Th>Invoice</Th>
            </tr>
          </thead>
          <tbody>
            {topUps.map((payment) => (
              <tr key={payment.id}>
                <Td>{payment.id}</Td>
                <Td><Badge variant="success">Completed</Badge></Td>
                <Td>{formatCurrency(payment.amount, displayCurrency)}</Td>
                <Td>Top-up flow</Td>
                <Td><span className="text-xs text-slate-400">Coming soon</span></Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      ) : (
        <EmptyState
          title="No payment records"
          description="Top-up transactions will appear here. Full invoices will be available after payment backend integration."
          ctaHref="/dashboard/balance"
          ctaLabel="Add balance"
        />
      )}
    </div>
  );
}
