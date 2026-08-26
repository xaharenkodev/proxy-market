import Container from "@/components/layout/Container";
import Accordion from "@/components/ui/Accordion";
import Reveal from "@/components/animations/Reveal";
import SectionHeader from "@/components/marketing/SectionHeader";
import PricingComparison from "@/components/marketing/PricingComparison";
import InteractivePricing from "@/components/marketing/InteractivePricing";
import FinalCTA from "@/components/marketing/FinalCTA";
import ProxyNetworkVisual from "@/components/marketing/ProxyNetworkVisual";
import { faqItems } from "@/config/faq";

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#f8fbff,#eef9ff_45%,#f5f3ff)]" />
        <Container className="relative">
          <div className="grid items-center gap-8 sm:gap-10 xl:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <SectionHeader
                align="left"
                eyebrow="Pricing"
                title="One-time proxy pricing, no subscriptions"
                description="Every plan is a one-time purchase: you pay once, access runs for the period or traffic you bought, and nothing renews automatically. Compare every proxy category and buy in EUR, GBP or USD — the selected currency is used at checkout and on your Invoice / Receipt."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <ProxyNetworkVisual compact />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="Plans" title="Compare all one-time plans" description="Available proxies and coming-soon APIs arranged in a complete grid. All prices are single payments — there are no recurring charges." />
          </Reveal>
          <div className="mt-10">
            <InteractivePricing />
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-slate-50 py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.12),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(79,70,229,0.09),transparent_34%)]" />
        <Container className="relative">
          <Reveal>
            <SectionHeader eyebrow="Comparison" title="Proxy type comparison" />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <PricingComparison />
          </Reveal>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1fr]">
            <Reveal>
              <SectionHeader
                align="left"
                eyebrow="FAQ"
                title="Billing and product questions"
                description="Clear pricing copy for planning and comparison."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Accordion items={faqItems.filter((item) => item.category === "Billing" || item.category === "Products")} />
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
