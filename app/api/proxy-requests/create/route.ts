import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/src/lib/db/mongoose";
import User, { toSafeUser, IProxyRequest, ITransaction } from "@/src/lib/db/models/User";
import {
  sendProxyRequestConfirmation,
  sendProxyRequestNotification,
} from "@/src/lib/email/resend";
import { getTemplateById } from "@/config/packages";
import { getLocationByCountry } from "@/config/locations";
import { convertFromEUR } from "@/config/currency";

const validProxyTypes = ["datacenter", "static-residential", "residential", "mobile"];
const validProtocols = ["HTTP", "SOCKS5"];
const validRotations = ["rotating", "sticky"];
const validAuthMethods = ["Username/password", "IP whitelist"];
const validDurations = ["daily", "weekly", "monthly", "pay-per-gb"];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, requestKind, packageId } = body;

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required." }, { status: 400 });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ success: false, error: "Invalid user ID." }, { status: 400 });
    }

    let priceEUR: number;
    let proxyRequest: IProxyRequest;

    if (requestKind === "ready-package") {
      if (!packageId || typeof packageId !== "string") {
        return NextResponse.json({ success: false, error: "Package ID is required for ready packages." }, { status: 400 });
      }

      const tpl = getTemplateById(packageId);
      if (!tpl) {
        return NextResponse.json({ success: false, error: "Invalid package ID." }, { status: 400 });
      }

      const country = body.country;
      if (!country || typeof country !== "string" || !country.trim()) {
        return NextResponse.json({ success: false, error: "Country is required." }, { status: 400 });
      }

      const loc = getLocationByCountry(country.trim());
      if (!loc) {
        return NextResponse.json({ success: false, error: "Selected country is not available." }, { status: 400 });
      }

      if (!loc.products.includes(tpl.productLabel)) {
        return NextResponse.json({
          success: false,
          error: `${tpl.productLabel} proxies are not available in ${loc.country}. Available: ${loc.products.join(", ")}.`,
        }, { status: 400 });
      }

      const city = body.city?.trim() || undefined;
      if (city) {
        const validCity = loc.cities.some((c) => c.name === city);
        if (!validCity) {
          return NextResponse.json({ success: false, error: `City "${city}" is not available in ${loc.country}.` }, { status: 400 });
        }
      }

      const carrier = body.carrier?.trim() || undefined;
      if (carrier && loc.carriers) {
        if (!loc.carriers.includes(carrier)) {
          return NextResponse.json({ success: false, error: `Carrier "${carrier}" is not available in ${loc.country}.` }, { status: 400 });
        }
      }

      priceEUR = tpl.priceEUR;
      const priceGBP = convertFromEUR(priceEUR, "GBP");
      const now = new Date();

      proxyRequest = {
        id: `PRX-${Date.now()}`,
        requestKind: "ready-package",
        packageName: tpl.name,
        proxyType: tpl.proxyType,
        country: loc.country,
        city,
        carrier,
        protocol: tpl.protocol,
        rotation: tpl.rotation,
        authMethod: tpl.authMethod,
        quantity: tpl.quantity,
        bandwidthGb: tpl.bandwidthGb,
        duration: tpl.duration,
        estimatedPriceEUR: priceEUR,
        priceGBP,
        displayCurrency: body.displayCurrency || "EUR",
        status: "paid",
        paidAt: now,
        createdAt: now,
      };
    } else {
      const {
        proxyType, country, city, carrier, protocol, rotation,
        authMethod, quantity, bandwidthGb, duration, estimatedPriceEUR,
        displayCurrency,
      } = body;

      if (!proxyType || !validProxyTypes.includes(proxyType)) {
        return NextResponse.json({ success: false, error: "Valid proxy type is required." }, { status: 400 });
      }
      if (!country || typeof country !== "string" || !country.trim()) {
        return NextResponse.json({ success: false, error: "Country is required." }, { status: 400 });
      }
      if (!protocol || !validProtocols.includes(protocol)) {
        return NextResponse.json({ success: false, error: "Valid protocol is required." }, { status: 400 });
      }
      if (!rotation || !validRotations.includes(rotation)) {
        return NextResponse.json({ success: false, error: "Valid rotation type is required." }, { status: 400 });
      }
      if (!authMethod || !validAuthMethods.includes(authMethod)) {
        return NextResponse.json({ success: false, error: "Valid authentication method is required." }, { status: 400 });
      }
      if (!duration || !validDurations.includes(duration)) {
        return NextResponse.json({ success: false, error: "Valid duration is required." }, { status: 400 });
      }

      const qty = Number(quantity);
      if (!qty || qty < 1) {
        return NextResponse.json({ success: false, error: "Quantity must be at least 1." }, { status: 400 });
      }
      const bw = Number(bandwidthGb);
      if (!bw || bw < 1) {
        return NextResponse.json({ success: false, error: "Bandwidth must be at least 1 GB." }, { status: 400 });
      }

      priceEUR = Number(estimatedPriceEUR);
      if (!priceEUR || priceEUR <= 0) {
        return NextResponse.json({ success: false, error: "Estimated price must be positive." }, { status: 400 });
      }
      priceEUR = +priceEUR.toFixed(2);
      const priceGBP = convertFromEUR(priceEUR, "GBP");
      const now = new Date();

      proxyRequest = {
        id: `PRX-${Date.now()}`,
        requestKind: "custom",
        proxyType,
        country: country.trim(),
        city: city?.trim() || undefined,
        carrier: carrier?.trim() || undefined,
        protocol, rotation, authMethod,
        quantity: qty, bandwidthGb: bw, duration,
        estimatedPriceEUR: priceEUR, priceGBP,
        displayCurrency: displayCurrency || "EUR",
        status: "paid",
        paidAt: now,
        createdAt: now,
      };
    }

    const priceGBP = proxyRequest.priceGBP!;
    const isPackage = proxyRequest.requestKind === "ready-package";
    const description = isPackage
      ? `Proxy package: ${proxyRequest.packageName} — ${proxyRequest.country}${proxyRequest.city ? `, ${proxyRequest.city}` : ""}`
      : `Custom proxy: ${proxyRequest.proxyType} — ${proxyRequest.country}${proxyRequest.city ? `, ${proxyRequest.city}` : ""}`;

    const transaction: ITransaction = {
      id: `TXN-${Date.now()}`,
      type: "purchase",
      amountGBP: -priceGBP,
      currency: "GBP",
      description,
      status: "completed",
      createdAt: proxyRequest.createdAt,
    };

    await connectDB();

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, balanceGBP: { $gte: priceGBP } },
      {
        $inc: { balanceGBP: -(+priceGBP.toFixed(2)) },
        $push: {
          proxyRequests: { $each: [proxyRequest], $position: 0 },
          transactions: { $each: [transaction], $position: 0 },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      const userExists = await User.exists({ _id: userId });
      if (!userExists) {
        return NextResponse.json({ success: false, error: "User not found." }, { status: 404 });
      }
      return NextResponse.json({
        success: false,
        error: "Insufficient balance. Please top up your balance before submitting this request.",
        insufficientBalance: true,
      }, { status: 400 });
    }

    try {
      await sendProxyRequestConfirmation({ email: updatedUser.email, name: updatedUser.name }, proxyRequest);
    } catch { /* Email failure should not block */ }

    try {
      await sendProxyRequestNotification(
        { name: updatedUser.name, surname: updatedUser.surname, email: updatedUser.email, phone: updatedUser.phoneNumber },
        proxyRequest
      );
    } catch { /* Notification failure should not block */ }

    return NextResponse.json({ success: true, user: toSafeUser(updatedUser), proxyRequest });
  } catch (error) {
    console.error("Proxy request error:", error);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}
