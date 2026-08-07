import crypto from "crypto";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db/mongoose";
import User, { IPaymentAttempt } from "@/src/lib/db/models/User";
import { convertToGBP, CurrencyCode } from "@/config/currency";
import { generateEzzygateHostedPaymentUrl } from "@/src/lib/ezzygate";
import { logEzzygateEvent } from "@/src/lib/ezzygateLogger";

export const runtime = "nodejs";

const SUPPORTED_CURRENCIES = new Set<CurrencyCode>(["EUR", "GBP", "USD"]);

function invoiceNumber(attemptId: string) {
  return `INV-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${attemptId.slice(0, 8).toUpperCase()}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const amount = Number(body.amount);
    const currency = String(body.currencyIso || "").toUpperCase() as CurrencyCode;
    const userId = String(body.userId || "");

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ success: false, error: "A valid account is required." }, { status: 400 });
    }
    if (!SUPPORTED_CURRENCIES.has(currency)) {
      return NextResponse.json({ success: false, error: "Supported payment currencies are EUR, GBP and USD." }, { status: 400 });
    }
    if (!Number.isFinite(amount) || amount <= 0 || amount > 100000) {
      return NextResponse.json({ success: false, error: "Enter a valid payment amount." }, { status: 400 });
    }

    await connectDB();
    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ success: false, error: "User not found." }, { status: 404 });

    const attemptId = crypto.randomUUID();
    const roundedAmount = +amount.toFixed(2);
    const paymentAttempt: IPaymentAttempt = {
      id: attemptId,
      amount: roundedAmount,
      currency,
      amountGBP: convertToGBP(roundedAmount, currency),
      status: "pending",
      invoiceNumber: invoiceNumber(attemptId),
      emailStatus: "pending",
      createdAt: new Date(),
    };
    user.paymentAttempts.unshift(paymentAttempt);
    await user.save();

    const origin = new URL(request.url).origin;
    const urlRedirect = new URL("/payment/return", origin);
    const urlNotify = new URL("/api/payments/ezzygate/webhook", origin);
    urlRedirect.searchParams.set("attempt", attemptId);
    urlNotify.searchParams.set("attempt", attemptId);

    const result = generateEzzygateHostedPaymentUrl({
      trans_amount: roundedAmount.toFixed(2),
      trans_currency: currency,
      trans_type: "0",
      trans_installments: "1",
      client_email: user.email,
      client_fullName: `${user.name} ${user.surname}`.trim(),
      url_redirect: urlRedirect.toString(),
      url_notify: urlNotify.toString(),
    });

    logEzzygateEvent("request", { attemptId, amount: roundedAmount, currency });
    return NextResponse.json({ success: true, paymentUrl: result.paymentUrl, attemptId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Payment initiation failed.";
    console.error(`[payment:init] ${message}`);
    return NextResponse.json({ success: false, error: "Payment initiation failed." }, { status: 500 });
  }
}
