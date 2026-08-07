import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db/mongoose";
import User from "@/src/lib/db/models/User";
import { sendPasswordResetEmail } from "@/src/lib/email/resend";
import { createPasswordResetToken } from "@/src/lib/passwordReset";

const GENERIC_RESPONSE = { success: true, message: "If an account exists for this email, a reset link has been sent." };

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== "string") return NextResponse.json(GENERIC_RESPONSE);
    await connectDB();
    const user = await User.findOne({ email: email.trim().toLowerCase() }).select("+passwordResetTokenHash +passwordResetExpiresAt");
    if (!user) return NextResponse.json(GENERIC_RESPONSE);

    const reset = createPasswordResetToken();
    user.passwordResetTokenHash = reset.tokenHash;
    user.passwordResetExpiresAt = reset.expiresAt;
    await user.save();
    const delivery = await sendPasswordResetEmail({ email: user.email, name: user.name, id: user._id.toString() }, reset.token);
    if (!delivery.sent) console.error("[password-reset] reset email was not sent");
    return NextResponse.json(GENERIC_RESPONSE);
  } catch (error) {
    console.error("[password-reset:request]", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ success: false, error: "Unable to request a password reset right now." }, { status: 500 });
  }
}
