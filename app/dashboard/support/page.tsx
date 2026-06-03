"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { faqItems } from "@/config/faq";

export default function DashboardSupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">Support</h1>
        <p className="mt-1.5 text-sm text-slate-600 sm:mt-2">Create a support request or browse common questions.</p>
      </div>
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[1.5rem] sm:p-6">
          <h2 className="text-lg font-bold text-slate-950 sm:text-xl">Create support request</h2>
          <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
            <Input label="Subject" placeholder="Proxy provisioning question" />
            <div>
              <label className="text-sm font-medium text-slate-700">Message</label>
              <textarea rows={5} className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20" />
            </div>
            <Button disabled>Submit request</Button>
            <Link href="/contact" className="inline-block">
              <Button variant="outline">Use public contact form</Button>
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[1.5rem] sm:p-6">
          <h2 className="text-lg font-bold text-slate-950 sm:text-xl">FAQ shortcuts</h2>
          <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
            {faqItems.slice(0, 5).map((item) => (
              <div key={item.question} className="rounded-xl bg-slate-50 p-3 sm:rounded-2xl sm:p-4">
                <p className="text-sm font-bold text-slate-950">{item.question}</p>
                <p className="mt-1.5 text-xs leading-5 text-slate-600 sm:mt-2">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
