"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Globe2, ShieldCheck, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import { useAuth } from "@/context/AuthContext";
import ProxyNetworkVisual from "./ProxyNetworkVisual";
import AnimatedDashboardPreview from "./AnimatedDashboardPreview";

const chips = ["US", "GB", "DE", "NL", "SG", "JP", "BR", "UA"];

export default function PremiumHero() {
  const { isLoggedIn } = useAuth();

  return (
    <section className="relative overflow-hidden pb-16 pt-10 lg:pb-24 lg:pt-16">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8fbff_0%,#eef9ff_42%,#f5f3ff_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[900px] max-w-[200vw] -translate-x-1/2 rounded-full bg-sky-200/30 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_1px_1px,rgba(14,165,233,0.15)_1px,transparent_0)] [background-size:28px_28px]" />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-lg shadow-sky-100 backdrop-blur"
          >
            <span className="flex items-center gap-1.5 text-sky-700"><ShieldCheck size={15} /> Premium proxy marketplace</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
            <span className="hidden sm:inline">Buy in EUR, GBP or USD</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="mt-8 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Proxy infrastructure for data teams, QA and automation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8"
          >
            Configure datacenter, static ISP, residential and mobile proxy workflows with global locations, protocol controls, balance visibility and integration-ready provisioning states.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link href={isLoggedIn ? "/dashboard/buy" : "/register"}>
              <Button size="lg">
                {isLoggedIn ? "Request proxy setup" : "Get started"}
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">Compare pricing</Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-12"
        >
          <div className="grid items-stretch gap-5 lg:grid-cols-2 xl:grid-cols-[0.82fr_1.18fr]">
            <div className="overflow-hidden rounded-[2rem]">
              <ProxyNetworkVisual />
            </div>
            <div className="overflow-hidden rounded-[2rem]">
              <AnimatedDashboardPreview />
            </div>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-3 grid-cols-2 md:grid-cols-4">
          {[
            { icon: Zap, title: "Fast setup UI", text: "Step-based configurator" },
            { icon: ShieldCheck, title: "Safe-use copy", text: "Compliance-first wording" },
            { icon: CheckCircle2, title: "Three checkout currencies", text: "EUR, GBP and USD" },
            { icon: Globe2, title: "Global locations", text: chips.join(" · ") },
          ].map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-white/80 bg-white/75 p-4 shadow-lg shadow-sky-100/70 backdrop-blur sm:rounded-3xl sm:p-5"
            >
              <Icon size={18} className="text-sky-600" />
              <p className="mt-2 text-sm font-bold text-slate-950 sm:mt-3">{title}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500 line-clamp-2">{text}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
