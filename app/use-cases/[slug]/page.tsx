import type { Metadata } from "next";
import { notFound } from "next/navigation";
import UseCasePage from "@/components/use-cases/UseCasePage";
import { getUseCaseBySlug, useCases } from "@/config/useCases";

export function generateStaticParams() {
  return useCases.map((useCase) => ({ slug: useCase.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getUseCaseBySlug(slug);
  if (!useCase) return {};
  return {
    title: useCase.title,
    description: useCase.description,
  };
}

export default async function UseCaseRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getUseCaseBySlug(slug)) notFound();
  return <UseCasePage slug={slug} />;
}
