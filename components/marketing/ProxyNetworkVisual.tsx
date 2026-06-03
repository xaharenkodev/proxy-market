"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Globe2 } from "lucide-react";

const nodes = [
  { id: "US", label: "United States", x: 14, y: 26, color: "bg-sky-500" },
  { id: "GB", label: "United Kingdom", x: 42, y: 16, color: "bg-indigo-500" },
  { id: "DE", label: "Germany", x: 56, y: 35, color: "bg-cyan-500" },
  { id: "BR", label: "Brazil", x: 28, y: 58, color: "bg-emerald-500" },
  { id: "SG", label: "Singapore", x: 76, y: 52, color: "bg-sky-500" },
  { id: "JP", label: "Japan", x: 88, y: 22, color: "bg-indigo-500" },
];

export default function ProxyNetworkVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-2xl shadow-sky-200/50 backdrop-blur-xl ${compact ? "p-3 sm:p-4" : "p-4 sm:p-5 lg:p-6"}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.22),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(79,70,229,0.17),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.82),rgba(240,249,255,0.72))]" />
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:34px_34px]" />

      <div className="relative flex items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/75 p-3 shadow-sm backdrop-blur sm:rounded-3xl sm:p-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <Globe2 size={20} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-950">Live network map</p>
            <p className="text-xs text-slate-500">Frontend command center</p>
          </div>
        </div>
        <div className="hidden shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 sm:flex sm:items-center sm:gap-1.5">
          <CheckCircle2 size={13} />
          Integration-ready
        </div>
      </div>

      <div className={`relative mt-4 overflow-hidden rounded-2xl border border-white/80 bg-slate-950/95 shadow-inner sm:rounded-[1.75rem] ${compact ? "h-[240px] sm:h-[300px]" : "h-[280px] sm:h-[340px] lg:h-[380px]"}`}>
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {nodes.slice(1).map((node, index) => (
            <motion.path
              key={node.id}
              d={`M ${nodes[0].x} ${nodes[0].y} C ${(nodes[0].x + node.x) / 2} ${nodes[0].y - 12 + index * 3}, ${(nodes[0].x + node.x) / 2} ${node.y + 12 - index * 2}, ${node.x} ${node.y}`}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="0.35"
              strokeDasharray="2 2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0.2, 1, 0.2], opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 3.8 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
          <defs>
            <linearGradient id="lineGradient" x1="0" x2="1">
              <stop stopColor="#22d3ee" />
              <stop offset="1" stopColor="#818cf8" />
            </linearGradient>
          </defs>
        </svg>

        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative">
              <div className={`absolute inset-0 rounded-xl ${node.color} blur-lg opacity-60`} />
              <div className="relative flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-2.5 py-1.5 text-white shadow-xl backdrop-blur-md sm:gap-2 sm:rounded-2xl sm:px-3 sm:py-2">
                <span className={`h-2 w-2 shrink-0 rounded-full ${node.color} sm:h-2.5 sm:w-2.5`} />
                <span className="text-[10px] font-bold sm:text-xs">{node.id}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
