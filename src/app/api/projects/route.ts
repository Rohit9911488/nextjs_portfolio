import { NextResponse } from "next/server";
import { getAllProjectCards } from "@/lib/db/projects";

export async function GET() {
  const projects = await getAllProjectCards();
  return NextResponse.json({ projects });
}
