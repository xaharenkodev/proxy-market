import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCases } from "@/config/useCases";

export default function UseCasesGrid({ limit }: { limit?: number }) {
  const items = limit ? useCases.slice(0, limit) : useCases;

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {items.map((useCase) => {
        const Icon = useCase.icon;
        return (
          <Link
            key={useCase.id}
            href={`/use-cases/${useCase.slug}`}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-100 sm:rounded-[1.5rem] sm:p-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 sm:h-12 sm:w-12 sm:rounded-2xl">
              <Icon size={20} className="text-indigo-600" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-950 sm:mt-5 sm:text-lg">{useCase.shortTitle}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-600 sm:mt-3 sm:text-sm sm:leading-6">{useCase.description}</p>
            <div className="mt-auto flex items-center gap-2 pt-4 text-sm font-semibold text-sky-700 sm:pt-5">
              Learn more <ArrowRight size={14} className="transition group-hover:translate-x-1" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
