# 🩰 Evolve Dance Center — Development Guidelines

## 🗓️ Last Updated: March 2026

Welcome to the Evolve Dance Center codebase. This document defines how the project is structured, how new features should be added, and how both developers and AI tools (like Cursor or Claude) should interact with the repository.

The goal: build a cinematic, dark, editorial dance studio website with a teal/black aesthetic that outperforms every competitor in the Las Vegas market. This site should feel like a premium performance arts brand — not a generic dance school template.

---

## ⚙️ 1. Core Rules

### System Instruction for AI and Developers:

- Always follow the Evolve Dance Center folder structure.
- **Each section has its own component file** inside `components/sections/`.
- **Shared components (Navbar, Footer) have their own files** inside `components/layout/` and `components/ui/`.
- Never bundle unrelated code into one file.
- Preserve naming consistency (e.g., `VideoHeroSection.tsx`, `ClassFinder.tsx`, `InstructorsSection.tsx`).
- Ensure all imports remain clean, modular, and use the `@/` alias for absolute imports.
- **This is a Next.js 15 App Router project** — use `app/` directory for routes.
- **Framer Motion is required** for all entrance animations and transitions.
- **Intersection Observer (via custom `useReveal` hook)** is used for scroll-triggered reveals — no GSAP required.
- **Sanity CMS** is the data source for all dynamic content (schedule, instructors, classes, news).
- All data types and interfaces live in `lib/classData.ts` or dedicated type files — never inline in components.

### ⚠️ AI Safety Block (Pin this in Cursor):

```
Do not create, edit, move, or delete any folders or files other than the one explicitly mentioned in this prompt.
Only modify the exact file specified. Do not generate new components, pages, layouts, or assets unless directly instructed.
Preserve the current folder structure, imports, and exports exactly as they are.
Your task is limited strictly to updating the existing code inside the specified file while keeping all other parts of the project untouched.
```

Pin or reference this block inside Cursor or any AI-assisted IDE session before making automated edits.

---

## 🎨 2. Design System

### Design Direction:

- **Dark, cinematic, editorial — performance arts brand**
- **Teal neon accent on black** — the studio's real neon light color
- **Playfair Display for headlines** — elegant, high-contrast, italic drama
- **DM Sans for body** — clean, modern, readable at all weights
- Photography and motion forward — this site sells dance through movement
- Zero generic dance school aesthetics — no clipart, no stock-photo layouts, no cookie-cutter templates

### Color Palette (CSS Variables in `styles/globals.css`):

```css
:root {
  /* Base */
  --black:       #070a09;
  --black-soft:  #0d1210;
  --charcoal:    #111916;

  /* Teal (brand accent — pulled from studio neon lights) */
  --teal:        #2dd4bf;
  --teal-dim:    #1aaf9c;
  --teal-light:  #3ef0d8;
  --teal-glow:   rgba(45, 212, 191, 0.18);
  --teal-faint:  rgba(45, 212, 191, 0.06);

  /* Text */
  --off-white:   #f0faf8;
  --off-mid:     #c8e0db;
  --mid:         #5c7a74;

  /* Borders */
  --border:      rgba(45, 212, 191, 0.12);
  --border-soft: rgba(45, 212, 191, 0.06);
}
```

### Typography:

| Type    | Font             | Weights            | Usage                              |
|---------|------------------|--------------------|------------------------------------|
| Display | Playfair Display | 400, 700, 900      | All headings, hero titles          |
| Display | Playfair Display | italic 400, 700    | Italic accent words in headlines   |
| Body    | DM Sans          | 300, 400, 500, 600 | Body text, labels, nav, buttons    |

### Font Import (Next.js `app/layout.tsx` — use `next/font/google`):

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

### Typography Scale:

| Element       | Size                        | Weight | Letter Spacing |
|---------------|-----------------------------|--------|----------------|
| Hero Title    | clamp(52px, 8.5vw, 116px)  | 900    | -0.025em       |
| Section H2    | clamp(40px, 5vw, 68px)     | 700    | tight          |
| Eyebrow Label | 10px                        | 500    | 0.22em         |
| Body Text     | 15px                        | 300    | —              |
| Nav Links     | 11px                        | 400    | 0.14em         |
| Button Text   | 11px                        | 500    | 0.15em         |
| Stat Numbers  | 24–28px                     | 700    | —              |
| Table Text    | 13–13.5px                   | 400    | —              |

### Signature Visual Elements:

- **Clip-path buttons:** `polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)` — the angled cut on all primary CTAs
- **Teal glow on italic headlines:** `text-shadow: 0 0 60px rgba(45,212,191,0.35), 0 0 140px rgba(45,212,191,0.12)`
- **Scan lines texture:** `repeating-linear-gradient` on dark panels — subtle, adds depth
- **Animated teal dot in logo:** pulses with `box-shadow` animation
- **Pulsing teal dot nav logo:** always present, always animating

---

## 🧭 3. Folder Structure

```
evolve-dance/
├─ app/
│   ├─ layout.tsx                    # Root layout — fonts, metadata, SEO
│   ├─ page.tsx                      # Homepage — assembles all sections
│   ├─ classes/
│   │   └─ page.tsx                  # Classes + class finder page
│   ├─ faculty/
│   │   └─ page.tsx                  # Instructors page
│   ├─ the-project/
│   │   └─ page.tsx                  # Competitive team page
│   ├─ enroll/
│   │   └─ page.tsx                  # Registration + free trial page
│   ├─ about/
│   │   └─ page.tsx                  # About + policies + dress code
│   ├─ gallery/
│   │   └─ page.tsx                  # Recitals + gallery page
│   └─ contact/
│       └─ page.tsx                  # Contact page
│
├─ components/
│   ├─ layout/
│   │   ├─ Navbar.tsx                # ✅ Fixed nav, scroll-aware, mobile menu
│   │   └─ Footer.tsx                # ✅ Full footer with links + socials
│   │
│   ├─ ui/
│   │
│   └─ sections/
│       ├─ VideoHeroSection.tsx      # ✅ Full video hero with overlays + lightbox
│       ├─ HeroSection.tsx           # ✅ Fallback animated hero (no video)
│       ├─ HomeSections.tsx          # ✅ All non-hero homepage sections
│       ├─ ClassFinder.tsx           # ✅ Interactive class finder component
│       ├─ InstructorSection.tsx     # 🔲 Faculty grid with bios
│       ├─ ProjectSection.tsx        # 🔲 The Project competitive team page
│       ├─ EnrollSection.tsx         # 🔲 Enrollment + free trial form
│       ├─ GallerySection.tsx        # 🔲 Recitals + video archive
│       └─ ContactSection.tsx        # 🔲 Contact form + map
│
├─ lib/
│   ├─ classData.ts                  # ✅ All class styles, schedule data, filter fn
│   ├─ sanity.ts                     # 🔲 Sanity client config
│   ├─ queries.ts                    # 🔲 GROQ queries for all content types
│   └─ utils.ts                      # ✅ cn() Tailwind merge utility
│
├─ sanity/
│   ├─ schemas/
│   │   ├─ classStyle.ts             # 🔲 Class style schema (ballet, jazz, etc.)
│   │   ├─ scheduleEntry.ts          # 🔲 Schedule entry schema
│   │   ├─ instructor.ts             # 🔲 Instructor schema
│   │   └─ index.ts                  # 🔲 Schema registry
│   └─ sanity.config.ts              # 🔲 Sanity Studio config
│
├─ styles/
│   └─ globals.css                   # ✅ CSS variables, reveal animations, utilities
│
├─ public/
│   ├─ videos/
│   │   ├─ hero.mp4                  # 🔲 Adobe Stock dance footage (compressed)
│   │   └─ hero.webm                 # 🔲 WebM fallback
│   └─ images/
│       ├─ hero-poster.jpg           # 🔲 First frame of hero video
│       ├─ instructors/              # 🔲 Faculty headshots
│       └─ gallery/                  # 🔲 Recital + performance photos
│
├─ tailwind.config.ts                # ✅ Brand colors, fonts, keyframes
├─ next.config.ts                    # ✅ Image domains + 13 Wix 301 redirects
├─ postcss.config.js                 # ✅ PostCSS config
├─ tsconfig.json                     # ✅ TypeScript config with @/ alias
└─ package.json                      # ✅ Dependencies

Legend: ✅ Built  🔲 Not yet built
```

---

## 🌊 4. Signature Interactions (CRITICAL)

These interactions define the premium feel. They must be implemented exactly as specified.

### 1. Video Hero (`components/sections/VideoHeroSection.tsx`)

```tsx
// Requirements:
// - Full-screen looping video background (muted, autoplay, playsInline)
// - 4-layer gradient overlay system for text legibility
// - Teal radial glow overlay at 7% opacity (brand color grade)
// - Noise grain texture overlay at 2.5% opacity
// - Animated teal scan line at bottom
// - Mute/unmute + play/pause controls (top right)
// - Lightbox opens full video with controls on "Watch the Studio" click
// - Fallback: animated silhouette + orbs when no video file present
// - Stats strip at bottom — frosted glass effect
```

**Overlay stack (bottom to top):**
1. Video element (z-index: 0)
2. Main gradient — `to bottom` dark vignette (z-index: 1)
3. Teal radial glow — `ellipse at 50% 30%` (z-index: 1)
4. Left edge fade — `to right` for text breathing room (z-index: 1)
5. Noise grain texture (z-index: 1, opacity: 0.025)
6. Teal scan line — animated (z-index: 2)
7. Content (z-index: 3)
8. Stats strip — `backdrop-filter: blur(16px)` (z-index: 4)

### 2. Scroll Reveal (`styles/globals.css` + `useReveal` hook)

```tsx
// Pattern used across ALL sections:
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.12 }
    )
    observer.observe(ref.current!)
    return () => observer.disconnect()
  }, [])
  return { ref, visible }
}
```

```css
/* globals.css */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible { opacity: 1; transform: translateY(0); }
.reveal-delay-1 { transition-delay: 100ms; }
.reveal-delay-2 { transition-delay: 200ms; }
.reveal-delay-3 { transition-delay: 300ms; }
.reveal-delay-4 { transition-delay: 400ms; }
```

### 3. Class Finder Filtering (`components/sections/ClassFinder.tsx`)

```tsx
// Requirements:
// - All 41 schedule entries live in lib/classData.ts
// - filterSchedule() runs client-side — no API calls
// - Filters: age group, day, style category, invite-only toggle
// - All filters are combinable simultaneously
// - Two views: Schedule (grouped by day) and Styles Grid (15 cards)
// - Clicking a style card expands a detail panel (description, shoes, attire)
// - AnimatePresence wraps results for smooth filter transitions
// - Empty state with clear filters CTA
// - Status badges: Open (teal), Few Spots (amber), Full (red)
// - Hover on schedule row reveals Enroll → link
// FUTURE: Replace classData.ts array with Sanity GROQ query
```

### 4. Instructor Cards (`components/sections/InstructorSection.tsx`)

```tsx
// Requirements:
// - Horizontal flex strip — cards expand on hover
// - flex: 1 at rest, flex: 2.5 on hover (CSS transition 0.5s cubic-bezier)
// - Top teal bar scales in on hover (scaleX 0 → 1)
// - Instructor initial as large watermark background
// - Role text slides up with opacity transition on hover
// - Last card = "+ 17 More → View All Faculty"
```

### 5. Teal Ticker Strip (`components/sections/HomeSections.tsx` → `TickerSection`)

```tsx
// Requirements:
// - Continuous left scroll, no gap
// - 3x repeated content for seamless loop
// - 25s animation duration (adjustable)
// - Black separator dots between items
// - Teal background, black text
```

---

## 📄 5. Page Structure

### `app/page.tsx` (Homepage)

```tsx
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import VideoHeroSection from '@/components/sections/VideoHeroSection'
import {
  TickerSection,
  AboutSection,
  ClassesSection,
  ScheduleSection,
  InstructorsSection,
  TestimonialsSection,
  ProjectSection,
  EnrollSection,
} from '@/components/sections/HomeSections'

export default function HomePage() {
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
        <ClassesSection />
        <ScheduleSection />
        <InstructorsSection />
        <TestimonialsSection />
        <ProjectSection />
        <EnrollSection />
      </main>
      <Footer />
    </>
  )
}
```

### `app/classes/page.tsx`

```tsx
import ClassFinder from '@/components/sections/ClassFinder'
// ClassFinder is a full-page component — no additional wrapper needed
```

### `app/layout.tsx`

```tsx
import { Playfair_Display, DM_Sans } from 'next/font/google'
import '../styles/globals.css'

// Fonts loaded via next/font — never via @import in CSS
// GTM script via next/script with strategy="afterInteractive"
// JSON-LD LocalBusiness schema injected here
```

---

## 🧱 6. Component Specifications

### Navbar (`components/layout/Navbar.tsx`)

| Property    | Value                                              |
|-------------|----------------------------------------------------|
| Position    | Fixed, top: 0, z-index: 100                        |
| Height      | 72px                                               |
| Background  | Gradient → solid + blur when scrolled             |
| Logo        | DM Sans 600, 13px, tracking 0.22em, uppercase      |
| Logo dot    | 6px teal circle, pulsing animation                 |
| Links       | DM Sans 11px, tracking 0.14em, uppercase           |
| Link hover  | Color → teal + scaleX underline from left          |
| CTA         | Teal background, clip-path angled button           |
| Scrolled    | `bg-[rgba(7,10,9,0.96)] backdrop-blur-xl border-b` |
| Mobile      | Hamburger → full overlay menu                      |

### VideoHeroSection (`components/sections/VideoHeroSection.tsx`)

| Property       | Value                                                   |
|----------------|---------------------------------------------------------|
| Height         | 100vh min                                               |
| Video          | autoPlay muted loop playsInline, object-cover           |
| Poster         | `/images/hero-poster.jpg`                               |
| Headline       | "Where dancers become extraordinary."                   |
| Teal line      | "extraordinary." — italic, teal glow text-shadow        |
| Primary CTA    | "Book a Free Trial" — links to `/enroll#free-trial`     |
| Secondary CTA  | "Watch the Studio" — opens lightbox                     |
| Tertiary CTA   | "View Schedule" — ghost link, links to `/classes`       |
| Controls       | Mute + Play/Pause — top right, frosted glass            |
| Stats strip    | 10+ styles, 22 faculty, 9 seasons, ★ 5.0                |
| Scroll hint    | Teal gradient line + "Scroll" vertical text             |

### ClassFinder (`components/sections/ClassFinder.tsx`)

| Property       | Value                                                    |
|----------------|----------------------------------------------------------|
| Data source    | `lib/classData.ts` (later: Sanity GROQ)                  |
| Filter: Age    | All, Tiny Dancers (18mo–5), Kids (5–10), Tweens, Teens   |
| Filter: Day    | Any Day, Mon, Tue, Wed, Thu, Fri, Sat                    |
| Filter: Style  | All Styles, Classical, Commercial, Street, Modern, Acro… |
| Filter: Toggle | Invite Only (amber chip)                                 |
| Views          | Schedule (table) / All Styles (grid cards)               |
| Empty state    | Icon + message + Clear Filters + Contact Us              |
| Bottom CTA     | Book Free Trial + Ask a Question                         |

### Footer (`components/layout/Footer.tsx`)

| Property  | Value                                                    |
|-----------|----------------------------------------------------------|
| Bg        | `#040605`                                                |
| Cols      | Brand + tagline / Classes / Studio / Contact             |
| Logo dot  | Small teal dot with box-shadow glow                      |
| Credit    | Socials (Instagram, Facebook, YouTube)                   |
| Copyright | © {year} Evolve Dance Center. All rights reserved.       |

---

## 🔗 7. Routing & Redirects

All old Wix URLs are permanently redirected in `next.config.ts`. Never remove these.

| Old Wix URL                        | New URL                  |
|------------------------------------|--------------------------|
| `/the-center-1`                    | `/about`                 |
| `/copy-of-news`                    | `/about#calendar`        |
| `/copy-of-2024-summer-schedule`    | `/classes#schedule`      |
| `/copy-of-register`                | `/enroll`                |
| `/copy-of-policies`                | `/about#dress-code`      |
| `/services-4`                      | `/classes`               |
| `/tuition`                         | `/enroll#pricing`        |
| `/the-faculty`                     | `/faculty`               |
| `/newsletter`                      | `/about#news`            |
| `/about-3`                         | `/the-project`           |
| `/about-us`                        | `/about`                 |
| `/register`                        | `/enroll`                |

---

## 📦 8. Sanity CMS Setup

### Installation:

```bash
npm install @sanity/client @sanity/image-url next-sanity
npx sanity init
```

### Environment Variables (`.env.local`):

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_read_token
SANITY_WEBHOOK_SECRET=your_webhook_secret
```

### Sanity Client (`lib/sanity.ts`):

```ts
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-03-01',
  useCdn:     true,
})
```

### Schemas (in `sanity/schemas/`):

| Schema           | Fields                                                         |
|------------------|----------------------------------------------------------------|
| `classStyle`     | id, name, category, description, longDesc, ageRange, shoes, attire, prereq |
| `scheduleEntry`  | style (ref), day, startTime, endTime, level, ageLabel, ageMin, ageMax, instructor (ref), status, inviteOnly |
| `instructor`     | name, role, styles[], bio, headshotUrl, inviteOnly             |
| `news`           | title, body, publishedAt                                       |

### ISR Revalidation (`app/api/revalidate/route.ts`):

```ts
// Sanity fires a webhook to this endpoint on every publish
// next.js revalidates /classes and /faculty pages automatically
// No developer action needed when client updates content
```

### Who updates what in Sanity Studio:

| Content           | Who updates       | How often        |
|-------------------|-------------------|------------------|
| Class schedule    | Studio manager    | Start of season  |
| Class status      | Studio manager    | As classes fill  |
| Instructor bios   | Studio manager    | When staff changes |
| News/announcements | Studio manager   | As needed        |
| Pricing           | Owner             | Annually         |

---

## 🎬 9. Animation Specifications

### Framer Motion — Page entrance (hero only):

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

### Scroll reveals — all other sections:

Use the `useReveal()` hook + `.reveal` / `.reveal.visible` CSS classes.
Never use Framer Motion for scroll reveals outside the hero — keeps bundle size small.

### Filter transitions — ClassFinder:

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

### Row stagger — schedule entries:

```tsx
<motion.tr
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: index * 0.04 }}
/>
```

### Keyframes (in `tailwind.config.ts`):

| Name          | Used for                            |
|---------------|-------------------------------------|
| `pulseDot`    | Teal nav logo dot                   |
| `ticker`      | Infinite class style ticker strip   |
| `scrollLine`  | Scroll indicator pulse              |
| `gridSlide`   | Animated grid background in panels  |
| `orbFloat`    | Floating teal orbs in hero fallback |
| `ringPulse`   | Dancer silhouette ring animation    |

---

## 🖼️ 10. Asset Requirements

### Hero Video (`/public/videos/hero.mp4`)

| Property   | Value                                            |
|------------|--------------------------------------------------|
| Source     | Adobe Stock — dance studio / performance footage |
| Resolution | 1920×1080 minimum                                |
| Duration   | 15–30 seconds, loops cleanly                     |
| Format     | MP4 (H.264) + WebM fallback                      |
| File size  | Target 8–15MB after compression                  |
| Audio      | Remove (muted)                                   |

**Compression command:**
```bash
ffmpeg -i input.mp4 \
  -vcodec libx264 -crf 23 -preset slow \
  -acodec aac -b:a 128k \
  -vf "scale=1920:-1" \
  -movflags +faststart \
  public/videos/hero.mp4
```

**The `-movflags +faststart` flag is mandatory** — enables video to play before fully downloaded.

### Instructor Headshots (`/public/images/instructors/`)

| Property   | Value                               |
|------------|-------------------------------------|
| Format     | JPG or WebP                         |
| Size       | 800×1000px minimum (portrait ratio) |
| Style      | Clean background, professional      |
| Naming     | `firstname-lastname.jpg`            |

### Gallery Images (`/public/images/gallery/`)

- Recital and performance photos organized by season
- Minimum 1200px wide
- Naming: `season-9-recital-01.jpg`

---

## 📱 11. Responsive Breakpoints

| Breakpoint | Changes                                          |
|------------|--------------------------------------------------|
| `lg` 1024px | Nav: desktop links hidden, hamburger shown       |
| `md` 768px  | Grid layouts → single column                    |
| `sm` 640px  | Typography scales, tables scroll horizontally   |
| `xs` 375px  | Hero title clamps to 52px minimum               |

### Key mobile rules:

```css
/* Never let the horizontal ticker break layout */
.ticker { overflow: hidden; }

/* Table min-width forces horizontal scroll on mobile */
.sched-table { min-width: 580px; }

/* Instructor strip: collapse to vertical on mobile */
@media (max-width: 768px) {
  .instructor-strip { flex-direction: column; }
  .instructor-card  { flex: none !important; min-height: 160px; }
}
```

---

## 🧰 12. Debugging Reference

| Problem                         | Check File                              |
|---------------------------------|-----------------------------------------|
| Video not playing               | Check `/public/videos/hero.mp4` path, `-movflags +faststart` flag |
| Scroll reveals not firing       | Check `threshold: 0.12` in `useReveal` — element may be too short |
| Filters not updating            | `lib/classData.ts` — check `filterSchedule()` conditions |
| Schedule showing wrong classes  | Check `ageMin`/`ageMax` overlap logic in `filterSchedule` |
| Framer Motion layout shift      | Wrap `AnimatePresence` with `mode="wait"` |
| Teal color wrong shade          | Check CSS var `--teal: #2dd4bf` in `globals.css` |
| Fonts not loading               | Check `--font-playfair` / `--font-dm-sans` variables on `<html>` |
| Redirects not working           | `next.config.ts` redirects array — check `permanent: true` |
| Sanity data stale               | Check webhook URL in Sanity project settings points to `/api/revalidate` |
| Tailwind classes not applying   | Check `content` array in `tailwind.config.ts` includes all component paths |
| @/ alias broken                 | `tsconfig.json` paths: `"@/*": ["./*"]` |

---

## ✅ 13. Quality Checklist

Before considering any page complete:

### Global
- [ ] Nav logo dot pulses correctly
- [ ] Nav transitions to frosted glass on scroll
- [ ] All `next/link` hrefs are correct routes
- [ ] All 13 Wix redirect URLs resolve correctly
- [ ] Mobile hamburger menu opens/closes cleanly
- [ ] Footer "Site by Vizantir" credit present

### Homepage
- [ ] Hero video plays immediately on load (with fallback active before load)
- [ ] Mute/unmute + play/pause controls work
- [ ] "Watch the Studio" lightbox opens and plays video
- [ ] Headline teal glow text-shadow renders on "extraordinary."
- [ ] Stats strip frosted glass at bottom of hero
- [ ] Teal ticker scrolls continuously without gap
- [ ] All 8 homepage sections reveal on scroll
- [ ] Instructor strip expands correctly on hover
- [ ] Enroll section teal background renders with dark button

### Classes Page
- [ ] Age group filter narrows schedule correctly
- [ ] Day filter shows only that day's classes
- [ ] Style category filter works
- [ ] Combined filters work simultaneously
- [ ] Invite Only toggle shows/hides invite-only entries
- [ ] Empty state renders when no results
- [ ] Style card detail panel opens and closes
- [ ] Schedule grouped by day when "Any Day" selected
- [ ] Flat table when specific day selected
- [ ] Status badges (Open/Few Spots/Full) display correct colors
- [ ] Enroll → link appears on row hover

### All pages
- [ ] Page metadata (title, description) is unique per page
- [ ] No layout shift on load
- [ ] No console errors
- [ ] Images use `next/image` with proper `alt` text
- [ ] All GROQ queries have error handling

---

## 🚀 14. Deployment

### Vercel Settings:

| Setting         | Value                      |
|-----------------|----------------------------|
| Framework       | Next.js                    |
| Node version    | 20.x                       |
| Build command   | `next build`               |
| Output dir      | `.next`                    |
| Install command | `npm install`              |

### Environment Variables (set in Vercel dashboard):

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_TOKEN
SANITY_WEBHOOK_SECRET
```

### Domain:

- Primary: `evolvedancecenter.com`
- Redirect: `www.evolvedancecenter.com` → `evolvedancecenter.com`

### GTM Installation (`app/layout.tsx`):

```tsx
import Script from 'next/script'

// Replace GTM-XXXXXXX with client's actual container ID
<Script src="https://www.googletagmanager.com/gtag/js?id=GTM-XXXXXXX" strategy="afterInteractive" />
<Script id="gtm-init" strategy="afterInteractive">{`
  (function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-XXXXXXX');
`}</Script>
```

---

## 🗺️ 15. Build Progress

| Page / Feature         | Status      | Notes                              |
|------------------------|-------------|------------------------------------|
| Homepage               | ✅ Built    | All 8 sections complete            |
| Video Hero             | ✅ Built    | Awaiting Adobe Stock video file    |
| Ticker                 | ✅ Built    | —                                  |
| Class Finder           | ✅ Built    | Hardcoded data — Sanity pending    |
| Navbar                 | ✅ Built    | —                                  |
| Footer                 | ✅ Built    | —                                  |
| Sanity Setup           | 🔲 Pending  | Next step                          |
| Faculty Page           | 🔲 Pending  | —                                  |
| The Project Page       | 🔲 Pending  | —                                  |
| Enroll Page            | 🔲 Pending  | Jackrabbit embed + free trial form |
| About + Policies       | 🔲 Pending  | FAQ section included               |
| Gallery / Recitals     | 🔲 Pending  | —                                  |
| Contact Page           | 🔲 Pending  | Call + text numbers, Google Maps   |
| Sanity Schemas         | 🔲 Pending  | schedule, instructor, news         |
| ISR Revalidation       | 🔲 Pending  | `/api/revalidate` webhook route    |
| 301 Redirects          | ✅ Built    | All 13 Wix URLs covered            |
| GTM Integration        | 🔲 Pending  | Needs client's container ID        |
| JSON-LD Schema         | 🔲 Pending  | LocalBusiness + Course schema      |
| Hero Video             | 🔲 Pending  | Client purchasing Adobe Stock      |
| Instructor Headshots   | 🔲 Pending  | Client to provide                  |

---

## 📝 16. Content Reference

### Studio Info:
- **Address:** 6070 S Rainbow Blvd, Las Vegas, NV 89118
- **Phone:** (702) 897-5095
- **Email:** info@evolvedancecenter.com
- **Hours:** Mon–Fri 2:30pm–9pm, Wed from 9:30am, Sat 9am–1pm, Sun closed
- **Season 9:** August 11, 2025 – June 13, 2026

### Social:
- **Instagram:** @evolvedancelv
- **Facebook:** /LasVegasDanceStudio
- **YouTube:** @evolvedancecenter8992

### Key Copy:
- **Hero headline:** "Where dancers become extraordinary."
- **Free trial:** "First class is always free."
- **Tagline:** "Serious training. Positive environment. Real results."
- **The Project:** "For dancers with the drive to go further."

### Classes Offered (Season 9):
Ballet, Jazz, Hip Hop, Contemporary, Lyrical, Tap, Acrobatics, Tumble Tots, Pointe, Jumps & Turns, Ballroom, Stretch & Pilates, Pom, Combo Classes, Mommy & Me

---

*Evolve Dance Center — Las Vegas*

*Site by [Vizantir](https://vizantir.com)*
