import { NextResponse } from "next/server";
import { verifyEzzygateHostedResponseSignature } from "@/src/lib/ezzygate";
import { logEzzygateEvent } from "@/src/lib/ezzygateLogger";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    const paramsMap: Record<string, string> = {};

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await req.text();
      const searchParams = new URLSearchParams(text);
      searchParams.forEach((val, key) => {
        paramsMap[key] = val;
      });
    } else if (contentType.includes("application/json")) {
      const json = await req.json();
      Object.assign(paramsMap, json);
    } else {
      const text = await req.text();
      const searchParams = new URLSearchParams(text);
      searchParams.forEach((val, key) => {
        paramsMap[key] = val;
      });
    }

    const replyCode = paramsMap.replyCode || paramsMap.Reply || "";
    const transId = paramsMap.trans_id || paramsMap.TransID || "";
    const receivedSig = paramsMap.signature || paramsMap.Signature || "";

    const isValid = verifyEzzygateHostedResponseSignature(replyCode, transId, receivedSig);
    const isApproved = replyCode === "000";

    const webhookEvent = {
      contentType,
      receivedParams: paramsMap,
      replyCode,
      replyDesc: paramsMap.replyDesc || paramsMap.ReplyDesc || "",
      trans_id: transId,
      trans_amount: paramsMap.trans_amount || paramsMap.Amount || "",
      trans_currency: paramsMap.trans_currency || paramsMap.Currency || "",
      signatureValid: isValid,
      status: isApproved ? "approved" : "pending_or_declined",
    };

    logEzzygateEvent("webhook", webhookEvent);

    return NextResponse.json({
      received: true,
      signatureValid: isValid,
      replyCode,
      trans_id: transId,
      status: isApproved ? "approved" : "pending_or_declined",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Webhook processing error";
    logEzzygateEvent("webhook", { error: message });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
