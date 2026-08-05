"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, ArrowRight, ShieldCheck, Copy, Check, RefreshCw, AlertCircle, HelpCircle } from "lucide-react";
import Button from "@/components/ui/Button";

function PaymentDeclineContent() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);

  const transId = searchParams.get("trans_id") || searchParams.get("TransID") || searchParams.get("transid") || "N/A";
  const amountStr = searchParams.get("trans_amount") || searchParams.get("Amount") || searchParams.get("amount") || "";
  const currency = searchParams.get("trans_currency") || searchParams.get("Currency") || searchParams.get("currency") || "EUR";
  const order = searchParams.get("Order") || searchParams.get("order") || searchParams.get("orderNumber") || "";

  const handleCopyTransId = () => {
    if (transId && transId !== "N/A") {
      navigator.clipboard.writeText(transId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      {/* Outer Card with crimson glow */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-2xl shadow-rose-500/10 backdrop-blur-xl sm:p-10">
        
        {/* Top accent bar */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-rose-500 via-red-500 to-amber-500" />

        {/* Animated Badge Icon Container */}
        <div className="text-center pt-2">
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-b from-rose-500/15 to-rose-500/5 p-1 ring-1 ring-rose-500/30 sm:h-24 sm:w-24">
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-rose-600 text-white shadow-lg shadow-rose-600/40">
              <XCircle className="h-10 w-10 sm:h-12 sm:w-12" />
            </div>
          </div>

          <div className="mt-5 space-y-1">
            <span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-700 ring-1 ring-inset ring-rose-600/20">
              <AlertCircle className="mr-1.5 h-3.5 w-3.5 text-rose-600" />
              Transaction Declined
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Payment Could Not Be Processed
            </h1>
            <p className="mx-auto max-w-sm text-sm text-slate-600 sm:text-base">
              The card issuer or payment gateway declined this transaction. No funds were deducted from your account.
            </p>
          </div>
        </div>

        {/* Details Box */}
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
                  {copied ? <Check className="h-3.5 w-3.5 text-rose-600" /> : <Copy className="h-3.5 w-3.5" />}
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

          {amountStr && (
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-medium text-slate-500">Attempted Amount</span>
              <span className="font-semibold text-slate-900">{amountStr} {currency}</span>
            </div>
          )}
        </div>

        {/* Helpful Troubleshooting Suggestions Box */}
        <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50/50 p-4 text-xs text-rose-950 sm:p-5">
          <div className="flex items-center font-bold text-rose-900 mb-2">
            <HelpCircle className="mr-1.5 h-4 w-4 text-rose-600" />
            Common reasons for declined payments:
          </div>
          <ul className="space-y-1.5 list-disc list-inside text-rose-900/80 leading-relaxed">
            <li>Incorrect card number, CVV code, or expiration date.</li>
            <li>Insufficient balance or card daily spending limits.</li>
            <li>3D Secure (3DS) authentication was cancelled or timed out.</li>
            <li>International or online transactions restricted by your bank.</li>
          </ul>
        </div>

        {/* Primary Try Again Action Button */}
        <div className="mt-6 sm:mt-8">
          <Link href="/dashboard/balance" className="block">
            <Button
              fullWidth
              className="group bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3.5 shadow-lg shadow-rose-600/25"
            >
              <RefreshCw className="mr-2 inline h-4 w-4" />
              Try Again / Change Payment Amount
              <ArrowRight className="ml-2 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center space-x-2 text-xs font-medium text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Secured with 256-bit SSL Encryption</span>
        </div>
      </div>
    </div>
  );
}

export default function PaymentDeclinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-rose-50/20 to-slate-50 py-12 px-4 sm:py-20 sm:px-6">
      <Suspense fallback={<div className="text-center text-slate-500 font-medium">Loading payment details...</div>}>
        <PaymentDeclineContent />
      </Suspense>
    </div>
  );
}
