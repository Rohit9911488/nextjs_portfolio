import type { SectionData } from "@/types/content";
import Cards from "./Cards";
import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import Content from "./Content";
import Cta from "./Cta";
import Hero from "./Hero";
import Projects from "./Projects";
import Timeline from "./Timeline";

export default function SectionRenderer({
  section,
  variant = "default",
}: {
  section: SectionData;
  variant?: "default" | "home" | "about";
}) {
  switch (section.type) {
    case "hero":
      return <Hero data={section} />;
    case "content":
      return <Content data={section} variant={variant} />;
    case "cards":
      return <Cards data={section} variant={variant} />;
    case "projects":
      return (
        <Projects data={section} variant={variant === "about" ? "default" : variant} />
      );
    case "timeline":
      return <Timeline data={section} variant={variant} />;
    case "contactDetails":
      return <ContactDetails data={section} />;
    case "form":
      return <ContactForm data={section} />;
    case "cta":
      return <Cta data={section} variant={variant} />;
    default:
      return null;
  }
}
