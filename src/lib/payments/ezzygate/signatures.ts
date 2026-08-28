import crypto from "crypto";
import { ezzygateConfig } from "./config";

export function calculateSha256BinaryBase64(input: string): string {
  return crypto
    .createHash("sha256")
    .update(input, "utf-8")
    .digest("base64");
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
  const expectedBase64 = calculateSha256BinaryBase64(rawString);
  const expectedUrlEncoded = encodeURIComponent(expectedBase64);
  const decodedReceived = decodeURIComponent(receivedSignature);

  return (
    receivedSignature === expectedBase64 ||
    receivedSignature === expectedUrlEncoded ||
    decodedReceived === expectedBase64
  );
}
