# Vite migration and hosting notes

Masewera265 is now a browser-rendered React 19 application built by Vite and routed by React Router. The recoverable Next.js baseline is Git commit `3898413`; the final pre-migration navbar state is `236effe`.

## Runtime architecture

- `src/main.tsx` mounts the application and browser router.
- `src/App.tsx` owns the URL map, redirects, dynamic `:slug` routes and not-found route.
- Existing page and feature components remain under `app/` and `components/` to preserve the established design and content.
- `src/platform/` replaces Next Link, Image and navigation helpers with browser-safe React equivalents.
- `lib/data-service.ts` retains `demo`, `connected`, `empty`, `unavailable`, `stale` and `error` behavior.

There were no API routes, middleware, server actions, cookie-based authentication handlers or privileged server modules in the frontend checkout. The dashboard access screen, fixed demonstration code, saved demo profiles and roles remain browser-only interaction previews, not authentication, identity verification or authorization. They create no token and grant no protected access. Real login, permissions, provider credentials, moderation and write operations must be implemented by a separately deployed backend.

## Environment variables

Only variables prefixed with `VITE_` are visible to browser code:

- `VITE_DATA_MODE=demo|connected`
- `VITE_API_BASE_URL=https://public-api.example` — a public gateway origin, never a secret
- `VITE_SITE_URL=https://example.com`

Provider tokens, database credentials, signing secrets and private API keys must never be added to a `VITE_` variable. Connected deployments also require API CORS rules for the exact frontend origin.

## Search and metadata limitation

The former Next.js build produced server-rendered/static HTML per route. Vite now serves one client-rendered HTML shell. Page titles and descriptions update after routing, but crawlers that do not execute JavaScript may see only the default metadata. For strong search discoverability, add a prerendering step or place an SSR-capable frontend in front of the same React route model.

`src/route-metadata.ts` centralizes public, dynamic, dashboard and not-found metadata. The runtime updates descriptions, robots directives, canonical links, Open Graph fields and the Twitter card. Vite generates `sitemap.xml` from the same public route and demo-record model during development and production builds; dashboard routes are excluded. These improvements do not replace prerendering or SSR for crawlers that do not execute JavaScript.

## Nested-route fallback

Every host must rewrite unknown application paths to `/index.html`, while continuing to serve real assets normally. This repository includes:

- `public/_redirects` for Netlify-style hosts;
- `vercel.json` for Vercel;
- for Nginx: `try_files $uri $uri/ /index.html;`;
- for Apache: use `FallbackResource /index.html` or an equivalent rewrite rule.

Without this rule, directly opening or refreshing `/teams/the-flames`, `/events/...`, `/football/history` or `/dashboard/platform` returns a hosting 404 before React Router starts.
