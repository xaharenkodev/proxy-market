import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db/mongoose";
import User, { IPaymentAttempt, ITransaction } from "@/src/lib/db/models/User";
import { verifyEzzygateHostedResponseSignature } from "@/src/lib/ezzygate";
import { logEzzygateEvent } from "@/src/lib/ezzygateLogger";
import { sendTopUpEmail } from "@/src/lib/email/resend";
import { CurrencyCode } from "@/config/currency";
import { canApprovePaymentAttempt } from "@/src/lib/paymentAttempt";

export const runtime = "nodejs";

function customerFromUser(user: { name: string; surname: string; email: string; address: { street: string; city: string; country: string; postCode: string } }) {
  return { name: `${user.name} ${user.surname}`.trim(), email: user.email, address: user.address };
}

export async function POST(request: Request) {
  try {
    const params: Record<string, string> = {};
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      Object.assign(params, await request.json());
    } else {
      const body = new URLSearchParams(await request.text());
      body.forEach((value, key) => { params[key] = value; });
    }

    const url = new URL(request.url);
    const attemptId = url.searchParams.get("attempt") || params.attempt || "";
    const replyCode = params.replyCode || params.Reply || "";
    const transactionId = params.trans_id || params.TransID || "";
    const signature = params.signature || params.Signature || "";
    const amount = Number(params.trans_amount || params.Amount || 0);
    const currency = String(params.trans_currency || params.Currency || "").toUpperCase() as CurrencyCode;
    const approved = replyCode === "000";
    const signatureValid = verifyEzzygateHostedResponseSignature(replyCode, transactionId, signature);

    if (!attemptId || !transactionId || !signatureValid || !approved) {
      logEzzygateEvent("webhook", { attemptId: attemptId || undefined, approved, signatureValid });
      return NextResponse.json({ received: true, processed: false }, { status: signatureValid ? 200 : 400 });
    }

    await connectDB();
    const user = await User.findOne({ "paymentAttempts.id": attemptId });
    if (!user) return NextResponse.json({ received: true, processed: false }, { status: 404 });
    const attempt = user.paymentAttempts.find((item) => item.id === attemptId);
    if (!attempt) return NextResponse.json({ received: true, processed: false }, { status: 404 });
    if (attempt.status === "approved") return NextResponse.json({ received: true, processed: true, alreadyProcessed: true });
    if (!canApprovePaymentAttempt(attempt, amount, currency)) {
      await User.updateOne(
        { _id: user._id, "paymentAttempts.id": attemptId },
        { $set: { "paymentAttempts.$.status": "failed" } }
      );
      logEzzygateEvent("webhook", { attemptId, approved: false, signatureValid: true, reason: "payment_details_mismatch" });
      return NextResponse.json({ received: true, processed: false }, { status: 400 });
    }

    const now = new Date();
    const transaction: ITransaction = {
      id: `TXN-EZZYGATE-${transactionId}`,
      type: "topup",
      amountGBP: attempt.amountGBP,
      currency: "GBP",
      description: `Wallet top-up (${attempt.currency} ${attempt.amount.toFixed(2)})`,
      status: "completed",
      invoiceNumber: attempt.invoiceNumber,
      invoiceIssuedAt: now,
      emailStatus: "pending",
      createdAt: now,
    };
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: user._id,
        paymentAttempts: { $elemMatch: { id: attemptId, status: "pending", amount: attempt.amount, currency: attempt.currency } },
      },
      {
        $inc: { balanceGBP: attempt.amountGBP },
        $push: { transactions: { $each: [transaction], $position: 0 } },
        $set: {
          "paymentAttempts.$.status": "approved",
          "paymentAttempts.$.transactionId": transactionId,
          "paymentAttempts.$.completedAt": now,
        },
      },
      { new: true }
    );
    if (!updatedUser) return NextResponse.json({ received: true, processed: true, alreadyProcessed: true });

    const approvedAttempt = updatedUser.paymentAttempts.find((item) => item.id === attemptId) as IPaymentAttempt;
    const delivery = await sendTopUpEmail(customerFromUser(updatedUser), {
      invoiceNumber: approvedAttempt.invoiceNumber,
      reference: transaction.id,
      amount: approvedAttempt.amount,
      currency: approvedAttempt.currency,
      amountGBP: approvedAttempt.amountGBP,
    });
    await User.updateOne(
      { _id: updatedUser._id, "paymentAttempts.id": attemptId },
      {
        $set: {
          "paymentAttempts.$.emailStatus": delivery.sent ? "sent" : "failed",
          "paymentAttempts.$.emailId": delivery.id,
        },
      }
    );
    await User.updateOne(
      { _id: updatedUser._id, "transactions.id": transaction.id },
      {
        $set: {
          "transactions.$.emailStatus": delivery.sent ? "sent" : "failed",
          "transactions.$.emailId": delivery.id,
        },
      }
    );
    logEzzygateEvent("webhook", { attemptId, approved: true, signatureValid: true, emailSent: delivery.sent });
    return NextResponse.json({ received: true, processed: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook processing error";
    console.error(`[payment:webhook] ${message}`);
    return NextResponse.json({ received: false }, { status: 500 });
  }
}
