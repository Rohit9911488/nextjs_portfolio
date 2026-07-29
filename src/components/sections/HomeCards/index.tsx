import type { CardsSectionData } from "@/types/content";
import StackCardShell from "../StackCardShell";
import grid from "../shared/homeCardGrid.module.css";
import section from "../shared/homeSection.module.css";
import HomeExpertiseCard from "./HomeExpertiseCard";

export default function HomeCards({ data }: { data: CardsSectionData }) {
  return (
    <StackCardShell background="inverse" zIndexClassName="md:z-[2]">
      <div className={section.shell}>
        <div className={section.head}>
          {data.eyebrow && (
            <p data-stack="eyebrow" className={`${section.eyebrow} ${section.eyebrowInverse}`}>
              {data.eyebrow}
            </p>
          )}
          <h2 data-stack="heading" className={`${section.heading} ${section.headingInverse}`}>
            {data.heading}
          </h2>
          {data.description && (
            <p data-stack="body" className={`${section.description} ${section.descriptionInverse}`}>
              {data.description}
            </p>
          )}
        </div>

        <div className={`${grid.grid} ${grid.cols4}`}>
          {data.items.map((item, index) => (
            <div key={item.title} data-stack="item" className={grid.item}>
              <HomeExpertiseCard item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </StackCardShell>
  );
}
