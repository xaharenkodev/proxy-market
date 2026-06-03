"use client";

import Link from "next/link";
import { Activity, ClipboardList, Server, ShieldCheck, ShoppingCart, Wallet } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import StatCard from "@/components/dashboard/StatCard";
import EmptyState from "@/components/dashboard/EmptyState";
import { TableShell, Td, Th } from "@/components/ui/Table";
import { useBalance } from "@/context/BalanceContext";

export default function DashboardPage() {
  const { formattedBalance, proxyRequests } = useBalance();
  const pendingRequests = proxyRequests.filter((r) => r.status === "requested" || r.status === "reviewing").length;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">Dashboard overview</h1>
          <p className="mt-1.5 text-sm text-slate-600 sm:mt-2">Manage balance, proxy requests and account settings.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/buy"><Button size="sm"><ShoppingCart size={16} />New request</Button></Link>
          <Link href="/dashboard/balance"><Button size="sm" variant="outline">Add balance</Button></Link>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Wallet} label="Balance" value={formattedBalance} note="Wallet balance" />
        <StatCard icon={ClipboardList} label="Requests" value={proxyRequests.length.toString()} note="Total proxy requests" />
        <StatCard icon={Server} label="Pending" value={pendingRequests.toString()} note="Awaiting review" />
        <StatCard icon={Activity} label="Active" value="0" note="After setup confirmation" />
      </div>

      <div className="rounded-2xl border border-sky-100 bg-[linear-gradient(135deg,#f0f9ff,#ffffff)] p-4 text-sky-950 shadow-sm sm:rounded-[1.5rem] sm:p-5">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sky-600 shadow-sm sm:rounded-2xl">
            <ShieldCheck size={18} />
          </div>
          <div className="min-w-0">
            <h2 className="font-bold">How it works</h2>
            <p className="mt-1.5 text-sm leading-6 sm:mt-2">
              Submit a proxy configuration request. Our team reviews the details, confirms availability and pricing, then sets up your proxies. You will be contacted before any payment is processed.
            </p>
          </div>
        </div>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-950 sm:text-xl">Recent requests</h2>
          <Link href="/dashboard/orders" className="text-sm font-semibold text-sky-700">View all</Link>
        </div>
        {proxyRequests.length ? (
          <TableShell>
            <thead>
              <tr>
                <Th>Request</Th>
                <Th>Type</Th>
                <Th>Product</Th>
                <Th>Status</Th>
                <Th>Date</Th>
              </tr>
            </thead>
            <tbody>
              {proxyRequests.slice(0, 5).map((req) => (
                <tr key={req.id}>
                  <Td><span className="font-bold text-slate-950">{req.id}</span></Td>
                  <Td>
                    <Badge variant={req.requestKind === "ready-package" ? "info" : "default"}>
                      {req.requestKind === "ready-package" ? (req.packageName || "Package") : "Custom"}
                    </Badge>
                  </Td>
                  <Td>{req.proxyType}</Td>
                  <Td>
                    <Badge variant={req.status === "paid" || req.status === "confirmed" || req.status === "completed" ? "success" : req.status === "cancelled" ? "error" : "warning"}>
                      {req.status === "paid" ? "Paid" : req.status}
                    </Badge>
                  </Td>
                  <Td>{req.date}</Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        ) : (
          <EmptyState
            title="No proxy requests yet"
            description="Configure your proxy setup and submit a request. Our team will review and contact you to confirm."
            ctaHref="/dashboard/buy"
            ctaLabel="Submit a request"
          />
        )}
      </section>
    </div>
  );
}
