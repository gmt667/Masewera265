# Football backend handover

The current application is a public Next.js frontend plus an isolated device-local dashboard demonstration. No browser role selector grants authorization and no local submission changes public data.

## Transport and authentication

- Base path: `/api/v1`; JSON over HTTPS only.
- Public reads may be anonymous. Drafts, preferences, uploads, reviews, publication and administration require an HTTP-only secure session cookie or short-lived bearer token.
- `GET /auth/session` returns `{ user: { id, displayName }, roles, permissions, expiresAt }` or `401`.
- Every mutation requires server-side permission checks, CSRF protection for cookie sessions, an idempotency key, actor ID from the session and an audit entry.
- Never accept reviewer, publisher, club or competition ownership from client-supplied role fields.

## Common response contracts

```ts
type Page<T> = {
  data: T[];
  page: { cursor: string | null; nextCursor: string | null; pageSize: number; total?: number };
  meta: { generatedAt: string; timezone: "Africa/Blantyre"; staleAt?: string };
};

type ApiError = {
  error: {
    code: "VALIDATION_ERROR" | "UNAUTHENTICATED" | "FORBIDDEN" | "NOT_FOUND" |
      "CONFLICT" | "STALE_VERSION" | "RATE_LIMITED" | "SERVICE_UNAVAILABLE";
    message: string;
    requestId: string;
    fields?: Record<string, string[]>;
    retryAfterSeconds?: number;
  };
};
```

Lists accept `cursor`, `pageSize` (default 25, maximum 100), `q`, `sort`, and resource-specific filters. Invalid cursors return `400`; unavailable integrations return `503`. A failed connected request must not be replaced by demonstration records.

## Public football reads

| Endpoint | Filters / response |
|---|---|
| `GET /football/coverage` | `area`, `status`, `season`; `Page<CoverageRecord>` |
| `GET /football/clubs` | `q`, `region`, `district`, `competitionId`, `gender`, `activeStatus`, `season`; stable club IDs and current display name |
| `GET /football/clubs/:clubId` | club identity, historical names, source metadata and links to separately identified teams |
| `GET /football/clubs/:clubId/teams` | gender/age category teams; never merge club and team IDs |
| `GET /football/teams/:teamId/seasons/:seasonId` | affiliation, squad, staff and completeness |
| `GET /football/players/:playerId/affiliations` | season-specific club/team affiliations with effective dates and sources |
| `GET /football/national-teams` | category, gender and active status |
| `GET /football/national-teams/:teamId/campaigns` | competition edition, squad snapshot, staff, fixtures and results |
| `GET /football/competitions` | category, gender, tier, season and active status |
| `GET /football/competitions/:id/editions/:editionId` | participants, rounds, rules, standings/bracket availability and sources |
| `GET /football/events` | team, competition, venue, status, `dateFrom`, `dateTo`; CAT timestamps with offsets |
| `GET /football/events/:eventId` | participants, status, venue, source freshness, supported timeline/statistic sections |
| `GET /football/archive` | `q`, `type`, `yearFrom`, `yearTo`, `competitionId`, verification status |
| `GET /football/search` | grouped canonical links across clubs, teams, players, competitions, events and archive records |

All factual records include `id`, `version`, `verificationStatus`, `completeness`, `sourceReferences[]`, `reviewedAt`, `updatedAt` and `isDemo: false`. `verificationStatus` is independent from event status and workflow status.

## Workflow endpoints

| Action | Method and path | Minimum request | Success |
|---|---|---|---|
| Create draft | `POST /football/submissions` | `{ recordType, targetId?, title, factualClaim, sourceReferences[] }` | `201` draft with server ID/version |
| Update draft | `PATCH /football/submissions/:id` | changed fields and `version` | `200`; `409 STALE_VERSION` on conflict |
| Submit | `POST /football/submissions/:id/transitions` | `{ transition: "submit", version }` | status `submitted` |
| Begin review | same | `{ transition: "start_review", version }` | status `under_review` |
| Return | same | `{ transition: "return", reason, fieldFeedback, version }` | status `returned_for_correction` |
| Resubmit | same | `{ transition: "resubmit", responseToFeedback, version }` | status `submitted` |
| Approve / reject | same | `{ transition: "approve" | "reject", reason, sourceComparison, version }` | stored review decision |
| Publish | `POST /football/publications` | `{ approvedSubmissionId, effectiveAt, version }` | `202` publication job |
| Review history | `GET /football/submissions/:id/history` | none | append-only transitions and audit actors |

Allowed lifecycle: `draft -> submitted -> under_review -> approved -> published`; `under_review -> returned_for_correction -> submitted`; `under_review -> rejected`. Approval requires `football.review`; publication requires the separate `football.publish` permission. The server must reject skipped or unauthorized transitions with `409` or `403`.

## Role-specific mutations

- Supporter: `/me/follows`, `/me/saved-articles`, `/me/notification-preferences`. Delivery status is returned separately; saving a preference never claims delivery.
- Club manager: team/squad affiliation requests, result submissions, club articles and corrections, scoped to managed club IDs.
- Organizer: editions, participants, schedules, venues, rounds and result review, scoped to assigned competitions. Return detectable conflicts as warnings; do not claim exhaustive conflict detection.
- Reporter: assignments and match reports. Event time uses `{ minute, addedMinute, period }`; submission time is server-generated `createdAt`.
- Editor: review queues and decisions with claim/current/proposed/source comparison.
- Administrator: entity merge proposals, source/media metadata, roles, integration health and audit search. Destructive merges require a dry-run and retained aliases.

## Validation and files

- Source-backed factual claims require at least one public source URL, publisher, title, publication date when known, and review date.
- Unknown historical dates use `{ precision: "unknown" | "year" | "month" | "day", value?: string }`; never manufacture a day.
- Upload initiation and completion are separate signed-server operations. Store media rights holder, licence, credit, consent, checksum and moderation state.
- Return field errors without discarding the server draft. Attachments that fail leave the draft retryable.

## Caching and privacy

- Public verified reads may use surrogate caching with explicit `ETag`/`Last-Modified` and stale warnings.
- User, draft, review and audit responses use `Cache-Control: private, no-store`.
- Log request IDs and audit metadata, never access tokens, evidence contents or private contact details.
