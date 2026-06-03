"use client";

import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { TableShell, Td, Th } from "@/components/ui/Table";
import EmptyState from "@/components/dashboard/EmptyState";
import { useBalance } from "@/context/BalanceContext";

export default function DashboardOrdersPage() {
  const { proxyRequests } = useBalance();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">Proxy requests</h1>
          <p className="mt-1.5 text-sm text-slate-600 sm:mt-2">Your submitted proxy requests. Our team reviews each request and confirms setup.</p>
        </div>
        <Link href="/dashboard/buy">
          <Button size="sm">New request</Button>
        </Link>
      </div>
      {proxyRequests.length ? (
        <TableShell>
          <thead>
            <tr>
              <Th>Request</Th>
              <Th>Type</Th>
              <Th>Product</Th>
              <Th>Location</Th>
              <Th>Config</Th>
              <Th>Est. price</Th>
              <Th>Status</Th>
              <Th>Date</Th>
            </tr>
          </thead>
          <tbody>
            {proxyRequests.map((req) => (
              <tr key={req.id}>
                <Td><span className="font-bold text-slate-950">{req.id}</span></Td>
                <Td>
                  <Badge variant={req.requestKind === "ready-package" ? "info" : "default"}>
                    {req.requestKind === "ready-package" ? (req.packageName || "Package") : "Custom"}
                  </Badge>
                </Td>
                <Td>{req.proxyType}</Td>
                <Td>{req.city ? `${req.country}, ${req.city}` : req.country}</Td>
                <Td>
                  <span className="text-xs text-slate-500">
                    {req.protocol} · {req.rotation} · {req.quantity}x · {req.bandwidthGb} GB
                  </span>
                </Td>
                <Td><span className="font-semibold">€{req.estimatedPriceEUR.toFixed(2)}</span></Td>
                <Td>
                  <Badge variant={req.status === "paid" || req.status === "confirmed" || req.status === "completed" ? "success" : req.status === "cancelled" ? "error" : "warning"}>
                    {req.status === "paid" ? "Paid · pending setup" : req.status}
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
          description="Choose a ready package or configure a custom setup. Our team will review and contact you to confirm."
          ctaHref="/dashboard/buy"
          ctaLabel="Submit a request"
        />
      )}
      {proxyRequests.length > 0 && (
        <div className="rounded-xl border border-sky-100 bg-sky-50 p-4 text-sm text-sky-950">
          Each request is reviewed by our team. You will be contacted to confirm availability, setup details and final pricing before any payment is processed.
        </div>
      )}
    </div>
  );
}
