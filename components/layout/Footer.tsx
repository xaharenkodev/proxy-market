import Link from "next/link";
import { DatabaseZap } from "lucide-react";
import Container from "./Container";
import { footerColumns, complianceNote } from "@/config/footer";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="sm:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white sm:h-10 sm:w-10 sm:rounded-2xl">
                <DatabaseZap size={18} />
              </div>
              <span className="text-lg font-bold text-slate-950 sm:text-xl">
                Proxy<span className="text-sky-600">Market</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-600">
              Reliable datacenter, ISP, residential and mobile proxy workflows for public data, monitoring and geo-specific testing.
            </p>
            <p className="mt-5 max-w-sm rounded-xl border border-sky-100 bg-sky-50 p-4 text-xs leading-5 text-sky-900">
              {complianceNote}
            </p>
            {siteConfig.companyEmail && (
              <a href={`mailto:${siteConfig.companyEmail}`} className="mt-4 inline-block text-sm font-semibold text-sky-700">
                {siteConfig.companyEmail}
              </a>
            )}
          </div>
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-bold text-slate-950">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-600 transition hover:text-slate-950">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-slate-200 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.</p>
          <p>Reliable proxy infrastructure for business teams.</p>
        </div>
      </Container>
    </footer>
  );
}
