import EmptyState from "@/components/dashboard/EmptyState";

export default async function ProxyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">Proxy details</h1>
        <p className="mt-1.5 text-sm text-slate-600 sm:mt-2">Reference: {id}</p>
      </div>
      <EmptyState
        title="This proxy is not available"
        description="We could not find an active proxy with this reference on your account. If you have just placed an order, it may still be awaiting activation — check your orders for its current status."
        ctaHref="/dashboard/orders"
        ctaLabel="View orders"
      />
    </div>
  );
}
