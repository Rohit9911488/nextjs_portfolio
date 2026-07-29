import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Use process.env so `prisma generate` works in CI when DATABASE_URL isn't set yet.
    url: process.env.DATABASE_URL,
  },
});
