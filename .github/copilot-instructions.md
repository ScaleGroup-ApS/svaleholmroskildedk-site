# Copilot Instructions — Svaleholm Roskilde Site

## Build, Test & Development Commands

```bash
# Development server (port 5175)
npm run dev

# Production build
npm run build

# Type-check and code generation
npm run typecheck

# Start production server
npm start
```

**Note:** No separate test or lint suite exists; rely on TypeScript (`npm run typecheck`) for type safety.

## Architecture Overview

This is a **React Router 7 SSR (Server-Side Rendering)** application that renders on Node.js and connects to a WordPress REST API backend.

### Key Architectural Patterns

1. **Server-Rendered Routes** — Every route uses React Router's data loader pattern. Server-side fetches (via `app/lib/wp-api.ts`) fetch data before rendering.
2. **WordPress as Headless CMS** — All dynamic content (pages, posts, rooms, pricing) comes from `WP_API_URL` (default: `http://wordpress/wp-json`). Stored in `app/lib/wp-types.ts` and `app/lib/wp-api.ts`.
3. **Path Alias** — Import path `~/*` resolves to `app/*` (configured in `tsconfig.json`).
4. **Containerized Deployment** — Multi-stage Dockerfile builds and deploys via Node.js; runs on port 3000 in production.

### Directory Structure

- **`app/routes/`** — React Router page components. File names map to URLs:
  - `index.tsx` → `/`
  - `vaerelser.tsx` → `/vaerelser`
  - `vaerelser.$slug.tsx` → `/vaerelser/:slug` (dynamic rooms)
  - `$.tsx` → Catch-all 404 fallback

- **`app/components/`** — Reusable UI components (Header, Footer, Prisberegner, etc.).

- **`app/lib/`** — Utilities and server-side logic:
  - `wp-api.ts` — WP-REST client with error handling; runs only on server
  - `wp-types.ts` — TypeScript types for WordPress responses
  - `i18n.tsx` — Internationalization (Danish-focused)
  - `seo.ts` — SEO metadata helpers
  - `rooms.ts` — Room/pricing data transformations
  - `mailer.server.ts` — Server-side email (runs server-only)

- **`public/`** — Static assets (images, SVGs).

## Key Conventions

### Route Component Pattern
Routes export a `meta()` function (React Router convention) to set per-page meta tags, title, and Open Graph tags. Example:

```tsx
export function meta() {
  return [
    { title: "Page Title" },
    { name: "description", content: "..." },
    { property: "og:title", content: "..." },
  ];
}
```

### Server-Side Data Loading
Use `.server.ts` suffix for files that run only on the server (e.g., `mailer.server.ts`, `wp-api.ts`). Never import these into client components directly.

### Styling & Tailwind
- Tailwind CSS v4 with `@tailwindcss/vite`
- Custom CSS variables in `app.css` (e.g., `bg-surface`, `text-text`, `heading-section`, `btn-primary`)
- Inline styles override Tailwind for theme colors (e.g., `style={{ background: "#0F1714" }}`)

### i18n (Internationalization)
- Use `useT()` hook for translated strings
- Use `useLang()` to get current language context
- Language context provided by `LanguageProvider` in `root.tsx`

### Type Safety
- All routes have `.tsx` extension (not `.jsx`)
- Use `type Route` from React Router for typed loader params and actions
- WordPress types in `wp-types.ts` define all API response shapes

### Error Handling
- Route components export `ErrorBoundary` (React Router convention)
- WP-REST errors throw `WpApiError` with status code
- 404 fallback handled by `$.tsx` catch-all route

### Animation
- Use Framer Motion (`framer-motion`) for animations
- Common pattern: `motion.div` with `motion` prop objects

### Contact Form Spam Defence

The `/kontakt` action runs every submission through `app/lib/antispam.server.ts`
before handing it to the CRM. Layers, cheapest first:

1. **Honeypot** — hidden `subject_line` / `contact_url` inputs. Never rename
   these to autofill-friendly names (`company`, `website`, `address`): a
   browser filling them in silently discards a real enquiry.
2. **Signed timing token** — the loader mints an HMAC-signed timestamp into a
   hidden `_fts` field; submits under 3 seconds, or with a forged/expired
   token, are not humans.
3. **Per-IP rate limit** — in-memory sliding windows (5 per 15 min, 20 per day),
   so it is per-pod, not cluster-wide.
4. **Content scoring** — links, non-Latin script, SEO/crypto phrases, junk
   phone numbers.
5. **Cloudflare Turnstile** — only when `TURNSTILE_SECRET_KEY` is set. Verification
   fails open if Cloudflare is unreachable, so an outage never costs an enquiry.

Bot-shaped submissions get the ordinary `/tak` receipt with nothing delivered
(so the bot learns nothing); anything that could still be a human gets the form
back with its typed values and an explanation. Blocks are logged as
`[kontakt] blokeret henvendelse (...)`.

## Environment Variables

- `WP_API_URL` — WordPress REST API base URL (default: `http://wordpress/wp-json`)
- `NODE_ENV` — Set to `production` in Docker runtime
- `PORT` — Server port (default 3000 in Docker, 5175 in dev)
- `CRM_API_URL`, `CRM_API_TOKEN`, `CRM_SLUG` / `CRM_CUSTOMER_ID` — contact-form
  relay to crm-backend (see `app/lib/crm.server.ts`)
- `TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` — optional CAPTCHA; unset means
  no widget and no verification
- `FORM_TOKEN_SECRET` — optional HMAC secret for the timing token; falls back to
  `CRM_API_TOKEN`, which every replica already shares

Set these in App Settings in the CRM (customer 24 → app `api`), not in a
manifest in this repo.

## TypeScript Setup
- Target: ES2022
- Strict mode enabled
- Path mapping `~/*` → `app/*`
- Includes `.react-router/types` for generated route types
