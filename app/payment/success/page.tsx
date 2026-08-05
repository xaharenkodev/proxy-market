"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, Copy, Check, Wallet, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import { useBalance } from "@/context/BalanceContext";
import { convertToGBP } from "@/config/currency";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addBalance } = useBalance();

  const reply = searchParams.get("replyCode") || searchParams.get("Reply") || searchParams.get("reply") || "000";
  const transId = searchParams.get("trans_id") || searchParams.get("TransID") || searchParams.get("transid") || "N/A";
  const amountStr = searchParams.get("trans_amount") || searchParams.get("Amount") || searchParams.get("amount") || "";
  const currency = searchParams.get("trans_currency") || searchParams.get("Currency") || searchParams.get("currency") || "EUR";
  const order = searchParams.get("Order") || searchParams.get("order") || searchParams.get("orderNumber") || "";

  const [countdown, setCountdown] = useState(5);
  const [copied, setCopied] = useState(false);
  const creditedRef = useRef(false);

  useEffect(() => {
    if (amountStr && !creditedRef.current) {
      const numAmount = parseFloat(amountStr);
      if (!isNaN(numAmount) && numAmount > 0) {
        creditedRef.current = true;
        const amountGBP = convertToGBP(numAmount, currency === "USD" ? "USD" : "EUR");
        addBalance(amountGBP, transId !== "N/A" ? transId : undefined);
      }
    }
  }, [amountStr, currency, transId, addBalance]);

  useEffect(() => {
    if (countdown === 0) {
      router.push("/dashboard/balance");
    }
  }, [countdown, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCopyTransId = () => {
    if (transId && transId !== "N/A") {
      navigator.clipboard.writeText(transId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const progressPercent = ((5 - countdown) / 5) * 100;

  return (
    <div className="mx-auto max-w-xl">
      {/* Outer Card with subtle glassmorphic glow */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl sm:p-10">
        
        {/* Subtle top accent bar */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500" />

        {/* Animated Badge Icon Container */}
        <div className="text-center pt-2">
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-b from-emerald-500/15 to-emerald-500/5 p-1 ring-1 ring-emerald-500/30 sm:h-24 sm:w-24">
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/40">
              <CheckCircle2 className="h-10 w-10 animate-bounce sm:h-12 sm:w-12" />
            </div>
          </div>

          <div className="mt-5 space-y-1">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
              <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Transaction Approved
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Payment Successful!
            </h1>
            <p className="mx-auto max-w-sm text-sm text-slate-600 sm:text-base">
              Your payment of <span className="font-bold text-slate-900">{amountStr ? `${amountStr} ${currency}` : "funds"}</span> was processed successfully and credited to your wallet balance.
            </p>
          </div>
        </div>

        {/* Amount Hero Callout */}
        {amountStr && (
          <div className="mt-6 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 via-emerald-50/30 to-slate-50 p-4 text-center sm:mt-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">Added to Balance</p>
            <p className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">
              +{amountStr} <span className="text-lg font-bold text-emerald-600">{currency}</span>
            </p>
          </div>
        )}

        {/* Transaction Details Box */}
        <div className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 text-sm space-y-3 sm:mt-8 sm:p-5">
          <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
            <span className="text-xs font-medium text-slate-500">Transaction ID</span>
            <div className="flex items-center space-x-1.5">
              <span className="font-mono text-xs font-semibold text-slate-900">{transId}</span>
              {transId !== "N/A" && (
                <button
                  type="button"
                  onClick={handleCopyTransId}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition"
                  title="Copy Transaction ID"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              )}
            </div>
          </div>

          {order && (
            <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
              <span className="text-xs font-medium text-slate-500">Order Reference</span>
              <span className="font-mono text-xs font-semibold text-slate-900">{order}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-medium text-slate-500">Status</span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600">
              <ShieldCheck className="mr-1 h-3.5 w-3.5 text-emerald-500" />
              Verified & Paid
            </span>
          </div>
        </div>

        {/* Auto Redirect Countdown & Progress Bar */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span className="flex items-center">
              <RefreshCw className="mr-1.5 h-3.5 w-3.5 animate-spin text-sky-600" />
              Auto-redirecting to Wallet Balance
            </span>
            <span className="font-bold text-slate-900">{countdown}s</span>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-all duration-1000 ease-linear rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 sm:mt-8">
          <Link href="/dashboard/balance" className="block">
            <Button
              fullWidth
              className="group bg-slate-950 hover:bg-slate-800 text-white font-semibold py-3.5 shadow-lg shadow-slate-950/20"
            >
              <Wallet className="mr-2 inline h-4 w-4 text-emerald-400" />
              Return to Wallet Balance
              <ArrowRight className="ml-2 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Footer Security Badge */}
        <div className="mt-6 flex items-center justify-center space-x-2 text-xs font-medium text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Secured with 256-bit SSL Encryption</span>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100/50 to-slate-50 py-12 px-4 sm:py-20 sm:px-6">
      <Suspense fallback={<div className="text-center text-slate-500 font-medium">Loading payment status...</div>}>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}
