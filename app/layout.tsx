import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BalanceProvider } from "@/context/BalanceContext";
import { AuthProvider } from "@/context/AuthContext";
import AppChrome from "@/components/layout/AppChrome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProxyMarket — Reliable datacenter, residential and mobile proxies",
  description:
    "Buy flexible EUR-priced proxies for public web data, SEO monitoring, ecommerce monitoring and geo-specific testing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#fafbfe] text-gray-900">
        <AuthProvider>
          <BalanceProvider>
            <AppChrome>{children}</AppChrome>
          </BalanceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
