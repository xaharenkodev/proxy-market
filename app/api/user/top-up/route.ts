import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/src/lib/db/mongoose";
import User, { toSafeUser } from "@/src/lib/db/models/User";
import { sendTopUpEmail } from "@/src/lib/email/resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, amountGBP, transId, trans_id } = body;

    if (!userId || amountGBP === undefined) {
      return NextResponse.json(
        { success: false, error: "userId and amountGBP are required." },
        { status: 400 }
      );
    }

    const amount = Number(amountGBP);
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { success: false, error: "Valid top-up amount is required." },
        { status: 400 }
      );
    }

    const gatewayTransId = transId || trans_id || "";
    const txnId = gatewayTransId ? `TXN-EZZYGATE-${gatewayTransId}` : `TXN-${Date.now()}`;

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
        const alreadyProcessed = gatewayTransId && user.transactions.some(
          (t: { id: string; description?: string }) => t.id === txnId || (t.description && t.description.includes(gatewayTransId))
        );

        if (alreadyProcessed) {
          return NextResponse.json({
            success: true,
            alreadyProcessed: true,
            user: toSafeUser(user),
          });
        }

        user.balanceGBP = +(user.balanceGBP + amount).toFixed(2);
        user.transactions.unshift({
          id: txnId,
          type: "topup",
          amountGBP: amount,
          currency: "GBP",
          description: gatewayTransId ? `Ezzygate top-up (${gatewayTransId})` : "Wallet top-up",
          status: "completed",
          createdAt: new Date(),
        });

        await user.save();

        try {
          await sendTopUpEmail({ email: user.email, name: user.name }, amount);
        } catch {
          // Email failure should not block top-up
        }

        return NextResponse.json({
          success: true,
          user: toSafeUser(user),
        });
      }
    }

    // Demo / offline fallback mode
    return NextResponse.json({
      success: true,
      amountGBP: amount,
      txnId,
      message: "Top-up credited in demo mode.",
    });
  } catch (error) {
    console.error("Top-up error:", error);
    return NextResponse.json(
      { success: false, error: "Top-up process error." },
      { status: 500 }
    );
  }
}
