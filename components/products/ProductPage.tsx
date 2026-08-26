import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2, Fingerprint, Globe2, KeyRound, Layers3, LockKeyhole, Network, RadioTower, ShieldCheck } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Accordion from "@/components/ui/Accordion";
import Reveal from "@/components/animations/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import SectionHeader from "@/components/marketing/SectionHeader";
import LocationsGrid from "@/components/marketing/LocationsGrid";
import FinalCTA from "@/components/marketing/FinalCTA";
import PricingCards from "@/components/marketing/PricingCards";
import ProxyNetworkVisual from "@/components/marketing/ProxyNetworkVisual";
import AnimatedDashboardPreview from "@/components/marketing/AnimatedDashboardPreview";
import { ProductConfig } from "@/config/products";
import { faqItems } from "@/config/faq";

const techFeatures = [
  { icon: Network, title: "HTTP/SOCKS5", text: "Standard protocols supported on every proxy in this product." },
  { icon: Layers3, title: "Rotation control", text: "Choose rotating exits for breadth or sticky sessions for continuity." },
  { icon: Fingerprint, title: "Sticky identity", text: "Hold the same address across a session where the workflow requires it." },
  { icon: Globe2, title: "Country targeting", text: "Select the exit country, with city targeting available in supported locations." },
  { icon: RadioTower, title: "Carrier targeting", text: "Target specific mobile carriers where the location and product support it." },
  { icon: LockKeyhole, title: "IP whitelist", text: "Bind access to your own source addresses instead of credentials." },
  { icon: KeyRound, title: "User/pass auth", text: "Per-proxy credentials you can rotate at any time from the dashboard." },
  { icon: BarChart3, title: "Usage reporting", text: "Bandwidth, request volume and session counts, per proxy, in the dashboard." },
];

export default function ProductPage({ product }: { product: ProductConfig }) {
  const Icon = product.icon;
  const isComingSoon = product.status === "coming-soon";

  return (
    <>
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#f8fbff,#eef9ff_45%,#f5f3ff)]" />
        <div className="pointer-events-none absolute right-0 top-12 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />
        <Container className="relative">
          <div className="grid gap-8 sm:gap-10 xl:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-white shadow-xl shadow-sky-100 sm:h-14 sm:w-14 sm:rounded-2xl">
                    <Icon size={22} />
                  </div>
                  <Badge variant={isComingSoon ? "warning" : "info"}>
                    {isComingSoon ? "Coming Soon" : "Available now"}
                  </Badge>
                  <Badge>{product.category}</Badge>
                </div>
                <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:mt-8 sm:text-4xl lg:text-5xl xl:text-6xl">
                  {product.name}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">{product.longDescription}</p>
                <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                  <Link href={isComingSoon ? "/contact" : "/dashboard/buy"}>
                    <Button size="lg">
                      {isComingSoon ? "Join waitlist" : "Open configurator"}
                      <ArrowRight size={18} />
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button size="lg" variant="outline">Compare pricing</Button>
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              {product.id === "mobile" || product.status === "coming-soon" ? (
                <AnimatedDashboardPreview />
              ) : (
                <ProxyNetworkVisual compact />
              )}
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <Reveal>
              <div className="lg:sticky lg:top-24">
                <SectionHeader
                  align="left"
                  eyebrow="Product fit"
                  title={`Why teams choose ${product.shortName}`}
                  description={product.description}
                />
                <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50/80 p-4 text-sm leading-6 text-sky-950 sm:rounded-3xl sm:p-5">
                  Buy this product in EUR, GBP or USD. Your selected checkout currency is reflected on the Invoice / Receipt.
                </div>
              </div>
            </Reveal>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
              {product.bestFor.map((item, index) => (
                <Reveal key={item} delay={index * 0.06}>
                  <div className="flex min-h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[1.5rem] sm:p-6">
                    <CheckCircle2 size={20} className="shrink-0 text-emerald-500" />
                    <p className="mt-3 text-sm font-bold text-slate-950 sm:mt-5 sm:text-base">{item}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-600 sm:mt-3 sm:text-sm sm:leading-6">A focused workflow supported by the product configuration surface.</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-slate-50 py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(14,165,233,0.12),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(79,70,229,0.1),transparent_32%)]" />
        <Container className="relative">
          <Reveal>
            <SectionHeader
              eyebrow="Technical surface"
              title="Complete capability overview"
              description="Eight balanced cards cover protocols, sessions, authentication and analytics readiness."
            />
          </Reveal>
          <StaggerContainer className="mt-10 grid gap-4 grid-cols-2 xl:grid-cols-4">
            {techFeatures.map(({ icon: FeatureIcon, title, text }) => (
              <StaggerItem key={title}>
                <div className="group flex min-h-full flex-col rounded-xl border border-white/80 bg-white/85 p-4 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-sky-100 sm:rounded-[1.5rem] sm:p-6 sm:shadow-lg sm:shadow-slate-200/60">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 transition group-hover:bg-slate-950 sm:h-12 sm:w-12 sm:rounded-2xl">
                    <FeatureIcon size={20} className="text-sky-600 transition group-hover:text-white" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-950 sm:mt-5 sm:text-lg">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600 sm:mt-3 sm:text-sm sm:leading-6">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 xl:grid-cols-[1fr_320px]">
            <div className="min-w-0">
              <Reveal>
                <SectionHeader
                  align="left"
                  eyebrow="Pricing"
                  title="One-time prices, no subscription"
                  description="Every plan below is bought once: you pay a single amount, access runs for the purchased period or prepaid traffic, and nothing renews automatically. Choose EUR, GBP or USD for product pricing, checkout and your Invoice / Receipt."
                />
              </Reveal>
              <div className="mt-8">
                <PricingCards productId={product.id} showSwitcher />
              </div>
            </div>
            <Reveal delay={0.1}>
              <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl shadow-sky-100 sm:rounded-[1.75rem] sm:p-6 xl:sticky xl:top-24">
                <ShieldCheck size={22} className="text-sky-600" />
                <h3 className="mt-4 text-lg font-bold text-slate-950 sm:mt-5 sm:text-xl">Configuration summary</h3>
                <dl className="mt-4 space-y-2.5 text-sm sm:mt-5 sm:space-y-3">
                  {[
                    ["Protocols", product.protocols.join(" / ")],
                    ["Rotation", product.rotationSupport],
                    ["Auth", product.authMethods.join(" + ")],
                    ["Status", isComingSoon ? "Waitlist" : "Integration-ready"],
                    ["Billing", "One-time payment"],
                    ["Auto-renewal", "No"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-3 border-b border-slate-100 pb-2.5 sm:pb-3">
                      <dt className="text-slate-500">{label}</dt>
                      <dd className="text-right font-bold text-slate-950">{value}</dd>
                    </div>
                  ))}
                </dl>
                <Link href={isComingSoon ? "/contact" : "/dashboard/buy"} className="mt-5 block sm:mt-6">
                  <Button fullWidth>{isComingSoon ? "Contact sales" : product.ctaLabel}</Button>
                </Link>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>

      {!isComingSoon && (
        <section className="bg-white py-16 lg:py-24">
          <Container>
            <Reveal>
              <SectionHeader eyebrow="Locations" title="Targeting preview" description="Balanced location cards with region, product tags and targeting notes." />
            </Reveal>
            <div className="mt-10">
              <LocationsGrid compact />
            </div>
          </Container>
        </section>
      )}

      <section className="bg-slate-50 py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1fr]">
            <Reveal>
              <SectionHeader
                align="left"
                eyebrow="FAQ"
                title={`${product.shortName} questions`}
                description="Professional copy keeps the integration status clear without making backend limitations the visual focus."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Accordion items={faqItems.slice(0, 6)} />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <FinalCTA />
        </Container>
      </section>
    </>
  );
}
