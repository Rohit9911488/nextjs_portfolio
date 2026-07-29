import Reveal from "@/components/Reveal";
import type { TimelineSectionData } from "@/types/content";
import shared from "../about/shared/aboutSection.module.css";
import styles from "./AboutTimeline.module.css";

export default function AboutTimeline({ data }: { data: TimelineSectionData }) {
  return (
    <section className={`${shared.section} ${data.surface ? shared.surfaceBand : ""}`}>
      <div className={shared.wrap}>
        <Reveal>
          <div className={shared.centerHead}>
            {data.eyebrow && <span className={shared.eyebrow}>{data.eyebrow}</span>}
            <h2 className={shared.heading}>{data.heading}</h2>
          </div>

          <div className={styles.rail}>
            {data.items.map((item) => (
              <article key={`${item.title}-${item.organisation}`} className={`theme-transition ${styles.entry}`}>
                <span aria-hidden="true" className={styles.dot} />
                <div className={styles.head}>
                  <h3 className={styles.role}>{item.title}</h3>
                  <span className={styles.badge}>{item.period}</span>
                </div>
                <p className={styles.org}>{item.organisation}</p>
                {item.highlights && item.highlights.length > 0 ? (
                  <ul className={styles.list}>
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                ) : (
                  <ul className={styles.list}>
                    <li>{item.description}</li>
                  </ul>
                )}
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
