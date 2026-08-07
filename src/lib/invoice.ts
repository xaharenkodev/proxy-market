import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { siteConfig } from "@/config/site";
import { CurrencyCode } from "@/config/currency";

export interface InvoiceCustomer {
  name: string;
  email: string;
  address?: {
    street?: string;
    city?: string;
    country?: string;
    postCode?: string;
  };
}

export interface InvoiceDocument {
  invoiceNumber: string;
  issuedAt: Date;
  customer: InvoiceCustomer;
  description: string;
  amount: number;
  currency: CurrencyCode;
  amountGBP?: number;
  reference: string;
}

function pdfText(value: string) {
  return value.replace(/[^\x20-\x7E]/g, "?");
}

function formatPdfAmount(amount: number, currency: CurrencyCode) {
  return `${currency} ${amount.toFixed(2)}`;
}

function wrapPdfText(value: string, maxLength: number) {
  const words = pdfText(value).split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxLength && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawWrappedText(
  page: ReturnType<PDFDocument["addPage"]>,
  font: Awaited<ReturnType<PDFDocument["embedFont"]>>,
  value: string,
  x: number,
  y: number,
  maxLength: number
) {
  wrapPdfText(value, maxLength).forEach((line, index) => {
    page.drawText(line, { x, y: y - index * 13, size: 8, font });
  });
}

function drawRow(
  page: ReturnType<PDFDocument["addPage"]>,
  font: Awaited<ReturnType<PDFDocument["embedFont"]>>,
  label: string,
  value: string,
  y: number
) {
  page.drawText(pdfText(label), { x: 54, y, size: 9, font, color: rgb(0.38, 0.43, 0.5) });
  page.drawText(pdfText(value), { x: 230, y, size: 9, font, color: rgb(0.06, 0.09, 0.16) });
}

export async function generateInvoicePdf(invoice: InvoiceDocument): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  page.drawRectangle({ x: 0, y: 766, width: 595.28, height: 75.89, color: rgb(0.03, 0.23, 0.42) });
  page.drawText("VIRENZA PROXY", { x: 54, y: 798, size: 20, font: bold, color: rgb(1, 1, 1) });
  page.drawText("INVOICE / RECEIPT", { x: 390, y: 800, size: 11, font: bold, color: rgb(0.83, 0.94, 1) });

  page.drawText(`Invoice no. ${invoice.invoiceNumber}`, { x: 54, y: 722, size: 13, font: bold, color: rgb(0.06, 0.09, 0.16) });
  page.drawText(`Issued ${invoice.issuedAt.toISOString().slice(0, 10)}`, { x: 54, y: 703, size: 9, font: regular, color: rgb(0.38, 0.43, 0.5) });
  page.drawText(`Reference ${invoice.reference}`, { x: 54, y: 687, size: 9, font: regular, color: rgb(0.38, 0.43, 0.5) });

  page.drawText("Seller", { x: 54, y: 640, size: 11, font: bold, color: rgb(0.06, 0.09, 0.16) });
  page.drawText(siteConfig.companyLegalName, { x: 54, y: 623, size: 9, font: regular });
  drawWrappedText(page, regular, siteConfig.companyAddress, 54, 608, 38);
  page.drawText(`Company no. ${siteConfig.companyNumber}`, { x: 54, y: 567, size: 8, font: regular });
  page.drawText(siteConfig.companyVat ? `VAT no. ${siteConfig.companyVat}` : "VAT: not registered", { x: 54, y: 552, size: 8, font: regular });

  page.drawText("Billed to", { x: 330, y: 640, size: 11, font: bold, color: rgb(0.06, 0.09, 0.16) });
  page.drawText(pdfText(invoice.customer.name), { x: 330, y: 623, size: 9, font: regular });
  page.drawText(pdfText(invoice.customer.email), { x: 330, y: 608, size: 8, font: regular });
  const address = invoice.customer.address;
  const addressLine = [address?.street, address?.city, address?.postCode, address?.country].filter(Boolean).join(", ");
  if (addressLine) drawWrappedText(page, regular, addressLine, 330, 593, 34);

  page.drawRectangle({ x: 54, y: 470, width: 487, height: 34, color: rgb(0.94, 0.97, 1) });
  page.drawText("Description", { x: 66, y: 483, size: 9, font: bold, color: rgb(0.06, 0.09, 0.16) });
  page.drawText("Amount", { x: 444, y: 483, size: 9, font: bold, color: rgb(0.06, 0.09, 0.16) });
  page.drawText(pdfText(invoice.description), { x: 66, y: 446, size: 9, font: regular, maxWidth: 330 });
  page.drawText(formatPdfAmount(invoice.amount, invoice.currency), { x: 430, y: 446, size: 9, font: bold, color: rgb(0.06, 0.09, 0.16) });
  page.drawLine({ start: { x: 54, y: 425 }, end: { x: 541, y: 425 }, thickness: 1, color: rgb(0.88, 0.91, 0.95) });

  page.drawText("Payment summary", { x: 54, y: 376, size: 11, font: bold, color: rgb(0.06, 0.09, 0.16) });
  drawRow(page, regular, "Amount paid", formatPdfAmount(invoice.amount, invoice.currency), 352);
  if (invoice.amountGBP !== undefined) drawRow(page, regular, "Wallet equivalent", formatPdfAmount(invoice.amountGBP, "GBP"), 334);
  drawRow(page, regular, "Tax", "No VAT charged", 316);
  drawRow(page, regular, "Status", "Paid", 298);

  page.drawLine({ start: { x: 54, y: 112 }, end: { x: 541, y: 112 }, thickness: 1, color: rgb(0.88, 0.91, 0.95) });
  page.drawText("This document confirms the completed payment. Keep it for your records.", { x: 54, y: 90, size: 8, font: regular, color: rgb(0.38, 0.43, 0.5) });
  page.drawText(`${siteConfig.companyLegalName} | ${siteConfig.companyEmail}`, { x: 54, y: 74, size: 8, font: regular, color: rgb(0.38, 0.43, 0.5) });

  return pdf.save();
}
