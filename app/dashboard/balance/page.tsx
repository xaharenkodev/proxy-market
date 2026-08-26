"use client";

import { useState } from "react";
import { CheckCircle2, Wallet } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { TableShell, Td, Th } from "@/components/ui/Table";
import CheckoutLegal from "@/components/legal/CheckoutLegal";
import CurrencySwitcher from "@/components/marketing/CurrencySwitcher";
import { useBalance } from "@/context/BalanceContext";
import { useAuth } from "@/context/AuthContext";
import { formatAmount, formatCurrency } from "@/config/currency";
import { siteConfig } from "@/config/site";

const quickAmounts = [12, 25, 50, 100];

export default function DashboardBalancePage() {
  const { displayCurrency, formattedBalance, transactions } = useBalance();
  const { user, updateUser } = useAuth();
  const [amount, setAmount] = useState("25");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTopUp = async () => {
    const parsed = Number(amount);
    if (!parsed || parsed <= 0 || !user) {
      setError("Please enter a valid top-up amount.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch(siteConfig.testMode ? "/api/user/top-up" : "/api/payments/ezzygate/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parsed,
          currency: displayCurrency,
          currencyIso: displayCurrency,
          userId: user._id,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || "Top-up process failed.");
      } else if (siteConfig.testMode && data.user) {
        updateUser(data.user);
        setMessage(`Added ${formatAmount(parsed, displayCurrency)} to your wallet in test mode. Your Invoice / Receipt was sent by email.`);
      } else if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
        return;
      } else {
        setError("Payment provider did not return a checkout URL.");
      }
    } catch {
      setError("Unable to start the top-up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">Balance / top up</h1>
        <p className="mt-1.5 text-sm text-slate-600 sm:mt-2">Add funds and buy proxies in EUR, GBP or USD. The selected currency is used for checkout and your Invoice / Receipt.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[1.5rem] sm:p-6">
          <Wallet size={22} className="text-sky-600" />
          <p className="mt-4 text-sm text-slate-500 sm:mt-5">Current balance</p>
          <p className="mt-1 text-3xl font-bold text-slate-950 sm:text-4xl">{formattedBalance}</p>
          <p className="mt-2 text-xs text-slate-500">Wallet balance is stored in GBP and converted for your selected checkout currency.</p>

          <div className="mt-5 flex items-center justify-between gap-3 sm:mt-6"><CurrencySwitcher compact />{siteConfig.testMode && <Badge variant="warning">Test mode</Badge>}</div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {quickAmounts.map((value) => (
              <button key={value} type="button" onClick={() => setAmount(value.toString())} className={`rounded-lg border px-2 py-2 text-sm font-bold transition sm:rounded-xl sm:px-3 ${amount === value.toString() ? "border-sky-500 bg-sky-50 text-sky-950 ring-2 ring-sky-500/20" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}>
                {formatAmount(value, displayCurrency)}
              </button>
            ))}
          </div>

          <Input className="mt-4" label={`Amount in ${displayCurrency}`} type="number" min={1} value={amount} onChange={(event) => setAmount(event.target.value)} />
          {message && <p className="mt-3 text-sm font-semibold text-emerald-700 sm:mt-4"><CheckCircle2 className="mr-1 inline h-4 w-4" />{message}</p>}
          {error && <p className="mt-3 text-sm font-semibold text-red-600 sm:mt-4">{error}</p>}
          <Button className="mt-5 sm:mt-6" fullWidth onClick={handleTopUp} disabled={loading}>{loading ? "Redirecting..." : `Top up in ${displayCurrency}`}</Button>
          <p className="mt-3 text-xs font-semibold text-emerald-700">
            Single one-time top-up. No subscription is created and no recurring charge is scheduled — you decide when to
            top up again.
          </p>
        </div>

        <div className="min-w-0">
          <h2 className="mb-4 text-lg font-bold text-slate-950 sm:text-xl">Transaction history</h2>
          <TableShell><thead><tr><Th>ID</Th><Th>Type</Th><Th>Amount</Th><Th>Date</Th></tr></thead><tbody>
            {transactions.length ? transactions.map((transaction) => <tr key={transaction.id}><Td>{transaction.id}</Td><Td><Badge variant={transaction.amount > 0 ? "success" : "warning"}>{transaction.type}</Badge></Td><Td>{formatCurrency(Math.abs(transaction.amount), displayCurrency)}</Td><Td>{transaction.date}</Td></tr>) : <tr><Td>No transactions yet</Td><Td>-</Td><Td>-</Td><Td>-</Td></tr>}
          </tbody></TableShell>
        </div>
      </div>
      <CheckoutLegal />
    </div>
  );
}
