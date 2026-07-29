import { NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { isValidProjectImageValue, normalizeProjectImageValue } from "@/lib/project-image";
import { revalidateProjects } from "@/lib/revalidate";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function PUT(request: Request, context: RouteContext) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await context.params;
  const body = (await request.json()) as Record<string, unknown>;

  const existing = await prisma.project.findUnique({ where: { slug } });
  if (!existing) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  if (typeof body.image === "string" && !isValidProjectImageValue(body.image)) {
    return NextResponse.json(
      { error: "Image must be a public path (e.g. /images/project.jpg) or an http(s) URL" },
      { status: 400 },
    );
  }

  const project = await prisma.project.update({
    where: { slug },
    data: {
      title: typeof body.title === "string" ? body.title : undefined,
      category: typeof body.category === "string" ? body.category : undefined,
      description: typeof body.description === "string" ? body.description : undefined,
      icon: typeof body.icon === "string" ? body.icon : undefined,
      image: typeof body.image === "string" ? normalizeProjectImageValue(body.image) : undefined,
      imageAlt: typeof body.imageAlt === "string" ? body.imageAlt : undefined,
      contentHtml: typeof body.contentHtml === "string" ? body.contentHtml : undefined,
      featured: typeof body.featured === "boolean" ? body.featured : undefined,
      published: typeof body.published === "boolean" ? body.published : undefined,
      order: typeof body.order === "number" ? body.order : undefined,
    },
  });

  if (Array.isArray(body.tags)) {
    await prisma.projectTag.deleteMany({ where: { projectId: project.id } });

    for (const tagName of body.tags) {
      if (typeof tagName !== "string") continue;

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

  revalidateProjects(slug);
  return NextResponse.json({ project });
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!isAdminAuthorized(_request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await context.params;
  const existing = await prisma.project.findUnique({ where: { slug } });

  if (!existing) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  await prisma.project.delete({ where: { slug } });
  revalidateProjects(slug);

  return NextResponse.json({ deleted: true });
}
