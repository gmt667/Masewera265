# Masewera265 public frontend

The public, mobile-first Masewera265 experience: **Malawi's Digital Home for Sport**, developed by AstraMind Labs.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:5173`. Preview a production build with `npm run build` followed by `npm run preview`.

Validation uses `npm run lint`, `npm run typecheck`, `npm run test:regression`, and `npm run build`.

## Delivery status

All fourteen listed disciplines have independent sport hubs for teams, national representation, competitions, events and participants. Available records remain clearly labelled demonstration data until a connected backend supplies authoritative coverage.

No backend, live score provider, API-Football/API-Sports subscription, Sportmonks subscription, credentials, or current Malawian coverage was supplied or inferred. Public browsing requires no registration.

See [docs/DATA_INTEGRATION.md](docs/DATA_INTEGRATION.md) for the adapter contract, required endpoints and state behaviour.
See [docs/VITE_MIGRATION.md](docs/VITE_MIGRATION.md) for environment safety, backend boundaries, client-rendering limitations and hosting fallback rules.

## Routes

- `/` — multi-sport homepage
- `/sports` and `/sports/[slug]` — directory and sport experiences
- `/fixtures`, `/results`, `/live`, `/events/[slug]` — filters and event centres
- `/competitions`, `/teams`, `/athletes`, `/venues`, `/organizations` — public directories and profiles
- `/news` and `/news/[slug]` — stories and article pages
- `/explore-malawi` — region and district discovery
- `/search` — grouped public-entity search
- `/about` — purpose, coverage and trust semantics
- `/national-teams` — independent Malawi national-team platforms
- `/dashboard` — explicit role-based Dashboard Demo for all seven requested roles

The dashboard access screen, published code and role selector are interaction demonstrations, not authentication or identity verification. They create no account, send no message, grant no permissions and store only explicitly labelled demo profiles and low-risk preferences in the browser. Dashboard forms do not submit or publish sporting records. See [docs/API_ROLE_MATRIX.md](docs/API_ROLE_MATRIX.md) for API dependencies, permissions and remaining backend requirements.

## Accessibility and low-data design

The shell includes skip navigation, visible keyboard focus, semantic headings, labelled controls, touch-sized interactions, responsive cards/tables, a reduced-motion mode and stable artwork sizing. The single supplied cover illustration is locally hosted; other visual treatments are CSS-based to avoid unnecessary downloads.

## Known limitations

- Only the 10-page `Masewera265_Public_Frontend_Profile.pdf` was supplied. The separate meeting PDF, backend contracts, official logos and standalone imagery were not available.
- All sport records are demonstration data. Representative athlete identities are fictional and explicitly labelled.
- Connected mode intentionally shows unavailable states until a backend base URL and adapter implementation are supplied.
- Google fonts are an optional progressive enhancement; local fallbacks preserve the layout without network access.
- The Vite application is client rendered. Titles and descriptions update during navigation, but non-JavaScript crawlers do not receive route-specific HTML; prerendering or SSR is required for full search discoverability.
