import FeaturedProjects from "@/components/sections/FeaturedProjects";
import SubPageHero from "@/components/sections/SubPageHero";
import { getProjectsHeroContent } from "@/lib/site";

export default function ProjectsPage() {
  const hero = getProjectsHeroContent();

  return (
    <main>
      <SubPageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
      />
      <FeaturedProjects />
    </main>
  );
}
