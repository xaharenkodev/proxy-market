"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ShieldCheck, Lock, Smartphone, ArrowRight, XCircle } from "lucide-react";
import Button from "@/components/ui/Button";

function SimulatorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const transId = searchParams.get("TransID") || "7348347";
  const amount = searchParams.get("Amount") || "25.00";
  const currency = searchParams.get("Currency") || "EUR";
  const order = searchParams.get("Order") || "ORD-381728";

  const [otp, setOtp] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState("");

  const handleAuthorize = async (replyCode = "000") => {
    setLoading(true);
    setStatusText("Verifying 3D Secure authentication with issuing bank...");

    try {
      // Send server-to-server webhook notification to simulate real gateway callback
      await fetch("/api/payments/ezzygate/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          Reply: replyCode,
          TransID: transId,
          Order: order,
          Amount: amount,
          Currency: currency,
          Signature: "TEST_SIMULATED_WEBHOOK_SIGNATURE",
        }).toString(),
      });
    } catch (_err) {
      // Ignore webhook network failure in test mode
    }

    setTimeout(() => {
      const returnUrl = `/payment/return?Reply=${replyCode}&TransID=${transId}&Amount=${amount}&Currency=${currency}&Order=${encodeURIComponent(
        order
      )}`;
      router.push(returnUrl);
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
      {/* 3DS Bank Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-white font-bold text-sm">
            3DS
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">Visa Secure / Mastercard ID Check</div>
            <div className="text-[11px] text-slate-500">Bank 3D Secure Simulator</div>
          </div>
        </div>
        <Lock className="h-5 w-5 text-emerald-500" />
      </div>

      {/* Transaction Details */}
      <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-xs space-y-2 border border-slate-100">
        <div className="flex justify-between">
          <span className="text-slate-500">Merchant Name</span>
          <span className="font-semibold text-slate-900">Virenza Proxy Ltd</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Transaction Amount</span>
          <span className="font-bold text-slate-900 text-sm">{amount} {currency}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Order Ref</span>
          <span className="font-mono text-slate-700">{order}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Card Number</span>
          <span className="font-mono text-slate-700">•••• •••• •••• 4387</span>
        </div>
      </div>

      {/* Verification Challenge Body */}
      <div className="mt-6 space-y-4">
        <div className="flex items-start space-x-3 rounded-xl bg-sky-50/70 p-3 text-xs text-sky-950 border border-sky-100">
          <Smartphone className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">SMS Verification Code Sent</p>
            <p className="mt-0.5 text-slate-600">
              A 6-digit verification code has been sent to your mobile phone (+44 •••• ••12).
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
            Enter 6-Digit One-Time Passcode (OTP)
          </label>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full text-center text-2xl font-mono tracking-[0.4em] rounded-xl border border-slate-300 p-3 font-bold text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none"
          />
        </div>

        {statusText && (
          <p className="text-xs text-center font-semibold text-sky-700 animate-pulse">
            {statusText}
          </p>
        )}

        <div className="space-y-2.5 pt-2">
          <Button
            fullWidth
            onClick={() => handleAuthorize("000")}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 font-semibold py-3"
          >
            {loading ? "Authenticating..." : "Complete 3D Secure Challenge"}
            <ArrowRight className="ml-2 inline h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            fullWidth
            onClick={() => handleAuthorize("1002")}
            disabled={loading}
            className="border-slate-200 text-slate-600 text-xs"
          >
            <XCircle className="mr-1.5 inline h-3.5 w-3.5 text-red-500" />
            Cancel / Fail 3DS Verification
          </Button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center space-x-1.5 text-[11px] text-slate-400 border-t border-slate-100 pt-4">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
        <span>Ezzygate 3D Secure v3.00 Hosted Gateway</span>
      </div>
    </div>
  );
}

export default function ThreeDSSimulatorPage() {
  return (
    <div className="min-h-screen bg-slate-100/70 py-12 px-4 sm:py-20 sm:px-6 flex items-center justify-center">
      <Suspense fallback={<div className="text-center text-slate-500">Loading 3D Secure simulator...</div>}>
        <SimulatorContent />
      </Suspense>
    </div>
  );
}
