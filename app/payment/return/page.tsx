"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Clock, XCircle, ArrowRight, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import { useBalance } from "@/context/BalanceContext";
import { convertToGBP } from "@/config/currency";

function PaymentReturnContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addBalance } = useBalance();

  const reply = searchParams.get("replyCode") || searchParams.get("Reply") || searchParams.get("reply") || "";
  const transId = searchParams.get("trans_id") || searchParams.get("TransID") || searchParams.get("transid") || "N/A";
  const amountStr = searchParams.get("trans_amount") || searchParams.get("Amount") || searchParams.get("amount") || "";
  const currency = searchParams.get("trans_currency") || searchParams.get("Currency") || searchParams.get("currency") || "EUR";
  const order = searchParams.get("Order") || searchParams.get("order") || searchParams.get("orderNumber") || "";

  const isApproved = reply === "000";
  const isPending = reply === "001" || reply === "553";

  const [countdown, setCountdown] = useState(4);
  const creditedRef = useRef(false);

  useEffect(() => {
    if (isApproved && amountStr && !creditedRef.current) {
      const numAmount = parseFloat(amountStr);
      if (!isNaN(numAmount) && numAmount > 0) {
        creditedRef.current = true;
        const amountGBP = convertToGBP(numAmount, currency === "USD" ? "USD" : "EUR");
        addBalance(amountGBP, transId !== "N/A" ? transId : undefined);
      }
    }
  }, [isApproved, amountStr, currency, transId, addBalance]);

  useEffect(() => {
    if (countdown === 0 && (isApproved || isPending)) {
      router.push("/dashboard/balance");
    }
  }, [countdown, isApproved, isPending, router]);

  useEffect(() => {
    if (isApproved || isPending) {
      const interval = setInterval(() => {
        setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isApproved, isPending]);

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:rounded-3xl sm:p-8">
      {isApproved && (
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 sm:h-20 sm:w-20">
            <CheckCircle2 className="h-10 w-10 sm:h-12 sm:w-12" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">Payment Approved!</h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Your 3D Secure authentication was successful. Your balance has been updated.
          </p>
          <p className="mt-2 text-xs font-semibold text-sky-700">
            Redirecting to your wallet balance in {countdown} seconds...
          </p>
        </div>
      )}

      {isPending && (
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 sm:h-20 sm:w-20">
            <Clock className="h-10 w-10 sm:h-12 sm:w-12" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">Payment Pending</h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Your transaction is undergoing processing. Awaiting final verification.
          </p>
          <p className="mt-2 text-xs font-semibold text-amber-700">
            Returning to dashboard in {countdown} seconds...
          </p>
        </div>
      )}

      {!isApproved && !isPending && (
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 sm:h-20 sm:w-20">
            <XCircle className="h-10 w-10 sm:h-12 sm:w-12" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">Payment Declined</h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            The transaction could not be processed. Please try again or use another card.
          </p>
        </div>
      )}

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
            <span className="text-slate-500">Amount Paid</span>
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
            Return to Dashboard
            <ArrowRight className="ml-2 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function PaymentReturnPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:py-20 sm:px-6">
      <Suspense fallback={<div className="text-center text-slate-500">Loading payment details...</div>}>
        <PaymentReturnContent />
      </Suspense>
    </div>
  );
}
