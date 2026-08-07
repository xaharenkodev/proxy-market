import crypto from "crypto";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/src/lib/db/mongoose";
import User, { IProxyRequest, ITransaction, toSafeUser } from "@/src/lib/db/models/User";
import { sendProxyRequestConfirmation, sendProxyRequestNotification } from "@/src/lib/email/resend";
import { getTemplateById } from "@/config/packages";
import { getLocationByCountry } from "@/config/locations";
import { convertFromEUR } from "@/config/currency";
import { calculateProxyPrice, ProxyDuration } from "@/src/lib/pricing";

const validProxyTypes = ["datacenter", "static-residential", "residential", "mobile"];
const validProtocols = ["HTTP", "SOCKS5"];
const validRotations = ["rotating", "sticky"];
const validAuthMethods = ["Username/password", "IP whitelist"];
const validDurations: ProxyDuration[] = ["daily", "weekly", "monthly", "pay-per-gb"];

function invoiceNumber(reference: string) {
  return `INV-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${reference.slice(-8).toUpperCase()}`;
}

function validCurrency(value: unknown) {
  return value === "EUR" || value === "GBP" || value === "USD" ? value : "EUR";
}

function validLocation(country: unknown, city: unknown, carrier: unknown) {
  if (!country || typeof country !== "string") throw new Error("Country is required.");
  const location = getLocationByCountry(country.trim());
  if (!location) throw new Error("Selected country is not available.");
  const selectedCity = typeof city === "string" && city.trim() ? city.trim() : undefined;
  const selectedCarrier = typeof carrier === "string" && carrier.trim() ? carrier.trim() : undefined;
  if (selectedCity && !location.cities.some((item) => item.name === selectedCity)) throw new Error(`City "${selectedCity}" is not available in ${location.country}.`);
  if (selectedCarrier && !location.carriers?.includes(selectedCarrier)) throw new Error(`Carrier "${selectedCarrier}" is not available in ${location.country}.`);
  return { location, city: selectedCity, carrier: selectedCarrier };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = String(body.userId || "");
    if (!mongoose.Types.ObjectId.isValid(userId)) return NextResponse.json({ success: false, error: "A valid account is required." }, { status: 400 });

    let proxyRequest: IProxyRequest;
    if (body.requestKind === "ready-package") {
      const template = getTemplateById(String(body.packageId || ""));
      if (!template) return NextResponse.json({ success: false, error: "Invalid package ID." }, { status: 400 });
      const { location, city, carrier } = validLocation(body.country, body.city, body.carrier);
      if (!location.products.includes(template.productLabel)) return NextResponse.json({ success: false, error: `${template.productLabel} proxies are not available in ${location.country}.` }, { status: 400 });
      const durationQuantity = template.duration === "pay-per-gb" ? template.bandwidthGb : template.durationDays || 1;
      const pricing = calculateProxyPrice({ proxyType: template.proxyType, duration: template.duration as ProxyDuration, quantity: template.quantity, durationQuantity, bandwidthGb: template.bandwidthGb });
      const reference = `PRX-${Date.now()}-${crypto.randomUUID().slice(0, 5)}`;
      proxyRequest = {
        id: reference,
        requestKind: "ready-package",
        packageName: template.name,
        proxyType: template.proxyType,
        country: location.country,
        city,
        carrier,
        protocol: template.protocol,
        rotation: template.rotation,
        authMethod: template.authMethod,
        quantity: template.quantity,
        bandwidthGb: template.bandwidthGb,
        duration: template.duration,
        durationQuantity,
        estimatedPriceEUR: pricing.estimatedPriceEUR,
        priceGBP: convertFromEUR(pricing.estimatedPriceEUR, "GBP"),
        displayCurrency: validCurrency(body.displayCurrency),
        status: "paid",
        invoiceNumber: invoiceNumber(reference),
        invoiceIssuedAt: new Date(),
        emailStatus: "pending",
        paidAt: new Date(),
        createdAt: new Date(),
      };
    } else {
      const proxyType = String(body.proxyType || "");
      const duration = body.duration as ProxyDuration;
      const quantity = Math.floor(Number(body.quantity));
      const durationQuantity = Math.floor(Number(body.durationQuantity));
      const bandwidthGb = Number(body.bandwidthGb || 0);
      if (!validProxyTypes.includes(proxyType)) return NextResponse.json({ success: false, error: "Valid proxy type is required." }, { status: 400 });
      if (!validDurations.includes(duration)) return NextResponse.json({ success: false, error: "Valid plan duration is required." }, { status: 400 });
      if (!validProtocols.includes(body.protocol)) return NextResponse.json({ success: false, error: "Valid protocol is required." }, { status: 400 });
      if (!validRotations.includes(body.rotation)) return NextResponse.json({ success: false, error: "Valid rotation type is required." }, { status: 400 });
      if (!validAuthMethods.includes(body.authMethod)) return NextResponse.json({ success: false, error: "Valid authentication method is required." }, { status: 400 });
      if (!Number.isInteger(quantity) || quantity < 1 || !Number.isInteger(durationQuantity) || durationQuantity < 1) return NextResponse.json({ success: false, error: "Quantity and plan length must be at least 1." }, { status: 400 });
      if (duration === "pay-per-gb" && (!Number.isFinite(bandwidthGb) || bandwidthGb < 1)) return NextResponse.json({ success: false, error: "Bandwidth must be at least 1 GB." }, { status: 400 });
      const { location, city, carrier } = validLocation(body.country, body.city, body.carrier);
      const productLabel = proxyType === "static-residential" ? "Static ISP" : proxyType.charAt(0).toUpperCase() + proxyType.slice(1);
      if (!location.products.includes(productLabel)) return NextResponse.json({ success: false, error: `${productLabel} proxies are not available in ${location.country}.` }, { status: 400 });
      const pricing = calculateProxyPrice({ proxyType, duration, quantity, durationQuantity, bandwidthGb });
      const reference = `PRX-${Date.now()}-${crypto.randomUUID().slice(0, 5)}`;
      proxyRequest = {
        id: reference,
        requestKind: "custom",
        proxyType,
        country: location.country,
        city,
        carrier,
        protocol: body.protocol,
        rotation: body.rotation,
        authMethod: body.authMethod,
        quantity,
        bandwidthGb: duration === "pay-per-gb" ? bandwidthGb : 0,
        duration,
        durationQuantity,
        estimatedPriceEUR: pricing.estimatedPriceEUR,
        priceGBP: convertFromEUR(pricing.estimatedPriceEUR, "GBP"),
        displayCurrency: validCurrency(body.displayCurrency),
        status: "paid",
        invoiceNumber: invoiceNumber(reference),
        invoiceIssuedAt: new Date(),
        emailStatus: "pending",
        paidAt: new Date(),
        createdAt: new Date(),
      };
    }

    await connectDB();
    const transaction: ITransaction = {
      id: `TXN-${Date.now()}-${crypto.randomUUID().slice(0, 5)}`,
      type: "purchase",
      amountGBP: -proxyRequest.priceGBP!,
      currency: "GBP",
      description: `Proxy order: ${proxyRequest.proxyType} - ${proxyRequest.country}`,
      status: "completed",
      invoiceNumber: proxyRequest.invoiceNumber,
      invoiceIssuedAt: proxyRequest.invoiceIssuedAt,
      emailStatus: "pending",
      createdAt: proxyRequest.createdAt,
    };
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, balanceGBP: { $gte: proxyRequest.priceGBP } },
      {
        $inc: { balanceGBP: -proxyRequest.priceGBP! },
        $push: { proxyRequests: { $each: [proxyRequest], $position: 0 }, transactions: { $each: [transaction], $position: 0 } },
      },
      { new: true }
    );
    if (!updatedUser) {
      const exists = await User.exists({ _id: userId });
      return NextResponse.json({ success: false, error: exists ? "Insufficient balance. Please top up your balance before submitting this request." : "User not found.", insufficientBalance: Boolean(exists) }, { status: exists ? 400 : 404 });
    }

    const customer = { name: `${updatedUser.name} ${updatedUser.surname}`.trim(), email: updatedUser.email, address: updatedUser.address };
    const delivery = await sendProxyRequestConfirmation(customer, proxyRequest);
    await User.updateOne(
      { _id: updatedUser._id, "proxyRequests.id": proxyRequest.id },
      { $set: { "proxyRequests.$.emailStatus": delivery.sent ? "sent" : "failed", "proxyRequests.$.emailId": delivery.id } }
    );
    await User.updateOne(
      { _id: updatedUser._id, "transactions.id": transaction.id },
      { $set: { "transactions.$.emailStatus": delivery.sent ? "sent" : "failed", "transactions.$.emailId": delivery.id } }
    );
    await sendProxyRequestNotification({ name: updatedUser.name, surname: updatedUser.surname, email: updatedUser.email, phone: updatedUser.phoneNumber }, proxyRequest);

    return NextResponse.json({ success: true, user: toSafeUser(updatedUser), proxyRequest, emailSent: delivery.sent });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error.";
    console.error(`[proxy-request] ${message}`);
    return NextResponse.json({ success: false, error: message.includes("not available") || message.includes("required") ? message : "Internal server error." }, { status: 500 });
  }
}
