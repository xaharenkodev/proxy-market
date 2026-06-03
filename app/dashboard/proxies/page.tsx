import EmptyState from "@/components/dashboard/EmptyState";
import Badge from "@/components/ui/Badge";
import { TableShell, Td, Th } from "@/components/ui/Table";

const demoRows = [
  { id: "demo-1", type: "Residential", country: "United States", protocol: "HTTP", rotation: "Sticky", status: "Demo", expires: "Not provisioned", traffic: "0 GB" },
  { id: "demo-2", type: "Mobile", country: "United Kingdom", protocol: "SOCKS5", rotation: "Manual", status: "Demo", expires: "Not provisioned", traffic: "0 GB" },
];

export default function DashboardProxiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">Active proxies</h1>
        <p className="mt-1.5 text-sm text-slate-600 sm:mt-2">Proxy inventory will appear here once provisioning is connected. Rows below are demo placeholders.</p>
      </div>
      <TableShell>
        <thead>
          <tr>
            <Th>Type</Th>
            <Th>Country</Th>
            <Th>Protocol</Th>
            <Th>Rotation</Th>
            <Th>Status</Th>
            <Th>Expires</Th>
            <Th>Traffic</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {demoRows.map((row) => (
            <tr key={row.id}>
              <Td>{row.type}</Td>
              <Td>{row.country}</Td>
              <Td>{row.protocol}</Td>
              <Td>{row.rotation}</Td>
              <Td><Badge variant="warning">{row.status}</Badge></Td>
              <Td>{row.expires}</Td>
              <Td>{row.traffic}</Td>
              <Td><span className="text-xs font-semibold text-slate-400">Pending</span></Td>
            </tr>
          ))}
        </tbody>
      </TableShell>
      <EmptyState
        title="Provisioning not connected"
        description="Credential delivery, renewals, rotation and whitelist management will be enabled once backend provisioning endpoints are available."
        ctaHref="/dashboard/buy"
        ctaLabel="Review buy flow"
      />
    </div>
  );
}
