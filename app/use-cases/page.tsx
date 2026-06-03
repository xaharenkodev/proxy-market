import Container from "@/components/layout/Container";
import SectionHeader from "@/components/marketing/SectionHeader";
import UseCasesGrid from "@/components/marketing/UseCasesGrid";
import FinalCTA from "@/components/marketing/FinalCTA";

export default function UseCasesPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,#f0f9ff,#fff,#eef2ff)] py-12 sm:py-16 lg:py-24">
        <Container>
          <SectionHeader
            eyebrow="Use cases"
            title="Proxy workflows for business teams"
            description="Safe, professional positioning for public data, monitoring, QA, research and automation workflows."
          />
        </Container>
      </section>
      <section className="py-16 lg:py-24">
        <Container>
          <UseCasesGrid />
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
