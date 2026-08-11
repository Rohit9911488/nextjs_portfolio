import ImageFrame from "@/components/ImageFrame";
import ContactMe from "@/components/sections/ContactMe";
import MyCapabilities from "@/components/sections/MyCapabilities";
import MyExperience from "@/components/sections/MyExperience";
import SubPageHero from "@/components/sections/SubPageHero";
import { getAboutMediaContent } from "@/lib/site";
import styles from "./about.module.css";

export default function AboutPage() {
  const media = getAboutMediaContent();

  return (
    <main>
      <SubPageHero variant="about" />
      <div className={`site-container ${styles.media}`}>
        <ImageFrame src={media.src} alt={media.alt} priority />
      </div>
      <MyCapabilities />
      <MyExperience />
      <ContactMe />
    </main>
  );
}
