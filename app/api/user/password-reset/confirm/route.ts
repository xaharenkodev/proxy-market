import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db/mongoose";
import User from "@/src/lib/db/models/User";
import { hashPasswordResetToken } from "@/src/lib/passwordReset";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();
    if (!token || typeof token !== "string" || !password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json({ success: false, error: "Use a valid reset link and a password of at least 8 characters." }, { status: 400 });
    }
    await connectDB();
    const tokenHash = hashPasswordResetToken(token);
    const user = await User.findOne({ passwordResetTokenHash: tokenHash, passwordResetExpiresAt: { $gt: new Date() } }).select("+passwordResetTokenHash +passwordResetExpiresAt");
    if (!user) return NextResponse.json({ success: false, error: "This reset link is invalid or has expired." }, { status: 400 });
    user.passwordHash = await bcrypt.hash(password, 12);
    user.passwordResetTokenHash = undefined;
    user.passwordResetExpiresAt = undefined;
    await user.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[password-reset:confirm]", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ success: false, error: "Unable to reset your password right now." }, { status: 500 });
  }
}
