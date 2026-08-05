"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, ArrowRight, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";

function PaymentDeclineContent() {
  const searchParams = useSearchParams();

  const transId = searchParams.get("trans_id") || searchParams.get("TransID") || searchParams.get("transid") || "N/A";
  const amountStr = searchParams.get("trans_amount") || searchParams.get("Amount") || searchParams.get("amount") || "";
  const currency = searchParams.get("trans_currency") || searchParams.get("Currency") || searchParams.get("currency") || "EUR";
  const order = searchParams.get("Order") || searchParams.get("order") || searchParams.get("orderNumber") || "";

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:rounded-3xl sm:p-8">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 sm:h-20 sm:w-20">
          <XCircle className="h-10 w-10 sm:h-12 sm:w-12" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">Payment Declined</h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          The transaction could not be processed. Please try again or use another card.
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm space-y-2.5 sm:mt-8">
        <div className="flex justify-between border-b border-slate-200/60 pb-2">
          <span className="text-slate-500">Transaction ID</span>
          <span className="font-mono font-medium text-slate-900">{transId}</span>
        </div>
        {order && (
          <div className="flex justify-between border-b border-slate-200/60 pb-2">
            <span className="text-slate-500">Order Reference</span>
            <span className="font-mono font-medium text-slate-900">{order}</span>
          </div>
        )}
        {amountStr && (
          <div className="flex justify-between pb-1">
            <span className="text-slate-500">Amount</span>
            <span className="font-semibold text-slate-900">{amountStr} {currency}</span>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-slate-400">
        <ShieldCheck className="h-4 w-4 text-emerald-500" />
        <span>Secured by Ezzygate Verification</span>
      </div>

      <div className="mt-6 space-y-3 sm:mt-8">
        <Link href="/dashboard/balance" className="block">
          <Button fullWidth className="group">
            Return to Balance / Top Up
            <ArrowRight className="ml-2 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function PaymentDeclinePage() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:py-20 sm:px-6">
      <Suspense fallback={<div className="text-center text-slate-500">Loading payment details...</div>}>
        <PaymentDeclineContent />
      </Suspense>
    </div>
  );
}
