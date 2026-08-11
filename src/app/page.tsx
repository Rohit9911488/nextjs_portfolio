import AboutMe from "@/components/sections/AboutMe";
import ContactMe from "@/components/sections/ContactMe";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProjects />
      <AboutMe />
      <ContactMe />
    </main>
  );
}
