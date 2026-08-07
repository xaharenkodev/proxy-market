import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/src/lib/db/mongoose";
import User, { toSafeUser, IOrder } from "@/src/lib/db/models/User";
import { sendOrderConfirmationEmail } from "@/src/lib/email/resend";

const validPlatforms = ["instagram", "tiktok", "youtube"] as const;
const validServices = ["likes", "followers", "subscribers", "views"] as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userId,
      platform,
      service,
      packageName,
      quantity,
      priceGBP,
      targetUrl,
      targetHandle,
    } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID is required." },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, error: "Invalid user ID." },
        { status: 400 }
      );
    }

    if (!platform) {
      return NextResponse.json(
        { success: false, error: "Platform is required." },
        { status: 400 }
      );
    }

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service is required." },
        { status: 400 }
      );
    }

    if (!packageName) {
      return NextResponse.json(
        { success: false, error: "Package name is required." },
        { status: 400 }
      );
    }

    if (!quantity || Number(quantity) <= 0) {
      return NextResponse.json(
        { success: false, error: "Quantity must be greater than 0." },
        { status: 400 }
      );
    }

    if (!priceGBP || Number(priceGBP) <= 0) {
      return NextResponse.json(
        { success: false, error: "Price must be greater than 0." },
        { status: 400 }
      );
    }

    const platformLower = platform.toLowerCase();
    const serviceLower = service.toLowerCase();

    if (
      !validPlatforms.includes(platformLower as (typeof validPlatforms)[number])
    ) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid platform "${platform}". Must be one of: ${validPlatforms.join(", ")}.`,
        },
        { status: 400 }
      );
    }

    if (
      !validServices.includes(serviceLower as (typeof validServices)[number])
    ) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid service "${service}". Must be one of: ${validServices.join(", ")}.`,
        },
        { status: 400 }
      );
    }

    const price = Number(priceGBP);

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found." },
        { status: 404 }
      );
    }

    if (user.balanceGBP < price) {
      return NextResponse.json(
        {
          success: false,
          error: "Insufficient balance. Please top up your wallet.",
        },
        { status: 400 }
      );
    }

    const now = new Date();
    const orderId = `ORD-${Date.now()}`;
    const order: IOrder = {
      id: orderId,
      platform: platformLower as IOrder["platform"],
      service: serviceLower as IOrder["service"],
      packageName,
      quantity: Number(quantity),
      priceGBP: price,
      targetUrl: targetUrl || undefined,
      targetHandle: targetHandle || undefined,
      status: "processing",
      invoiceNumber: `INV-${now.toISOString().slice(0, 10).replaceAll("-", "")}-${orderId.slice(-8)}`,
      invoiceIssuedAt: now,
      emailStatus: "pending",
      createdAt: now,
    };

    user.balanceGBP = +(user.balanceGBP - price).toFixed(2);
    user.orders.unshift(order);
    const transactionId = `TXN-${Date.now()}`;
    user.transactions.unshift({
      id: transactionId,
      type: "purchase",
      amountGBP: -price,
      currency: "GBP",
      description: `${platform} ${service} — ${packageName}`,
      status: "completed",
      invoiceNumber: order.invoiceNumber,
      invoiceIssuedAt: order.invoiceIssuedAt,
      emailStatus: "pending",
      createdAt: now,
    });

    await user.save();

    const delivery = await sendOrderConfirmationEmail(
      { email: user.email, name: `${user.name} ${user.surname}`.trim(), address: user.address },
      order
    );
    await User.updateOne(
      { _id: user._id, "orders.id": order.id },
      { $set: { "orders.$.emailStatus": delivery.sent ? "sent" : "failed", "orders.$.emailId": delivery.id } }
    );
    await User.updateOne(
      { _id: user._id, "transactions.id": transactionId },
      { $set: { "transactions.$.emailStatus": delivery.sent ? "sent" : "failed", "transactions.$.emailId": delivery.id } }
    );

    return NextResponse.json({
      success: true,
      user: toSafeUser(user),
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
