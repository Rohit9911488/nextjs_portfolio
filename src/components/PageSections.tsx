import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getPageByPath } from "@/lib/content";
import StackBackdrop from "./sections/StackBackdrop";
import SectionRenderer from "./sections/SectionRenderer";

const StackScroll = dynamic(() => import("./sections/StackScroll"));

const isOnePager = process.env.ONE_PAGER === "true";

export default async function PageSections({ path }: { path: string }) {
  const page = await getPageByPath(path);
  if (!page) notFound();

  const sections = isOnePager ? page.sections.filter((section) => section.type === "hero") : page.sections;
  const isHomeStack = page.id === "home" && !isOnePager;
  const pageVariant = page.id === "about" ? "about" : "default";

  if (!isHomeStack) {
    const [hero, ...rest] = sections;
    return (
      <>
        {hero && <SectionRenderer key={hero.id} section={hero} />}
        {rest.length > 0 && (
          <StackBackdrop variant="flush">
            {rest.map((section) => (
              <SectionRenderer key={section.id} section={section} variant={pageVariant} />
            ))}
          </StackBackdrop>
        )}
      </>
    );
  }

  const [hero, ...stacked] = sections;

  return (
    <>
      <SectionRenderer section={hero} />
      <StackScroll>
        {stacked.map((section) => (
          <SectionRenderer key={section.id} section={section} variant="home" />
        ))}
      </StackScroll>
    </>
  );
}
