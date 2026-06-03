"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      <Header />
      <main className={isDashboard ? "min-h-screen bg-slate-50" : "flex-1 pt-16 lg:pt-20"}>{children}</main>
      {!isDashboard && <Footer />}
    </>
  );
}
