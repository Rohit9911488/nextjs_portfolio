import styles from "./MyExperience.module.css";
import { getExperienceContent } from "@/lib/site";

export default function MyExperience() {
  const content = getExperienceContent();

  return (
    <section
      id="experience"
      className={styles.section}
      aria-labelledby="experience-heading"
    >
      <div className={`site-container ${styles.inner}`}>
        <h2 id="experience-heading" className={styles.heading}>
          {content.heading}
        </h2>

        <div className={styles.content}>
          {content.items.map((item) => (
            <article key={`${item.role}-${item.company}`} className={styles.item}>
              <div className={styles.itemHeader}>
                <div className={styles.itemTitles}>
                  <h3 className={styles.role}>{item.role}</h3>
                  <p className={styles.company}>{item.company}</p>
                </div>
                <p className={styles.dates}>{item.dates}</p>
              </div>
              <p className={styles.description}>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
