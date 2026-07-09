"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/marketing/SectionHeader";
import ProductCards from "@/components/marketing/ProductCards";
import FinalCTA from "@/components/marketing/FinalCTA";
import Accordion from "@/components/ui/Accordion";
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
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:mt-8 sm:text-4xl lg:text-5xl">
              {useCase.title}
            </h1>
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
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Why {useCase.title.toLowerCase()} needs proxies
            </h2>
            <div className="mt-6 space-y-4">
              {useCase.overview.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-slate-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {useCase.points.map((point) => (
              <div
                key={point.title}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[1.5rem] sm:p-6"
              >
                <CheckCircle2 size={20} className="shrink-0 text-emerald-500" />
                <h3 className="mt-4 text-sm font-bold text-slate-950 sm:text-base">{point.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{point.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-16 lg:py-24">
        <Container>
          <SectionHeader
            eyebrow="How to set it up"
            title={`Running ${useCase.title.toLowerCase()} on Virenza Proxy`}
            description="Four steps from an empty dashboard to a workflow you can run on a schedule."
          />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {useCase.workflow.map((step, index) => (
              <li
                key={step.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[1.5rem] sm:p-6"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-sm font-bold text-slate-950 sm:text-base">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeader
            eyebrow="Recommended products"
            title={`Best starting point: ${useCase.bestProduct}`}
            description={useCase.productRationale}
          />
          <div className="mt-10">
            <ProductCards />
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-16 lg:py-24">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Common questions</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Practical answers for teams evaluating {useCase.title.toLowerCase()} workflows.
              </p>
              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 sm:rounded-[1.5rem]">
                <ShieldAlert size={20} className="text-amber-600" />
                <h3 className="mt-3 text-sm font-bold text-amber-950">Where the line is</h3>
                <p className="mt-2 text-sm leading-6 text-amber-900">{useCase.compliance}</p>
                <Link
                  href="/acceptable-use-policy"
                  className="mt-3 inline-block text-sm font-semibold text-amber-900 underline underline-offset-4"
                >
                  Read the Acceptable Use Policy
                </Link>
              </div>
            </div>
            <Accordion
              items={useCase.faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))}
            />
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
