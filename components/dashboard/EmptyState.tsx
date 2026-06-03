import Link from "next/link";
import { Server } from "lucide-react";
import Button from "@/components/ui/Button";

export default function EmptyState({ title, description, ctaHref, ctaLabel }: {
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50">
        <Server size={24} className="text-sky-600" />
      </div>
      <h2 className="mt-5 text-xl font-bold text-slate-950">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">{description}</p>
      {ctaHref && ctaLabel && (
        <Link href={ctaHref} className="mt-6 inline-block">
          <Button>{ctaLabel}</Button>
        </Link>
      )}
    </div>
  );
}
