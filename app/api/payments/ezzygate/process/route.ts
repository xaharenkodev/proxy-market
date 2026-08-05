import { NextResponse } from "next/server";
import { generateEzzygateHostedPaymentUrl } from "@/src/lib/ezzygate";
import { logEzzygateEvent } from "@/src/lib/ezzygateLogger";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currencyIso, merchantID, client_email, client_fullName } = body;

    const host = req.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    
    const url_redirect = `${protocol}://${host}/payment/return`;
    const url_notify = `${protocol}://${host}/api/payments/ezzygate/webhook`;

    const trans_amount = amount ? String(amount) : "25";
    const trans_currency = currencyIso || "EUR";
    const email = client_email || "customer@virenzaproxy.com";
    const fullName = client_fullName || "Customer";

    const result = generateEzzygateHostedPaymentUrl({
      merchantID,
      trans_amount,
      trans_currency,
      trans_type: "0",
      trans_installments: "1",
      client_email: email,
      client_fullName: fullName,
      url_redirect,
      url_notify,
    });

    const curlCommand = `curl -X GET "${result.paymentUrl}"`;

    const curlCommandPost = `curl -X POST "https://uiservices.ezzygate.com/hosted/" \\
  -H "content-type: application/x-www-form-urlencoded" \\
  -d "merchantID=${result.merchantID}&trans_amount=${result.trans_amount}&trans_currency=${result.trans_currency}&trans_type=0&trans_installments=1&client_email=${encodeURIComponent(email)}&signature=${result.urlEncodedSignature}&url_redirect=${encodeURIComponent(url_redirect)}&url_notify=${encodeURIComponent(url_notify)}"`;

    logEzzygateEvent("request", {
      endpoint: "https://uiservices.ezzygate.com/hosted/",
      merchantID: result.merchantID,
      trans_amount: result.trans_amount,
      trans_currency: result.trans_currency,
      trans_type: "0",
      trans_installments: "1",
      client_email: email,
      client_fullName: fullName,
      valuesString: result.valuesString,
      base64Signature: result.base64Signature,
      urlEncodedSignature: result.urlEncodedSignature,
      url_redirect,
      url_notify,
      paymentUrl: result.paymentUrl,
      curlCommand,
      curlCommandPost,
    });

    return NextResponse.json({
      success: true,
      paymentUrl: result.paymentUrl,
      curlCommand,
      curlCommandPost,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal payment error";
    logEzzygateEvent("request", { error: message });
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
