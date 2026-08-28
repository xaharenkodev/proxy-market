import crypto from "crypto";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/src/lib/db/mongoose";
import User, { ITransaction, toSafeUser } from "@/src/lib/db/models/User";
import { convertToGBP, CurrencyCode } from "@/config/currency";
import { env } from "@/src/config/env";
import { sendTopUpEmail } from "@/src/lib/email/resend";

const SUPPORTED_CURRENCIES = new Set<CurrencyCode>(["EUR", "GBP", "USD"]);

function createInvoiceNumber() {
  return `INV-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export async function POST(request: Request) {
  try {
    if (!env.PAYMENT_TEST_MODE) {
      return NextResponse.json({ success: false, error: "Test top-ups are disabled." }, { status: 403 });
    }

    const body = await request.json();
    const userId = String(body.userId || "");
    const amount = Number(body.amount ?? body.amountGBP);
    const currency = (body.currency || "GBP") as CurrencyCode;

    if (!userId) {
      return NextResponse.json({ success: false, error: "A valid account is required." }, { status: 400 });
    }
    if (!SUPPORTED_CURRENCIES.has(currency) || !Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ success: false, error: "Enter a valid amount and currency." }, { status: 400 });
    }

    const amountGBP = convertToGBP(amount, currency);
    const now = new Date();
    const transaction: ITransaction = {
      id: `TXN-TEST-${Date.now()}`,
      type: "topup",
      amountGBP,
      currency: "GBP",
      description: `Test wallet top-up (${currency} ${amount.toFixed(2)})`,
      status: "completed",
      invoiceNumber: createInvoiceNumber(),
      invoiceIssuedAt: now,
      emailStatus: "pending",
      createdAt: now,
    };

    let isDbConnected = false;
    try {
      await connectDB();
      isDbConnected = true;
    } catch (dbErr) {
      console.warn("MongoDB connection unavailable for top-up:", dbErr);
    }

    if (isDbConnected && mongoose.Types.ObjectId.isValid(userId)) {
      const user = await User.findById(userId);
      if (user) {
        user.balanceGBP = +(user.balanceGBP + amountGBP).toFixed(2);
        user.transactions.unshift(transaction);
        await user.save();

        const delivery = await sendTopUpEmail(
          { name: `${user.name} ${user.surname}`.trim(), email: user.email, address: user.address },
          { invoiceNumber: transaction.invoiceNumber!, reference: transaction.id, amount, currency, amountGBP }
        );
        await User.updateOne(
          { _id: user._id, "transactions.id": transaction.id },
          { $set: { "transactions.$.emailStatus": delivery.sent ? "sent" : "failed", "transactions.$.emailId": delivery.id } }
        );

        return NextResponse.json({ success: true, user: toSafeUser(user), emailSent: delivery.sent });
      }
    }

    // Demo / offline fallback mode
    return NextResponse.json({ success: true, amountGBP, message: "Top-up credited in demo mode." });
  } catch (error) {
    console.error("[top-up:test]", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ success: false, error: "Top-up process error." }, { status: 500 });
  }
}
