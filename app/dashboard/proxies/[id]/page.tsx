import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function ProxyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  void params;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">Proxy details</h1>
        <p className="mt-1.5 text-sm text-slate-600 sm:mt-2">This is a UI preview. Live details will appear once provisioning is connected.</p>
      </div>
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[1.5rem] sm:p-6">
          <Badge variant="info">Integration-ready</Badge>
          <h2 className="mt-4 text-lg font-bold text-slate-950 sm:mt-5 sm:text-xl">Metadata</h2>
          <div className="mt-4 grid gap-2 grid-cols-2 sm:mt-5 sm:gap-3">
            {["Type: Demo residential", "Country: United States", "Protocol: HTTP", "Rotation: Sticky", "Traffic: 0 GB", "Status: UI preview"].map((item) => (
              <div key={item} className="rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700 sm:rounded-2xl sm:p-4">{item}</div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[1.5rem] sm:p-6">
          <h2 className="text-lg font-bold text-slate-950 sm:text-xl">Credentials</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 sm:mt-3">Connection credentials will appear after provisioning is connected.</p>
          <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500 sm:mt-5 sm:rounded-2xl">
            Connection string examples will appear here.
          </div>
          <Button className="mt-4 sm:mt-5" fullWidth disabled>Copy credentials</Button>
        </div>
      </div>
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[1.5rem] sm:p-6">
          <h2 className="text-lg font-bold text-slate-950 sm:text-xl">Whitelist management</h2>
          <p className="mt-2 text-sm text-slate-600 sm:mt-3">IP whitelist UI is prepared. Saving requires backend integration.</p>
          <Button className="mt-4 sm:mt-5" disabled>Save whitelist</Button>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[1.5rem] sm:p-6">
          <h2 className="text-lg font-bold text-slate-950 sm:text-xl">Renewal panel</h2>
          <p className="mt-2 text-sm text-slate-600 sm:mt-3">Renewal requires order and provisioning endpoints.</p>
          <Button className="mt-4 sm:mt-5" disabled>Renew proxy</Button>
        </div>
      </div>
    </div>
  );
}
