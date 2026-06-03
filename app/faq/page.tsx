import Container from "@/components/layout/Container";
import Accordion from "@/components/ui/Accordion";
import SectionHeader from "@/components/marketing/SectionHeader";
import { faqItems } from "@/config/faq";

const categories = ["General", "Products", "Billing", "Dashboard", "Compliance"] as const;

export default function FAQPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,#f0f9ff,#fff,#eef2ff)] py-12 sm:py-16 lg:py-24">
        <Container>
          <SectionHeader
            eyebrow="FAQ"
            title="ProxyMarket questions"
            description="Answers about product types, billing, dashboard features and acceptable use."
          />
        </Container>
      </section>
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-4xl space-y-8 sm:space-y-10">
            {categories.map((category) => {
              const items = faqItems.filter((item) => item.category === category);
              if (!items.length) return null;
              return (
                <div key={category}>
                  <h2 className="mb-3 text-lg font-bold text-slate-950 sm:mb-4 sm:text-xl">{category}</h2>
                  <Accordion items={items} />
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
