import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readShutdownFlag } from "@/lib/shutdown-edge";

const MAINTENANCE_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Temporarily unavailable</title>
    <style>
      body {
        margin: 0;
        min-height: 100svh;
        display: grid;
        place-items: center;
        background: #0a0a0a;
        color: #f5f5f5;
        font-family: system-ui, -apple-system, sans-serif;
      }
      main {
        max-width: 28rem;
        padding: 2rem;
        text-align: center;
      }
      h1 {
        margin: 0 0 0.75rem;
        font-size: 1.5rem;
        font-weight: 600;
      }
      p {
        margin: 0;
        color: #a3a3a3;
        line-height: 1.6;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Site temporarily unavailable</h1>
      <p>Please check back soon.</p>
    </main>
  </body>
</html>`;

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/shutdown")) {
    return NextResponse.next();
  }

  const shutdown = await readShutdownFlag();

  if (!shutdown) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json(
      { error: "Site is temporarily unavailable." },
      { status: 503 },
    );
  }

  return new NextResponse(MAINTENANCE_HTML, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
