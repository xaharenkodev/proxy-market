"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Tabs from "@/components/ui/Tabs";
import { locations, locationRegions } from "@/config/locations";

export default function LocationsGrid({ compact = false }: { compact?: boolean }) {
  const [region, setRegion] = useState<(typeof locationRegions)[number]>("All");
  const [query, setQuery] = useState("");
  const visible = useMemo(
    () =>
      locations.filter((location) => {
        const matchesRegion = region === "All" || location.region === region;
        const matchesQuery = !query || location.country.toLowerCase().includes(query.toLowerCase());
        return matchesRegion && matchesQuery;
      }),
    [query, region]
  );
  const list = compact ? visible.slice(0, 8) : visible;

  const getGridCols = () => {
    const count = list.length;
    if (count <= 2) return "sm:grid-cols-2";
    if (count % 4 === 0 || count >= 8) return "sm:grid-cols-2 lg:grid-cols-4";
    if (count % 3 === 0) return "sm:grid-cols-3";
    if (count % 2 === 0) return "sm:grid-cols-2 lg:grid-cols-4";
    return "sm:grid-cols-2 lg:grid-cols-3";
  };

  return (
    <div>
      {!compact && (
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <Tabs tabs={locationRegions} active={region} onChange={setRegion} />
          <div className="relative w-full xl:max-w-xs">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search country"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
            />
          </div>
        </div>
      )}
      <div className={`${compact ? "" : "mt-6"} grid gap-3 sm:gap-4 ${getGridCols()}`}>
        {list.map((location, index) => {
          const isLastOdd = list.length % 2 === 1 && index === list.length - 1 && list.length > 2;
          return (
            <div
              key={location.code}
              className={`rounded-xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-sky-100 sm:rounded-2xl sm:p-5 sm:shadow-lg sm:shadow-slate-200/60 ${
                isLastOdd ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sm font-bold text-sky-700 sm:h-11 sm:w-11 sm:rounded-2xl">
                  {location.code}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-base font-bold leading-tight text-slate-950 sm:text-lg">{location.country}</p>
                  <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">{location.region}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                {location.products.map((product) => (
                  <Badge key={product}>{product}</Badge>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-500 sm:mt-4">
                {location.cityTargeting ? "City targeting UI" : "Country targeting"}
                {location.carrierTargeting ? " · carrier" : ""}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
