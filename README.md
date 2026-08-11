# Revamp v2

Next.js 16 (App Router) + React 19 + Tailwind CSS 4 portfolio redesign.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env` locally with:

```bash
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-key
```

## Content

Page/section copy lives in JSON under `src/content/`:

```
src/content/
  site.json
  shared/nav.json
  shared/contact.json
  home/hero.json
  about/about.json
  about/media.json
  about/capabilities.json
  about/experience.json
  projects/featured.json
  projects/hero.json
  contact/hero.json
```

Edit those files to update site content. Loaders live in `src/lib/site.ts`.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |
