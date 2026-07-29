import siteDefaults from "../data/site-defaults.json";
import { prisma } from "../src/lib/db/prisma";
import { SEED_PROJECTS } from "./seed-data";

const FEATURED_SLUGS = new Set([
  "ai-medical-image-verification-framework",
  "ai-career-prediction-system",
  "real-time-face-detection-system",
]);

async function seedProjects() {
  for (const [index, project] of SEED_PROJECTS.entries()) {
    const projectRecord = await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        category: project.category,
        description: project.description,
        icon: project.icon,
        image: "",
        imageAlt: project.imageAlt,
        featured: FEATURED_SLUGS.has(project.slug),
        published: true,
        order: index,
      },
      create: {
        slug: project.slug,
        title: project.title,
        category: project.category,
        description: project.description,
        icon: project.icon,
        image: "",
        imageAlt: project.imageAlt,
        contentHtml: "",
        featured: FEATURED_SLUGS.has(project.slug),
        published: true,
        order: index,
      },
    });

    await prisma.projectTag.deleteMany({
      where: { projectId: projectRecord.id },
    });

    for (const tagName of project.tags) {
      const tag = await prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      });

      await prisma.projectTag.create({
        data: {
          projectId: projectRecord.id,
          tagId: tag.id,
        },
      });
    }
  }
}

async function seedSiteSettings() {
  const site = siteDefaults.site;
  const entries: Array<[string, unknown]> = [
    ["site.name", site.name],
    ["site.professionalTitle", site.professionalTitle],
    ["site.description", site.description],
    ["site.siteUrl", site.siteUrl],
    ["site.email", site.email],
    ["site.phone", site.phone],
    ["site.location", site.location],
    ["site.resumeUrl", site.resumeUrl],
    ["site.navigation", site.navigation],
    ["site.socialLinks", site.socialLinks],
    ["site.headerCta", site.headerCta],
    ["site.footer", site.footer],
  ];

  for (const [key, value] of entries) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value: JSON.stringify(value) },
      create: { key, value: JSON.stringify(value) },
    });
  }
}

async function main() {
  await seedSiteSettings();
  await seedProjects();
  console.log("Database seeded.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
