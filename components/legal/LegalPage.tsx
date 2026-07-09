import Link from "next/link";
import Container from "@/components/layout/Container";
import { legalIndex, type LegalBlock, type LegalDoc } from "@/config/legal";

const EMAIL_PATTERN = /([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})/gi;

/** Renders plain text, turning any email address into a mailto link. */
function RichText({ text }: { text: string }) {
  const parts = text.split(EMAIL_PATTERN);
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <a key={index} href={`mailto:${part}`} className="font-semibold text-sky-700 hover:underline">
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
}

function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "h3") {
          return (
            <h3 key={index} className="mt-6 text-sm font-bold text-slate-950 sm:text-base">
              {block.text}
            </h3>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={index} className="mt-3 space-y-2">
              {block.items.map((item) => (
                <li key={item} className="relative pl-5 text-sm leading-7 text-slate-600">
                  <span className="absolute left-0 top-[13px] h-1.5 w-1.5 rounded-full bg-sky-500" />
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "table") {
          return (
            <div key={index} className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {block.head.map((cell) => (
                      <th key={cell} className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-t border-slate-200 align-top">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-3 leading-6 text-slate-600">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return (
          <p key={index} className="mt-3 text-sm leading-7 text-slate-600">
            <RichText text={block.text} />
          </p>
        );
      })}
    </>
  );
}

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const related = legalIndex.filter((item) => item.slug !== doc.slug);

  return (
    <>
      <section className="bg-[linear-gradient(135deg,#f0f9ff,#fff,#eef2ff)] py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">Legal</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{doc.title}</h1>
            <p className="mt-4 text-sm text-slate-600">Effective date: {doc.updated}</p>
          </div>
        </Container>
      </section>

      <section className="py-12 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
            <nav aria-label="Contents" className="hidden lg:block">
              <div className="sticky top-28 max-h-[calc(100dvh-9rem)] overflow-y-auto pr-2">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Contents</p>
                <ol className="mt-4 space-y-2">
                  {doc.sections.map((section, index) => (
                    <li key={section.title}>
                      <a
                        href={`#section-${index + 1}`}
                        className="block text-xs leading-5 text-slate-500 transition hover:text-sky-700"
                      >
                        {index + 1}. {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <div className="min-w-0">
              {doc.intro.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[1.5rem] sm:p-8">
                  <Blocks blocks={doc.intro} />
                </div>
              )}

              <div className="mt-8 space-y-8">
                {doc.sections.map((section, index) => (
                  <section key={section.title} id={`section-${index + 1}`} className="scroll-mt-28">
                    <h2 className="text-lg font-bold text-slate-950 sm:text-xl">
                      {index + 1}. {section.title}
                    </h2>
                    <Blocks blocks={section.blocks} />
                  </section>
                ))}
              </div>

              <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:rounded-[1.5rem] sm:p-8">
                <h2 className="text-base font-bold text-slate-950">Related policies</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link href={item.href} className="text-sm text-slate-600 transition hover:text-sky-700">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
