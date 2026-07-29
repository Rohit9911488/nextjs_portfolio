import Link from "next/link";
import type { ContentSectionData } from "@/types/content";
import StackCardShell from "../StackCardShell";
import styles from "./HomeAbout.module.css";

function CtaArrow() {
  return (
    <svg
      className={styles.ctaIcon}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" />
      <polyline
        points="12 5 19 12 12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HomeAbout({ data }: { data: ContentSectionData }) {
  const ctaIsExternal = data.primaryCta
    ? (data.primaryCta.external ?? /^https?:\/\//.test(data.primaryCta.url))
    : false;

  return (
    <StackCardShell background="surface1" zIndexClassName="md:z-[1]" cardVariant="relaxed">
      <span aria-hidden="true" className={styles.glyph}>
        {"{ }"}
      </span>

      <div className={styles.grid}>
        <div>
          {data.eyebrow && (
            <p data-stack="eyebrow" className={styles.eyebrow}>
              {data.eyebrow}
            </p>
          )}
          <h2 data-stack="heading" className={styles.heading}>
            {data.heading}
          </h2>
          <div data-stack="item" aria-hidden="true" className={styles.rule} />
          {data.primaryCta &&
            (ctaIsExternal ? (
              <a
                data-stack="item"
                href={data.primaryCta.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`theme-transition ${styles.cta}`}
              >
                {data.primaryCta.label}
                <CtaArrow />
              </a>
            ) : (
              <Link
                data-stack="item"
                href={data.primaryCta.url}
                className={`theme-transition ${styles.cta}`}
              >
                {data.primaryCta.label}
                <CtaArrow />
              </Link>
            ))}
        </div>

        <div>
          {data.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              data-stack={index === 0 ? "body" : "item"}
              className={styles.lede}
            >
              {paragraph}
            </p>
          ))}

          {data.facts && data.facts.length > 0 && (
            <div className={styles.facts}>
              {data.facts.map((fact) => (
                <div key={fact.label} data-stack="item" className={styles.fact}>
                  <span className={styles.factLabel}>{fact.label}</span>
                  <span className={styles.factValue}>{fact.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </StackCardShell>
  );
}
