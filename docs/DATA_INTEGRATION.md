# Public data adapter and integration requirements

## Separation of concerns

Domain types live in `lib/types.ts`, demonstration fixtures in `lib/demo-data.ts`, and the replaceable access boundary in `lib/data-service.ts`. UI code must consume normalized Masewera265 domain records, never provider-specific payloads. Provider credentials must remain on the backend and must never use `VITE_` variables.

Set `VITE_DATA_MODE=demo` for this delivery. `connected` mode must not silently fall back to fictional data when a request fails. `VITE_API_BASE_URL` may contain only the public API gateway origin.

## Required public endpoints

The backend lead should supply versioned, paginated public endpoints (exact paths may be adjusted while retaining these resources):

| Resource | Suggested endpoint | Required fields |
| --- | --- | --- |
| Sports | `GET /v1/public/sports` | id, slug, name, availability, formats |
| Events | `GET /v1/public/events` | id, sport, competition, season, participants, scheduledAt, timezone, venue, location, lifecycleStatus, outcome, trust, updatedAt, source |
| Event detail | `GET /v1/public/events/:id` | shared event fields plus sport-specific sections such as timeline, lineups, periods, sets, heats, entrants, rankings or brackets |
| Competitions | `GET /v1/public/competitions` | id, slug, name, sport, organizer, season, scope, format, participants, trust |
| Teams | `GET /v1/public/teams` | id, slug, public name, sport, location, identity assets, squads, seasons, trust |
| Athletes | `GET /v1/public/athletes` | id, slug, approved public identity, sport, affiliations, performances, history, trust |
| Venues | `GET /v1/public/venues` | id, slug, name, classified location, coordinates where approved, associated events |
| Organizations | `GET /v1/public/organizations` | id, slug, name, type, sports, location, linked records, trust |
| News | `GET /v1/public/articles` | slug, title, dek, body, publishedAt, source, media credit, related records |
| Geography | `GET /v1/public/places` | stable region, district and locality identifiers and parent relationships |
| Search | `GET /v1/public/search?q=` | grouped results by supported entity type, canonical URL, label and context |

List endpoints need `page`, `pageSize`, `sport`, `dateFrom`, `dateTo`, `competition`, `location`, `lifecycleStatus`, and `participation` filters where applicable.

## Trust, status and freshness

Every connected record must keep these independent:

- `trust`: `Official | Verified | Reported | Unverified`
- `lifecycleStatus`: sport-appropriate scheduled/live/final/postponed/cancelled state
- `updatedAt`: ISO-8601 timestamp from the source or Masewera265 publication layer
- `isDemo`: never derived from trust; false for genuine connected records
- `source`: public attribution object suitable for display

Dates should arrive as ISO-8601 values with an explicit offset. The UI defaults to `Africa/Blantyre` and labels displayed times as CAT.

## Runtime states

The connected adapter must expose loading, empty, unavailable, error-with-retry and stale-data states. On refresh failure, retained data may be displayed only with its last successful update and a clear stale warning. A failed real request must never be replaced by demo records.

## Provider integration boundary

API-Football/API-Sports and Sportmonks are backend integrations. The backend must normalize provider identifiers, confirm subscription and Malawian competition coverage, respect licensing, apply caching/rate limits and publish only approved public records. The browser receives Masewera265 records and no provider secret.
