import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  note?: string;
}

export default function StatCard({ icon: Icon, label, value, note }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[1.5rem] sm:p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 sm:h-11 sm:w-11 sm:rounded-2xl">
          <Icon size={18} className="text-sky-600" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">{label}</p>
          <p className="mt-0.5 truncate text-xl font-bold text-slate-950 sm:mt-1 sm:text-2xl">{value}</p>
        </div>
      </div>
      {note && <p className="mt-3 text-xs text-slate-500 sm:mt-4 sm:text-sm">{note}</p>}
    </div>
  );
}
