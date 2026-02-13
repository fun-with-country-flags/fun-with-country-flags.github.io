# CLAUDE.md

## Project Overview

Single-page flag knockout tournament deployed at fun-with-country-flags.github.io. Frontend on GitHub Pages, backend on Cloudflare Workers + D1.

## Frontend (`/`)

Plain HTML/CSS/JS — no build step, no dependencies.

- **index.html** — Shell with controls, progress bar, `#app` mount point, welcome modal, dark mode toggle.
- **main.js** — All app logic: 113-country `flags` array, tournament engine (single-elimination with bye handling), match rendering, arrow-key navigation, session management (UUID v4 in localStorage), API integration, Windows flag-emoji fallback via flagcdn.com PNGs.
- **style.css** — Responsive layout (max-width 840px), Fredoka/Nunito fonts, glassmorphic cards, animated gradient background, dark mode.

Run locally by opening `index.html` in a browser.

## Backend (`/flag-tournament-api`)

Cloudflare Workers + D1 (SQLite). TypeScript, tested with Vitest.

- `src/index.ts` — Router: `POST /api/vote`, `GET /api/leaderboard`, CORS preflight.
- `src/handlers/vote.ts` — Validates flag code + session ID, inserts vote, prevents duplicates.
- `src/handlers/leaderboard.ts` — Aggregates votes, returns ranked list (default 10, max 50). 60s cache.
- `src/utils/` — CORS (allows GitHub Pages + localhost + file://), flag validation, request validation.
- `schema.sql` — `votes` table with indexes on `flag_code` and `timestamp`.

```bash
cd flag-tournament-api
npm run dev      # local dev on :8787
npm run test     # vitest
npm run deploy   # deploy to Cloudflare
```
