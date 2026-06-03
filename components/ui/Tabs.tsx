"use client";

interface TabsProps<T extends string> {
  tabs: readonly T[];
  active: T;
  onChange: (tab: T) => void;
}

export default function Tabs<T extends string>({ tabs, active, onChange }: TabsProps<T>) {
  return (
    <div className="flex overflow-x-auto rounded-xl border border-slate-200 bg-white p-1 shadow-sm sm:rounded-2xl sm:p-1.5">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm ${
            active === tab
              ? "bg-slate-950 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
