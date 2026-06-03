import { Resend } from "resend";
import { env } from "@/src/config/env";
import type { IOrder, IProxyRequest } from "@/src/lib/db/models/User";

const resend = new Resend(env.RESEND_API);
const from = env.EMAIL_FROM;
const siteName = env.COMPANY_NAME;
const appUrl = env.APP_URL;

export async function sendWelcomeEmail(user: { email: string; name: string }) {
  await resend.emails.send({
    from,
    to: user.email,
    subject: `Welcome to ${siteName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <h1 style="color:#0284c7">Welcome to ${siteName}!</h1>
        <p>Hi ${user.name},</p>
        <p>Thank you for creating your account. You can now access the proxy marketplace dashboard.</p>
        <p>Get started by reviewing pricing, topping up your balance, and configuring proxy workflows when provisioning is available.</p>
        <a href="${appUrl}/dashboard" style="display:inline-block;background:#0284c7;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin:16px 0">Go to Dashboard</a>
        <p style="color:#999;font-size:12px;margin-top:32px">— The ${siteName} Team</p>
      </div>
    `,
  });
}

export async function sendTopUpEmail(
  user: { email: string; name: string },
  amountGBP: number
) {
  await resend.emails.send({
    from,
    to: user.email,
    subject: "Your wallet top-up was successful",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <h1 style="color:#0284c7">Top-Up Successful</h1>
        <p>Hi ${user.name},</p>
        <p>Your wallet has been topped up with <strong>&pound;${amountGBP.toFixed(2)}</strong>.</p>
        <p>You can now use your balance where supported by the dashboard flow.</p>
        <a href="${appUrl}/dashboard" style="display:inline-block;background:#0284c7;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin:16px 0">View Dashboard</a>
        <p style="color:#999;font-size:12px;margin-top:32px">— The ${siteName} Team</p>
      </div>
    `,
  });
}

export async function sendOrderConfirmationEmail(
  user: { email: string; name: string },
  order: IOrder
) {
  await resend.emails.send({
    from,
    to: user.email,
    subject: "Your order has been received",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <h1 style="color:#0284c7">Order Confirmed</h1>
        <p>Hi ${user.name},</p>
        <p>Your order has been received and is being processed.</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Order ID</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">${order.id}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Product area</td><td style="padding:8px;border-bottom:1px solid #eee">${order.platform}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Service type</td><td style="padding:8px;border-bottom:1px solid #eee">${order.service}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Package</td><td style="padding:8px;border-bottom:1px solid #eee">${order.packageName}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Quantity</td><td style="padding:8px;border-bottom:1px solid #eee">${order.quantity.toLocaleString()}</td></tr>
          <tr><td style="padding:8px;color:#666">Price</td><td style="padding:8px;font-weight:bold">&pound;${order.priceGBP.toFixed(2)}</td></tr>
        </table>
        <a href="${appUrl}/dashboard" style="display:inline-block;background:#0284c7;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin:16px 0">Track Your Order</a>
        <p style="color:#999;font-size:12px;margin-top:32px">— The ${siteName} Team</p>
      </div>
    `,
  });
}

export async function sendProxyRequestConfirmation(
  user: { email: string; name: string },
  req: IProxyRequest
) {
  const isPackage = req.requestKind === "ready-package";
  const typeLabel = isPackage ? `Ready package: ${req.packageName}` : "Custom proxy setup";
  await resend.emails.send({
    from,
    to: user.email,
    subject: `Your proxy request has been received — ${siteName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <h1 style="color:#0284c7">Proxy Request Received</h1>
        <p>Hi ${user.name},</p>
        <p>Your ${isPackage ? "ready package" : "custom proxy setup"} order has been confirmed and payment of <strong>&euro;${req.estimatedPriceEUR.toFixed(2)}</strong> was deducted from your account balance. Our team will review the setup and contact you shortly.</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Request ID</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">${req.id}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Request type</td><td style="padding:8px;border-bottom:1px solid #eee">${typeLabel}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Proxy type</td><td style="padding:8px;border-bottom:1px solid #eee">${req.proxyType}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Country</td><td style="padding:8px;border-bottom:1px solid #eee">${req.country}${req.city ? `, ${req.city}` : ""}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Protocol</td><td style="padding:8px;border-bottom:1px solid #eee">${req.protocol}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Rotation</td><td style="padding:8px;border-bottom:1px solid #eee">${req.rotation}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Quantity</td><td style="padding:8px;border-bottom:1px solid #eee">${req.quantity}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Bandwidth</td><td style="padding:8px;border-bottom:1px solid #eee">${req.bandwidthGb} GB</td></tr>
          <tr><td style="padding:8px;color:#666">Estimated price</td><td style="padding:8px;font-weight:bold">&euro;${req.estimatedPriceEUR.toFixed(2)}</td></tr>
        </table>
        <p style="color:#666;font-size:13px">Payment has been deducted from your balance. Our team will review and set up your proxies. Proxy credentials are not issued automatically yet.</p>
        <a href="${appUrl}/dashboard/orders" style="display:inline-block;background:#0284c7;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin:16px 0">View Your Requests</a>
        <p style="color:#999;font-size:12px;margin-top:32px">— The ${siteName} Team</p>
      </div>
    `,
  });
}

export async function sendProxyRequestNotification(
  customer: { name: string; surname: string; email: string; phone: string },
  req: IProxyRequest
) {
  const to = env.COMPANY_EMAIL || from;
  const isPackage = req.requestKind === "ready-package";
  const typeLabel = isPackage ? `Ready package: ${req.packageName}` : "Custom setup";
  await resend.emails.send({
    from,
    to,
    subject: `${isPackage ? "📦" : "⚙️"} ${typeLabel} — ${customer.name} ${customer.surname} — ${req.id}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <h1 style="color:#0284c7">New Proxy Request — ${typeLabel}</h1>
        <h2 style="color:#333;margin-top:16px">Customer</h2>
        <table style="width:100%;border-collapse:collapse;margin:8px 0 16px">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Name</td><td style="padding:8px;border-bottom:1px solid #eee">${customer.name} ${customer.surname}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Email</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:${customer.email}">${customer.email}</a></td></tr>
          <tr><td style="padding:8px;color:#666">Phone</td><td style="padding:8px">${customer.phone}</td></tr>
        </table>
        <h2 style="color:#333">Request Details</h2>
        <table style="width:100%;border-collapse:collapse;margin:8px 0">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Request ID</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">${req.id}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Proxy type</td><td style="padding:8px;border-bottom:1px solid #eee">${req.proxyType}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Country</td><td style="padding:8px;border-bottom:1px solid #eee">${req.country}${req.city ? `, ${req.city}` : ""}${req.carrier ? ` (${req.carrier})` : ""}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Protocol</td><td style="padding:8px;border-bottom:1px solid #eee">${req.protocol}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Rotation</td><td style="padding:8px;border-bottom:1px solid #eee">${req.rotation}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Auth method</td><td style="padding:8px;border-bottom:1px solid #eee">${req.authMethod}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Quantity</td><td style="padding:8px;border-bottom:1px solid #eee">${req.quantity}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Bandwidth</td><td style="padding:8px;border-bottom:1px solid #eee">${req.bandwidthGb} GB</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Duration</td><td style="padding:8px;border-bottom:1px solid #eee">${req.duration}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Display currency</td><td style="padding:8px;border-bottom:1px solid #eee">${req.displayCurrency}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Price EUR</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">&euro;${req.estimatedPriceEUR.toFixed(2)}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Price GBP (deducted)</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">&pound;${(req.priceGBP ?? 0).toFixed(2)}</td></tr>
          <tr><td style="padding:8px;color:#666">Payment</td><td style="padding:8px;font-weight:bold;color:#059669">Paid from balance</td></tr>
        </table>
        <p style="color:#666;font-size:13px;margin-top:16px">Submitted: ${req.createdAt.toISOString()}</p>
      </div>
    `,
  });
}

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactMessageEmail(data: ContactData) {
  const to = env.COMPANY_EMAIL || from;
  await resend.emails.send({
    from,
    to,
    subject: `New contact form message: ${data.subject}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <h1 style="color:#0284c7">New Contact Message</h1>
        <table style="width:100%;border-collapse:collapse;margin:16px 0">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Name</td><td style="padding:8px;border-bottom:1px solid #eee">${data.name}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Email</td><td style="padding:8px;border-bottom:1px solid #eee">${data.email}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Subject</td><td style="padding:8px;border-bottom:1px solid #eee">${data.subject}</td></tr>
        </table>
        <div style="background:#f9fafb;padding:16px;border-radius:8px;margin:16px 0">
          <p style="margin:0;white-space:pre-wrap">${data.message}</p>
        </div>
      </div>
    `,
  });
}

export async function sendContactAutoReply(data: ContactData) {
  await resend.emails.send({
    from,
    to: data.email,
    subject: `We received your message — ${siteName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <h1 style="color:#0284c7">Thank You for Contacting Us</h1>
        <p>Hi ${data.name},</p>
        <p>We received your message and will get back to you as soon as possible.</p>
        <p>For reference, here is a copy of your message:</p>
        <div style="background:#f9fafb;padding:16px;border-radius:8px;margin:16px 0">
          <p style="margin:0;font-weight:bold">${data.subject}</p>
          <p style="margin:8px 0 0;white-space:pre-wrap">${data.message}</p>
        </div>
        <a href="${appUrl}" style="display:inline-block;background:#0284c7;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin:16px 0">Visit ${siteName}</a>
        <p style="color:#999;font-size:12px;margin-top:32px">— The ${siteName} Team</p>
      </div>
    `,
  });
}
