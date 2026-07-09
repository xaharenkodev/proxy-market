"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { dashboardNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/context/AuthContext";
import { useBalance } from "@/context/BalanceContext";
import GuestBlock from "@/components/ui/GuestBlock";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const { formattedBalance } = useBalance();

  useEffect(() => {
    window.setTimeout(() => setOpen(false), 0);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!isLoggedIn || !user) {
    return (
      <GuestBlock
        title="Login to view your dashboard"
        description="You need an account to access Virenza Proxy dashboard tools."
      />
    );
  }

  const initials = `${user.name?.[0] || ""}${user.surname?.[0] || ""}`.toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50">
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/logo/logo.png"
              alt={siteConfig.name}
              width={994}
              height={210}
              className="h-8 w-auto"
            />
          </Link>
          <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="space-y-1">
            {dashboardNavigation.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    active ? "bg-sky-50 text-sky-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>
        <div className="border-t border-slate-200 p-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Current balance</p>
            <p className="mt-1 text-2xl font-bold text-slate-950">{formattedBalance}</p>
            <Link href="/dashboard/balance" className="mt-3 block">
              <Button fullWidth size="sm" variant="outline">Add balance</Button>
            </Link>
          </div>
        </div>
      </aside>

      <div className="min-w-0 lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <button type="button" onClick={() => setOpen(true)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 lg:hidden">
              <Menu size={20} />
            </button>
            <div className="hidden min-w-0 lg:block">
              <p className="truncate text-sm text-slate-500">Configure proxies, manage your balance and track usage across your orders.</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold text-slate-950">{user.name} {user.surname}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">{initials}</div>
              <Button size="sm" variant="ghost" onClick={logout}>
                <LogOut size={16} />
              </Button>
            </div>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
