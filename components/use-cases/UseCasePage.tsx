"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/marketing/SectionHeader";
import ProductCards from "@/components/marketing/ProductCards";
import FinalCTA from "@/components/marketing/FinalCTA";
import { useAuth } from "@/context/AuthContext";
import { getUseCaseBySlug } from "@/config/useCases";

export default function UseCasePage({ slug }: { slug: string }) {
  const useCase = getUseCaseBySlug(slug)!;
  const Icon = useCase.icon;
  const { isLoggedIn } = useAuth();

  return (
    <>
      <section className="bg-[linear-gradient(135deg,#f0f9ff,#fff,#eef2ff)] py-12 sm:py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 text-white sm:h-14 sm:w-14 sm:rounded-2xl">
              <Icon size={22} />
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:mt-8 sm:text-4xl lg:text-5xl">{useCase.title}</h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">{useCase.description}</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row">
              <Link href={isLoggedIn ? "/dashboard/buy" : "/register"}>
                <Button>
                  {isLoggedIn ? "Request proxy setup" : "Get started"}
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline">View pricing</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {useCase.points.map((point) => (
              <div key={point} className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[1.5rem] sm:p-6">
                <CheckCircle2 size={20} className="shrink-0 text-emerald-500" />
                <h2 className="mt-3 text-sm font-bold text-slate-950 sm:mt-5 sm:text-base">{point}</h2>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-slate-50 py-16 lg:py-24">
        <Container>
          <SectionHeader
            eyebrow="Recommended products"
            title={`Best starting point: ${useCase.bestProduct}`}
            description="Choose a product based on speed, identity stability, network type and regional requirements."
          />
          <div className="mt-10">
            <ProductCards />
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
