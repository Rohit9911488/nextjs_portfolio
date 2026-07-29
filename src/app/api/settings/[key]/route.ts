import { NextResponse } from "next/server";
import { getSettingByKey } from "@/lib/db/settings";

type RouteContext = {
  params: Promise<{ key: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { key } = await context.params;
  const value = await getSettingByKey(`site.${key}`, null);

  if (value === null) {
    return NextResponse.json({ error: "Setting not found" }, { status: 404 });
  }

  return NextResponse.json({ key, value });
}
