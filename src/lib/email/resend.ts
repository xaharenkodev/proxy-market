import { Resend } from "resend";
import { env } from "@/src/config/env";
import type { IOrder, IProxyRequest } from "@/src/lib/db/models/User";
import { convertFromEUR, CurrencyCode, formatAmount } from "@/config/currency";
import { generateInvoicePdf, InvoiceCustomer } from "@/src/lib/invoice";

export interface EmailDeliveryResult {
  sent: boolean;
  id?: string;
  error?: string;
}

export type EmailCustomer = InvoiceCustomer;

function getEmailConfig() {
  if (!env.RESEND_API) return { error: "RESEND_API is not configured." };
  if (!env.EMAIL_FROM) return { error: "EMAIL_FROM is not configured." };
  return { resend: new Resend(env.RESEND_API), from: env.EMAIL_FROM };
}

async function sendEmail(
  kind: string,
  to: string,
  subject: string,
  html: string,
  idempotencyKey: string,
  attachment?: { filename: string; content: Uint8Array }
): Promise<EmailDeliveryResult> {
  const config = getEmailConfig();
  if ("error" in config) {
    console.error(`[email:${kind}] ${config.error}`);
    return { sent: false, error: config.error };
  }

  try {
    const { data, error } = await config.resend.emails.send(
      {
        from: config.from,
        to,
        subject,
        html,
        attachments: attachment ? [{ filename: attachment.filename, content: Buffer.from(attachment.content) }] : undefined,
      },
      { idempotencyKey }
    );
    if (error) {
      console.error(`[email:${kind}] ${error.message}`);
      return { sent: false, error: error.message };
    }
    return { sent: true, id: data?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected email delivery error.";
    console.error(`[email:${kind}] ${message}`);
    return { sent: false, error: message };
  }
}

function emailShell(title: string, content: string) {
  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px"><h1 style="color:#0284c7">${title}</h1>${content}<p style="color:#999;font-size:12px;margin-top:32px">- The ${env.COMPANY_NAME} Team</p></div>`;
}

export async function sendWelcomeEmail(user: { email: string; name: string; id: string }) {
  return sendEmail(
    "welcome",
    user.email,
    `Welcome to ${env.COMPANY_NAME}`,
    emailShell("Welcome!", `<p>Hi ${user.name},</p><p>Your account is ready. You can now review products, add balance and configure a proxy order.</p><a href="${env.APP_URL}/dashboard" style="display:inline-block;background:#0284c7;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin:16px 0">Go to dashboard</a>`),
    `welcome/${user.id}`
  );
}

export async function sendPasswordResetEmail(user: { email: string; name: string; id: string }, token: string) {
  const resetUrl = new URL("/reset-password", env.APP_URL);
  resetUrl.searchParams.set("token", token);
  return sendEmail(
    "password-reset",
    user.email,
    `Reset your ${env.COMPANY_NAME} password`,
    emailShell("Reset your password", `<p>Hi ${user.name},</p><p>Use the link below to choose a new password. It expires in 60 minutes.</p><a href="${resetUrl.toString()}" style="display:inline-block;background:#0284c7;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin:16px 0">Reset password</a><p>If you did not request this, you can ignore this email.</p>`),
    `password-reset/${user.id}/${token.slice(0, 12)}`
  );
}

async function sendInvoiceEmail(options: {
  kind: "top-up" | "proxy-request" | "order";
  customer: EmailCustomer;
  invoiceNumber: string;
  reference: string;
  description: string;
  amount: number;
  currency: CurrencyCode;
  amountGBP?: number;
  subject: string;
  heading: string;
  body: string;
}) {
  const pdf = await generateInvoicePdf({
    invoiceNumber: options.invoiceNumber,
    issuedAt: new Date(),
    customer: options.customer,
    description: options.description,
    amount: options.amount,
    currency: options.currency,
    amountGBP: options.amountGBP,
    reference: options.reference,
  });
  return sendEmail(
    options.kind,
    options.customer.email,
    options.subject,
    emailShell(options.heading, `<p>Hi ${options.customer.name},</p>${options.body}<p>Your PDF Invoice / Receipt is attached.</p><a href="${env.APP_URL}/dashboard" style="display:inline-block;background:#0284c7;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin:16px 0">Open dashboard</a>`),
    `${options.kind}/${options.reference}/${options.invoiceNumber}`,
    { filename: `${options.invoiceNumber}.pdf`, content: pdf }
  );
}

export async function sendTopUpEmail(
  customer: EmailCustomer,
  payment: { invoiceNumber: string; reference: string; amount: number; currency: CurrencyCode; amountGBP: number }
) {
  return sendInvoiceEmail({
    kind: "top-up",
    customer,
    invoiceNumber: payment.invoiceNumber,
    reference: payment.reference,
    description: "Wallet top-up",
    amount: payment.amount,
    currency: payment.currency,
    amountGBP: payment.amountGBP,
    subject: "Your wallet top-up was successful",
    heading: "Top-up successful",
    body: `<p>Your wallet top-up of <strong>${formatAmount(payment.amount, payment.currency)}</strong> was confirmed.</p>`,
  });
}

export async function sendOrderConfirmationEmail(
  customer: EmailCustomer,
  order: IOrder
) {
  return sendInvoiceEmail({
    kind: "order",
    customer,
    invoiceNumber: order.invoiceNumber || `INV-${order.id}`,
    reference: order.id,
    description: `${order.packageName} x${order.quantity}`,
    amount: order.priceGBP,
    currency: "GBP",
    amountGBP: order.priceGBP,
    subject: "Your order has been received",
    heading: "Order confirmed",
    body: `<p>Your order <strong>${order.id}</strong> has been received and is being processed.</p>`,
  });
}

export async function sendProxyRequestConfirmation(
  customer: EmailCustomer,
  request: IProxyRequest
) {
  const currency = (request.displayCurrency === "USD" || request.displayCurrency === "GBP" || request.displayCurrency === "EUR" ? request.displayCurrency : "EUR") as CurrencyCode;
  const amount = request.estimatedPriceEUR;
  const visibleAmount = convertFromEUR(amount, currency);
  return sendInvoiceEmail({
    kind: "proxy-request",
    customer,
    invoiceNumber: request.invoiceNumber || `INV-${request.id}`,
    reference: request.id,
    description: `${request.proxyType} proxy order - ${request.durationQuantity || 1} ${request.duration}`,
    amount: visibleAmount,
    currency,
    amountGBP: request.priceGBP,
    subject: `Your proxy order has been received - ${env.COMPANY_NAME}`,
    heading: "Proxy order confirmed",
    body: `<p>Your order <strong>${request.id}</strong> was paid from your balance. Our team will review the setup and contact you shortly.</p>`,
  });
}

export async function sendProxyRequestNotification(
  customer: { name: string; surname: string; email: string; phone: string },
  request: IProxyRequest
) {
  const recipient = env.COMPANY_EMAIL || env.EMAIL_FROM;
  if (!recipient) return { sent: false, error: "COMPANY_EMAIL or EMAIL_FROM is not configured." };
  return sendEmail(
    "proxy-request-notification",
    recipient,
    `New proxy request ${request.id}`,
    emailShell("New proxy request", `<p><strong>Customer:</strong> ${customer.name} ${customer.surname}</p><p><strong>Request:</strong> ${request.id}</p><p><strong>Product:</strong> ${request.proxyType}</p><p><strong>Location:</strong> ${request.country}${request.city ? `, ${request.city}` : ""}</p>`),
    `proxy-request-notification/${request.id}`
  );
}

interface ContactData { name: string; email: string; subject: string; message: string; }

export async function sendContactMessageEmail(data: ContactData) {
  const recipient = env.COMPANY_EMAIL || env.EMAIL_FROM;
  if (!recipient) return { sent: false, error: "COMPANY_EMAIL or EMAIL_FROM is not configured." };
  return sendEmail("contact", recipient, `New contact form message: ${data.subject}`, emailShell("New contact message", `<p><strong>From:</strong> ${data.name}</p><p><strong>Email:</strong> ${data.email}</p><p>${data.message}</p>`), `contact/${data.email}/${data.subject}`);
}

export async function sendContactAutoReply(data: ContactData) {
  return sendEmail("contact-auto-reply", data.email, `We received your message - ${env.COMPANY_NAME}`, emailShell("Thanks for contacting us", `<p>Hi ${data.name},</p><p>We received your message and will respond as soon as possible.</p>`), `contact-auto-reply/${data.email}/${data.subject}`);
}
