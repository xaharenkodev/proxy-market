import Container from "@/components/layout/Container";
import SectionHeader from "@/components/marketing/SectionHeader";

interface LegalPageProps {
  page: {
    title: string;
    updated: string;
    sections: { title: string; content: string }[];
  };
}

export default function LegalPage({ page }: LegalPageProps) {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,#f0f9ff,#fff,#eef2ff)] py-12 sm:py-16 lg:py-24">
        <Container>
          <SectionHeader eyebrow="Legal" title={page.title} description={`Last updated: ${page.updated}`} />
        </Container>
      </section>
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6 sm:space-y-8">
            {page.sections.map((section, index) => (
              <section key={section.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[1.5rem] sm:p-6">
                <h2 className="text-base font-bold text-slate-950 sm:text-lg">{index + 1}. {section.title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600 sm:mt-3">{section.content}</p>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
