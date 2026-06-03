import BuyProxyForm from "@/components/dashboard/BuyProxyForm";

export default function DashboardBuyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">Request proxy setup</h1>
        <p className="mt-1.5 text-sm text-slate-600 sm:mt-2">Choose a ready package for quick setup, or configure a custom proxy solution.</p>
      </div>
      <BuyProxyForm />
    </div>
  );
}
