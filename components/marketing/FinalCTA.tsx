"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

export default function FinalCTA() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/80 bg-white/85 p-6 shadow-2xl shadow-sky-100 backdrop-blur sm:rounded-[2.25rem] sm:p-8 lg:p-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.12),transparent_36%)]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 text-white sm:h-14 sm:w-14 sm:rounded-2xl">
          <ShieldCheck size={22} />
        </div>
        <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950 sm:mt-6 sm:text-3xl lg:text-4xl">
          Start building with reliable proxies today
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
          {isLoggedIn
            ? "Configure your proxy setup and submit a request from your dashboard. Our team will review and confirm."
            : "Create an account, compare pricing and submit proxy configuration requests from a polished dashboard."}
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row">
          <Link href={isLoggedIn ? "/dashboard/buy" : "/register"}>
            <Button size="lg">
              {isLoggedIn ? "Request proxy setup" : "Create account"}
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline">View pricing</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
