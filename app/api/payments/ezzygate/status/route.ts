import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/src/lib/db/mongoose";
import User, { toSafeUser } from "@/src/lib/db/models/User";
import { approvePaymentAttempt } from "@/src/lib/paymentAttempt";
import { CurrencyCode } from "@/config/currency";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const attemptId = url.searchParams.get("attempt") || "";
  const userId = url.searchParams.get("userId") || "";

  const replyCode = url.searchParams.get("replyCode") || url.searchParams.get("Reply") || "";
  const transactionId = url.searchParams.get("trans_id") || url.searchParams.get("TransID") || "";
  const signature = url.searchParams.get("signature") || url.searchParams.get("Signature") || "";
  const amount = Number(url.searchParams.get("trans_amount") || url.searchParams.get("Amount") || 0);
  const currency = String(url.searchParams.get("trans_currency") || url.searchParams.get("Currency") || "").toUpperCase() as CurrencyCode;

  if (!attemptId) {
    return NextResponse.json({ success: false, error: "Invalid payment reference." }, { status: 400 });
  }

  try {
    let isDbConnected = false;
    try {
      await connectDB();
      isDbConnected = true;
    } catch (dbErr) {
      console.warn("MongoDB connection unavailable for payment status check:", dbErr);
    }

    if (isDbConnected) {
      // Check if redirect contains verified successful signature
      if (replyCode === "000" && transactionId && signature) {
        const approvedResult = await approvePaymentAttempt({
          attemptId,
          replyCode,
          transactionId,
          signature,
          amount,
          currency,
        });

        if (approvedResult) {
          return NextResponse.json({
            success: true,
            status: "approved",
            transactionId: approvedResult.attempt?.transactionId || transactionId,
            user: toSafeUser(approvedResult.user),
          });
        }
      }

      if (mongoose.Types.ObjectId.isValid(userId)) {
        const user = await User.findOne({ _id: userId, "paymentAttempts.id": attemptId });
        if (user) {
          const attempt = user.paymentAttempts.find((item) => item.id === attemptId);
          return NextResponse.json({
            success: true,
            status: attempt?.status || (replyCode === "000" ? "approved" : "pending"),
            transactionId: attempt?.transactionId || transactionId || attemptId,
            user: toSafeUser(user),
          });
        }
      }
    }

    // Demo / fallback user mode or when replyCode is 000
    const isApproved = replyCode === "000" || !replyCode;
    return NextResponse.json({
      success: true,
      status: isApproved ? "approved" : "failed",
      transactionId: transactionId || attemptId,
    });
  } catch (error) {
    console.error("[payment:status]", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ success: false, error: "Unable to confirm payment status." }, { status: 500 });
  }
}
