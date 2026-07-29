# Local SQLite backup

Archived copy of `prisma/dev.db` before the project moved to **Turso** only.

| File | Description |
|---|---|
| `portfolio-local-sqlite-2026-07-29.db` | Last local SQLite snapshot (projects, tags, site settings) |

## Restore locally (optional)

Only if you need to inspect old data without Turso:

```bash
sqlite3 backups/portfolio-local-sqlite-2026-07-29.db
.tables
SELECT slug, title FROM Project;
```

This file is **not** used by the app at runtime. All environments use Turso via `DATABASE_URL` in `.env`.
