import ContactMe from "@/components/sections/ContactMe";
import SubPageHero from "@/components/sections/SubPageHero";
import { getContactHeroContent } from "@/lib/site";

export default function ContactPage() {
  const hero = getContactHeroContent();

  return (
    <main>
      <SubPageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
      />
      <ContactMe />
    </main>
  );
}
