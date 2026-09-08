<div align="center">

# Abdedaym Chakra — Portfolio

**Aspiring Data & AI Engineer** · Software Engineering · Cloud · DevOps

A personal portfolio built as a production system rather than a template:
statically generated, zero-dependency at runtime, accessible, and fast.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-087EA4?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](#license)

</div>

---

## Overview

A single-page portfolio presenting engineering experience, projects as short
case studies, capabilities, and recognition. Every piece of content lives in
typed data files under `src/data/`, so updating the site never means touching
a component.

The site is fully static — no database, no backend, no external API, and no
environment variable is required for it to run or deploy.

**New here? Read [`guide.txt`](./guide.txt)** — a complete, non-technical,
step-by-step manual covering local setup, editing content, adding images, and
deploying to Vercel.

---

## Features

### Content & structure
- **Centralised content layer** — name, bio, experience, projects, skills,
  achievements and certifications each live in one typed file.
- **Projects as case studies** — every project opens a focus-trapped drawer
  with The Challenge, The Solution, Architecture, Key Features, Impact, the
  full stack, and links.
- **Honest skills presentation** — grouped by engineering domain, with no
  progress bars, no percentages and no invented proficiency ratings.
- **Graceful asset fallbacks** — a missing profile photo renders a designed
  monogram, and a project without a screenshot renders original generated
  artwork. The site never shows a broken image, and never requests a file that
  is known at build time to be absent.

### Interface
- **Original hero visual** — an animated `DATA → AI → SOFTWARE → CLOUD` system
  graph drawn on a 2D canvas. One rAF loop, DPR capped at 2, suspended while
  offscreen, and reduced to a single static frame under reduced-motion.
- **Command palette** — `⌘K` / `Ctrl+K` opens keyboard-driven search across
  sections, projects, links and actions.
- **Generated project artwork** — six deterministic inline SVGs, each
  abstracting the real subject of its project (an NDVI raster, a Kubernetes
  cluster, a classification flow). No stock imagery, no licensing questions,
  no network requests.
- **Dark and light themes** — both fully designed, not inverted. Applied
  before first paint, so there is no flash; persisted in `localStorage`.
- **Scroll-spy navigation**, an animated timeline spine, a reading-progress
  bar, and a full-screen mobile menu.

### Engineering
- **No-JS resilient** — entrance animations are CSS transitions scoped to a
  `.js` class set before first paint, so the complete page renders with
  JavaScript disabled. Nothing ships at `opacity: 0`.
- **Accessible** — semantic landmarks, a skip link, visible focus rings,
  focus trapping in dialogs, ARIA labelling, and full `prefers-reduced-motion`
  support. **0 axe-core violations** across dark/light × desktop/mobile.
- **SEO** — per-route metadata, Open Graph and Twitter cards, a build-time
  generated OG image, `schema.org/Person` JSON-LD, `sitemap.xml`, `robots.txt`
  and a canonical URL.
- **Fast** — ~92 KB transferred on first load, **CLS 0.000**, LCP ~0.5 s
  locally, 15 requests. Fonts self-hosted via `next/font`; images served as
  AVIF/WebP by `next/image`.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router) | Static generation, image and font optimisation, first-class Vercel support |
| UI | **React 19** | Server Components keep most sections out of the client bundle |
| Language | **TypeScript 5.9** (strict) | Content files are type-checked, so a malformed entry fails the build instead of the page |
| Styling | **Tailwind CSS 4** | CSS-first config; semantic design tokens that flip with the theme |
| Animation | **Framer Motion** | Only where it earns its place: palette, drawer, mobile menu, nav indicator, scroll progress, timeline spine |
| Icons | **Lucide React** | Consistent, tree-shaken |

No UI kit, no CSS-in-JS runtime, no state library, no analytics, no tracking.

---

## Project Structure

```
.
├── guide.txt                    Complete non-technical setup & deploy manual
├── public/
│   ├── documents/               CV PDF served by the download buttons
│   └── images/
│       ├── profile/             profile.jpg (4:5 portrait)
│       ├── projects/            Optional project screenshots
│       └── achievements/        Optional achievement images
└── src/
    ├── app/
    │   ├── layout.tsx           Shell: fonts, metadata, JSON-LD, providers
    │   ├── page.tsx             Section order
    │   ├── globals.css          Design tokens, primitives, motion, print
    │   ├── icon.svg             Favicon
    │   ├── opengraph-image.tsx  Social card, generated at build time
    │   ├── sitemap.ts           /sitemap.xml
    │   ├── robots.ts            /robots.txt
    │   └── not-found.tsx        404
    ├── components/
    │   ├── sections/            Hero, About, Experience, Projects, Skills,
    │   │                        Achievements, Contact + project drawer
    │   ├── layout/              Navbar, CommandPalette, ThemeProvider,
    │   │                        ThemeToggle, ScrollProgress, Footer
    │   ├── ui/                  Button, Section, Reveal, ProfileImage
    │   └── visuals/             SystemGraph (canvas), ProjectVisual (SVG),
    │                            AmbientBackdrop
    ├── data/                    ← ALL CONTENT LIVES HERE
    │   ├── personal.ts          Name, title, headline, bio, links, CV path
    │   ├── experience.ts        Internships
    │   ├── education.ts         Degrees
    │   ├── projects.ts          Projects + full case studies
    │   ├── skills.ts            Skill domains, languages
    │   ├── achievements.ts      Competitions, community
    │   ├── certifications.ts    Credentials
    │   └── navigation.ts        Menu items (drives nav, scroll-spy, palette)
    ├── lib/                     hooks, utils, icon map, SEO config, assets
    └── types/                   Shared type definitions for all data
```

---

## Getting Started

**Requirements:** Node.js **20.9+** and npm.

```bash
git clone git@github.com:CHAKRAbdedaym/My_Portfolio.git
cd My_Portfolio
npm install
npm run dev
```

Open <http://localhost:3000>.

---

## Development

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Production build — run this before every push |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint (flat config, `eslint-config-next`) |
| `npm run typecheck` | `tsc --noEmit` — the fastest way to validate data edits |

---

## Customization

Everything below is a data edit. No component needs to be touched.

| I want to change… | Edit |
|---|---|
| Name, title, headline, bio, email, social links | `src/data/personal.ts` |
| Internships and jobs | `src/data/experience.ts` |
| Degrees | `src/data/education.ts` |
| Projects and their case studies | `src/data/projects.ts` |
| Skill domains and technologies | `src/data/skills.ts` |
| Competitions and community roles | `src/data/achievements.ts` |
| Certifications | `src/data/certifications.ts` |
| Menu items and section order | `src/data/navigation.ts` + `src/app/page.tsx` |
| Colours, typography, spacing | `src/app/globals.css` (tokens at the top) |

### Images

| Asset | Location | Recommended |
|---|---|---|
| Profile photo | `public/images/profile/profile.jpg` | 1200 × 1500 (4:5), `.jpg`, < 400 KB |
| Project screenshot | `public/images/projects/<name>.png` | 1600 × 1000 (16:10), < 500 KB |
| CV | `public/documents/Abdedaym-Chakra-CV.pdf` | < 1 MB |

Reference a screenshot from a project by uncommenting its `image` field in
`src/data/projects.ts`:

```ts
image: "/images/projects/agrisure.png",
```

Paths always start at `/images/…`, never `/public/images/…`. Filenames are
case-sensitive on Linux and on Vercel.

Every image is optional. A missing profile photo renders a monogram; a missing
screenshot renders the project's generated artwork.

### Theme

All colours are CSS custom properties defined once at the top of
`src/app/globals.css`, in two blocks: `:root` for dark (the default) and
`:root.light` for light. Utilities consume them through Tailwind's `@theme
inline`, so changing a token re-themes the entire site coherently. Change both
blocks together, and keep text at a contrast ratio of at least 4.5:1.

---

## Environment Variables

**None are required.** The site builds, runs and deploys with no configuration.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL for metadata, Open Graph, `sitemap.xml` and `robots.txt` |

Resolution order: `NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL`
(injected automatically by Vercel) → `http://localhost:3000`.

Set it only when using a custom domain:

```bash
cp .env.example .env.local
# NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

`.env.local` is git-ignored. Never commit secrets.

---

## Build

```bash
npm run lint
npm run typecheck
npm run build
```

All routes prerender as static content:

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /icon.svg
├ ○ /opengraph-image
├ ○ /robots.txt
└ ○ /sitemap.xml
```

---

## Deployment on Vercel

The repository is already connected to GitHub, so deployment is an import.

1. Sign in to [vercel.com](https://vercel.com) **with GitHub**.
2. **Add New → Project**, then **Import** the existing `My_Portfolio` repo.
3. Vercel detects **Next.js** automatically — leave the defaults:
   - Build Command `npm run build`
   - Install Command `npm install`
   - Output Directory `.next`
   - Node.js 20.x or newer
4. Skip environment variables (none are needed).
5. **Deploy**.

After the first deployment, every `git push` to `main` redeploys production
automatically; pushes to other branches produce isolated preview URLs. A failed
build never replaces the live site.

Step-by-step screenshots-level detail — including custom domains and
troubleshooting — is in [`guide.txt`](./guide.txt), sections 15–19.

---

## Accessibility & Performance

Verified with axe-core and the Chrome performance APIs against the production
build:

| Check | Result |
|---|---|
| axe-core violations (dark / light × desktop / mobile) | **0** |
| Cumulative Layout Shift | **0.000** |
| Largest Contentful Paint (local, production build) | **~0.5 s** |
| Transferred on first load | **~92 KB** |
| Requests | **15** |
| Horizontal overflow | **none**, at 390 px and 1440 px |
| Renders with JavaScript disabled | **yes**, in full |
| `prefers-reduced-motion` | fully honoured; no element left mid-transition |

---

## License

MIT — see below.

The **code** is MIT licensed and free to reuse. The **content** (biography,
project descriptions, CV, photograph and personal branding) belongs to
Abdedaym Chakra. If you fork this as a starting point for your own portfolio,
please replace everything in `src/data/` and `public/` with your own.

```
MIT License

Copyright (c) 2026 Abdedaym Chakra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

**Abdedaym Chakra**
[GitHub](https://github.com/CHAKRAbdedaym) ·
[LinkedIn](https://www.linkedin.com/in/chakra-abdedaym) ·
[chakraabdedaym@gmail.com](mailto:chakraabdedaym@gmail.com)

</div>
