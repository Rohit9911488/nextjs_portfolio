import Icon from "@/components/Icon";
import { getSite } from "@/lib/content";
import { mergeContactItemsWithSite } from "@/lib/contact-details";
import type { ContactDetailsSectionData } from "@/types/content";
import SectionShell from "./SectionShell";

const ICON_BY_LABEL: Record<string, string> = {
  Email: "email",
  Phone: "phone",
  LinkedIn: "linkedin",
  GitHub: "github",
};

export default async function ContactDetails({ data }: { data: ContactDetailsSectionData }) {
  const site = await getSite();
  const items = mergeContactItemsWithSite(data.items, site);

  return (
    <SectionShell>
      <div className="w-full">
        <div className="flex flex-col items-start text-left sm:items-center sm:text-center">
          {data.eyebrow && (
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {data.eyebrow}
            </p>
          )}
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {data.heading}
          </h2>
        </div>

        <ul className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((item) => {
            const isExternal = /^https?:\/\//.test(item.url);
            return (
              <li key={item.label}>
                <a
                  href={item.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="theme-transition group flex h-full items-center gap-4 rounded-2xl border border-border bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-border-strong hover:bg-surface hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground dark:hover:shadow-[0_24px_48px_-28px_rgba(255,255,255,0.15)]"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-300 group-hover:border-transparent group-hover:bg-foreground group-hover:text-background">
                    <Icon name={ICON_BY_LABEL[item.label] ?? "email"} />
                  </span>
                  <span>
                    <span className="block font-mono text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                      {item.label}
                    </span>
                    <span className="block text-sm font-medium text-foreground">{item.value}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </SectionShell>
  );
}
