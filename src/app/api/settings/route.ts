import { NextResponse } from "next/server";
import { getSite } from "@/lib/content";

export async function GET() {
  const site = await getSite();
  return NextResponse.json({ site });
}
