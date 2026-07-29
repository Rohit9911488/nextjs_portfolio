# Rohit Sachdeva — Portfolio

Next.js portfolio site with Prisma and **Turso** (libSQL).

## Local development

```bash
npm install
cp .env.example .env   # set DATABASE_URL + TURSO_AUTH_TOKEN
npm run db:deploy      # push schema to Turso (first time)
npm run db:seed        # seed projects + site settings (first time)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Useful commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build (syncs Turso schema) |
| `npm run db:studio` | Prisma Studio → Turso |
| `npm run db:seed` | Re-seed projects + site settings |
| `npm run db:refresh` | Re-seed + clear dev cache |
| `npm run db:deploy` | Apply migrations to Turso |

## Database

All environments use **Turso** — there is no local SQLite file.

A one-time backup of the old local DB lives in `backups/portfolio-local-sqlite-2026-07-29.db` (see `backups/README.md`).

## Deploy on Vercel

1. Push to GitHub and import in [Vercel](https://vercel.com/new)
2. Set environment variables:

| Variable | Value |
|---|---|
| `DATABASE_URL` | `libsql://your-db.turso.io` |
| `TURSO_AUTH_TOKEN` | Turso auth token |
| `REVALIDATE_SECRET` | Random secret |
| `ADMIN_SECRET` | Random secret |

3. Deploy — build runs schema sync + `next build`

### Edit live data

```bash
npm run db:studio
```

Or use the Postman collection in `postman/`.

## Project structure

| Path | Purpose |
|---|---|
| `backups/` | Archived local SQLite snapshot (not used at runtime) |
| `data/` | Page copy JSON + site defaults seed |
| `prisma/` | Schema, migrations, seed |
| `src/app/` | Next.js pages & API |
| `src/lib/db/` | Prisma client + cached queries |
