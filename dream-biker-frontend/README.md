# Dream Biker (হানিফ) — Official Website

> *প্রতিটি জীবনের একটি গল্প আছে। প্রতিটি মানবিক কাজই মূল্যবান।*

Official website of Bangladeshi content creator and humanitarian **Hanif (Dream Biker)**. One full-stack Next.js app: the pages, the API routes and the YouTube/Facebook sync all live here. There is no separate backend.

For design rules, past client decisions and agent rules, see [`PROJECT_KNOWLEDGE_BASE.md`](./PROJECT_KNOWLEDGE_BASE.md).

---

## Pages

| Route | Content |
| :--- | :--- |
| `/` | Hero (Bengali, stats count-up), about intro, latest videos, posts and photos, social links |
| `/about` | Biography, timeline, values |
| `/videos` | Latest YouTube and Facebook spotlights, then the filterable archive; videos open on the platform |
| `/blog` | Facebook page posts only: latest-posts spotlight, then the post grid |
| `/gallery` | Photos from posts and video thumbnails; click a photo to open the carousel |
| `/contact` | Contact details and form |
| `/privacy-policy`, `/terms-and-conditions` | Legal |

Old routes (`/stories`, `/social`, `/achievements`, `/humanitarian-work`) redirect permanently.

## Stack

Next.js 16.4 (App Router), React 19, TypeScript, Tailwind CSS v4, framer-motion, Prisma 6 + PostgreSQL (optional), zod, Vitest.

---

## Setup

```bash
npm install                  # postinstall runs `prisma generate`
cp .env.example .env.local
npm run dev                  # http://localhost:3000
```

### Environment variables

All are server-side except `NEXT_PUBLIC_SITE_URL`. See [`.env.example`](./.env.example).

| Variable | Purpose |
| :--- | :--- |
| `YOUTUBE_API_KEY` | YouTube Data API v3 key (Google Cloud Console) |
| `YOUTUBE_CHANNEL_ID` / `YOUTUBE_CHANNEL_HANDLE` | Channel to sync (ID wins; default `@DreamBiker532`) |
| `FACEBOOK_PAGE_ID` | `BuydreambyHanif` |
| `FACEBOOK_PAGE_ACCESS_TOKEN` | Long-lived Page token (`FACEBOOK_ACCESS_TOKEN` accepted as an alias) |
| `FACEBOOK_GRAPH_API_VERSION` | Default `v22.0` |
| `SYNC_SECRET_KEY` | Secret for manual sync/admin calls (≥16 chars). **No default** — unset means those endpoints are locked |
| `CRON_SECRET` | Secret Vercel Cron sends; required for scheduled syncs |
| `DATABASE_URL` | PostgreSQL. Required in production (content persistence, contact messages) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used for SEO/share metadata |
| `SHOW_SAMPLE_CONTENT` | Sample (stock-photo) content when nothing is synced. Unset = on in dev, **off in production** |

### Getting the API credentials

- **YouTube**: Google Cloud Console → enable *YouTube Data API v3* → *Credentials* → *API key* (restrict it to that API).
- **Facebook**: Meta for Developers → create an app → Graph API Explorer → choose the Dream Biker page → *Page Access Token* with `pages_read_engagement`, `pages_read_user_content`, `pages_show_list` → exchange it for a long-lived token.

### Keeping the Facebook token alive

Tokens from Graph API Explorer expire within hours. To get a long-lived page token:

1. In `.env.local` set `FACEBOOK_APP_ID` and `FACEBOOK_APP_SECRET` of **the app that issued the token** (developers.facebook.com → the app → App settings → Basic), and put a fresh Explorer **user** token in `FACEBOOK_USER_ACCESS_TOKEN` (permissions: `pages_show_list`, `pages_read_engagement`, `pages_read_user_content`).
2. Run `npm run facebook:token`. It exchanges the token, fetches the page token for `FACEBOOK_PAGE_ID`, verifies it with Meta, saves it as `FACEBOOK_PAGE_ACCESS_TOKEN` and deletes the user token. Tokens are never printed.
3. Restart the dev server / redeploy with the new value.

Starting from a **user** token gives a page token that doesn't expire; starting from an existing page token only gives ~60 days. Either way Meta still ends **data access** about 90 days after the admin's last login to the app. For a connection with no expiry at all, create a **System User** in Meta Business Settings, give it the Dream Biker page and the app, and generate a token with "Never" expiry.

`GET /api/admin/social/status` reports `facebookToken.status` (`ok` / `warning` 14 days ahead / `expired` / `invalid`) with the exact dates.

---

## API

| Route | Method | Access |
| :--- | :--- | :--- |
| `/api/social/accounts`, `/api/social/videos`, `/api/social/posts`, `/api/social/photos` (`?platform=all\|youtube\|facebook&page=&limit=`) | GET | Public |
| `/api/social/youtube/channel` | GET | Public |
| `/api/contact` | POST | Public — validated, honeypot, 5 messages / 10 min / IP, stored in `ContactMessage` (503 without a database) |
| `/api/admin/social/sync` | GET / POST | Protected — syncs YouTube + Facebook (cron target) |
| `/api/admin/social/status` | GET | Protected |
| `/api/social/youtube/sync`, `/api/social/facebook/sync` | POST | Protected |

Protected routes need **one header** (query-string secrets are not accepted):

```bash
curl -X POST https://your-site/api/admin/social/sync -H "Authorization: Bearer $SYNC_SECRET_KEY"
# or: -H "x-sync-secret: $SYNC_SECRET_KEY"
```

```powershell
Invoke-RestMethod -Method POST -Uri "https://your-site/api/admin/social/sync" -Headers @{ Authorization = "Bearer $env:SYNC_SECRET_KEY" }
```

## Sync & storage

- Each sync fetches the latest 50 YouTube uploads, 30 Facebook posts and 25 Facebook videos and upserts them.
- With `DATABASE_URL` the data goes to PostgreSQL; without it, it lives in one server instance's memory (the sync response then says `persisted: false`).
- `vercel.json` schedules `/api/admin/social/sync` every 30 minutes. That frequency needs Vercel **Pro**; on Hobby use a daily schedule or an external scheduler that sends the secret header.
- Facebook image URLs expire; copying images to own storage during sync is still to do.

## Database

```bash
npx prisma migrate dev --name init   # first time, locally: creates the migration
npx prisma migrate deploy            # in production
```

Models: `SocialAccount`, `SocialVideo`, `SocialPost`, `SocialPhoto`, `SocialSyncLog`, `ContactMessage`.

---

## Scripts

| Command | What it does |
| :--- | :--- |
| `npm run dev` | Development server |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Vitest unit tests (`tests/`) |
| `npm run build` / `npm start` | Production build / server |

CI (`.github/workflows/ci.yml`) runs install, type check, lint, tests and build on pushes to `main`/`dev` and on pull requests.

## Deployment (Vercel)

1. Import the repo; set **Root Directory** to `dream-biker-frontend`.
2. Add the environment variables (production values, including `NEXT_PUBLIC_SITE_URL`, `DATABASE_URL`, `SYNC_SECRET_KEY`, `CRON_SECRET`).
3. Run the database migration, deploy, then trigger a first sync.

Security headers (CSP basics, HSTS, frame/sniff/referrer/permissions policies), `sitemap.xml`, `robots.txt` and the share image are built in.

---

© 2026 Dream Biker (হানিফ). All rights reserved.
