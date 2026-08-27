import Image from "next/image";
import { Globe2, ShieldCheck, Wallet } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function AuthVisual() {
  return (
    <div className="hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl shadow-sky-100 sm:rounded-[2rem] sm:p-6 lg:block">
      <div className="rounded-2xl bg-[linear-gradient(135deg,#e0f2fe,#fff,#eef2ff)] p-5 sm:rounded-3xl sm:p-6">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/logo/logo.png"
            alt={siteConfig.name}
            width={994}
            height={210}
            className="h-8 w-auto"
          />
          <div>
            <p className="text-xs text-slate-500">Dashboard access</p>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4">
          {[
            { icon: Wallet, title: "One-time purchases", text: "Pay for each order separately at checkout." },
            { icon: Globe2, title: "Global proxy UI", text: "Configure country, protocol and rotation." },
            { icon: ShieldCheck, title: "Compliance controls", text: "Clear acceptable-use guardrails." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-xl border border-white/80 bg-white/80 p-4 sm:rounded-2xl">
              <Icon size={18} className="text-sky-600" />
              <p className="mt-2.5 text-sm font-bold text-slate-950 sm:mt-3">{title}</p>
              <p className="mt-1 text-xs leading-5 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
