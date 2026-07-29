import { PrismaClient } from "../../../generated/prisma/client";

function isTursoDatabase(url: string) {
  return url.startsWith("libsql:") || url.includes(".turso.io");
}

export function createPrismaClient() {
  const url = process.env.DATABASE_URL;

  if (!url || !isTursoDatabase(url)) {
    throw new Error(
      "DATABASE_URL must be a Turso libsql URL. Copy .env.example and set DATABASE_URL + TURSO_AUTH_TOKEN.",
    );
  }

  const { PrismaLibSql } =
    require("@prisma/adapter-libsql/web") as typeof import("@prisma/adapter-libsql/web");

  return new PrismaClient({
    adapter: new PrismaLibSql({
      url,
      authToken: process.env.TURSO_AUTH_TOKEN,
    }),
  });
}
