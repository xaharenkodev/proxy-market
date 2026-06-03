import Container from "@/components/layout/Container";
import Reveal from "@/components/animations/Reveal";
import SectionHeader from "@/components/marketing/SectionHeader";
import LocationsGrid from "@/components/marketing/LocationsGrid";
import FinalCTA from "@/components/marketing/FinalCTA";
import ProxyNetworkVisual from "@/components/marketing/ProxyNetworkVisual";

export default function LocationsPage() {
  return (
    <>
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#f8fbff,#eef9ff_45%,#f5f3ff)]" />
        <Container className="relative">
          <div className="grid items-center gap-8 sm:gap-10 xl:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <SectionHeader
                align="left"
                eyebrow="Locations"
                title="Explore proxy coverage"
                description="Use region tabs, country search, product tags and targeting notes to plan geo-specific public data, QA and monitoring workflows."
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
            <SectionHeader
              eyebrow="Coverage"
              title="Interactive region directory"
              description="Filter by region to find the right country for your workflow."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <LocationsGrid />
          </Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-slate-50 py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.12),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(79,70,229,0.09),transparent_34%)]" />
        <Container className="relative">
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-3">
            {[
              ["Country targeting", "Select the region and country that match monitoring, localization or public data workflows."],
              ["City targeting", "City controls are represented as polished UI states where future inventory can support them."],
              ["Carrier targeting", "Mobile carrier controls appear for mobile proxy planning alongside country selection."],
            ].map(([title, text]) => (
              <Reveal key={title}>
                <div className="flex min-h-full flex-col rounded-xl border border-white/80 bg-white/85 p-5 shadow-sm sm:rounded-[1.5rem] sm:p-6 sm:shadow-lg sm:shadow-slate-200/60">
                  <h2 className="text-lg font-bold text-slate-950">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 sm:mt-3">{text}</p>
                </div>
              </Reveal>
            ))}
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
