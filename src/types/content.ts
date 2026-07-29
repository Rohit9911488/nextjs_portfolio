export interface CtaLink {
  label: string;
  url: string;
  external?: boolean;
}

export interface NavigationItem {
  label: string;
  url: string;
}

export interface SocialLink {
  label: string;
  url: string;
  external: boolean;
}

export interface SiteFooter {
  description: string;
  copyright: string;
  statement: string;
  statementAccent: string;
  attributionPrefix: string;
  attributionLink: {
    label: string;
    url: string;
  };
}

export interface SiteInfo {
  name: string;
  professionalTitle: string;
  description: string;
  siteUrl: string;
  email: string;
  phone: string;
  location: string;
  resumeUrl: string;
  navigation: NavigationItem[];
  socialLinks: SocialLink[];
  headerCta: CtaLink;
  footer: SiteFooter;
}

export interface ProjectItem {
  id: string;
  slug: string;
  icon: "shield" | "nodes" | "face" | "chart" | "code";
  title: string;
  category: string;
  summary: string;
  description: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  href?: string;
}

export interface PageSeo {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
}

interface SectionBase {
  id: string;
  eyebrow?: string;
}

export interface HeroSectionData extends SectionBase {
  type: "hero";
  heading: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
}

export interface ContentFact {
  label: string;
  value: string;
}

export interface ContentSectionData extends SectionBase {
  type: "content";
  heading: string;
  tagline?: string;
  paragraphs: string[];
  primaryCta?: CtaLink;
  facts?: ContentFact[];
}

export interface CardItem {
  title: string;
  description: string;
  icon?: string;
  tags?: string[];
}

export interface CardsSectionData extends SectionBase {
  type: "cards";
  heading: string;
  description?: string;
  items: CardItem[];
}

export interface ProjectsSectionData extends SectionBase {
  type: "projects";
  heading: string;
  description?: string;
  /** Homepage featured subset. Omit on the projects page listing section. */
  projectIds?: string[];
  primaryCta?: CtaLink;
}

export interface TimelineItem {
  title: string;
  organisation: string;
  period: string;
  description: string;
  highlights?: string[];
}

export interface TimelineSectionData extends SectionBase {
  type: "timeline";
  heading: string;
  items: TimelineItem[];
  // Alternates the section background with its neighbor (e.g. Education vs
  // Experience) — defaults to the plain page background when unset.
  surface?: boolean;
}

export interface ContactDetailItem {
  label: string;
  value: string;
  url: string;
}

export interface ContactDetailsSectionData extends SectionBase {
  type: "contactDetails";
  heading: string;
  items: ContactDetailItem[];
}

export type FormFieldType = "text" | "email" | "select" | "textarea" | "checkbox";

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface FormSectionData extends SectionBase {
  type: "form";
  heading: string;
  description?: string;
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
  fields: FormField[];
}

export interface CtaSectionData extends SectionBase {
  type: "cta";
  heading: string;
  description?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  // "solid" = contained dark inverted card (About/Projects closing CTAs).
  // Defaults to "plain" (today's unchanged treatment — Contact's CTA).
  style?: "solid" | "plain";
}

export type SectionData =
  | HeroSectionData
  | ContentSectionData
  | CardsSectionData
  | ProjectsSectionData
  | TimelineSectionData
  | ContactDetailsSectionData
  | FormSectionData
  | CtaSectionData;

export interface PageData {
  id: string;
  path: string;
  seo: PageSeo;
  sections: SectionData[];
}

export interface PortfolioContent {
  site: SiteInfo;
  pages: PageData[];
}
