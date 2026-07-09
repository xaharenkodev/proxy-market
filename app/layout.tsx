import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BalanceProvider } from "@/context/BalanceContext";
import { AuthProvider } from "@/context/AuthContext";
import AppChrome from "@/components/layout/AppChrome";
import { siteConfig } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.frontendUrl),
  title: {
    default: "Virenza Proxy — Datacenter, ISP, residential and mobile proxies",
    template: "%s — Virenza Proxy",
  },
  description:
    "Datacenter, static ISP, residential and mobile proxies for public web data collection, SEO monitoring, ecommerce monitoring, ad verification and geo-specific testing.",
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.frontendUrl,
    title: "Virenza Proxy — Datacenter, ISP, residential and mobile proxies",
    description:
      "Proxy infrastructure for public web data collection, monitoring, QA and research workflows.",
  },
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
