import crypto from "crypto";

export const ezzygateConfig = {
  get merchantNumber(): string {
    return process.env.EZZYGATE_MERCHANT_NUMBER || "2203441";
  },
  get hashKey(): string {
    return process.env.EZZYGATE_HASH_KEY || "2RN9TLWP52";
  },
  get securityKey(): string {
    return process.env.EZZYGATE_SECURITY_KEY || process.env.EZZYGATE_HASH_KEY || "2RN9TLWP52";
  },
};

export interface EzzygateHostedPaymentParams {
  merchantID?: string;
  trans_amount: string | number;
  trans_currency: string;
  trans_type?: string;
  trans_installments?: string;
  client_email?: string;
  client_fullName?: string;
  client_phoneNum?: string;
  client_AutoRegistration?: string;
  url_redirect?: string;
  url_notify?: string;
  hashKey?: string;
  securityKey?: string;
}

export interface EzzygateHostedResponse {
  replyCode?: string;
  trans_id?: string;
  signature?: string;
  [key: string]: string | undefined;
}

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

  const base64Signature = crypto
    .createHash("sha256")
    .update(valuesString, "utf-8")
    .digest("base64");

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

export function verifyEzzygateHostedResponseSignature(
  replyCode: string,
  transId: string,
  receivedSignature: string,
  hashKey?: string
): boolean {
  if (!receivedSignature) return false;

  const key = hashKey || ezzygateConfig.hashKey;
  const rawString = `${replyCode}${transId}${key}`;
  const expectedBase64 = crypto
    .createHash("sha256")
    .update(rawString, "utf-8")
    .digest("base64");
  const expectedUrlEncoded = encodeURIComponent(expectedBase64);
  const decodedReceived = decodeURIComponent(receivedSignature);

  return (
    receivedSignature === expectedBase64 ||
    receivedSignature === expectedUrlEncoded ||
    decodedReceived === expectedBase64
  );
}

export function generateEzzygateStoragePaymentUrl(params?: {
  merchantID?: string;
  hashKey?: string;
}): { storageUrl: string; signature: string } {
  const merchantID = params?.merchantID || ezzygateConfig.merchantNumber;
  const hashKey = params?.hashKey || ezzygateConfig.hashKey;

  const rawString = `${merchantID}${hashKey}`;
  const base64Signature = crypto
    .createHash("sha256")
    .update(rawString, "utf-8")
    .digest("base64");
  const urlEncodedSignature = encodeURIComponent(base64Signature);

  const storageUrl = `https://uiservices.ezzygate.com/PaymentMethodStorage?merchantID=${merchantID}&signature=${urlEncodedSignature}`;

  return { storageUrl, signature: base64Signature };
}
