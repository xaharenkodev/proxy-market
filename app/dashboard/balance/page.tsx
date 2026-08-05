"use client";

import { useState } from "react";
import { CheckCircle2, Wallet } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { TableShell, Td, Th } from "@/components/ui/Table";
import CheckoutLegal from "@/components/legal/CheckoutLegal";
import { useBalance } from "@/context/BalanceContext";
import { useAuth } from "@/context/AuthContext";
import { convertToGBP, formatCurrency } from "@/config/currency";

const quickAmounts = [12, 25, 50, 100];

export default function DashboardBalancePage() {
  const { balance, displayCurrency, formattedBalance, addBalance, transactions } = useBalance();
  const { user } = useAuth();
  const [amount, setAmount] = useState("25");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTopUp = async () => {
    const parsed = Number(amount);
    if (!parsed || parsed <= 0) {
      setError("Please enter a valid top-up amount.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/payments/ezzygate/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parsed,
          currencyIso: "EUR",
          client_email: user?.email || "customer@virenzaproxy.com",
          client_fullName: user?.name ? `${user.name} ${user.surname || ""}`.trim() : "Customer",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success || !data.paymentUrl) {
        const amountGBP = convertToGBP(parsed, "EUR");
        const ok = await addBalance(amountGBP);
        if (ok) {
          setMessage(`Added €${parsed.toFixed(2)} equivalent to your wallet.`);
        } else {
          setError(data.error || "Top-up process failed.");
        }
        setLoading(false);
        return;
      }

      window.location.href = data.paymentUrl;
    } catch (_err) {
      const amountGBP = convertToGBP(parsed, "EUR");
      await addBalance(amountGBP);
      setMessage(`Added €${parsed.toFixed(2)} equivalent to your wallet.`);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">Balance / top up</h1>
        <p className="mt-1.5 text-sm text-slate-600 sm:mt-2">
          Add funds to your wallet and pay for proxy orders from your balance. Prices are quoted in EUR.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[1.5rem] sm:p-6">
          <Wallet size={22} className="text-sky-600" />
          <p className="mt-4 text-sm text-slate-500 sm:mt-5">Current balance</p>
          <p className="mt-1 text-3xl font-bold text-slate-950 sm:text-4xl">{formattedBalance}</p>
          <p className="mt-2 text-xs text-slate-500">Stored backend balance: {formatCurrency(balance, displayCurrency)}</p>
          
          <div className="mt-5 grid grid-cols-4 gap-2 sm:mt-6">
            {quickAmounts.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setAmount(value.toString())}
                className={`rounded-lg border px-2 py-2 text-sm font-bold transition sm:rounded-xl sm:px-3 ${
                  amount === value.toString()
                    ? "border-sky-500 bg-sky-50 text-sky-950 ring-2 ring-sky-500/20"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                €{value}
              </button>
            ))}
          </div>

          <Input
            className="mt-4"
            label="Amount in EUR"
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          {message && (
            <p className="mt-3 text-sm font-semibold text-emerald-700 sm:mt-4">
              <CheckCircle2 className="mr-1 inline h-4 w-4" />
              {message}
            </p>
          )}

          {error && <p className="mt-3 text-sm font-semibold text-red-600 sm:mt-4">{error}</p>}

          <Button
            className="mt-5 sm:mt-6"
            fullWidth
            onClick={handleTopUp}
            disabled={loading}
          >
            {loading ? "Redirecting..." : "Top up balance"}
          </Button>
        </div>

        <div className="min-w-0">
          <h2 className="mb-4 text-lg font-bold text-slate-950 sm:text-xl">Transaction history</h2>
          <TableShell>
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>Type</Th>
                <Th>Amount</Th>
                <Th>Date</Th>
              </tr>
            </thead>
            <tbody>
              {transactions.length ? (
                transactions.map((txn) => (
                  <tr key={txn.id}>
                    <Td>{txn.id}</Td>
                    <Td>
                      <Badge variant={txn.amount > 0 ? "success" : "warning"}>{txn.type}</Badge>
                    </Td>
                    <Td>{formatCurrency(Math.abs(txn.amount), displayCurrency)}</Td>
                    <Td>{txn.date}</Td>
                  </tr>
                ))
              ) : (
                <tr>
                  <Td>No transactions yet</Td>
                  <Td>-</Td>
                  <Td>-</Td>
                  <Td>-</Td>
                </tr>
              )}
            </tbody>
          </TableShell>
        </div>
      </div>
      <CheckoutLegal />
    </div>
  );
}
