import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/src/lib/db/mongoose";
import User, { toSafeUser } from "@/src/lib/db/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    let isDbConnected = false;
    try {
      await connectDB();
      isDbConnected = true;
    } catch (dbErr) {
      console.warn("MongoDB connection unavailable, using demo login fallback:", dbErr);
    }

    if (isDbConnected) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return NextResponse.json(
          { success: false, error: "Invalid email or password." },
          { status: 401 }
        );
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return NextResponse.json(
          { success: false, error: "Invalid email or password." },
          { status: 401 }
        );
      }

      return NextResponse.json({ success: true, user: toSafeUser(user) });
    }

    // Demo user fallback when database is not configured/reachable
    const demoUser = {
      _id: "demo-user-1",
      email: email.toLowerCase(),
      name: email.split("@")[0] || "User",
      surname: "Customer",
      phoneNumber: "+123456789",
      dateOfBirth: "1995-01-01",
      address: {
        street: "123 Main St",
        city: "London",
        country: "United Kingdom",
        postCode: "N22 8HH",
      },
      balanceGBP: 50,
      transactions: [],
      orders: [],
      proxyRequests: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, user: demoUser });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Login failed." },
      { status: 500 }
    );
  }
}
