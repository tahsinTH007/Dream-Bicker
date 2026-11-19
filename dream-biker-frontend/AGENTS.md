<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Architecture & AI Agent Knowledge Base

Before making changes to this codebase, read the full project manual and operational guide in [`PROJECT_KNOWLEDGE_BASE.md`](./PROJECT_KNOWLEDGE_BASE.md) (or [`PROJECT_KNOWLEDGE_BASE.txt`](./PROJECT_KNOWLEDGE_BASE.txt)).

It details:
- Project vision, brand motto (*"মানবতাই শান্তির প্রতীক"*), and official channels.
- Full-stack single Next.js architecture (NO separate backend servers).
- 6 primary routes (`/`, `/about`, `/videos`, `/blog`, `/gallery`, `/contact`) and obsolete route redirects.
- Component-by-component implementation details and user design constraints.
- YouTube and Facebook Graph API synchronization engine and Prisma PostgreSQL schema.
- Operational commands (`npm run build`, `npm run lint`, `npx tsc --noEmit`).

