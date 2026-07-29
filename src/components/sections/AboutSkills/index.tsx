import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import type { CardsSectionData } from "@/types/content";
import shared from "../about/shared/aboutSection.module.css";
import styles from "./AboutSkills.module.css";

export default function AboutSkills({ data }: { data: CardsSectionData }) {
  return (
    <section className={`${shared.section} ${shared.surfaceBand}`}>
      <div className={shared.wrap}>
        <Reveal>
          <div className={shared.centerHead}>
            {data.eyebrow && <span className={shared.eyebrow}>{data.eyebrow}</span>}
            <h2 className={shared.heading}>{data.heading}</h2>
            {data.description && <p className={shared.description}>{data.description}</p>}
          </div>

          <div className={styles.grid}>
            {data.items.map((item, index) => (
              <article key={item.title} className={`theme-transition ${styles.card}`}>
                <div className={styles.top}>
                  {item.icon && (
                    <span className={styles.icon}>
                      <Icon name={item.icon} className="h-[22px] w-[22px]" />
                    </span>
                  )}
                  <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.summary}>{item.description}</p>
                {item.tags && item.tags.length > 0 && (
                  <div className={styles.chips}>
                    {item.tags.map((tag) => (
                      <span key={tag} className={styles.chip}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
