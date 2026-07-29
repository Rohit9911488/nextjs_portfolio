import { NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { isValidProjectImageValue, normalizeProjectImageValue } from "@/lib/project-image";
import { revalidateProjects } from "@/lib/revalidate";

export async function POST(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    slug: string;
    title: string;
    category: string;
    description: string;
    icon: string;
    image?: string;
    imageAlt?: string;
    contentHtml?: string;
    featured?: boolean;
    published?: boolean;
    order?: number;
    tags?: string[];
  };

  if (!body.slug || !body.title || !body.category || !body.description || !body.icon) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (body.image !== undefined && !isValidProjectImageValue(body.image)) {
    return NextResponse.json(
      { error: "Image must be a public path (e.g. /images/project.jpg) or an http(s) URL" },
      { status: 400 },
    );
  }

  const project = await prisma.project.create({
    data: {
      slug: body.slug,
      title: body.title,
      category: body.category,
      description: body.description,
      icon: body.icon,
      image: body.image ? normalizeProjectImageValue(body.image) : "",
      imageAlt: body.imageAlt ?? body.title,
      contentHtml: body.contentHtml ?? "",
      featured: body.featured ?? false,
      published: body.published ?? true,
      order: body.order ?? 0,
    },
  });

  if (body.tags?.length) {
    for (const tagName of body.tags) {
      const tag = await prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      });

      await prisma.projectTag.create({
        data: {
          projectId: project.id,
          tagId: tag.id,
        },
      });
    }
  }

  revalidateProjects(project.slug);
  return NextResponse.json({ project }, { status: 201 });
}
