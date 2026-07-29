import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { isRevalidateAuthorized } from "@/lib/auth";
import { CACHE_TAGS } from "@/lib/db/cache";

export async function POST(request: Request) {
  if (!isRevalidateAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    tags?: string[];
    slug?: string;
  };

  const tags = body.tags?.length
    ? body.tags
    : body.slug
      ? [CACHE_TAGS.projects, CACHE_TAGS.project(body.slug)]
      : [CACHE_TAGS.projects, CACHE_TAGS.settings];

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  return NextResponse.json({ revalidated: true, tags });
}
