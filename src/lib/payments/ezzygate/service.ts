import { ezzygateConfig } from "./config";
import { calculateSha256BinaryBase64 } from "./signatures";
import { EzzygateHostedPaymentParams } from "./types";

export function generateEzzygateHostedPaymentUrl(params: EzzygateHostedPaymentParams): {
  paymentUrl: string;
  base64Signature: string;
  urlEncodedSignature: string;
  valuesString: string;
  merchantID: string;
  trans_amount: string;
  trans_currency: string;
  client_email: string;
} {
  const merchantID = params.merchantID || ezzygateConfig.merchantNumber;
  const hashKey = params.hashKey || ezzygateConfig.hashKey;

  const trans_amount = String(params.trans_amount);
  const trans_currency = (params.trans_currency || "EUR").toUpperCase();
  const trans_type = params.trans_type || "0";
  const trans_installments = params.trans_installments || "1";
  const client_email = params.client_email || "customer@virenzaproxy.com";
  const client_fullName = params.client_fullName || "";
  const client_AutoRegistration = params.client_AutoRegistration ?? "0";

  const valuesString = `${merchantID}${trans_amount}${trans_currency}${hashKey}`;
  const base64Signature = calculateSha256BinaryBase64(valuesString);
  const urlEncodedSignature = encodeURIComponent(base64Signature);

  let paymentUrl =
    `https://uiservices.ezzygate.com/hosted/` +
    `?merchantID=${merchantID}` +
    `&trans_amount=${trans_amount}` +
    `&trans_currency=${trans_currency}` +
    `&trans_type=${trans_type}` +
    `&trans_installments=${trans_installments}` +
    `&client_email=${encodeURIComponent(client_email)}` +
    `&client_AutoRegistration=${client_AutoRegistration}` +
    `&signature=${urlEncodedSignature}`;

  if (client_fullName) {
    paymentUrl += `&client_fullName=${encodeURIComponent(client_fullName)}`;
  }
  if (params.url_redirect) {
    paymentUrl += `&url_redirect=${encodeURIComponent(params.url_redirect)}`;
  }
  if (params.url_notify) {
    paymentUrl += `&url_notify=${encodeURIComponent(params.url_notify)}`;
  }

  return {
    paymentUrl,
    base64Signature,
    urlEncodedSignature,
    valuesString,
    merchantID,
    trans_amount,
    trans_currency,
    client_email,
  };
}

export function generateEzzygateStoragePaymentUrl(params?: {
  merchantID?: string;
  hashKey?: string;
}): { storageUrl: string; signature: string } {
  const merchantID = params?.merchantID || ezzygateConfig.merchantNumber;
  const hashKey = params?.hashKey || ezzygateConfig.hashKey;

  const rawString = `${merchantID}${hashKey}`;
  const base64Signature = calculateSha256BinaryBase64(rawString);
  const urlEncodedSignature = encodeURIComponent(base64Signature);

  const storageUrl = `https://uiservices.ezzygate.com/PaymentMethodStorage?merchantID=${merchantID}&signature=${urlEncodedSignature}`;

  return { storageUrl, signature: base64Signature };
}
