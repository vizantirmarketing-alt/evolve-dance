# Evolve Dance Center — Web Property

Source code for [evolvedancecenter.com](https://www.evolvedancecenter.com), the website for Evolve Dance Center, a premium dance studio in Las Vegas. Built with Next.js, TypeScript, Tailwind CSS, and Sanity CMS.

---

## Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| CMS | Sanity v5 (Studio at `/studio`) |
| Hosting | Vercel |
| Class schedule | Jackrabbit Class (Openings API) |
| Enrollment | Jackrabbit Class (external) |
| Transactional email | Resend |
| Bot protection | Cloudflare Turnstile |
| Animation | Framer Motion |

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Install

```bash
git clone https://github.com/vizantirmarketing-alt/evolve-dance.git
cd evolve-dance
pnpm install
```

### Environment

Copy `.env.example` to `.env.local` and fill in all required values. The dev server reads env vars only on boot — restart after any change.

```bash
cp .env.example .env.local
```

### Run

```bash
pnpm dev
```

The site runs at [http://localhost:3000](http://localhost:3000). Sanity Studio runs at [http://localhost:3000/studio](http://localhost:3000/studio) and requires authentication.

---

## Project Structure

```
app/                  # Next.js App Router pages and API routes
components/           # Reusable UI components (sections, layout, forms)
data/                 # Typed site content (classes, styles, navigation)
docs/                 # Development guidelines and reference
lib/                  # Utilities, Jackrabbit client, SEO, JSON-LD
public/               # Static assets (logo, photography, founders)
sanity/               # Sanity schema types, queries, and structure
scripts/              # Operational and seed scripts
styles/               # Global CSS and design tokens
types/                # Shared TypeScript types
```

---

## Architecture

### Content management

Dynamic content (faculty, FAQs, events, blog, testimonials, studio hours, The Project page, gallery) lives in Sanity. Static marketing copy and class/style definitions live in `data/`.

Pages use time-based ISR (`export const revalidate = …`) so content refreshes on a schedule without a deploy. On-demand revalidation via Sanity webhook is documented in `docs/EVOLVE_DEVELOPMENT_GUIDELINES.md` but not yet implemented.

| Source | Examples | Updated via |
|---|---|---|
| Sanity | Faculty, FAQs, events, blog, testimonials, gallery | Studio at `/studio` |
| Code | Site copy, class styles, navigation | Edit `data/*.ts`, commit, deploy |
| Jackrabbit | Live class openings and schedule | Studio manager in Jackrabbit |

Sanity content is fetched at build/revalidation time using the public dataset — no read token required. The write token is only used by local seeding and maintenance scripts.

### Class schedule and enrollment

Live class data is fetched from the Jackrabbit Class Openings API (`lib/jackrabbit.ts`) and cached with a 5-minute revalidation window. Enrollment CTAs link to the Jackrabbit registration URL configured in `NEXT_PUBLIC_JACKRABBIT_ENROLL_URL`.

### Forms

Two public forms send email via Resend:

| Form | Page | API route |
|---|---|---|
| Contact | `/contact` | `POST /api/contact` |
| Free trial | `/free-trial` | `POST /api/free-trial` |

Both verify Cloudflare Turnstile when `TURNSTILE_SECRET_KEY` is set. Site key is exposed to the client via `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.

### SEO and indexing

Production indexing is gated by `NEXT_PUBLIC_PRODUCTION_HOST` and `VERCEL_ENV === 'production'` (`lib/seo.ts`). Preview and staging deployments stay `noindex` until the production host env var is set at cutover.

---

## Scripts

Write-capable scripts require `SANITY_API_WRITE_TOKEN` in `.env.local`.

| Command | Description |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Production build |
| `pnpm start` | Run production build locally |
| `pnpm lint` | Lint check |
| `pnpm upload:gallery` | Upload project gallery images to Sanity |
| `pnpm seed:events` | Seed events into Sanity |
| `pnpm delete:unpublished-blog:dry` | Dry run: list unpublished blog posts |
| `pnpm delete:unpublished-blog` | Delete unpublished blog posts from Sanity. Run :dry first to preview. |

Additional one-off scripts in `scripts/` (faculty seeding, photo updates, policy fixes) are run directly with `node` or `tsx` and load `.env.local` via `dotenv`.

---

## Content Updates

### Sanity content

Edit directly in Studio at `/studio`. Changes appear after the page's ISR window expires (typically 60–3600 seconds depending on route).

### Code-driven content

Edit files in `data/` (`site.ts`, `classes.ts`, `styles.ts`, `navigation.ts`) and redeploy.

### Blog

Blog posts are managed in Sanity. Use `pnpm delete:unpublished-blog:dry` to audit drafts before cleanup.

### Project gallery

Place source images in the gallery directory expected by `scripts/upload-project-gallery.ts`, then run `pnpm upload:gallery`.

---

## Deployment

Deployed automatically to Vercel on push to `main`. Environment variables must be configured in the Vercel project settings — `.env.local` is not deployed.

Set `NEXT_PUBLIC_PRODUCTION_HOST=evolvedancecenter.com` in Vercel production only when DNS is pointed at the live domain.

---

## Conventions

- Commit per file: `git add <file>` then commit. Never `git add .` for shared work.
- Never chain git commands with `&&`.
- Section components live in `components/sections/`; layout in `components/layout/`.
- See `docs/EVOLVE_DEVELOPMENT_GUIDELINES.md` for design system, animation rules, and AI safety blocks.

---

## License

This source code is provided for portfolio review and reference only. See LICENSE for full terms.
