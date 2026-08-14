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

## Environment Variables

- `WP_API_URL` — WordPress REST API base URL (default: `http://wordpress/wp-json`)
- `NODE_ENV` — Set to `production` in Docker runtime
- `PORT` — Server port (default 3000 in Docker, 5175 in dev)

## TypeScript Setup
- Target: ES2022
- Strict mode enabled
- Path mapping `~/*` → `app/*`
- Includes `.react-router/types` for generated route types
