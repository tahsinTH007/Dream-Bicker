# DREAM BIKER (হানিফ) — COMPLETE AI AGENT KNOWLEDGE BASE & SYSTEM MANUAL
*Document Version: 1.0.0 | Generated: November 2026 | Project: Dream Biker Official Platform*

> **NOTICE FOR AI AGENTS & DEVELOPERS:**  
> This file contains the complete, authoritative documentation of the Dream Biker codebase, architecture, design system, data pipelines, historical user decisions, and operational rules. Read this document before making any modifications to the codebase.

---

## 1. EXECUTIVE PROJECT SUMMARY

### 1.1 Brand Identity & Person
- **Subject**: Md. Hanif Hossain (হানিফ), widely known as **Dream Biker** (ড্রিম বাইকার).
- **Profession & Role**: Prominent Bangladeshi motovlogger, humanitarian content creator, and grassroots social worker.
- **Brand Tagline**: *"Every Life Has a Story. Every Act of Kindness Matters."* (প্রতিটি জীবনের একটি গল্প আছে। প্রতিটি মানবিক কাজই মূল্যবান।)
- **Impact Motto**: *"মানবতাই শান্তির প্রতীক"* (Humanity is a Symbol of Peace).
- **Core Mission**: Traveling across Bangladesh on a motorcycle to uncover stories of underprivileged people, initiate village rehabilitation, provide flood and disaster relief, and inspire millions through authentic documentary storytelling.

### 1.2 Official Channels & Reach
- **YouTube**: [`@DreamBiker532`](https://www.youtube.com/@DreamBiker532) — Over 837K+ subscribers, 136M+ lifetime views, 430+ documentary videos.
- **Facebook**: [`BuydreambyHanif`](https://www.facebook.com/BuydreambyHanif) — Over 4.5M+ active followers, field dispatches, reels, and community discussions.
- **Official Contact**: `md.hanifhossan6991@gmail.com`
- **Location**: Bangladesh (countrywide reach).

---

## 2. ARCHITECTURE & TECH STACK

### 2.1 Single-Project Philosophy (CRITICAL)
- **Zero Separate Backends**: This repository is **100% full-stack Next.js**. There is **NO separate Express, NestJS, Fastify, or Python backend**.
- All server-side logic, API endpoints, background cron jobs, social media synchronization workers, and database operations run directly inside Next.js App Router (`src/app/api/...` and `src/server/...`).
- **Never create a separate backend folder or service.** Everything belongs in `dream-biker-frontend`.

### 2.2 Technology Breakdown
| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.4.6 | App Router, React Server Components (RSC) by default, Turbopack enabled |
| **Language** | TypeScript 5.x | Strict mode (`strict: true`), zero `any` allowance, 100% type safety |
| **UI & Styling** | Tailwind CSS v4 | CSS variables design system, custom utility classes, responsive mobile-first |
| **Motion** | Framer Motion | Viewport animations, staggered entrances, scroll-linked progress bars |
| **Icons** | Lucide React + React Icons | `lucide-react` for UI icons; `react-icons/fa6` and `react-icons/si` for brand logos |
| **ORM & Database** | Prisma ORM v6 + PostgreSQL | Relational schema in `prisma/schema.prisma` with high-speed in-memory fallback |
| **Image Optimization** | `next/image` | Configured for remote CDN patterns (YouTube `ytimg`, Meta `fbcdn`, Unsplash) |
| **Validation** | Zod | Server-side environment variable and payload parsing |

---

## 3. WORKSPACE & CODEBASE DIRECTORY MAP

### 3.1 Workspace Root
```
e:\Freelance Work\Dream Biker\
├── .vscode/                     # VSCode configuration
├── dream-biker-frontend/        # The complete Next.js full-stack application
├── README.md                    # Root workspace overview
├── PROJECT_KNOWLEDGE_BASE.md    # Master AI agent context (This file)
└── PROJECT_KNOWLEDGE_BASE.txt   # Plain text version for agents/parsers
```

### 3.2 Frontend Architecture (`dream-biker-frontend/`)
```
dream-biker-frontend/
├── prisma/
│   └── schema.prisma            # PostgreSQL schema (SocialAccount, SocialVideo, etc.)
├── public/
│   └── images/
│       ├── author/              # Hanif's verified author photos (hanif_1.png, hanif_2.png, hanif_3.png)
│       ├── profile/             # Profile variants (hanif_avatar.png, hanif_portrait.png, hanif_sea.png)
│       ├── logo/                # Logo assets (logo.png)
│       ├── hero_bike.png        # Transparent hero motorcycle cutout
│       └── footer_bg.png        # Seamless highway road texture for the footer
├── src/
│   ├── app/
│   │   ├── (website)/           # Main website route group (inherits website layout)
│   │   │   ├── about/page.tsx   # Biography, timeline, values, social CTA
│   │   │   ├── blog/page.tsx    # Stories, field articles, Facebook posts
│   │   │   ├── contact/page.tsx # Contact form, official email, emergency guidelines
│   │   │   ├── gallery/page.tsx # Photo gallery with coverflow/masonry & lightbox
│   │   │   ├── privacy-policy/page.tsx
│   │   │   ├── terms-and-conditions/page.tsx
│   │   │   ├── videos/page.tsx  # Video library with platform filters (All, YT, FB)
│   │   │   ├── layout.tsx       # Website shell (Navbar, Footer, WebsiteLayout)
│   │   │   └── page.tsx         # Home page (Hero, Intro, Videos, Photos, Social CTA)
│   │   ├── api/
│   │   │   ├── admin/social/    # Protected administrative endpoints (sync, status)
│   │   │   └── social/          # Public and provider sync endpoints (accounts, videos, posts, photos)
│   │   ├── globals.css          # Tailwind CSS v4 variables and global font settings
│   │   ├── layout.tsx           # Root HTML layout with Noto Sans Bengali font definition
│   │   ├── loading.tsx          # Root loading suspense skeleton
│   │   └── not-found.tsx        # Branded 404 error page
│   ├── components/
│   │   ├── layouts/             # SectionContainer, WebsiteLayout
│   │   ├── shared/              # Navbar, Footer, MobileNav, Logo, PageHeader, SectionHeading, SocialLinks
│   │   └── ui/                  # Button, Input, Textarea
│   ├── config/
│   │   ├── navigation.config.ts # Primary 6 menu links, quick links, legal links
│   │   ├── site.config.ts       # Meta tags, author info, email, branding text
│   │   └── social.config.ts     # YouTube, Facebook, Instagram credentials & URLs
│   ├── data/
│   │   ├── navigation.data.ts   # Navigation data models
│   │   └── placeholder.data.ts  # In-memory realistic dataset (fallback when DB is offline)
│   ├── features/                # Feature-driven modular components:
│   │   ├── about/components/    # about-hero, about-bio, about-timeline, about-values, about-social
│   │   ├── blog/components/     # blog-list-client
│   │   ├── contact/components/  # contact-form, contact-view
│   │   ├── gallery/components/  # coverflow-carousel, gallery-view
│   │   ├── home/components/     # hero-section, about-intro-section, home-videos-section, home-posts-section, home-photos-section, social-cta-section
│   │   └── videos/components/   # videos-list-client
│   ├── lib/
│   │   ├── db/prisma.ts         # Prisma Client singleton
│   │   ├── env/server.ts        # Server-side Zod environment validation
│   │   └── utils.ts             # Tailwind class merging (`cn`), date formatting, duration formatters
│   ├── server/                  # Server-only services (never bundled to browser)
│   │   ├── auth/sync-auth.ts    # SYNC_SECRET_KEY validator
│   │   └── social/              # YouTube client, Facebook client, normalizer, storage service, sync service
│   └── types/                   # TypeScript interfaces (SocialAccount, SocialVideo, SocialPost, SocialPhoto)
├── next.config.ts               # Next.js configuration, remotePatterns, permanent 301 redirects
├── package.json                 # Dependency definitions and scripts
└── vercel.json                  # Automated 30-minute sync cron job configuration
```

---

## 4. NAVIGATION ARCHITECTURE & PERMANENT REDIRECTS

### 4.1 The 6 Core Navigation Routes
The application has strictly **six** primary navigation items. No other pages should be added to the main navigation:
1. **হোম (`/`)** — Hero section with stats, mission summary, latest videos, field dispatches, photo highlights, and social community CTA.
2. **পরিচিতি (`/about`)** — Full biography, core traits, interactive scroll-progress timeline, core values, and community callout.
3. **ভিডিও (`/videos`)** — YouTube and Facebook videos with interactive tabs, duration badges, view counts, and video modals/links.
4. **ব্লগ (`/blog`)** — Community stories and Facebook dispatches presented in clean card layouts.
5. **গ্যালারি (`/gallery`)** — High-resolution photos from expeditions across Bangladesh with full-screen interactive lightbox.
6. **যোগাযোগ (`/contact`)** — Contact form, official email (`md.hanifhossan6991@gmail.com`), social channels, and emergency relief notes.

### 4.2 Obsolete Routes & Permanent 301 Redirects
During development, legacy redundant routes were pruned and permanently mapped in `next.config.ts`:
- `/humanitarian-work` ➡️ Redirects to `/about`
- `/stories` & `/stories/:path*` ➡️ Redirects to `/blog`
- `/achievements` ➡️ Redirects to `/about`
- `/social` & `/social/:path*` ➡️ Redirects to `/videos`

> **STRICT RULE FOR AI AGENTS**: Never create links, components, or files for `/humanitarian-work`, `/stories`, `/achievements`, or `/social`. Always route users to `/about`, `/blog`, or `/videos`.

---

## 5. DESIGN SYSTEM & UI CONVENTIONS

### 5.1 Color Palette
- **Background Root**: Deep Charcoal/Obsidian (`#080a0c`, `#0c0f12`)
- **Card & Surface Backgrounds**: Elevated dark glass (`#12161b`, `#161c24` with `border-white/5` or `border-white/10`)
- **Primary Brand Accent**: Radiant Fire Orange (`#ff5722`, `#ff7a45`) — Represents passion, road adventure, and warmth.
- **Secondary Accent**: Forest & Relief Emerald (`#22c55e`, `#16a34a`) — Represents humanitarian aid and nature.
- **Brand Social Colors**:
  - **Facebook**: Official Blue (`#1877F2`)
  - **YouTube**: Official Red (`#FF0000`)
  - **Instagram**: Radiant Magenta/Orange gradient

### 5.2 Typography
- **Bengali Text**: `Noto Sans Bengali` (loaded via Google Fonts in `src/app/layout.tsx` under `--font-bengali`). Applied to all Bengali titles, body copy, and UI strings.
- **Latin & Numbers**: `Manrope` / `Inter` (`--font-sans`). Applied to statistics, dates, duration badges, and English brand terms.

---

## 6. COMPONENT-BY-COMPONENT IMPLEMENTATION DETAILS

### 6.1 Navbar (`src/components/shared/navbar.tsx` & `mobile-nav.tsx`)
- **Search Option Removed**: Per explicit client request, search inputs or buttons are NOT present in the header.
- **Branding**: Displays the official Dream Biker logo (`/images/logo/logo.png`) and title.
- **Desktop**: Clean horizontal row with active route highlights.
- **Mobile Menu**: Responsive slide-out drawer with backdrop blur.
- **TikTok Removed**: Per client request, TikTok has been removed from the mobile navigation drawer.

### 6.2 Footer (`src/components/shared/footer.tsx`)
- **Design Inspiration**: Minimal dark bar inspired by MCED architecture.
- **Background Asset**: Features the continuous asphalt road texture (`/images/footer_bg.png`) blended seamlessly with dark gradients.
- **Left Column**: Dream Biker logo, copyright notice (`© 2026 Dream Biker (হানিফ) | সর্বস্বত্ব সংরক্ষিত।`), and quick links.
- **Center/Right**: Official email (`md.hanifhossan6991@gmail.com`) and social icons.
- **Client Exclusions (DO NOT RE-ADD)**:
  - TikTok is **removed**.
  - WhatsApp is **removed**.
  - Floating scroll-to-top button is **removed**.

### 6.3 Hero Section (`src/features/home/components/hero-section.tsx`)
- High-impact cinematic banner with road background and dark radial vignettes.
- Features Hanif's motorcycle cutout (`/images/hero_bike.png`).
- Animated text headlines celebrating adventurous humanitarian journalism.
- Live statistics banner displaying 837K+ Subscribers, 4.5M+ Followers, and 136M+ Views.

### 6.4 Social CTA Section (`src/features/home/components/social-cta-section.tsx`)
- **Design Specification**: Framer-inspired expanding circle card component.
- **Card Format**: Medium-sized cards (not oversized).
- **NO Images in Cards**: Per user instruction (*"dont use image in the card.... use fb, youtube color for there card and make card size medium"*).
- **Facebook Card**: Stylized with official `#1877F2` brand gradient, follower counts, and circular expansion arrow.
- **YouTube Card**: Stylized with official `#FF0000` brand gradient, subscriber counts, and circular expansion arrow.

### 6.5 About Page Animations (`src/features/about/components/*`)
- **Page Header**: Ambient pulsing glow, staggered breadcrumbs, and title entrance.
- **About Hero**:
  - Rotating text animation in heading (*"রোমাঞ্চকর ভ্রমণ"*, *"দূর সীমানার গল্প"*, *"অজানা পথের ডাক"*, *"স্বাধীনতার অনুভূতি"*) using `AnimatePresence`.
  - Continuous floating badge (`y: [0, -6, 0]`).
  - Interactive hover scaling on Hanif's portrait image.
  - Three trait cards with hover lift and icon tilt.
- **About Bio**: Staggered scroll entrance, top gradient accent bar, hover lift (`y: -6, scale: 1.015`).
- **About Timeline**:
  - Implements the exact animation style requested from user screenshot (`media_1795076584892_36a04ca5.png`).
  - Scroll-linked vertical line progress animation (`useScroll` and `useTransform`).
  - Glowing circular node badges (1, 2, 3...) with ambient pulsing orange halo.
- **About Values**: 4 Core Values cards with staggered viewport entrance, card lift, and icon rotation (`rotate: 6deg, scale: 1.12`).
- **About Social**: Animated community call-to-action banner with spring physics on buttons.

---

## 7. AUTHOR & PROFILE PHOTOGRAPHS

The user provided authentic photographs of Hanif, which are saved in the project repository:

| Path | Description | Recommended Usage |
| :--- | :--- | :--- |
| `public/images/profile/hanif_sea.png` | Hanif by the sea wearing sunglasses and brown panjabi/kurta | Primary About Hero portrait, Author avatar |
| `public/images/profile/hanif_portrait.png` | Hanif in side-profile, close-up with beard in natural setting | Editorial author badge, story cards |
| `public/images/profile/hanif_avatar.png` | Hanif on balcony in pink shirt with mountain backdrop | Contact view, small avatars |
| `public/images/author/hanif_1.png` | Mirror copy of `hanif_sea.png` | Blog author thumbnail |
| `public/images/author/hanif_2.png` | Mirror copy of `hanif_portrait.png` | Author bio thumbnail |
| `public/images/author/hanif_3.png` | Mirror copy of `hanif_avatar.png` | Testimonials & quote box |

---

## 8. SOCIAL MEDIA SYNCHRONIZATION ENGINE

The platform integrates directly with Google's YouTube Data API v3 and Meta's Facebook Graph API v22.

### 8.1 YouTube Integration (`src/server/social/youtube/`)
- **API Key**: `YOUTUBE_API_KEY` (Google Cloud Console with YouTube Data API v3 enabled).
- **Channel Handle**: `@DreamBiker532` (`YOUTUBE_CHANNEL_HANDLE`).
- **Batch Processing**: Automatically resolves up to 50 video IDs per call to fetch duration and view statistics without exceeding Google API quotas.
- **Duration Parsing**: Converts ISO 8601 strings (e.g., `PT18M42S`) into human-readable `18:42` format.

### 8.2 Facebook Graph API (`src/server/social/facebook/`)
- **Page ID**: `BuydreambyHanif` (`FACEBOOK_PAGE_ID`).
- **Access Token**: `FACEBOOK_ACCESS_TOKEN` (Long-lived Page Access Token with `pages_read_engagement`, `pages_read_user_content`).
- **Data Extracted**: Public status posts, video reels, cover images, and high-resolution photo attachments.

### 8.3 Dual Storage Architecture (`src/server/social/storage/`)
- **If `DATABASE_URL` is configured**: Saves normalized records into PostgreSQL tables (`SocialAccount`, `SocialVideo`, `SocialPost`, `SocialPhoto`, `SocialSyncLog`).
- **If `DATABASE_URL` is empty or offline**: Seamlessly falls back to `src/data/placeholder.data.ts`. The site **never crashes** or shows blank screens if the database is unconfigured.

### 8.4 API Routes Table
| Route | Method | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `/api/social/accounts` | `GET` | Public | Returns aggregated follower, subscriber, and view metrics |
| `/api/social/videos` | `GET` | Public | Paginated videos with platform filter (`all`, `youtube`, `facebook`) |
| `/api/social/posts` | `GET` | Public | Paginated posts and stories |
| `/api/social/photos` | `GET` | Public | Paginated photo gallery images |
| `/api/social/youtube/channel` | `GET` | Public | Raw YouTube channel profile data |
| `/api/admin/social/sync` | `POST` / `GET` | Protected | Full synchronization triggered by admin or Vercel Cron |
| `/api/admin/social/status` | `GET` | Protected | System health, database connection status, and last sync logs |
| `/api/social/youtube/sync` | `POST` | Protected | Manually syncs only YouTube |
| `/api/social/facebook/sync` | `POST` | Protected | Manually syncs only Facebook |

> **Authentication for Protected Routes**: Requires `SYNC_SECRET_KEY` provided via `Authorization: Bearer <KEY>`, `x-sync-secret: <KEY>`, or `?secret=<KEY>`.

---

## 9. DATABASE SCHEMA (PRISMA)

Located at `prisma/schema.prisma`:
- `SocialAccount`: Stores channel/page details (`providerAccountId`, `subscriberCount`, `followerCount`, `totalViews`, `totalVideos`).
- `SocialVideo`: Stores video details (`provider`, `externalId`, `title`, `duration`, `viewCount`, `isShortOrReel`).
- `SocialPost`: Stores feed posts (`provider`, `externalId`, `content`, `mediaUrls`, `publishedAt`).
- `SocialPhoto`: Stores gallery images (`imageUrl`, `thumbnailUrl`, `caption`, `width`, `height`).
- `SocialSyncLog`: Audits synchronization operations (`provider`, `status`, `itemsSynced`, `durationMs`).

---

## 10. CLIENT PREFERENCES & CONVERSATION HISTORY

For any AI agent continuing work on this project, keep in mind these exact historical decisions made by the client:
1. **Removed Files Cleanup**: All obsolete files, test scripts, legacy mockup crops, and unused components were cleaned out. Keep the repository minimal and tidy.
2. **Author Portrait Selection**: Only use Hanif's actual photos provided in `public/images/profile/` and `public/images/author/`. Never use generic stock models for Hanif.
3. **Footer Specification**:
   - MCED-style clean black bar.
   - Asphalt road texture background image (`/images/footer_bg.png`).
   - Support email prominently shown: `md.hanifhossan6991@gmail.com`.
   - **NO** WhatsApp, **NO** TikTok, **NO** scroll-to-top button.
4. **Social CTA Cards**:
   - Medium dimensions.
   - Use Facebook blue and YouTube red background colors.
   - **NO** photos inside these cards.
   - Circle expand arrow button style.
5. **Navbar Configuration**:
   - **NO** search input in desktop navbar.
   - Mobile menu has **NO** TikTok link.
6. **Timeline Animation Style**:
   - Numbered nodes (1, 2, 3...) with an orange ambient halo aura ring.
   - Continuous scroll progress bar fill.
7. **Animation Richness on About Page**:
   - Framer Motion used throughout: Hero rotating text with SVG line, bio cards hover lift, value cards icon rotation, social CTA bounce.

---

## 11. DEVELOPER & AI AGENT OPERATIONAL RULES

When working in this codebase, any AI agent **MUST** follow these rules:

1. **Verify Before Completing**:
   - Always run `npx tsc --noEmit` to verify TypeScript types.
   - Always run `npm run lint` to verify ESLint compliance.
   - Always verify that `npm run build` succeeds across all 20 routes.
2. **Maintain Next.js App Router Standards**:
   - Add `"use client"` directive to components using hooks (`useState`, `useEffect`, `useScroll`, etc.) or Framer Motion interactive events.
   - Keep page metadata and static shell components as React Server Components (RSC) where possible.
3. **Never Re-introduce Obsolete Routes**:
   - Never create links or pages for `/humanitarian-work`, `/stories`, `/achievements`, or `/social`.
4. **Preserve Bengali Cultural Tone**:
   - Keep copy respectful, inspiring, and aligned with Dream Biker's humanitarian mission: *"মানবতাই শান্তির প্রতীক"*.
5. **Security Best Practices**:
   - Never expose API keys or secrets (`YOUTUBE_API_KEY`, `FACEBOOK_ACCESS_TOKEN`, `SYNC_SECRET_KEY`) to the client bundle (do NOT prefix them with `NEXT_PUBLIC_`).

---

## 12. RUNNING & DEPLOYING THE PROJECT

### 12.1 Local Development Commands
```bash
# Navigate to the frontend directory
cd dream-biker-frontend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run development server
npm run dev
# -> Opens http://localhost:3000

# Type-check without building
npx tsc --noEmit

# Run ESLint
npm run lint

# Compile optimized production build
npm run build
```

### 12.2 Deployment (Vercel)
1. Push branch to GitHub/GitLab.
2. Connect repository to Vercel (Root Directory: `dream-biker-frontend`).
3. Set environment variables in Vercel Dashboard:
   - `YOUTUBE_API_KEY`
   - `YOUTUBE_CHANNEL_HANDLE`
   - `FACEBOOK_PAGE_ID`
   - `FACEBOOK_ACCESS_TOKEN`
   - `SYNC_SECRET_KEY`
   - `DATABASE_URL` *(Optional, falls back to in-memory store if omitted)*
4. Deploy. Cron jobs in `vercel.json` will trigger automated sync every 30 minutes.

---
*End of Knowledge Base — Dream Biker Platform.*
