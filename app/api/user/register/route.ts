import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/src/lib/db/mongoose";
import User, { toSafeUser } from "@/src/lib/db/models/User";
import { sendWelcomeEmail } from "@/src/lib/email/resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, surname, phoneNumber, dateOfBirth, address } =
      body;

    if (
      !email ||
      !password ||
      !name ||
      !surname ||
      !phoneNumber ||
      !dateOfBirth ||
      !address?.street ||
      !address?.city ||
      !address?.country ||
      !address?.postCode
    ) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    let isDbConnected = false;
    try {
      await connectDB();
      isDbConnected = true;
    } catch (dbErr) {
      console.warn("MongoDB connection unavailable, using demo registration fallback:", dbErr);
    }

    if (isDbConnected) {
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        return NextResponse.json(
          { success: false, error: "An account with this email already exists." },
          { status: 409 }
        );
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const user = await User.create({
        email: email.toLowerCase(),
        passwordHash,
        name,
        surname,
        phoneNumber,
        dateOfBirth,
        address,
        balanceGBP: 0,
        transactions: [],
        orders: [],
      });

      const delivery = await sendWelcomeEmail({ email: user.email, name: user.name, id: user._id.toString() });
      if (!delivery.sent) console.error("[registration] welcome email was not sent");

      return NextResponse.json(
        { success: true, user: toSafeUser(user), emailSent: delivery.sent },
        { status: 201 }
      );
    }

    // Demo user fallback when database is not configured/reachable
    const demoUser = {
      _id: "user-" + Date.now(),
      email: email.toLowerCase(),
      name,
      surname,
      phoneNumber,
      dateOfBirth,
      address,
      balanceGBP: 0,
      transactions: [],
      orders: [],
      proxyRequests: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { success: true, user: demoUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { success: false, error: "Registration failed. Please check form fields." },
      { status: 500 }
    );
  }
}
