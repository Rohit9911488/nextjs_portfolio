import aboutContent from "@/content/about/about.json";
import aboutMedia from "@/content/about/media.json";
import capabilitiesContent from "@/content/about/capabilities.json";
import experienceContent from "@/content/about/experience.json";
import contactHero from "@/content/contact/hero.json";
import heroContent from "@/content/home/hero.json";
import featuredProjects from "@/content/projects/featured.json";
import projectsHero from "@/content/projects/hero.json";
import contactContent from "@/content/shared/contact.json";
import navContent from "@/content/shared/nav.json";
import siteContent from "@/content/site.json";

export function getSiteContent() {
  return siteContent;
}

export function getSiteName(): string {
  return siteContent.name;
}

export function getNavContent() {
  return navContent;
}

export function getHeroContent() {
  return {
    name: siteContent.name,
    ...heroContent,
  };
}

export function getAboutContent() {
  return aboutContent;
}

export function getAboutMediaContent() {
  return aboutMedia;
}

export function getCapabilitiesContent() {
  return capabilitiesContent;
}

export function getExperienceContent() {
  return experienceContent;
}

export function getContactContent() {
  return {
    ...contactContent,
    copyright: `© ${new Date().getFullYear()} ${siteContent.name}`,
  };
}

export function getFeaturedProjectsContent() {
  return featuredProjects;
}

export function getProjectsHeroContent() {
  return projectsHero;
}

export function getContactHeroContent() {
  return contactHero;
}
