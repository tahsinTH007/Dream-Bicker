# DREAM BIKER (হানিফ) — AI AGENT KNOWLEDGE BASE & SYSTEM MANUAL
*Document Version: 2.0.0 | Updated: November 2026 | Project: Dream Biker Official Platform*

> **NOTICE FOR AI AGENTS & DEVELOPERS:**
> This is the authoritative description of the codebase, design system, data pipeline, past client decisions and operating rules. Read it before changing anything. Four identical copies exist (`PROJECT_KNOWLEDGE_BASE.md/.txt` at the repo root and in `dream-biker-frontend/`); update all four together.

---

## 1. PROJECT SUMMARY

### 1.1 Brand & Person
- **Subject**: Md. Hanif Hossain (মো. হানিফ হোসেন), known as **Dream Biker** (ড্রিম বাইকার).
- **Role**: Bangladeshi motovlogger, humanitarian content creator and grassroots social worker.
- **Tagline**: *প্রতিটি জীবনের একটি গল্প আছে। প্রতিটি মানবিক কাজই মূল্যবান।* ("Every life has a story. Every act of kindness matters.")
- **Motto**: *মানবতাই শান্তির প্রতীক* (Humanity is a symbol of peace) — the home hero headline.

### 1.2 Channels
- **YouTube**: [`@DreamBiker532`](https://www.youtube.com/@DreamBiker532)
- **Facebook**: [`BuydreambyHanif`](https://www.facebook.com/BuydreambyHanif)
- **Contact**: `md.hanifhossan6991@gmail.com`
- Hero stats are live from the APIs (YouTube now; Facebook once its token is set). Fallback numbers in `siteConfig.heroStatsFallback` were read from the APIs (Nov 2026).

---

## 2. ARCHITECTURE & STACK

### 2.1 Single project (CRITICAL)
Everything — UI, API routes, social sync, database access — lives in the one Next.js app in `dream-biker-frontend/`. **Never add a separate backend.** Server logic is in `src/app/api/**` and `src/server/**` (all server files import `server-only`).

### 2.2 Stack
| Layer | Technology | Notes |
| :--- | :--- | :--- |
| Framework | Next.js 16.4 (App Router, Turbopack) | **Breaking changes vs. older Next** — read `node_modules/next/dist/docs/` before using an API (see `AGENTS.md`). |
| UI | React 19.3, TypeScript (strict) | Server Components by default; `"use client"` only where needed. |
| Styling | Tailwind CSS v4 | Theme in `src/app/globals.css`; `text-xs` overridden to **13px**. |
| Motion | framer-motion | Site-wide `MotionConfig reducedMotion="user"` (`components/layouts/motion-provider.tsx`). |
| Icons | lucide-react, react-icons | `react-icons/fa` for brand logos. |
| Data | Prisma 6 + PostgreSQL (optional) | In-memory fallback when `DATABASE_URL` is unset. |
| Validation | zod | Env parsing (`lib/env/server.ts`) and API bodies. |
| Tests / CI | Vitest, GitHub Actions | `tests/*.test.ts`; `.github/workflows/ci.yml`. |

---

## 3. DIRECTORY MAP (`dream-biker-frontend/`)
```
prisma/schema.prisma            SocialAccount, SocialVideo, SocialPost, SocialPhoto, SocialSyncLog, ContactMessage
public/images/
  author/, profile/             original photos (small: portraits are 206x206)
  hd/                           2-4x Lanczos+sharpen enlargements actually used by the site
  logo/                         dream_biker_emblem.png (navbar/footer), dream_biker_logo.png
  hero_bg_hanif.jpg, footer_bg_road.jpg   originals of the HD hero/footer photos
src/app/
  layout.tsx                    fonts, site-wide metadata (metadataBase, openGraph/twitter defaults)
  (website)/                    the 8 pages (home, about, videos, blog, gallery, contact, privacy-policy, terms-and-conditions)
  api/contact/route.ts          contact form endpoint
  api/social/**, api/admin/**   public read APIs and protected sync/status APIs
  sitemap.ts, robots.ts         SEO
  opengraph-image.jpg, twitter-image.jpg   1200x630 share image
  globals.css, error.tsx, not-found.tsx, loading.tsx
src/components/
  layouts/                      website-layout, section-container, motion-provider
  shared/                       navbar, mobile-nav, footer, logo, page-header, section-heading,
                                social-links, animated-content, count-up, latest-spotlight
  ui/                           button, input, textarea
src/config/                     site.config (brand, heroStats, contact), navigation.config, social.config
src/features/                   about/, blog/, contact/, gallery/, home/, videos/ components
src/lib/                        db/prisma.ts, env/server.ts, utils.ts (cn)
src/server/                     auth/sync-auth.ts, social/{youtube,facebook,storage,synchronization}
tests/                          Vitest unit tests (+ stubs/server-only.ts)
```

---

## 4. NAVIGATION
Exactly six main items: হোম `/`, পরিচিতি `/about`, ভিডিও `/videos`, ব্লগ `/blog`, গ্যালারি `/gallery`, যোগাযোগ `/contact`. Legal pages are linked from the footer.

Permanent redirects (`next.config.ts`): `/humanitarian-work` → `/about`, `/stories(/*)` → `/blog`, `/achievements` → `/about`, `/social(/*)` → `/videos`. **Never link to the old routes.** There are **no breadcrumbs** (removed at the client's request).

---

## 5. DESIGN SYSTEM

### 5.1 Colours
- Navy: `#142B3B` (primary), `#0D1C26` (page headers), `#0A1620` (navbar); ivory `#F7F5EF`; border `#EAE6DB`.
- Brand orange `#E97835` (hover `#D46624`).
- Home hero palette: gold `#FFC93C` → orange `#FF6B2C` gradients on a dark green-black `#07100C`.
- **Platform colours** (use for anything platform-specific: tabs, spotlights, card hover borders/titles, play buttons):
  - YouTube `#FF0000` (text on white: `#CC0000`, on dark: `#FF8080`)
  - Facebook `#1877F2` (on dark: `#7DB3FF`)
- Note: the global CSS colours every `h1`–`h6` navy. Headings on dark backgrounds **must set `text-white` explicitly**.

### 5.2 Typography
- **Noto Sans Bengali** (`--font-bengali`) for all body/heading text. Minimum size **13px** (`text-xs`); never use `text-[10px]`/`text-[11px]` for Bengali.
- **Galada** (`--font-bengali-display`) — calligraphic Bengali, hero accent phrase only.
- **Sacramento** (`--font-signature`) — the "Dream Biker" autograph in the hero.
- Manrope / Inter for Latin fallbacks.
- Google Fonts serves Noto Sans Bengali without real hinting; there is no hinted alternative on Google Fonts.

### 5.3 Sharp-text rules (Windows ClearType)
- No CSS `filter: drop-shadow` on text — use `text-shadow` (Tailwind `text-shadow-*`).
- No `backdrop-blur` on boxes that contain text (allowed only on the mobile-menu overlay and the icon-only hamburger button).
- No `will-change` on text containers.

### 5.4 Spacing
Compact vertical rhythm (client asked for less space): sections ~`py-12 sm:py-16`, page headers `py-10 sm:py-12`, section headings `mb-8 sm:mb-10`.

### 5.5 Animation rules
- Never put Tailwind `transition-all` / `transition-transform` on a framer-motion element — CSS and framer fight over transforms. Use `transition-[color,background-color,border-color,box-shadow]`.
- Hover must not reuse a staggered entrance transition: put the entrance transition inside `whileInView/animate` and give hover its own quick spring.
- Lift cards with `y` only (no `scale` on text cards — text shimmers).
- Don't make content depend on an exit animation finishing (AnimatePresence `mode="wait"` can stall when animation frames pause). Prefer stacked CSS cross-fades / keyed re-mount.
- Grids: "load more" must not re-key the whole grid; stagger only within the new batch.

---

## 6. PAGES & COMPONENTS
- **Home hero** (`features/home/components/hero-section.tsx`): Bengali copy from the client's Dream Biker text (label শুধু পথের গল্প নয়…, headline ভ্রমণের পথে মানুষের গল্প, / মানবতার পাশে আমাদের পথচলা। with gold-orange Galada accent + animated underline, mission subtext, two CTAs). Photo `hd/hero_bg_hanif.jpg` starts **below the navbar** and is pinned to its top so the head is never cut; fills one screen on desktop. Stats bar = **live** YouTube subscribers/views/videos + Facebook followers from `src/server/social/hero-stats.ts` (5-min cached API calls; fallback `siteConfig.heroStatsFallback`), shown in Bengali units (লাখ/কোটি, rounded down) with `CountUp`.
- **Navbar**: logo shows only "Dream Biker" (no personal name underneath). Fixed on home (transparent → solid on scroll, only colours transition), sticky elsewhere. No search, no TikTok. Mobile drawer slides in/out.
- **Footer**: `hd/footer_bg_road.jpg` background, no top border/line, text uses text-shadow. No WhatsApp/TikTok/scroll-to-top.
- **About**: intro block, then the Dream Biker story **section by section** (`components/shared/dream-biker-story.tsx`: numbered heading + its paragraphs for লক্ষ্য ও উদ্দেশ্য, মানবিক কার্যক্রম, আমাদের বিশ্বাস, ভবিষ্যৎ স্বপ্ন, then the closing quote). All of it is the **client-supplied text verbatim** — don't reword it. Portrait card uses `hd/hanif_portrait.jpg`; floating "দুই চাকায়" badge sits top-right. Timeline with scroll progress line. The home about section shows only the intro paragraphs (client decision: the full story lives on the About page only).
- **Videos**: two "latest updates" spotlights (`components/shared/latest-spotlight.tsx`), YouTube and Facebook, newest 5 each, auto-advance 7s with progress bar, pause on hover, hidden when the platform has no items. Below: filter tabs (3 equal columns with short labels on phones) and the archive grid with empty states. Cards hover in platform colour. Videos open on YouTube/Facebook.
- **Blog**: **Facebook page posts only** (client decision). One Facebook spotlight, then the post grid; no filter tabs. YouTube videos are never turned into blog posts, and YouTube Community posts are not available through the YouTube Data API (verified: `activities` returns only uploads/subscriptions).
- **Gallery**: page header, filter tabs, stable masonry (1/2/3 columns). Clicking a photo opens the **coverflow carousel in a modal** at that photo (Esc/backdrop closes, arrows/swipe, centre button opens the source post). Cards and stage size to the viewport height. There is no separate lightbox.
- **Contact**: form posts to `/api/contact`; on failure offers a prefilled `mailto:` instead of faking success.
- **Social CTA cards**: medium size, Facebook blue / YouTube red, no images, circle-expand hover.

---

## 7. PHOTOS
Originals are small (portraits 206×206, footer 1024×317, hero 1024×576). The site uses `public/images/hd/` enlargements (cleaner, not more detail). **Ask Hanif for high-resolution originals** (≥1000px portraits, ~2400px wide hero/footer) and replace the `hd/` files. Use only real photos of Hanif — never stock models.

Next 16 only allows `quality` values listed in `images.qualities` (`next.config.ts`: `[75, 90]`); other values are silently coerced.

---

## 8. SOCIAL SYNC ENGINE

### 8.1 Sources
- YouTube Data API v3 (`server/social/youtube/`): channel by `YOUTUBE_CHANNEL_ID`, else `YOUTUBE_CHANNEL_HANDLE`, else `@DreamBiker532`. Fetches the latest 50 uploads (+ stats/durations in batches of 50) as videos and gallery thumbnails only — no blog posts.
- Facebook Graph API v22 (`server/social/facebook/`): latest 30 posts (photos incl. album sub-photos) and 25 videos. Photo IDs come from Facebook object IDs or the position inside the post (stable across syncs).
- Older content is not backfilled yet.

### 8.2 Protected endpoints
Auth via `Authorization: Bearer <SYNC_SECRET_KEY or CRON_SECRET>` or `x-sync-secret: <SYNC_SECRET_KEY>`. **No query-string secrets.** No default secret: if neither is set (min 16 chars), every protected request is rejected.

### 8.3 Storage
- **Auto-sync** (`server/social/auto-sync.ts`): content pages and public read APIs call `ensureFreshSocialData()` — blocks (≤12 s) when nothing is synced yet, background `after()` refresh when older than the interval, single-flight, 5-min failure backoff; with a DB it uses the last SUCCESS sync log. Without this, a restart/deploy showed no real content until the cron ran.
- `DATABASE_URL` set → Prisma/PostgreSQL. Required in production (serverless instances don't share memory).
- Unset → in-memory store per server instance.
- Sync responses include `persisted: false` + a warning when there is no database.

### 8.4 No sample content
There is no mock/sample data: the store starts empty and only real synced YouTube/Facebook content is shown (empty states otherwise). Removed: `src/data/placeholder.data.ts`, the stock-photo fallback for Facebook videos and the Unsplash/Picsum image hosts.

### 8.5 Facebook token lifetime
Explorer tokens are short-lived (hours). `npm run facebook:token` (scripts/facebook-token.mjs) exchanges one for a long-lived page token using the issuing app's ID/secret and saves it to `.env.local` without printing it. Long-lived page tokens don't expire but Meta ends data access ~90 days after the admin's last app login; a Meta Business **System User** token avoids that. `/api/admin/social/status` → `facebookToken` shows status and dates (warning 14 days ahead).

### 8.6 Known caveat
Facebook CDN image URLs are signed and **expire**; stored URLs will break over time unless images are copied to own storage during sync (open item).

### 8.7 API routes
| Route | Method | Access |
| :--- | :--- | :--- |
| `/api/social/accounts`, `/videos`, `/posts`, `/photos` (`?platform=&page=&limit=`) | GET | public |
| `/api/social/youtube/channel` | GET | public |
| `/api/contact` | POST | public (zod validation, honeypot, 5 per 10 min per IP; 503 without DB) |
| `/api/admin/social/sync` | GET/POST | protected (also the cron target) |
| `/api/admin/social/status` | GET | protected |
| `/api/social/youtube/sync`, `/api/social/facebook/sync` | POST | protected |

---

## 9. DATABASE (`prisma/schema.prisma`)
`SocialAccount`, `SocialVideo`, `SocialPost`, `SocialPhoto`, `SocialSyncLog`, `ContactMessage` (fullName, email, phone, subject, inquiryType, message, ipAddress, userAgent, handledAt). **No migrations exist yet**: create the first with `npx prisma migrate dev --name init`, deploy with `npx prisma migrate deploy` (or `npx prisma db push`).

---

## 10. CLIENT DECISIONS (do not undo)
1. Only real photos of Hanif; no stock models; no stock images presented as his content in production.
2. Footer: road photo, email shown, no WhatsApp/TikTok/scroll-to-top, no line on top.
3. Navbar: no search; mobile menu without TikTok.
4. Social CTA cards: medium, platform colours, no images, circle-expand arrow.
5. Home hero: Bengali text, bold gold-orange design, photo never hidden by the navbar, stats count up.
6. No breadcrumbs; compact vertical spacing.
7. Gallery: header like other pages; carousel opens on photo click (no lightbox).
8. Videos: separate YouTube and Facebook "latest" sections; platform colours for hovers.
11. Blog: Facebook posts only (no YouTube videos or Community posts).
9. Timeline: numbered orange nodes with halo, scroll-progress line.
10. Workflow: commit every verified change on the `dev` branch; never push without being asked.

---

## 11. OPERATING RULES FOR AGENTS
1. Before finishing any change run (in `dream-biker-frontend/`): `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`. CI runs the same on push/PR.
2. Check UI changes in a browser at desktop **and** phone widths.
3. Follow §5 (colours, sharp-text, spacing, animation rules).
4. Never expose secrets via `NEXT_PUBLIC_*`.
5. Never re-introduce old routes (§4).
6. Bengali text in source files may use different Unicode compositions for the same visible character (e.g. "য়"). Exact-string edits can silently fail — match by position or a pattern and verify.
7. Keep copy respectful and in line with *মানবতাই শান্তির প্রতীক*.

---

## 12. RUNNING & DEPLOYING
```bash
cd dream-biker-frontend
npm install            # postinstall runs `prisma generate`
cp .env.example .env.local   # then fill in values
npm run dev            # http://localhost:3000
npm run typecheck && npm run lint && npm test && npm run build
```

Environment variables: see `dream-biker-frontend/.env.example` (YouTube/Facebook credentials, `SYNC_SECRET_KEY`, `CRON_SECRET`, `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`, `).

Vercel: project root `dream-biker-frontend`; set all env vars; `vercel.json` schedules the sync every 30 minutes, which **needs the Pro plan** (Hobby allows one run per day) — otherwise use an external scheduler that calls the sync endpoint with the secret header.

### Open production items
Real API credentials and content; PostgreSQL + first migration; copy Facebook images to own storage; sync schedule/plan; contact notifications or admin view; domain + `NEXT_PUBLIC_SITE_URL`; privacy policy fixes (mentions a newsletter that doesn't exist, inconsistent dates); monitoring/alerts; content backfill; Prisma 7 upgrade (fixes a build-time-only audit warning).

---
*End of Knowledge Base — Dream Biker Platform.*
