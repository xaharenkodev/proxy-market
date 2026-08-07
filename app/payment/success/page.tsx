"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Clock3, ShieldCheck, Wallet } from "lucide-react";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

type PaymentState = "checking" | "approved" | "pending" | "failed" | "error";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const { user, updateUser } = useAuth();
  const attempt = searchParams.get("attempt");
  const [state, setState] = useState<PaymentState>("checking");
  const [transactionId, setTransactionId] = useState("");
  const cannotCheckPayment = !attempt || !user;

  useEffect(() => {
    if (cannotCheckPayment || !attempt || !user) return;

    let active = true;
    let retries = 0;
    const check = async () => {
      try {
        const response = await fetch(`/api/payments/ezzygate/status?attempt=${encodeURIComponent(attempt)}&userId=${encodeURIComponent(user._id)}`);
        const data = await response.json();
        if (!active) return;
        if (data.success && data.status === "approved") {
          updateUser(data.user);
          setTransactionId(data.transactionId || "");
          setState("approved");
          return;
        }
        if (data.success && data.status === "pending" && retries < 15) {
          retries += 1;
          window.setTimeout(check, 2000);
          return;
        }
        setState(data.status === "failed" || data.status === "declined" ? "failed" : "pending");
      } catch {
        if (retries < 15) {
          retries += 1;
          window.setTimeout(check, 2000);
        } else {
          setState("error");
        }
      }
    };
    check();
    return () => { active = false; };
  }, [attempt, cannotCheckPayment, updateUser, user]);

  const content = {
    checking: {
      icon: Clock3,
      title: "Confirming your payment",
      text: "We are waiting for the verified payment confirmation from Ezzygate.",
      tone: "text-sky-600 bg-sky-50",
    },
    approved: {
      icon: CheckCircle2,
      title: "Payment confirmed",
      text: "Your balance was credited after the verified gateway confirmation. Your Invoice / Receipt was sent by email.",
      tone: "text-emerald-600 bg-emerald-50",
    },
    pending: {
      icon: Clock3,
      title: "Payment is still pending",
      text: "The payment has not yet been confirmed by Ezzygate. Please wait a few minutes before contacting support.",
      tone: "text-amber-600 bg-amber-50",
    },
    failed: {
      icon: ShieldCheck,
      title: "Payment was not approved",
      text: "No balance was added. You can return to your wallet and try again.",
      tone: "text-red-600 bg-red-50",
    },
    error: {
      icon: ShieldCheck,
      title: "Unable to confirm this payment",
      text: "Open your wallet to review the current balance or contact support with your gateway reference.",
      tone: "text-red-600 bg-red-50",
    },
  }[cannotCheckPayment ? "error" : state];
  const Icon = content.icon;

  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-2xl shadow-sky-100 sm:p-10">
      <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl ${content.tone}`}><Icon className="h-10 w-10" /></div>
      <h1 className="mt-6 text-3xl font-bold text-slate-950">{content.title}</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">{content.text}</p>
      {transactionId && <p className="mt-5 rounded-xl bg-slate-50 px-4 py-3 font-mono text-xs text-slate-600">Transaction: {transactionId}</p>}
      <Link href="/dashboard/balance" className="mt-8 block"><Button fullWidth><Wallet size={18} /> Return to balance</Button></Link>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100/50 to-slate-50 px-4 py-12 sm:px-6 sm:py-20"><Suspense fallback={<div className="text-center text-slate-500">Loading payment status...</div>}><PaymentSuccessContent /></Suspense></div>;
}
