import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/src/lib/db/mongoose";
import User, { toSafeUser } from "@/src/lib/db/models/User";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const attemptId = url.searchParams.get("attempt") || "";
  const userId = url.searchParams.get("userId") || "";
  if (!attemptId || !mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ success: false, error: "Invalid payment reference." }, { status: 400 });
  }
  try {
    await connectDB();
    const user = await User.findOne({ _id: userId, "paymentAttempts.id": attemptId });
    if (!user) return NextResponse.json({ success: false, error: "Payment reference not found." }, { status: 404 });
    const attempt = user.paymentAttempts.find((item) => item.id === attemptId);
    return NextResponse.json({ success: true, status: attempt?.status, transactionId: attempt?.transactionId, user: toSafeUser(user) });
  } catch (error) {
    console.error("[payment:status]", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ success: false, error: "Unable to confirm payment status." }, { status: 500 });
  }
}
