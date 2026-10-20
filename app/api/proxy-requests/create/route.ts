import crypto from "crypto";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/src/lib/db/mongoose";
import User, { IProxyRequest, ITransaction, toSafeUser } from "@/src/lib/db/models/User";
import { sendProxyRequestConfirmation, sendProxyRequestNotification } from "@/src/lib/email/resend";
import { getTemplateById, getTier, tierAccessLabel } from "@/config/packages";
import { getLocationByCountry } from "@/config/locations";
import { convertFromEUR } from "@/config/currency";

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

    // Only fixed-price packages are sold, so every order costs exactly one of
    // the standard package amounts.
    if (body.requestKind !== "ready-package") return NextResponse.json({ success: false, error: "Choose one of the ready packages." }, { status: 400 });
    const template = getTemplateById(String(body.packageId || ""));
    if (!template) return NextResponse.json({ success: false, error: "Invalid package ID." }, { status: 400 });
    const tier = getTier(template, Number(body.priceEUR));
    if (!tier) return NextResponse.json({ success: false, error: "Invalid package price." }, { status: 400 });
    const { location, city, carrier } = validLocation(body.country, body.city, body.carrier);
    if (!location.products.includes(template.productLabel)) return NextResponse.json({ success: false, error: `${template.productLabel} proxies are not available in ${location.country}.` }, { status: 400 });
    const reference = `PRX-${Date.now()}-${crypto.randomUUID().slice(0, 5)}`;
    const proxyRequest: IProxyRequest = {
      id: reference,
      requestKind: "ready-package",
      packageName: `${template.name} — ${tierAccessLabel(template, tier)}`,
      proxyType: template.proxyType,
      country: location.country,
      city,
      carrier,
      protocol: template.protocol,
      rotation: template.rotation,
      authMethod: template.authMethod,
      quantity: template.quantity,
      bandwidthGb: template.duration === "pay-per-gb" ? tier.amount : 0,
      duration: template.duration,
      durationQuantity: tier.amount,
      estimatedPriceEUR: tier.priceEUR,
      priceGBP: convertFromEUR(tier.priceEUR, "GBP"),
      displayCurrency: validCurrency(body.displayCurrency),
      status: "paid",
      invoiceNumber: invoiceNumber(reference),
      invoiceIssuedAt: new Date(),
      emailStatus: "pending",
      paidAt: new Date(),
      createdAt: new Date(),
    };

    let isDbConnected = false;
    try {
      await connectDB();
      isDbConnected = true;
    } catch {
      // DB connection fallback
    }

    if (isDbConnected && mongoose.Types.ObjectId.isValid(userId)) {
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
        { _id: userId },
        {
          $push: { proxyRequests: { $each: [proxyRequest], $position: 0 }, transactions: { $each: [transaction], $position: 0 } },
        },
        { new: true }
      );
      if (updatedUser) {
        const customer = { name: `${updatedUser.name} ${updatedUser.surname}`.trim(), email: updatedUser.email, address: updatedUser.address };
        const delivery = await sendProxyRequestConfirmation(customer, proxyRequest);
        await User.updateOne(
          { _id: updatedUser._id, "proxyRequests.id": proxyRequest.id },
          { $set: { "proxyRequests.$.emailStatus": delivery.sent ? "sent" : "failed", "proxyRequests.$.emailId": delivery.id } }
        );
        await sendProxyRequestNotification({ name: updatedUser.name, surname: updatedUser.surname, email: updatedUser.email, phone: updatedUser.phoneNumber }, proxyRequest);

        return NextResponse.json({ success: true, user: toSafeUser(updatedUser), proxyRequest, emailSent: delivery.sent });
      }
    }

    // Demo / offline fallback mode
    return NextResponse.json({
      success: true,
      proxyRequest,
      message: "Order placed successfully.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error.";
    console.error(`[proxy-request] ${message}`);
    return NextResponse.json({ success: false, error: message.includes("not available") || message.includes("required") ? message : "Internal server error." }, { status: 500 });
  }
}
