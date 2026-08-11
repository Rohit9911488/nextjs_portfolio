import styles from "./MyCapabilities.module.css";
import { getCapabilitiesContent } from "@/lib/site";

export default function MyCapabilities() {
  const content = getCapabilitiesContent();

  return (
    <section
      id="capabilities"
      className={styles.section}
      aria-labelledby="capabilities-heading"
    >
      <div className={`site-container ${styles.inner}`}>
        <h2 id="capabilities-heading" className={styles.heading}>
          {content.heading}
        </h2>

        <div className={styles.content}>
          <p className={styles.copy}>{content.copy}</p>

          <ul className={styles.pills}>
            {content.skills.map((skill) => (
              <li key={skill} className={styles.pill}>
                <span className={styles.pillLabel}>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
