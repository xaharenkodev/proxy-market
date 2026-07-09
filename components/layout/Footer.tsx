import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import PaymentMethods from "@/components/ui/PaymentMethods";
import { footerColumns, complianceNote } from "@/config/footer";
import { siteConfig } from "@/config/site";

const columnSpans: Record<string, string> = {
  Products: "lg:col-span-2",
  "Use Cases": "lg:col-span-2",
  Resources: "lg:col-span-2",
  Legal: "lg:col-span-3",
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-3">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logo/logo.png"
                alt={siteConfig.name}
                width={994}
                height={210}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-600">
              Reliable datacenter, ISP, residential and mobile proxy workflows for public data, monitoring and geo-specific testing.
            </p>
            <p className="mt-5 max-w-sm rounded-xl border border-sky-100 bg-sky-50 p-4 text-xs leading-5 text-sky-900">
              {complianceNote}
            </p>
            <PaymentMethods className="mt-5" />
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className={columnSpans[column.title] ?? "lg:col-span-2"}>
              <h3 className="text-sm font-bold text-slate-950">{column.title}</h3>
              <ul
                className={`mt-4 space-y-3 ${column.title === "Legal" ? "sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3 sm:space-y-0" : ""}`}
              >
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

        <div className="mt-12 border-t border-slate-200 pt-8">
          <div className="grid gap-6 text-xs leading-6 text-slate-500 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-bold text-slate-950">{siteConfig.companyLegalName}</p>
              <p className="mt-1">Company number: {siteConfig.companyNumber}</p>
              <p>Registered in {siteConfig.companyJurisdiction}</p>
            </div>
            <div>
              <p className="font-bold text-slate-950">Registered office</p>
              <p className="mt-1">{siteConfig.companyAddress}</p>
            </div>
            <div>
              <p className="font-bold text-slate-950">Contact</p>
              <a href={`mailto:${siteConfig.companyEmail}`} className="mt-1 block font-semibold text-sky-700 hover:underline">
                {siteConfig.companyEmail}
              </a>
              {siteConfig.companyPhone && <p>{siteConfig.companyPhone}</p>}
            </div>
            <div>
              <p className="font-bold text-slate-950">Trading as</p>
              <p className="mt-1">
                {siteConfig.name} — {siteConfig.companyType.toLowerCase()} operating virenzaproxy.com
              </p>
              <Link href="/legal-notice" className="mt-1 inline-block font-semibold text-sky-700 hover:underline">
                Legal notice
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-slate-200 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.companyLegalName}. All rights reserved.
          </p>
          <p>Reliable proxy infrastructure for business teams.</p>
        </div>
      </Container>
    </footer>
  );
}
