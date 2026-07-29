import { NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/auth";
import { getShutdownEnabled, setShutdownEnabled } from "@/lib/shutdown";

function parseShutdownValue(value: unknown): boolean | null {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    if (value === "true") {
      return true;
    }

    if (value === "false") {
      return false;
    }
  }

  return null;
}

export async function GET(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const shutdown = await getShutdownEnabled();
  return NextResponse.json({ shutdown });
}

export async function POST(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const queryValue = parseShutdownValue(url.searchParams.get("shutdown"));

  let bodyValue: boolean | null = null;

  try {
    const body = (await request.json()) as { shutdown?: unknown };
    bodyValue = parseShutdownValue(body.shutdown);
  } catch {
    bodyValue = null;
  }

  const shutdown = bodyValue ?? queryValue;

  if (shutdown === null) {
    return NextResponse.json(
      { error: 'Provide shutdown as true or false in the JSON body or ?shutdown= query param.' },
      { status: 400 },
    );
  }

  await setShutdownEnabled(shutdown);

  return NextResponse.json({ shutdown });
}
