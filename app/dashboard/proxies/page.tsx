import EmptyState from "@/components/dashboard/EmptyState";

export default function DashboardProxiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">Active proxies</h1>
        <p className="mt-1.5 text-sm text-slate-600 sm:mt-2">
          Every proxy you order appears here with its type, location, protocol, rotation mode, credentials and traffic usage.
        </p>
      </div>
      <EmptyState
        title="No active proxies yet"
        description="Once an order is approved and activated, your proxies show up here with connection credentials and usage figures. Standard packages are usually available within minutes of payment."
        ctaHref="/dashboard/buy"
        ctaLabel="Buy proxies"
      />
    </div>
  );
}
