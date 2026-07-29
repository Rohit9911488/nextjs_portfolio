import Reveal from "@/components/Reveal";
import type { ContentSectionData } from "@/types/content";
import shared from "../about/shared/aboutSection.module.css";
import styles from "./AboutBackground.module.css";

export default function AboutBackground({ data }: { data: ContentSectionData }) {
  return (
    <section className={shared.section}>
      <div className={shared.wrap}>
        <Reveal>
          <div className={shared.centerHead}>
            {data.eyebrow && <span className={shared.eyebrow}>{data.eyebrow}</span>}
            <h2 className={shared.heading}>{data.heading}</h2>
          </div>

          <div className={styles.panel}>
            <div className={styles.top}>
              <div>
                {data.tagline && <div className={styles.tagline}>{data.tagline}</div>}
                <div aria-hidden="true" className={styles.rule} />
              </div>
              <div className={styles.prose}>
                {data.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            {data.facts && data.facts.length > 0 && (
              <div className={styles.metrics}>
                {data.facts.map((fact) => (
                  <div key={fact.label} className={styles.metric}>
                    <div className={styles.metricValue}>{fact.value}</div>
                    <div className={styles.metricLabel}>{fact.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
