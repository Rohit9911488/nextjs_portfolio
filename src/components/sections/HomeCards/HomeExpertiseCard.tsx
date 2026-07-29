import Icon from "@/components/Icon";
import type { CardItem } from "@/types/content";
import styles from "./HomeExpertiseCard.module.css";

export default function HomeExpertiseCard({ item, index }: { item: CardItem; index: number }) {
  return (
    <article className={`theme-transition group ${styles.card}`}>
      <div className={styles.top}>
        {item.icon && (
          <span className={styles.icon}>
            <Icon name={item.icon} className="h-[22px] w-[22px]" />
          </span>
        )}
        <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
      </div>

      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.description}>{item.description}</p>
      <span aria-hidden="true" className={styles.accent} />
    </article>
  );
}
