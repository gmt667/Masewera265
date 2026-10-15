# API dependencies and role permissions

The current release is a public frontend plus an isolated Dashboard Demo. It has no authentication or authorization service. Client-side role selection is presentation only and must never protect private data.

## Dependency matrix

| Area | Required backend contract | Current mode |
|---|---|---|
| Public directories | `GET /sports`, `/teams`, `/athletes`, `/organizations`, `/venues` with trust and freshness | Demo adapter |
| Events and results | `GET /events` with sport-specific payloads and Africa/Blantyre timestamps | Demo adapter |
| Football providers | Server-side API-Football/API-Sports or Sportmonks adapter | Unavailable |
| Identity | Session endpoint and server-issued role claims | Unavailable |
| Following and saved news | User-scoped reads and mutations | Device-local demo only |
| Sporting submissions | Draft, evidence, review and correction endpoints | Interaction demo only |
| Verification/publication | Source comparison, decisions, history and publish mutations | Interaction demo only |
| Administration | User/role, configuration, audit and integration-health endpoints | Empty/demo states only |

Connected records must supply an ID, source, trust label, update timestamp, demo state and sporting lifecycle independently.

## Permission matrix

| Capability | Supporter | Athlete | Manager | Organizer | Reporter | Editor | Administrator |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Read public records | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Manage own preferences | Own | Own | Own | Own | Own | Own | Own |
| Request profile changes | — | Own | — | — | — | — | By policy |
| Submit sporting records | — | — | Assigned | Assigned | Assigned event | — | By policy |
| Verify or publish | — | — | — | — | — | Assigned queue | By policy |
| Assign roles/configure sports | — | — | — | — | — | — | Yes |

Every connected mutation requires server authorization, validation, audit metadata and explicit success/failure responses. Frontend navigation visibility is not a security boundary.

## Demonstrated workflows

- Role selection and representative navigation.
- Browser-local preference controls and form validation.
- Searchable request table, empty results and status labels.
- Success feedback that explicitly states no remote submission occurred.

## Outstanding backend work

- Authentication and authorization.
- Public entity and sport-specific event APIs.
- Upload, moderation, verification and publication workflow.
- Notifications, synchronization, audit history and integration monitoring.
- Approved official crest and media catalogue with provenance and usage permission.

## Football workflow status transitions

The dashboard demo keeps workflow status separate from trust labels and match status:

`Draft -> Submitted -> Under review -> Approved -> Published`

An item may move from `Under review` to `Returned for correction`, then back to `Submitted`. In the current frontend, save, submit and return actions are device-local demonstration behavior; only a connected backend may authorize approval or publication.

| Workflow | Required endpoint | Required payload | Validation / failure behavior |
|---|---|---|---|
| Save draft | `PUT /api/v1/football/drafts/:id` | record type, title, notes, actor session | Local demo saves to browser; connected API must return field errors |
| Submit | `POST /api/v1/football/submissions` | stable record ID, source URL, evidence, proposed change | Require source and relationship IDs; remain draft on failure |
| Review | `POST /api/v1/reviews/:id/decision` | decision, reason, reviewer, source comparison | Server permission required; no client-only approval |
| Return | same review endpoint | returned-for-correction reason | Preserve history and notify through connected service |
| Publish | `POST /api/v1/publications` | approved record, verification, effective date | Server-controlled; never inferred from UI state |
