# Dream Biker (হানিফ) — Official Website & Social Media Platform

> **"Every Life Has a Story. Every Act of Kindness Matters."**  
> Official personal brand website, digital magazine, and direct social media synchronization platform for Bangladeshi content creator and humanitarian **Hanif (Dream Biker)**.

---

## 1. Architecture Overview

This project is built as a **unified, full-stack Next.js application** utilizing the **Next.js App Router** with TypeScript.

There is **no external backend framework (NO NestJS, NO Express, NO standalone microservices)**. All frontend user interfaces, server-side data fetching, API route handlers, social media ingestion clients (YouTube Data API v3 & Facebook Graph API v22), data normalization, caching, and persistence reside inside this single codebase.

```
                              Next.js Application
                                       |
                ┌──────────────────────┴──────────────────────┐
                |                                             |
           Frontend UI                                 Server-side Logic
      (App Router & RSC)                         (Route Handlers /api/...)
                |                                             |
   ┌────────────┴────────────┐                      ┌─────────┴─────────┐
   |                         |                      |                   |
 6 Core Pages            Shared UI            YouTube API v3     Facebook Graph API
 (/, /about, /videos,   (Header, Nav,        (Batch 50 IDs,     (Posts, Reels,
  /blog, /gallery,       Footer, etc.)        Duration, Views)   Sub-attachments)
  /contact)                                         |                   |
                                                    └─────────┬─────────┘
                                                              |
                                                    Data Normalizer Service
                                                              |
                                               Dual-Engine Storage Layer
                                               ┌──────────────┴──────────────┐
                                               |                             |
                                        Prisma Client                  In-Memory Store
                                     (PostgreSQL Database)          (Preloaded Fallback)
```

---

## 2. Navigation Structure

The website features exactly six core primary pages:

1. **হোম (`/`)** — Hero showcase, Hanif's photograph, stats, journey intro, latest YouTube & Facebook videos, latest social publications, and photography preview.
2. **পরিচিতি (`/about`)** — Hanif's biography, philosophy, humanitarian activities, life journey timeline, and core values.
3. **ভিডিও (`/videos`)** — YouTube and Facebook videos with platform filters (সব, ইউটিউব, ফেসবুক), thumbnail previews, views, publish dates, duration badges, and direct links to original videos.
4. **ব্লগ (`/blog`)** — Ground-level stories, social updates, and editorial publications sourced from Facebook page posts and YouTube documentaries.
5. **গ্যালারি (`/gallery`)** — High-resolution photography masonry grid with platform badges and an interactive fullscreen lightbox with keyboard navigation.
6. **যোগাযোগ (`/contact`)** — Contact form, official email (`md.hanifhossan6991@gmail.com`), social media links, and emergency humanitarian guidelines.

*Note: Obsolete sub-routes (such as `/stories`, `/achievements`, `/humanitarian-work`, `/social`) are permanently redirected to their respective primary sections via `next.config.ts`.*

---

## 3. Technology Stack

- **Framework**: Next.js 16.4 (App Router, React Server Components by default)
- **Language**: TypeScript (Strict type checking, zero `any`)
- **Styling**: Tailwind CSS v4 & custom design tokens
- **Icons**: Lucide React (`lucide-react`) & React Icons (`react-icons/fa`, `react-icons/si`)
- **Data Persistence**: Prisma ORM v6 (`@prisma/client`) with PostgreSQL & high-speed in-memory fallback
- **Validation**: Zod schema validation for environment variables and request bodies
- **Font Stack**: Noto Sans Bengali (`--font-bengali`) for Bengali text & Manrope / Inter (`--font-sans`) for numbers/headings

---

## 4. Environment Variables Setup

Create a `.env.local` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env.local
```

### Configuration Keys

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `YOUTUBE_API_KEY` | Google Cloud API key with YouTube Data API v3 enabled | `AIzaSy...` |
| `YOUTUBE_CHANNEL_ID` | Dream Biker YouTube Channel ID | `UC...` (or auto-resolved from handle) |
| `YOUTUBE_CHANNEL_HANDLE` | Dream Biker YouTube Handle | `@DreamBiker532` |
| `FACEBOOK_PAGE_ID` | Dream Biker Facebook Page ID or Username | `BuydreambyHanif` |
| `FACEBOOK_PAGE_ACCESS_TOKEN` | Meta Page Access Token (Long-Lived) | `EAA...` |
| `FACEBOOK_APP_ID` | Meta Developer App ID *(optional)* | `1234567890` |
| `FACEBOOK_APP_SECRET` | Meta Developer App Secret *(optional)* | `abcdef...` |
| `DATABASE_URL` | PostgreSQL connection string *(optional, fallback works without it)* | `postgresql://user:pass@localhost:5432/dreambiker` |
| `SYNC_SECRET_KEY` | Secret for manual sync/admin calls (min 16 chars, no default: unset = endpoints locked) | `your-secure-sync-secret-key-min-16-chars` |
| `CRON_SECRET` | Vercel Cron bearer token. **Required on Vercel** or the scheduled sync is rejected (min 16 chars) | `random-cron-secret-min-16-chars` |
| `NEXT_PUBLIC_SITE_URL` | Canonical website URL | `http://localhost:3000` |

> **Security Guarantee**: Neither `YOUTUBE_API_KEY` nor `FACEBOOK_PAGE_ACCESS_TOKEN` nor `SYNC_SECRET_KEY` use the `NEXT_PUBLIC_` prefix. They are strictly isolated to server-side code and are never exposed to the client bundle.

---

## 5. Direct Social Media API Integration Guide

### A. YouTube Data API v3 Setup

1. **Create Google Cloud Project**:
   - Visit the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project named `Dream Biker Platform`.
2. **Enable YouTube Data API v3**:
   - Navigate to **APIs & Services > Library**.
   - Search for **YouTube Data API v3** and click **Enable**.
3. **Generate API Key**:
   - Navigate to **APIs & Services > Credentials**.
   - Click **Create Credentials > API Key**.
   - (Recommended) Restrict the API key to only call `YouTube Data API v3` and restrict HTTP referrers/IPs if hosting on a static server.
4. **Locate Channel ID**:
   - The Dream Biker handle is `@DreamBiker532` ([youtube.com/@DreamBiker532](https://www.youtube.com/@DreamBiker532)).
   - Add the key to `.env.local`:
     ```env
     YOUTUBE_API_KEY="AIzaSyYourGeneratedGoogleApiKey"
     YOUTUBE_CHANNEL_HANDLE="@DreamBiker532"
     ```

### B. Meta / Facebook Graph API Setup

1. **Create Meta Developer App**:
   - Visit [Meta for Developers](https://developers.facebook.com/).
   - Click **My Apps > Create App**.
   - Select **Business** or **Other** as the app use-case.
2. **Add Facebook Login / Graph API**:
   - In the App Dashboard, add the **Facebook Login for Business** or **Pages API** product.
3. **Obtain Required Permissions**:
   - To read public posts, reels, and photos from Hanif's Facebook page (`BuydreambyHanif`), the following permissions are required:
     - `pages_read_engagement`
     - `pages_read_user_content`
     - `pages_show_list`
4. **Generate Page Access Token**:
   - Go to the **Graph API Explorer** ([developers.facebook.com/tools/explorer](https://developers.facebook.com/tools/explorer)).
   - Select your App, and under "User or Page", select **Page Access Token** for the **Dream Biker** page.
   - Add the permissions listed above and click **Generate Access Token**.
   - Use the **Access Token Tool** to exchange this short-lived token for a **Long-Lived Page Access Token** (never expires unless revoked).
5. **Configure `.env.local`**:
   ```env
   FACEBOOK_PAGE_ID="BuydreambyHanif"
   FACEBOOK_PAGE_ACCESS_TOKEN="EAA...YourLongLivedPageToken"
   ```

---

## 6. Server Route Handlers (API Endpoints)

### Public Endpoints (Read-Only)

| Route | Method | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `/api/social/accounts` | `GET` | Aggregated channel metrics (subscribers, followers, views) | None |
| `/api/social/videos` | `GET` | Paginated video list | `platform` (`all` \| `youtube` \| `facebook`), `page`, `limit` |
| `/api/social/posts` | `GET` | Paginated social posts | `platform` (`all` \| `facebook` \| `youtube`), `page`, `limit` |
| `/api/social/photos` | `GET` | Paginated photography gallery | `platform` (`all` \| `facebook` \| `youtube`), `page`, `limit` |
| `/api/social/youtube/channel` | `GET` | Direct YouTube channel profile and statistics | None |

### Protected Endpoints (Admin & Synchronization)

Protected by `SYNC_SECRET_KEY` via:
- `Authorization: Bearer <SYNC_SECRET_KEY>` header, OR
- `x-sync-secret: <SYNC_SECRET_KEY>` header, OR
- `?secret=<SYNC_SECRET_KEY>` query parameter.

| Route | Method | Description |
| :--- | :--- | :--- |
| `/api/admin/social/sync` | `POST` / `GET` | Synchronizes both YouTube and Facebook data (also handles Vercel Cron) |
| `/api/social/youtube/sync` | `POST` | Manually syncs only YouTube content |
| `/api/social/facebook/sync` | `POST` | Manually syncs only Facebook content |
| `/api/admin/social/status` | `GET` | Checks API connection status, quota usage, and database health |

### Triggering Manual Synchronization

**Using cURL:**
```bash
curl -X POST http://localhost:3000/api/admin/social/sync \
  -H "Authorization: Bearer your-secure-sync-secret-key-min-16-chars"
```

**Using PowerShell:**
```powershell
Invoke-RestMethod -Method POST `
  -Uri "http://localhost:3000/api/admin/social/sync" `
  -Headers @{ "Authorization" = "Bearer your-secure-sync-secret-key-min-16-chars" }
```

---

## 7. Automated Synchronization (Cron Job)

The project includes a pre-configured `vercel.json` file to trigger scheduled background synchronization every 30 minutes on Vercel:

```json
{
  "crons": [
    {
      "path": "/api/admin/social/sync",
      "schedule": "*/30 * * * *"
    }
  ]
}
```

Vercel will send a `GET /api/admin/social/sync` request with the `Authorization: Bearer ${CRON_SECRET}` header automatically.

---

## 8. Database & Persistence Layer

The application supports a **dual persistence strategy**:

1. **With PostgreSQL (`DATABASE_URL` configured)**:
   - Data is stored in relational tables defined in `prisma/schema.prisma` (`SocialAccount`, `SocialVideo`, `SocialPost`, `SocialPhoto`, `SocialSyncLog`).
   - Run migrations using:
     ```bash
     npx prisma migrate dev --name init
     ```
2. **Without Database (`DATABASE_URL` not configured)**:
   - The application automatically falls back to a high-speed **in-memory storage engine**.
   - Pre-seeded with authentic Dream Biker statistics (837K+ YouTube subscribers, 136M+ views, 4.5M+ Facebook followers, and actual video titles/photos).
   - Zero crashes or blank pages if the database is offline or unconfigured.

---

## 9. Development & Verification Commands

```bash
# Install dependencies
npm install

# Run database generation
npx prisma generate

# Start Next.js development server
npm run dev

# Run TypeScript compilation check
npx tsc --noEmit

# Run ESLint validation
npm run lint

# Build optimized production bundle
npm run build
```

---

## 10. Deployment Instructions

### Deploy to Vercel

1. Push this repository to GitHub / GitLab.
2. Import the project into your [Vercel Dashboard](https://vercel.com/).
3. Add the environment variables from your `.env.local` in **Project Settings > Environment Variables**:
   - `YOUTUBE_API_KEY`
   - `YOUTUBE_CHANNEL_HANDLE`
   - `FACEBOOK_PAGE_ID`
   - `FACEBOOK_PAGE_ACCESS_TOKEN`
   - `SYNC_SECRET_KEY`
   - `CRON_SECRET` *(needed for the scheduled sync)*
   - `DATABASE_URL` *(if using Supabase, Neon, or Railway PostgreSQL)*
4. Click **Deploy**. Vercel will automatically compile the Next.js App Router project and set up the cron jobs defined in `vercel.json`.

---

© 2026 Dream Biker (হানিফ). All Rights Reserved.
