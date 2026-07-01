# Evolve Dance Center — Development Guidelines

Last updated: July 2026

Technical reference for the Evolve Dance Center website codebase. Defines project structure, conventions, and implementation rules for new features.

---

## 1. Core Rules

- Follow the folder structure in section 3.
- Put page sections in `components/sections/`. One section per file.
- Put shared layout in `components/layout/` and reusable UI in `components/ui/`.
- Do not combine unrelated code in a single file.
- Keep naming consistent (e.g. `VideoHeroSection.tsx`, `ClassFinder.tsx`, `ScheduleSection.tsx`).
- Use the `@/` alias for all absolute imports.
- This is a **Next.js 16 App Router** project. Routes live under `app/`.
- Use **Framer Motion** for entrance animations and filter transitions.
- Use **Intersection Observer** for scroll-triggered reveals via `RevealOnScroll` (`components/sections/RevealOnScroll.tsx`) or the local `useReveal` pattern in `HomeSections.tsx`. Do not add GSAP.
- **Sanity CMS** is the source for dynamic content (faculty, FAQs, events, blog, testimonials, studio hours, gallery).
- Static marketing copy and class/style definitions live in `data/`.
- Live class schedule data comes from the **Jackrabbit Class Openings API** (`lib/jackrabbit.ts`).
- Define shared types in `types/` or dedicated type files. Do not inline interfaces in components.

---

## 2. Design System

### Overview

- Light cream background with teal accent (`#0ABAB5`).
- **Playfair Display** for headings. **DM Sans** for body text, labels, and navigation.
- Angled clip-path buttons, teal underline hovers, and CSS-based scroll reveals.
- Framer Motion for hero entrance and filter transitions only. Scroll reveals use CSS + Intersection Observer.

### Color palette

CSS variables in `styles/globals.css`:

```css
:root {
  --teal:        #0ABAB5;
  --teal-hover:  #087876;
  --teal-soft:   #81D8D0;
  --teal-light:  #D4F1EF;
  --teal-glow:   rgba(10, 186, 181, 0.18);
  --teal-faint:  rgba(10, 186, 181, 0.06);
  --background:  #F7F5F1;
  --bg-warm:     #FCFBF8;
  --bg-mint:     #D4F1EF;
  --foreground:  #1F1F1C;
  --muted:       #5F5E59;
  --subtle:      #6D6C67;
  --border:      #D6DFDA;
  --project:     #173432;
}
```

Tailwind extends these in `tailwind.config.ts` under `theme.extend.colors`.

### Typography

| Role    | Font             | Weights            | Usage                         |
|---------|------------------|--------------------|-------------------------------|
| Display | Playfair Display | 400, 700, 900      | Headings, hero titles         |
| Display | Playfair Display | italic 400, 700    | Italic accent words in titles |
| Body    | DM Sans          | 300, 400, 500, 600 | Body, labels, nav, buttons    |

Load fonts in `app/layout.tsx` via `next/font/google`. Do not use `@import` in CSS.

```tsx
import { Playfair_Display, DM_Sans } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})
```

### Typography scale

| Element       | Size                        | Weight | Letter spacing |
|---------------|-----------------------------|--------|----------------|
| Hero title    | clamp(40px, 5vw, 64px)     | 700    | tight          |
| Section H2    | clamp(28px, 3.5vw, 42px)   | 700    | tight          |
| Eyebrow label | 11–12px                     | 500    | 0.22em         |
| Body text     | 15–16px                     | 300    | —              |
| Nav links     | 11–12px                     | 400    | 0.14–0.18em    |
| Button text   | 11–12px                     | 500    | 0.15em         |

### Visual elements

- **Clip-path buttons:** `polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)` — class `.clip-btn` in `globals.css`
- **Teal text glow:** class `.teal-glow-text` in `globals.css`
- **Teal underline on hover:** class `.teal-underline` in `globals.css`
- **Scan lines texture:** class `.scan-lines` — `repeating-linear-gradient` overlay
- **Animated grid background:** class `.animated-grid` — 60px grid with `gridSlide` keyframe
- **The Project pages:** use `--project` (`#173432`) as the dark surface color

---

## 3. Folder Structure

```
evolve-dance/
├─ app/
│   ├─ layout.tsx                    # Root layout — fonts, metadata, SEO
│   ├─ page.tsx                      # Homepage
│   ├─ about/
│   ├─ classes/
│   ├─ schedule/                     # Live Jackrabbit schedule
│   ├─ faculty/
│   ├─ the-project/
│   │   └─ gallery/
│   ├─ free-trial/
│   ├─ contact/
│   ├─ events/
│   ├─ blog/
│   │   └─ [slug]/
│   ├─ faq/
│   ├─ policies/
│   ├─ privacy/
│   ├─ media-usage/
│   ├─ sitemap/
│   ├─ studio/[[...tool]]/           # Sanity Studio
│   └─ api/
│       ├─ contact/
│       └─ free-trial/
│
├─ components/
│   ├─ layout/
│   │   ├─ Navbar.tsx                # Wrapper around Nav
│   │   └─ Footer.tsx
│   ├─ ui/
│   │   └── Button.tsx
│   ├─ sections/
│   │   ├─ VideoHeroSection.tsx
│   │   ├─ HeroSection.tsx
│   │   ├─ HomeSections.tsx          # Homepage sections (except schedule, testimonials)
│   │   ├─ ScheduleSection.tsx
│   │   ├─ ScheduleFilters.tsx
│   │   ├─ ScheduleTabs.tsx
│   │   ├─ TestimonialsSection.tsx
│   │   ├─ TestimonialsHero.tsx
│   │   └─ RevealOnScroll.tsx
│   ├─ ClassFinder.tsx
│   ├─ ClassFinderFilters.tsx
│   ├─ ClassCard.tsx
│   ├─ StyleCard.tsx
│   ├─ Nav.tsx
│   └─ ...
│
├─ data/
│   ├─ site.ts                       # Site config, contact info, social links
│   ├─ classes.ts                    # Static class finder data
│   ├─ styles.ts                     # Dance style definitions
│   └─ navigation.ts                 # Nav link definitions
│
├─ lib/
│   ├─ jackrabbit.ts                 # Jackrabbit Openings API client
│   ├─ seo.ts                        # Production indexing gate
│   ├─ dance-school-jsonld.ts        # JSON-LD builder
│   └─ utils.ts                      # cn() Tailwind merge utility
│
├─ sanity/
│   ├─ schemas/                      # Sanity document types
│   ├─ lib/
│   │   ├─ client.ts
│   │   ├── queries.ts
│   │   └── image.ts
│   └── env.ts
│
├─ types/                            # Shared TypeScript types
├─ styles/
│   └── globals.css                  # CSS variables, reveal animations, utilities
├─ public/                           # Static assets
├─ scripts/                          # Operational and seed scripts
├─ tailwind.config.ts
├─ next.config.ts                    # Image domains + Wix 301 redirects
└─ package.json
```

---

## 4. Signature Interactions

### 1. Video hero (`components/sections/VideoHeroSection.tsx`)

- Full-width video background on desktop (`min-h-[calc(100vh-80px)]`). Poster/static layout on mobile.
- Video: `autoPlay`, `muted`, `loop`, `playsInline`, `object-cover`.
- Mute/unmute and play/pause controls on desktop.
- Lightbox for full video playback on "Watch the Studio" click.
- Framer Motion stagger for hero content entrance.
- Stats strip at bottom of hero section.

### 2. Scroll reveal (`styles/globals.css` + `RevealOnScroll`)

Use `RevealOnScroll` for section content. Pattern:

```tsx
// components/sections/RevealOnScroll.tsx
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, visible }
}
```

```css
/* styles/globals.css */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible { opacity: 1; transform: translateY(0); }
```

On viewports below 768px, reveals are disabled (content shows immediately).

### 3. Class finder (`components/ClassFinder.tsx`)

- Static class list from `data/classes.ts`.
- Client-side filtering by style, day, level, and age. No API calls.
- Filters are combinable.
- Wrap filtered results in `AnimatePresence` for transitions.
- Empty state with reset action when no matches.
- Live schedule with openings is on `/schedule` via Jackrabbit, not this component.

### 4. Faculty preview (`components/sections/HomeSections.tsx` → `InstructorsSection`)

- Faculty data fetched from Sanity at page build time.
- Desktop: horizontal flex strip of photo cards with equal width.
- Hover: image scale, top teal bar scales in (`scale-x-0` → `scale-x-100`).
- Mobile: stacked layout.
- Final card links to `/faculty`.

### 5. Style ticker (`components/sections/HomeSections.tsx` → `TickerSection`)

- Continuous horizontal scroll, seamless loop.
- Content repeated 3× for loop continuity.
- 25s animation duration (`ticker` keyframe in `tailwind.config.ts`).
- Teal background, white uppercase text.

---

## 5. Page Structure

### `app/page.tsx` (homepage)

```tsx
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import VideoHeroSection from '@/components/sections/VideoHeroSection'
import {
  TickerSection,
  AboutSection,
  WhyFamiliesChooseSection,
  ClassesSection,
  InstructorsSection,
  EnrollSection,
} from '@/components/sections/HomeSections'
import ScheduleSection from '@/components/sections/ScheduleSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'

export default async function HomePage() {
  // Fetches studioHours and facultyPreview from Sanity
  return (
    <>
      <Navbar />
      <main>
        <VideoHeroSection
          videoSrc="/videos/hero.mp4"
          videoFallback="/videos/hero.webm"
          posterSrc="/images/hero-poster.jpg"
        />
        <TickerSection />
        <AboutSection />
        <WhyFamiliesChooseSection />
        <ClassesSection />
        <ScheduleSection />
        <InstructorsSection faculty={facultyPreview} />
        <TestimonialsSection />
        <EnrollSection />
      </main>
      <Footer />
    </>
  )
}
```

### `app/classes/page.tsx`

Renders `ClassFinder`, style grid from `data/styles.ts`, and combo callout. No additional wrapper component.

### `app/schedule/page.tsx`

Server component. Fetches live classes from `getJackrabbitClasses()` in `lib/jackrabbit.ts`. Revalidates every 300 seconds.

### `app/layout.tsx`

- Load fonts via `next/font/google`.
- Import `styles/globals.css`.
- Inject JSON-LD via `buildDanceSchoolJsonLd()` where applicable.
- Gate indexing with `isProductionDomain()` from `lib/seo.ts`.

---

## 6. Component Specifications

### Navigation (`components/Nav.tsx` via `components/layout/Navbar.tsx`)

| Property   | Value                                              |
|------------|----------------------------------------------------|
| Position   | Fixed, top: 0, z-index: 50                         |
| Background | `bg-background`, blur on scroll                    |
| Logo       | Image from `/logo/evolve-navbar.png`               |
| Links      | From `data/navigation.ts`, uppercase, tracked    |
| CTA        | Enroll link to Jackrabbit URL                      |
| Mobile     | Hamburger → full-screen overlay menu             |

### VideoHeroSection

| Property      | Value                                              |
|---------------|----------------------------------------------------|
| Height        | `min-h-[640px]` mobile; `min-h-[calc(100vh-80px)]` desktop |
| Video         | autoPlay, muted, loop, playsInline on desktop only |
| Primary CTA   | Links to `/free-trial`                             |
| Secondary CTA | Opens video lightbox                               |
| Stats strip   | Three stat items at bottom                         |

### ClassFinder

| Property      | Value                                              |
|---------------|----------------------------------------------------|
| Data source   | `data/classes.ts`                                  |
| Filters       | Style, day, level, age                             |
| Transitions   | Framer Motion `AnimatePresence`                    |
| Surface prop  | `'light'` or `'dark'` for text color variants      |

### Footer (`components/layout/Footer.tsx`)

| Property | Value                                              |
|----------|----------------------------------------------------|
| Data     | Contact and social links from `data/site.ts`       |
| Columns  | Brand, classes, studio, contact                    |
| Social   | Instagram, Facebook, TikTok, YouTube               |

---

## 7. Routing and Redirects

Old Wix URLs redirect in `next.config.ts`. Do not remove these.

| Old Wix URL                     | New destination                          |
|---------------------------------|------------------------------------------|
| `/the-center-1`                 | `/about`                                 |
| `/copy-of-news`                 | `/about#calendar`                        |
| `/copy-of-2024-summer-schedule` | `/schedule`                              |
| `/copy-of-register`             | Jackrabbit enroll URL                    |
| `/copy-of-policies`             | `/about#dress-code`                      |
| `/services-4`                   | `/classes`                               |
| `/tuition`                      | Jackrabbit enroll URL                    |
| `/the-faculty`                  | `/faculty`                               |
| `/newsletter`                   | `/about#news`                            |
| `/about-3`                      | `/the-project`                           |
| `/about-us`                     | `/about`                                 |
| `/register`                     | Jackrabbit enroll URL                    |

Enrollment redirects use `NEXT_PUBLIC_JACKRABBIT_ENROLL_URL`.

---

## 8. Sanity CMS

### Client

Sanity client lives in `sanity/lib/client.ts` using `next-sanity`:

```ts
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})
```

### Environment variables

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

Write-capable scripts require `SANITY_API_WRITE_TOKEN` in `.env.local`.

### Schemas (`sanity/schemas/`)

| Schema          | Purpose                                      |
|-----------------|----------------------------------------------|
| `faculty`       | Instructor profiles                          |
| `faq`           | FAQ entries                                  |
| `event`         | Studio events                                |
| `blogPost`      | Blog posts                                   |
| `testimonial`   | Parent/dancer testimonials                   |
| `studioHours`   | Regular and special hours                    |
| `theProject`    | Competitive team page content                |
| `projectGallery`| Project gallery images                       |
| `category`      | Blog categories                              |

### Content sources

| Content type        | Source   | Updated via              |
|---------------------|----------|--------------------------|
| Faculty, FAQs, blog | Sanity   | Studio at `/studio`      |
| Site copy, styles   | `data/`  | Edit files, commit, deploy |
| Live schedule       | Jackrabbit | Studio manager in Jackrabbit |

Pages use time-based ISR (`export const revalidate = …`). On-demand revalidation via Sanity webhook is documented here but not yet implemented.

---

## 9. Animation Specifications

### Framer Motion — hero entrance only

```tsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
}
```

### Scroll reveals — all other sections

Use `RevealOnScroll` or the local `Reveal` wrapper in `HomeSections.tsx`. Do not use Framer Motion for scroll reveals outside the hero.

### Filter transitions — ClassFinder

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={filterKey}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {/* filtered results */}
  </motion.div>
</AnimatePresence>
```

### Keyframes (`tailwind.config.ts`)

| Name        | Used for                          |
|-------------|-----------------------------------|
| `pulseDot`  | Animated dots                     |
| `ticker`    | Style ticker strip                |
| `gridSlide` | Animated grid backgrounds         |
| `orbFloat`  | Hero fallback orbs                |
| `ringPulse` | Ring animation on hero fallback   |

---

## 10. Asset Requirements

### Hero video (`/public/videos/hero.mp4`)

| Property   | Value                              |
|------------|------------------------------------|
| Resolution | 1920×1080 minimum                |
| Duration   | 15–30 seconds, loops cleanly       |
| Format     | MP4 (H.264) + WebM fallback        |
| File size  | Target 8–15 MB after compression   |
| Audio      | Remove (muted playback)            |

Compression:

```bash
ffmpeg -i input.mp4 \
  -vcodec libx264 -crf 23 -preset slow \
  -an \
  -vf "scale=1920:-1" \
  -movflags +faststart \
  public/videos/hero.mp4
```

The `-movflags +faststart` flag is required for progressive playback.

### Instructor headshots

| Property | Value                               |
|----------|-------------------------------------|
| Source   | Sanity (`faculty` documents) or `/public/images/instructors/` |
| Format   | JPG or WebP                         |
| Size     | 800×1000px minimum (portrait)       |
| Naming   | `firstname-lastname.jpg`            |

### Gallery images

- Managed in Sanity (`projectGallery` schema) or `/public/images/gallery/`
- Minimum 1200px wide
- Naming: `season-9-recital-01.jpg`

---

## 11. Responsive Breakpoints

| Breakpoint  | Changes                                        |
|-------------|------------------------------------------------|
| `lg` 1024px | Nav: desktop links hidden, hamburger shown     |
| `md` 768px  | Grid layouts → single column; scroll reveals disabled |
| `sm` 640px  | Typography scales; tables scroll horizontally  |

### Mobile rules

```css
/* Ticker must not break layout */
overflow: hidden;

/* Schedule table scrolls horizontally on small screens */
min-width on table wrapper as needed;

/* Faculty strip stacks vertically below 768px */
@media (max-width: 768px) {
  flex-direction: column;
}
```

---

## 12. Debugging Reference

| Problem                      | Check                                           |
|------------------------------|-------------------------------------------------|
| Video not playing            | `/public/videos/hero.mp4`, `-movflags +faststart` |
| Scroll reveals not firing    | `RevealOnScroll` threshold; element height      |
| Class finder filters wrong   | `data/classes.ts`, `matchesFilters()` logic     |
| Schedule empty or stale      | `lib/jackrabbit.ts`, `JACKRABBIT_ORG_ID` env    |
| Framer Motion layout shift   | Wrap `AnimatePresence` with `mode="wait"`       |
| Teal color mismatch          | `--teal` in `globals.css`, `tailwind.config.ts` |
| Fonts not loading            | `--font-playfair` / `--font-dm-sans` on `<html>` |
| Redirects not working        | `next.config.ts` redirects array                |
| Sanity data missing          | Env vars, `sanity/lib/queries.ts`               |
| Tailwind classes missing     | `content` array in `tailwind.config.ts`           |
| `@/` alias broken            | `tsconfig.json` paths: `"@/*": ["./*"]`          |
| Forms failing                | `RESEND_API_KEY`, Turnstile keys in `.env.local` |
| Site indexed on preview      | `NEXT_PUBLIC_PRODUCTION_HOST`, `lib/seo.ts`     |

---

## 13. Quality Checklist

Before considering a page complete:

### Global

- [ ] Nav scroll state and mobile menu work
- [ ] All `Link`/`SmartLink` hrefs resolve to valid routes
- [ ] All Wix redirect URLs resolve correctly
- [ ] Footer contact info matches `data/site.ts`
- [ ] Social links open correct profiles

### Homepage

- [ ] Hero video plays on desktop (poster/static layout on mobile)
- [ ] Mute/unmute and play/pause controls work
- [ ] Video lightbox opens and plays
- [ ] Stats strip renders
- [ ] Ticker scrolls continuously without gap
- [ ] Homepage sections reveal on scroll (desktop)
- [ ] Faculty preview cards link to `/faculty`

### Classes page

- [ ] Style, day, level, and age filters work individually
- [ ] Combined filters work simultaneously
- [ ] Empty state renders when no results
- [ ] Style grid cards render from `data/styles.ts`

### Schedule page

- [ ] Jackrabbit classes load and display
- [ ] Category and day filters work
- [ ] Empty/error state handled when API unavailable

### All pages

- [ ] Page metadata (title, description) is unique per route
- [ ] No layout shift on load
- [ ] No console errors
- [ ] Images use `next/image` with `alt` text
- [ ] Sanity queries handle null/empty results

---

## 14. Deployment

Deployed to Vercel on push to `main`. `.env.local` is not deployed — configure variables in the Vercel project settings.

| Setting         | Value           |
|-----------------|-----------------|
| Framework       | Next.js         |
| Node version    | 20.x            |
| Build command   | `pnpm build`    |
| Install command | `pnpm install`  |

### Required environment variables

```
NEXT_PUBLIC_PRODUCTION_HOST
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
NEXT_PUBLIC_JACKRABBIT_ENROLL_URL
JACKRABBIT_ORG_ID
RESEND_API_KEY
RESEND_FROM_EMAIL
EVOLVE_INBOX_EMAIL
NEXT_PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
```

Set `NEXT_PUBLIC_PRODUCTION_HOST=evolvedancecenter.com` in Vercel production only when DNS points at the live domain. Preview deployments stay `noindex` until then.

### Domain

- Primary: `evolvedancecenter.com`
- `www.evolvedancecenter.com` redirects to apex

### Google Tag Manager (optional)

GTM is not installed by default. To add it, inject scripts in `app/layout.tsx` via `next/script` with `strategy="afterInteractive"`:

```tsx
import Script from 'next/script'

<Script src="https://www.googletagmanager.com/gtag/js?id=GTM-XXXXXXX" strategy="afterInteractive" />
<Script id="gtm-init" strategy="afterInteractive">{`
  (function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-XXXXXXX');
`}</Script>
```

Replace `GTM-XXXXXXX` with the container ID from the client's GTM account.

---

## 15. Content Reference

### Studio info

Source of truth: `data/site.ts` and Sanity (`studioHours` document for hours).

- **Address:** 6070 S Rainbow Blvd, Las Vegas, NV 89118
- **Phone:** (702) 897-5095
- **Email:** info@evolvedancecenter.com
- **Hours:** Edited in Sanity Studio (`studioHours` schema)

### Social

Source of truth: `data/site.ts` → `socialLinks`

- **Instagram:** [@evolvedancelv](https://www.instagram.com/evolvedancelv/)
- **Facebook:** [/LasVegasDanceStudio](https://www.facebook.com/LasVegasDanceStudio/)
- **TikTok:** [@evolvedancelv](https://www.tiktok.com/@evolvedancelv)
- **YouTube:** [@evolvedancecenter8992](https://www.youtube.com/@evolvedancecenter8992)

### Class styles

Source of truth: `data/styles.ts`. Current taxonomy:

Ballet, Jazz, Hip Hop, Contemporary, Lyrical, Acro, Tap, Ballroom, Jumps & Turns, Stretch & Pilates, Combo Classes

Additional styles referenced in the homepage ticker: Tumbling, Pom.