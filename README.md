# Dream Biker (Hanif)

Official website of **Dream Biker** (ড্রিম বাইকার) — Md. Hanif Hossain. A single full-stack Next.js app in [`dream-biker-frontend`](./dream-biker-frontend) that shows his YouTube and Facebook videos, posts and photos.

## Quick start

```bash
cd dream-biker-frontend
npm install                  # also generates the Prisma client
cp .env.example .env.local   # fill in what you have; everything is optional for local dev
npm run dev                  # http://localhost:3000
```

## Quality checks (also run by CI on every push / PR)

```bash
cd dream-biker-frontend
npm run typecheck
npm run lint
npm test
npm run build
```

## Documentation

- [`dream-biker-frontend/README.md`](./dream-biker-frontend/README.md) — setup, environment variables, APIs, sync, deployment.
- [`PROJECT_KNOWLEDGE_BASE.md`](./PROJECT_KNOWLEDGE_BASE.md) ([.txt](./PROJECT_KNOWLEDGE_BASE.txt)) — full system manual: design rules, client decisions, operating rules for AI agents and developers.
