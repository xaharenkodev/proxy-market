"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  DatabaseZap,
  Globe2,
  LockKeyhole,
  Server,
  Settings,
  ShoppingCart,
  Wallet,
  ClipboardList,
  LayoutDashboard,
} from "lucide-react";
import Badge from "@/components/ui/Badge";

const tabs = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "buy", label: "Buy Proxies", icon: ShoppingCart },
  { key: "proxies", label: "Active Proxies", icon: Server },
  { key: "orders", label: "Orders", icon: ClipboardList },
  { key: "settings", label: "Settings", icon: Settings },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const proxyRows = [
  { type: "Residential", country: "United States", protocol: "HTTP", status: "Provisioning" },
  { type: "Static ISP", country: "Germany", protocol: "SOCKS5", status: "Prepared" },
  { type: "Mobile", country: "United Kingdom", protocol: "HTTP", status: "Queued" },
];

const orderRows = [
  { id: "#ORD-0041", product: "Datacenter", qty: "10 IPs", status: "Completed", date: "2026-05-28" },
  { id: "#ORD-0040", product: "Residential", qty: "5 GB", status: "Processing", date: "2026-05-27" },
  { id: "#ORD-0039", product: "Mobile", qty: "2 IPs", status: "Queued", date: "2026-05-26" },
];

function OverviewContent() {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 rounded-[1.5rem] border border-slate-100 bg-white/85 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Command center</p>
          <h3 className="mt-1 truncate text-lg font-bold text-slate-950 sm:text-xl">Proxy provisioning workflow</h3>
        </div>
        <Badge variant="info">Frontend configured</Badge>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
        {[
          { icon: Wallet, label: "Last order", value: "€128.40" },
          { icon: Server, label: "Active", value: "3" },
          { icon: Activity, label: "Traffic", value: "42 GB" },
          { icon: Globe2, label: "Locations", value: "18" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4">
            <Icon size={16} className="text-sky-600" />
            <p className="mt-2 text-[11px] text-slate-500 sm:mt-3 sm:text-xs">{label}</p>
            <p className="text-base font-bold text-slate-950 sm:text-lg">{value}</p>
          </div>
        ))}
      </div>
      <div className="min-w-0 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h4 className="truncate text-sm font-bold text-slate-950">Recent activity</h4>
          <Badge>Live</Badge>
        </div>
        <div className="space-y-2">
          {proxyRows.map((row) => (
            <div key={`${row.type}-${row.country}`} className="flex flex-wrap items-center gap-2 rounded-xl bg-slate-50 p-2.5 text-xs sm:grid sm:grid-cols-4 sm:gap-2 sm:rounded-2xl sm:p-3">
              <span className="font-bold text-slate-950">{row.type}</span>
              <span className="hidden text-slate-600 sm:block">{row.country}</span>
              <span className="rounded-full bg-white px-2 py-1 text-center font-bold text-sky-700">{row.protocol}</span>
              <span className="text-slate-500">{row.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BuyContent() {
  return (
    <div className="space-y-3">
      <div className="rounded-[1.5rem] border border-slate-100 bg-white/85 p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Proxy configurator</p>
        <h3 className="mt-1 text-lg font-bold text-slate-950 sm:text-xl">Build your order</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { label: "Proxy type", value: "Datacenter" },
          { label: "Country", value: "United States" },
          { label: "Protocol", value: "HTTP" },
          { label: "Rotation", value: "Rotating" },
          { label: "Bandwidth", value: "10 GB" },
          { label: "Duration", value: "Monthly" },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-3 sm:rounded-2xl sm:p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
            <p className="mt-1 text-sm font-bold text-slate-950">{value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-[1.5rem] bg-[linear-gradient(135deg,#0f172a,#075985)] p-4 text-white">
        <p className="text-xs text-sky-200">Estimated total</p>
        <p className="mt-1 text-2xl font-bold sm:text-3xl">€16.00</p>
        <p className="mt-1 text-xs text-sky-200">Frontend planning price</p>
      </div>
    </div>
  );
}

function ProxiesContent() {
  return (
    <div className="space-y-3">
      <div className="rounded-[1.5rem] border border-slate-100 bg-white/85 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-950 sm:text-xl">Active proxies</h3>
          <Badge variant="info">3 active</Badge>
        </div>
      </div>
      <div className="space-y-2">
        {proxyRows.map((row) => (
          <div key={`proxy-${row.type}`} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-950">{row.type}</p>
                <p className="mt-0.5 text-xs text-slate-500">{row.country} · {row.protocol}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${row.status === "Provisioning" ? "bg-amber-50 text-amber-700" : row.status === "Prepared" ? "bg-emerald-50 text-emerald-700" : "bg-sky-50 text-sky-700"}`}>
                {row.status}
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              <div className="flex-1 rounded-lg bg-slate-50 p-2 text-center">
                <p className="text-[10px] text-slate-400">Traffic</p>
                <p className="text-xs font-bold text-slate-700">14 GB</p>
              </div>
              <div className="flex-1 rounded-lg bg-slate-50 p-2 text-center">
                <p className="text-[10px] text-slate-400">Expires</p>
                <p className="text-xs font-bold text-slate-700">30d</p>
              </div>
              <div className="flex-1 rounded-lg bg-slate-50 p-2 text-center">
                <p className="text-[10px] text-slate-400">Auth</p>
                <p className="text-xs font-bold text-slate-700">User/pass</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersContent() {
  return (
    <div className="space-y-3">
      <div className="rounded-[1.5rem] border border-slate-100 bg-white/85 p-4 shadow-sm">
        <h3 className="text-lg font-bold text-slate-950 sm:text-xl">Order history</h3>
      </div>
      <div className="space-y-2">
        {orderRows.map((order) => (
          <div key={order.id} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-950">{order.id}</p>
                <p className="mt-0.5 text-xs text-slate-500">{order.product} · {order.qty}</p>
              </div>
              <div className="text-right">
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${order.status === "Completed" ? "bg-emerald-50 text-emerald-700" : order.status === "Processing" ? "bg-amber-50 text-amber-700" : "bg-sky-50 text-sky-700"}`}>
                  {order.status}
                </span>
                <p className="mt-1 text-[11px] text-slate-400">{order.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsContent() {
  return (
    <div className="space-y-3">
      <div className="rounded-[1.5rem] border border-slate-100 bg-white/85 p-4 shadow-sm">
        <h3 className="text-lg font-bold text-slate-950 sm:text-xl">Account settings</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-2xl">
          <LockKeyhole size={18} className="text-sky-600" />
          <p className="mt-3 text-sm font-bold text-slate-950">Authentication</p>
          <div className="mt-3 space-y-2">
            <div className="rounded-lg bg-sky-50 px-3 py-2 text-xs font-bold text-sky-700">Username/password ✓</div>
            <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-500">IP whitelist</div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-2xl">
          <Globe2 size={18} className="text-sky-600" />
          <p className="mt-3 text-sm font-bold text-slate-950">Defaults</p>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs">
              <span className="text-slate-500">Protocol</span>
              <span className="font-bold text-slate-700">HTTP</span>
            </div>
            <div className="flex justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs">
              <span className="text-slate-500">Rotation</span>
              <span className="font-bold text-slate-700">Rotating</span>
            </div>
            <div className="flex justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs">
              <span className="text-slate-500">Region</span>
              <span className="font-bold text-slate-700">US</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const tabContent: Record<TabKey, () => React.JSX.Element> = {
  overview: OverviewContent,
  buy: BuyContent,
  proxies: ProxiesContent,
  orders: OrdersContent,
  settings: SettingsContent,
};

export default function AnimatedDashboardPreview() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const Content = tabContent[activeTab];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-sky-100 sm:p-5 lg:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.1),transparent_34%)]" />
      <div className="relative grid gap-4 lg:gap-5 lg:grid-cols-[200px_1fr]">
        {/* Desktop sidebar */}
        <div className="hidden rounded-[1.5rem] bg-slate-950 p-4 text-white lg:block">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500">
              <DatabaseZap size={18} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">Virenza Proxy</p>
              <p className="text-xs text-slate-400">Operations</p>
            </div>
          </div>
          <div className="mt-6 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition-colors ${
                  activeTab === tab.key
                    ? "bg-white text-slate-950"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile tab bar */}
        <div className="flex gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1 lg:hidden">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-bold transition-colors ${
                activeTab === tab.key
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <tab.icon size={12} />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Content />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
