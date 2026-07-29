# Rohit Sachdeva — Portfolio

Next.js portfolio site with **Prisma** and **Turso** (libSQL). Projects and site settings live in the database; page copy and section layout live in JSON.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Database | Turso (libSQL) via Prisma 7 |
| Animation | GSAP, Lenis smooth scroll |
| Fonts | Inter, Space Grotesk, JetBrains Mono |

---

## Quick start

```bash
npm install
cp .env.example .env   # set DATABASE_URL + TURSO_AUTH_TOKEN + secrets
npm run db:deploy      # push schema to Turso (first time)
npm run db:seed        # seed projects + site settings (first time)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Useful commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build (syncs Turso schema + Next build) |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |
| `npm run db:studio` | Prisma Studio → Turso |
| `npm run db:seed` | Re-seed projects + site settings |
| `npm run db:refresh` | Re-seed + clear `.next` cache |
| `npm run db:deploy` | Apply schema to Turso |

---

## Environment variables

Copy `.env.example` and set:

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Turso libSQL URL, e.g. `libsql://your-db.turso.io` |
| `TURSO_AUTH_TOKEN` | Yes | Turso auth token |
| `ADMIN_SECRET` | Yes | Bearer token for admin project API |
| `REVALIDATE_SECRET` | Yes | Bearer token for on-demand cache revalidation |

All environments use **Turso** — there is no local SQLite file at runtime. A one-time backup of the old local DB is in `backups/` (see `backups/README.md`).

---

## What lives where

| Data | Source | Edited via |
|---|---|---|
| Projects (title, slug, tags, images, write-up) | **Database** | Admin API, Prisma Studio |
| Site info (name, nav, footer, contact, resume) | **Database** (`SiteSetting`) | Prisma Studio, seed file |
| Page sections (hero, about copy, expertise cards, CTAs) | **`data/portfolio-content.json`** | Edit JSON + redeploy |
| Site defaults (fallback) | **`data/site-defaults.json`** | Edit JSON, re-seed |

---

## Database schema

### `Project`

Main project record. Shown on `/projects`, `/projects/[slug]`, and the home featured section.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `String` (cuid) | Auto | Primary key |
| `slug` | `String` | Yes | URL segment, unique. Example: `ai-career-prediction-system` |
| `title` | `String` | Yes | Project title |
| `category` | `String` | Yes | Category label (used for filtering on `/projects`) |
| `description` | `String` | Yes | Short summary on cards and detail header |
| `icon` | `String` | Yes | Project icon ID — see [Project icons](#project-icons) |
| `image` | `String` | No | Cover image URL or public path — see [Project images](#project-images) |
| `imageAlt` | `String` | No | Alt text for cover image (defaults to title) |
| `contentHtml` | `String` | No | Full write-up HTML for project detail page |
| `featured` | `Boolean` | No | `true` = shown in home featured projects (default `false`) |
| `published` | `Boolean` | No | `false` = hidden from site (default `true`) |
| `order` | `Int` | No | Sort order on listings (ascending, default `0`) |
| `createdAt` | `DateTime` | Auto | Created timestamp |
| `updatedAt` | `DateTime` | Auto | Updated timestamp |

### `Tag`

Technology / keyword labels attached to projects.

| Field | Type | Description |
|---|---|---|
| `id` | `String` (cuid) | Primary key |
| `name` | `String` | Unique tag name, e.g. `Python`, `TensorFlow` |

### `ProjectTag`

Join table linking projects to tags (many-to-many).

| Field | Type | Description |
|---|---|---|
| `projectId` | `String` | FK → `Project.id` |
| `tagId` | `String` | FK → `Tag.id` |

### `SiteSetting`

Key-value store for site-wide settings. Values are stored as JSON strings.

| Field | Type | Description |
|---|---|---|
| `key` | `String` | Setting key (primary key) |
| `value` | `String` | JSON-encoded value |
| `updatedAt` | `DateTime` | Last updated |

#### Site setting keys

| Key | Type | Example |
|---|---|---|
| `site.name` | `string` | `"Rohit Sachdeva"` |
| `site.professionalTitle` | `string` | `"AI Engineer, Machine Learning Developer..."` |
| `site.description` | `string` | Site meta description |
| `site.siteUrl` | `string` | `"https://example.com"` |
| `site.email` | `string` | Contact email |
| `site.phone` | `string` | Phone number |
| `site.location` | `string` | Location string |
| `site.resumeUrl` | `string` | `"/rohit-sachdeva-resume.pdf"` |
| `site.navigation` | `NavigationItem[]` | `[{ "label": "Home", "url": "/" }, ...]` |
| `site.socialLinks` | `SocialLink[]` | `[{ "label": "GitHub", "url": "...", "external": true }]` |
| `site.headerCta` | `CtaLink` | `{ "label": "View Resume", "url": "...", "external": true }` |
| `site.footer` | `SiteFooter` | Footer copy, copyright, attribution |

Defaults are defined in `data/site-defaults.json` and seeded via `npm run db:seed`.

---

## Icons

There are **two separate icon systems** in this project.

### Project icons

Used on project cards and project detail pages. Stored in the database `Project.icon` field.

| ID | Best for |
|---|---|
| `shield` | Security, verification, trust |
| `nodes` | ML pipelines, networks, connected systems |
| `face` | Computer vision, face detection |
| `chart` | Analytics, dashboards, data |
| `code` | General development, automation |

Invalid values fall back to `code`.

Defined in: `src/components/sections/shared/projectIcons.tsx`

### Expertise / card icons

Used in JSON page content (`portfolio-content.json`) for expertise and skills cards. **Not stored in the database.**

| ID | Used for |
|---|---|
| `brain` | Machine learning, AI |
| `scan-face` | Computer vision |
| `chart` | Data analytics |
| `code` | Python / development |
| `layers` | Architecture, platforms |
| `email` | Contact details |
| `phone` | Contact details |
| `linkedin` | Social links |
| `github` | Social links |

Defined in: `src/components/Icon.tsx`

To add a new icon, add an SVG path to the relevant component and use the new ID in your data.

---

## Project images

The `image` field accepts:

| Format | Example | Notes |
|---|---|---|
| **Public path** | `/images/my-project.jpg` | File must exist in `public/` |
| **External URL** | `https://cdn.example.com/photo.jpg` | Must be `http://` or `https://` |

Leave empty to show the themed placeholder. Images are rendered with `next/image` (local and remote).

**Admin API example:**

```json
{
  "image": "/images/ai-career.jpg",
  "imageAlt": "AI career prediction system dashboard"
}
```

or

```json
{
  "image": "https://images.unsplash.com/photo-1234567890",
  "imageAlt": "External project screenshot"
}
```

---

## Project write-up (`contentHtml`)

The `contentHtml` field on a project stores raw HTML rendered on `/projects/[slug]`. It is styled automatically for light and dark mode.

Supported tags:

| Tag | Styling |
|---|---|
| `h1`–`h6` | Display font, sized hierarchy |
| `p` | Muted body text |
| `a` | Underlined links with hover/focus states |
| `ul`, `ol`, `li` | Lists with themed markers |
| `strong`, `b`, `em`, `i` | Bold and italic |
| `blockquote` | Left border accent |
| `code`, `pre` | Mono font, surface background |
| `hr` | Themed divider |
| `img`, `video` | Responsive, bordered |
| `figure`, `figcaption` | Image captions |
| `table`, `th`, `td` | Basic table styling |

**Example:**

```html
<h2>Overview</h2>
<p>This project predicts career paths using <strong>machine learning</strong>.</p>
<ul>
  <li>Python + Flask backend</li>
  <li>TensorFlow model</li>
</ul>
<p>Read the <a href="https://github.com/example/repo">GitHub repo</a>.</p>
```

---

## Page content (`data/portfolio-content.json`)

Static page structure and copy. Each page has `path`, `seo`, and `sections[]`.

### Section types

| `type` | Purpose |
|---|---|
| `hero` | Full-viewport hero with heading, CTAs |
| `content` | About-style text blocks, facts, CTA |
| `cards` | Expertise / skills grid (uses card icons) |
| `projects` | Featured projects from database |
| `timeline` | Education / experience timeline |
| `contactDetails` | Contact info cards |
| `form` | Contact form fields |
| `cta` | Closing call-to-action block |

Home page uses variants: `content` → `home`, `cards` → `home`, `projects` → `home`, `cta` → `home`.

---

## API reference

Import the Postman collection from `postman/` for ready-made requests.

### Authentication

| Route group | Header |
|---|---|
| Admin | `Authorization: Bearer <ADMIN_SECRET>` |
| Revalidate | `Authorization: Bearer <REVALIDATE_SECRET>` |

### Public routes

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/projects` | List all published projects |
| `GET` | `/api/projects/[slug]` | Get one project by slug |
| `GET` | `/api/settings` | Get full site settings object |
| `GET` | `/api/settings/[key]` | Get one setting (key without `site.` prefix) |

### Admin routes

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/admin/projects` | Create project |
| `PUT` | `/api/admin/projects/[slug]` | Update project (partial body OK) |
| `DELETE` | `/api/admin/projects/[slug]` | Delete project |

**Create project — required fields:** `slug`, `title`, `category`, `description`, `icon`

**Optional fields:** `image`, `imageAlt`, `contentHtml`, `featured`, `published`, `order`, `tags`

```json
{
  "slug": "my-new-project",
  "title": "My New Project",
  "category": "Machine Learning and Predictive Analytics",
  "description": "Short summary for cards.",
  "icon": "code",
  "image": "/images/project.webp",
  "imageAlt": "My new project",
  "contentHtml": "<h2>Overview</h2><p>Full write-up here.</p>",
  "featured": false,
  "published": true,
  "order": 10,
  "tags": ["Python", "TensorFlow", "Flask"]
}
```

### Cache revalidation

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/revalidate` | Revalidate cached project/settings data |

```json
{ "slug": "ai-career-prediction-system" }
```

Or revalidate by tags:

```json
{ "tags": ["projects", "settings"] }
```

Admin project writes trigger revalidation automatically.

---

## Theme

- Default theme is **dark mode**
- Users can toggle light/dark via the header; preference is saved in `localStorage`
- CSS variables in `src/app/globals.css` drive all themed colors (`--background`, `--foreground`, `--muted`, `--surface`, card surfaces, etc.)

---

## Deploy on Vercel

1. Push to GitHub and import in [Vercel](https://vercel.com/new)
2. Set environment variables: `DATABASE_URL`, `TURSO_AUTH_TOKEN`, `REVALIDATE_SECRET`, `ADMIN_SECRET`
3. Deploy — build runs schema sync + `next build`

### Edit live data

```bash
npm run db:studio
```

Or use the Postman collection in `postman/`.

---

## Project structure

| Path | Purpose |
|---|---|
| `backups/` | Archived local SQLite snapshot (not used at runtime) |
| `data/` | `portfolio-content.json` (pages) + `site-defaults.json` (seed) |
| `prisma/` | Schema, migrations, seed scripts |
| `postman/` | API collection + environments |
| `public/` | Static assets (images, resume PDF) |
| `src/app/` | Next.js pages and API routes |
| `src/components/` | UI components |
| `src/lib/db/` | Prisma client, queries, mappers |
| `src/lib/project-image.ts` | Image URL validation helpers |
| `src/types/` | TypeScript types for content and projects |
