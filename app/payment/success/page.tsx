"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { completePendingOrder } from "@/config/checkout";

type PaymentState = "checking" | "approved" | "pending" | "failed" | "error";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const { user, updateUser } = useAuth();
  const { displayCurrency } = useCurrency();
  const attempt = searchParams.get("attempt");
  const [state, setState] = useState<PaymentState>("checking");
  const [transactionId, setTransactionId] = useState("");
  const [orderId, setOrderId] = useState("");
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
          // The payment is confirmed, so place the order it was paid for.
          const placed = await completePendingOrder(user._id, displayCurrency);
          if (placed?.ok) {
            updateUser(placed.order.user as never);
            setOrderId(placed.order.id);
          }
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
  }, [attempt, cannotCheckPayment, displayCurrency, updateUser, user]);

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
      text: "Your order was paid with a single one-time payment after the verified gateway confirmation. No subscription was created and your payment method will not be charged again. Your Invoice / Receipt was sent by email.",
      tone: "text-emerald-600 bg-emerald-50",
    },
    pending: {
      icon: Clock3,
      title: "Payment is still pending",
      text: "The payment has not yet been confirmed by Ezzygate. Your order stays unpaid until it is. Please wait a few minutes before contacting support.",
      tone: "text-amber-600 bg-amber-50",
    },
    failed: {
      icon: ShieldCheck,
      title: "Payment was not approved",
      text: "You were not charged and the order was not placed. You can configure the order again and retry the payment.",
      tone: "text-red-600 bg-red-50",
    },
    error: {
      icon: ShieldCheck,
      title: "Unable to confirm this payment",
      text: "Open your orders to check whether this order was paid, or contact support with your gateway reference.",
      tone: "text-red-600 bg-red-50",
    },
  }[cannotCheckPayment ? "error" : state];
  const Icon = content.icon;

  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-2xl shadow-sky-100 sm:p-10">
      <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl ${content.tone}`}><Icon className="h-10 w-10" /></div>
      <h1 className="mt-6 text-3xl font-bold text-slate-950">{content.title}</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">{content.text}</p>
      {orderId && <p className="mt-5 rounded-xl bg-slate-50 px-4 py-3 font-mono text-xs text-slate-600">Order: {orderId}</p>}
      {transactionId && <p className="mt-2 rounded-xl bg-slate-50 px-4 py-3 font-mono text-xs text-slate-600">Transaction: {transactionId}</p>}
      <Link href="/dashboard/orders" className="mt-8 block"><Button fullWidth>View your orders <ArrowRight size={18} /></Button></Link>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100/50 to-slate-50 px-4 py-12 sm:px-6 sm:py-20"><Suspense fallback={<div className="text-center text-slate-500">Loading payment status...</div>}><PaymentSuccessContent /></Suspense></div>;
}
