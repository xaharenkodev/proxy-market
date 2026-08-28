# Ezzygate Payment Gateway Integration Module

Standalone, decoupled TypeScript module for Ezzygate Hosted Payments (v2).

## File Structure

```
src/lib/payments/ezzygate/
├── config.ts       # Environment variable keys (EZZYGATE_MERCHANT_NUMBER, EZZYGATE_HASH_KEY, EZZYGATE_SECURITY_KEY)
├── index.ts        # Barrel export index
├── logger.ts       # Persistent event logger (writes to logs/ezzygate_history.json)
├── service.ts      # Hosted Page URL generators (generateEzzygateHostedPaymentUrl, generateEzzygateStoragePaymentUrl)
├── signatures.ts   # SHA-256 Binary Base64 signature generator & response validator
├── types.ts        # TypeScript interfaces & types
└── README.md       # Integration documentation
```

## Environment Variables

- `EZZYGATE_MERCHANT_NUMBER` (Default: `2203441`)
- `EZZYGATE_HASH_KEY` (Default: `2RN9TLWP52`)
- `EZZYGATE_SECURITY_KEY` (Default: `2RN9TLWP52`)

## Usage Example

```typescript
import { generateEzzygateHostedPaymentUrl, verifyEzzygateHostedResponseSignature } from "@/src/lib/payments/ezzygate";

// 1. Generate payment URL
const { paymentUrl, base64Signature } = generateEzzygateHostedPaymentUrl({
  trans_amount: "25.00",
  trans_currency: "EUR",
  client_email: "user@example.com",
  url_redirect: "https://virenzaproxy.com/payment/return",
  url_notify: "https://virenzaproxy.com/api/payments/ezzygate/webhook"
});

// 2. Validate response / webhook signature
const isValid = verifyEzzygateHostedResponseSignature(replyCode, transId, signature);
```
