"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function PaymentReturnContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const reply = searchParams.get("replyCode") || searchParams.get("Reply") || searchParams.get("reply") || "";
    const queryString = searchParams.toString();

    if (reply === "000") {
      router.replace(`/payment/success${queryString ? `?${queryString}` : ""}`);
    } else {
      router.replace(`/payment/decline${queryString ? `?${queryString}` : ""}`);
    }
  }, [searchParams, router]);

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl">
      <p className="text-sm font-semibold text-slate-600">Redirecting to payment status...</p>
    </div>
  );
}

export default function PaymentReturnPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:py-20 sm:px-6">
      <Suspense fallback={<div className="text-center text-slate-500">Loading payment status...</div>}>
        <PaymentReturnContent />
      </Suspense>
    </div>
  );
}
