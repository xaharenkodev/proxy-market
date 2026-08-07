"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut, Menu, User, Wallet, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "./Container";
import CurrencySwitcher from "@/components/marketing/CurrencySwitcher";
import { siteConfig } from "@/config/site";
import { headerNavigation, productNavigation } from "@/config/navigation";
import { useAuth } from "@/context/AuthContext";
import { useBalance } from "@/context/BalanceContext";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { isLoggedIn, logout } = useAuth();
  const { formattedBalance } = useBalance();

  useEffect(() => {
    window.setTimeout(() => {
      setMobileOpen(false);
      setProductsOpen(false);
    }, 0);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-10">
        <nav className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 lg:h-20 lg:gap-6">
          {/* Left: Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/assets/logo/logo.png"
              alt={siteConfig.name}
              width={994}
              height={210}
              priority
              className="h-8 w-auto sm:h-9"
            />
          </Link>

          {/* Center: Navigation */}
          <div className="hidden items-center justify-center gap-0.5 lg:flex xl:gap-1">
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setProductsOpen((open) => !open)}
                className={`flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold transition xl:px-4 ${
                  pathname.startsWith("/products") ? "bg-slate-100 text-slate-950" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                Products <ChevronDown size={15} className={`transition-transform ${productsOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 top-full mt-3 w-[400px] rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-200"
                  >
                    <div className="grid gap-1">
                      {productNavigation.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="rounded-xl p-3 transition hover:bg-slate-50"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-semibold text-slate-950">{item.label}</span>
                            {item.status === "coming-soon" && (
                              <span className="rounded-full bg-amber-50 px-2 py-1 text-[11px] font-bold text-amber-700">
                                Soon
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {headerNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition xl:px-4 ${
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "bg-slate-100 text-slate-950"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right: Controls */}
          <div className="flex items-center justify-end gap-1.5 xl:gap-2">
            <div className="hidden shrink-0 items-center gap-1.5 lg:flex xl:gap-2">
              <CurrencySwitcher compact />
              <div className="mx-0.5 h-6 w-px bg-slate-200" />
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-900">
                    <Wallet size={16} className="text-sky-600" />
                    {formattedBalance}
                  </Link>
                  <Link href="/dashboard">
                    <Button size="sm" variant="outline">
                      <User size={15} />
                      Dashboard
                    </Button>
                  </Link>
                  <Button size="sm" variant="ghost" onClick={logout}>
                    <LogOut size={15} />
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button size="sm" variant="ghost">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm">Get Started</Button>
                  </Link>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="relative z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-200 bg-white lg:hidden"
            >
              <Container className="py-4">
                <div className="grid gap-1">
                  {[...productNavigation, ...headerNavigation].map((item) => (
                    <Link key={item.href} href={item.href} className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                      {item.label}
                    </Link>
                  ))}
                  <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <span className="text-xs font-semibold text-slate-500">Checkout currency</span>
                    <CurrencySwitcher compact />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {isLoggedIn ? (
                      <>
                        <Link href="/dashboard">
                          <Button fullWidth variant="outline">Dashboard</Button>
                        </Link>
                        <Button fullWidth variant="ghost" onClick={logout}>Logout</Button>
                      </>
                    ) : (
                      <>
                        <Link href="/login">
                          <Button fullWidth variant="outline">Login</Button>
                        </Link>
                        <Link href="/register">
                          <Button fullWidth>Get Started</Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </Container>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
