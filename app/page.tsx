import Link from "next/link";
import { BarChart3, Fingerprint, Globe2, KeyRound, Layers3, LockKeyhole, Network, Wallet } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import Reveal from "@/components/animations/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import SectionHeader from "@/components/marketing/SectionHeader";
import PremiumHero from "@/components/marketing/PremiumHero";
import ProductCards from "@/components/marketing/ProductCards";
import PricingCards from "@/components/marketing/PricingCards";
import LocationsGrid from "@/components/marketing/LocationsGrid";
import UseCasesGrid from "@/components/marketing/UseCasesGrid";
import FinalCTA from "@/components/marketing/FinalCTA";
import AnimatedDashboardPreview from "@/components/marketing/AnimatedDashboardPreview";
import ProxyNetworkVisual from "@/components/marketing/ProxyNetworkVisual";
import { homepageFaq } from "@/config/faq";

const stats = [
  { value: "50+", label: "Locations", note: "Region filters included" },
  { value: "4", label: "Proxy types", note: "Datacenter, ISP, residential, mobile" },
  { value: "2", label: "Protocols", note: "HTTP & SOCKS5" },
  { value: "3", label: "Checkout currencies", note: "EUR, GBP and USD" },
];

const steps = [
  ["01", "Create account", "Sign up in under a minute and land straight in the proxy configurator."],
  ["02", "Choose network type", "Pick datacenter, static ISP, residential or mobile based on the workflow."],
  ["03", "Tune targeting", "Select country, optional city or carrier, protocol and authentication method."],
  ["04", "Review pricing", "Choose EUR, GBP or USD and see the exact price before you confirm."],
  ["05", "Start routing traffic", "Receive your credentials and point your tooling at the endpoint."],
];

const features = [
  { icon: Network, title: "HTTP/SOCKS5 support", text: "Standard protocols that drop into any HTTP client, crawler or headless browser." },
  { icon: Layers3, title: "Rotating sessions", text: "Get a fresh exit IP per request to spread wide crawls across the pool." },
  { icon: Fingerprint, title: "Sticky sessions", text: "Hold one address across a multi-step flow when a target depends on continuity." },
  { icon: LockKeyhole, title: "IP whitelist", text: "Authenticate by source address instead of credentials where your infrastructure is fixed." },
  { icon: KeyRound, title: "Username/password auth", text: "Rotate credentials from the dashboard without redeploying your tooling." },
  { icon: Globe2, title: "Country targeting", text: "Choose the exit country so region-gated content resolves as a local visitor sees it." },
  { icon: BarChart3, title: "Usage analytics", text: "Track bandwidth, requests and active sessions before a runaway job becomes an invoice." },
  { icon: Wallet, title: "Balance management", text: "Top up and buy proxy services in EUR, GBP or USD with a single wallet." },
];

export default function Home() {
  return (
    <>
      <PremiumHero />

      <section className="relative border-y border-slate-100 bg-white/80 py-8 backdrop-blur-xl">
        <Container>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Reveal key={stat.label}>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-5 sm:shadow-lg sm:shadow-slate-200/60">
                  <p className="text-2xl font-bold text-slate-950 sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-sm font-bold text-slate-700">{stat.label}</p>
                  <p className="mt-1 text-xs text-slate-500 sm:mt-2">{stat.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Proxy products"
              title="Complete proxy marketplace"
              description="Each product card combines one-time pricing, protocols, rotation, authentication and best-fit use cases. No product on this site is sold as a subscription."
            />
          </Reveal>
          <div className="mt-10">
            <ProductCards />
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-slate-50 py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.12),transparent_30%),radial-gradient(circle_at_80%_60%,rgba(79,70,229,0.09),transparent_34%)]" />
        <Container className="relative">
          <Reveal>
            <SectionHeader
              eyebrow="Pricing"
              title="One-time proxy pricing"
              description="Pay once per order — no subscription, no auto-renewal. Switch the visible currency without changing wallet or payment behavior."
            />
          </Reveal>
          <div className="mt-10">
            <PricingCards limit={6} showSwitcher />
          </div>
        </Container>
      </section>

      <section id="how-it-works" className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="lg:sticky lg:top-24">
                <SectionHeader
                  align="left"
                  eyebrow="Workflow"
                  title="From signup to first request"
                  description="Configure the network type, targeting and protocol you need, then route your traffic through it."
                />
                <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50/80 p-4 text-sm leading-6 text-sky-950 sm:rounded-3xl sm:p-5">
                  Custom proxy setups are reviewed by our team before activation. Most orders are provisioned within a few minutes to a few hours.
                </div>
              </div>
            </Reveal>
            <StaggerContainer className="space-y-4">
              {steps.map(([number, title, text]) => (
                <StaggerItem key={number}>
                  <div className="group grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-sky-200 hover:shadow-xl hover:shadow-sky-100 sm:rounded-[1.5rem] sm:p-5 sm:grid-cols-[72px_1fr]">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-950 text-lg font-bold text-white sm:h-16 sm:w-16 sm:rounded-2xl">
                      {number}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-slate-950">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid items-start gap-10 xl:grid-cols-[0.75fr_1.25fr]">
            <Reveal>
              <div>
                <SectionHeader
                  align="left"
                  eyebrow="Global coverage"
                  title="Region filters with rich country cards"
                  description="Locations feel like an interactive network surface, with country chips, product tags and targeting notes."
                />
                <div className="mt-6 hidden xl:block">
                  <ProxyNetworkVisual compact />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <LocationsGrid compact />
                <Link href="/locations" className="mt-6 inline-block">
                  <Button variant="outline">Explore coverage</Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-slate-50 py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(240,249,255,0.85),rgba(255,255,255,0.45),rgba(238,242,255,0.72))]" />
        <Container className="relative">
          <Reveal>
            <SectionHeader
              eyebrow="Dashboard"
              title="A command center ready for production"
              description="Dense cards, protocol states, proxy table previews, auth controls and traffic surfaces make the dashboard feel like a real operations product."
            />
          </Reveal>
          <Reveal delay={0.12} className="mt-10">
            <AnimatedDashboardPreview />
          </Reveal>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Capabilities"
              title="Everything the proxy platform communicates"
              description="Eight balanced feature cards cover protocols, sessions, authentication and analytics."
            />
          </Reveal>
          <StaggerContainer className="mt-10 grid gap-4 grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, text }) => (
              <StaggerItem key={title}>
                <div className="group flex min-h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-100 sm:rounded-[1.5rem] sm:p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 transition group-hover:bg-slate-950 sm:h-12 sm:w-12 sm:rounded-2xl">
                    <Icon size={20} className="text-sky-600 transition group-hover:text-white" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-950 sm:mt-5 sm:text-lg">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600 sm:mt-3 sm:text-sm sm:leading-6">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      <section className="bg-slate-50 py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="Use cases" title="Business-safe proxy workflows" />
          </Reveal>
          <div className="mt-10">
            <UseCasesGrid limit={8} />
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1fr]">
            <Reveal>
              <SectionHeader
                align="left"
                eyebrow="FAQ"
                title="Common questions"
                description="The product explains dashboard readiness, provisioning integration, billing display and prohibited activity in customer-facing language."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Accordion items={homepageFaq} />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="pb-16 lg:pb-24">
        <Container>
          <FinalCTA />
        </Container>
      </section>
    </>
  );
}
