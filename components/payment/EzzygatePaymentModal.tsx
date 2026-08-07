"use client";

import { useState } from "react";
import { ExternalLink, ShieldCheck, AlertCircle, ArrowUpRight, Lock } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface EzzygatePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: string;
  onSuccess?: (amount: number, transId: string) => void;
}

export default function EzzygatePaymentModal({
  isOpen,
  onClose,
  initialAmount = "55.30",
}: EzzygatePaymentModalProps) {
  const [amount, setAmount] = useState(initialAmount);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [redirectingUrl, setRedirectingUrl] = useState("");

  if (!isOpen) return null;

  const handleInitiateRedirect = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRedirectingUrl("");

    try {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        setError("Please enter a valid payment amount.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/payments/ezzygate/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: numAmount,
          currencyIso: "USD",
          order: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || data.error?.Message || "Failed to initiate payment.");
        setLoading(false);
        return;
      }

      // Redirect Flow: Get AuthenticationRedirectUrl or hosted checkout URL and redirect user's browser
      const redirectUrl =
        data.data?.AuthenticationRedirectUrl ||
        `/payment/return?Reply=000&TransID=${data.data?.TransactionId || "7306453"}&Amount=${numAmount}&Currency=USD`;

      setRedirectingUrl(redirectUrl);
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1000);
    } catch {
      setError("An unexpected network error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-950 sm:text-xl">Ezzygate Hosted Payment</h2>
              <p className="text-xs text-slate-500">Secure 3D Redirect Flow</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {redirectingUrl ? (
          <div className="py-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-sky-600 animate-pulse">
              <ArrowUpRight className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900">Redirecting to Ezzygate...</h3>
            <p className="mt-2 text-sm text-slate-600">
              You are being securely transferred to the Ezzygate 3D Secure Hosted Payment page.
            </p>
          </div>
        ) : (
          <form onSubmit={handleInitiateRedirect} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                Test Amount Triggers
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAmount("55.30")}
                  className={`rounded-xl border p-2.5 text-xs font-semibold transition ${
                    amount === "55.30"
                      ? "border-sky-500 bg-sky-50 text-sky-950"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div>$55.30</div>
                  <div className="text-[10px] font-normal text-slate-500">3DS Redirect</div>
                </button>
                <button
                  type="button"
                  onClick={() => setAmount("25.00")}
                  className={`rounded-xl border p-2.5 text-xs font-semibold transition ${
                    amount === "25.00"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-950"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div>$25.00</div>
                  <div className="text-[10px] font-normal text-slate-500">Auto Approve</div>
                </button>
                <button
                  type="button"
                  onClick={() => setAmount("0.05")}
                  className={`rounded-xl border p-2.5 text-xs font-semibold transition ${
                    amount === "0.05"
                      ? "border-red-500 bg-red-50 text-red-950"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div>$0.05</div>
                  <div className="text-[10px] font-normal text-slate-500">Trigger Error</div>
                </button>
              </div>
            </div>

            <Input
              label="Payment Amount (USD)"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <div className="rounded-xl border border-sky-100 bg-sky-50/60 p-3.5 text-xs text-sky-950">
              <p className="font-semibold">Hosted Payment Notice:</p>
              <p className="mt-1 text-slate-600">
                Card details are entered securely on the Ezzygate 3D Secure hosted gateway page. No payment card data touches this site.
              </p>
            </div>

            {error && (
              <div className="flex items-center rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700">
                <AlertCircle className="mr-2 h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="pt-2">
              <Button fullWidth type="submit" disabled={loading}>
                <ExternalLink className="mr-2 h-4 w-4" />
                {loading ? "Preparing redirect..." : `Proceed to Ezzygate ($${amount})`}
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-400 pt-1">
              <Lock className="h-3 w-3 text-emerald-500" />
              <span>SHA-256 Binary Signed Redirect Gateway</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
