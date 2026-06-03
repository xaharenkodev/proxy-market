import Badge from "@/components/ui/Badge";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeader({ eyebrow, title, description, align = "center" }: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <Badge variant="info">{eyebrow}</Badge>}
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:mt-4 sm:text-3xl lg:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">{description}</p>}
    </div>
  );
}
