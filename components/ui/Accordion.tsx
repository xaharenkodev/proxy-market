"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.question} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <button
            type="button"
            onClick={() => setOpen(open === index ? -1 : index)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
          >
            <span className="text-sm font-semibold text-slate-950">{item.question}</span>
            <ChevronDown
              size={18}
              className={`shrink-0 text-slate-400 transition-transform ${open === index ? "rotate-180" : ""}`}
            />
          </button>
          {open === index && (
            <div className="border-t border-slate-100 px-5 py-4 text-sm leading-6 text-slate-600">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
