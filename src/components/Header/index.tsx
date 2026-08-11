import { getHeroContent, getNavContent, getSiteName } from "@/lib/site";
import HeaderBar from "./HeaderBar";

export default function Header() {
  const hero = getHeroContent();
  const nav = getNavContent();

  return (
    <HeaderBar
      name={getSiteName()}
      linkedInUrl={hero.linkedInUrl}
      githubUrl={hero.githubUrl}
      navItems={nav.items}
      mobileEyebrow={nav.mobileEyebrow}
      mobileCtaLabel={nav.mobileCtaLabel}
      mobileCtaHref={nav.mobileCtaHref}
    />
  );
}
