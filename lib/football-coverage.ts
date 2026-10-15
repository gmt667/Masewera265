export type CoverageStatus = "Verified" | "Partial" | "Demonstration" | "Unavailable";

export interface CoverageRow {
  id: string;
  area: "Competition" | "Club directory" | "National team" | "Historical archive" | "Live data";
  record: string;
  seasonOrScope: string;
  contentStatus: CoverageStatus;
  navigation: "Connected" | "Missing";
  backend: "Connected" | "Device-local" | "Unavailable";
  completeness: string;
  sourceUrl?: string;
  reviewedAt: string;
}

export const footballCoverage: CoverageRow[] = [
  { id: "competition-super-league", area: "Competition", record: "Super League", seasonOrScope: "2025/26 membership", contentStatus: "Partial", navigation: "Connected", backend: "Unavailable", completeness: "Competition identity and selected licensed clubs only; authoritative table, rules and complete results are not connected.", sourceUrl: "https://fam.mw/fam-grants-full-licenses-to-11-clubs/", reviewedAt: "2026-10-14" },
  { id: "competition-ndl", area: "Competition", record: "National Division League", seasonOrScope: "2025/26", contentStatus: "Verified", navigation: "Connected", backend: "Unavailable", completeness: "Official FAM participants, table and match listing are source-accessible; the application stores only a directory summary and links to the live source.", sourceUrl: "https://fam.mw/ndl-2025-26/", reviewedAt: "2026-10-14" },
  { id: "competition-castel", area: "Competition", record: "Castel Challenge Cup", seasonOrScope: "2025/26 national draw", contentStatus: "Verified", navigation: "Connected", backend: "Unavailable", completeness: "Organizer, edition dates, preliminary participation and round-of-32 draw procedure verified. Later-round results are not represented.", sourceUrl: "https://fam.mw/2025-2026-castel-challenge-cup-national-draw-procedure/", reviewedAt: "2026-10-14" },
  { id: "competition-women", area: "Competition", record: "NBM Women's Premiership", seasonOrScope: "Inaugural 2025/26 edition", contentStatus: "Partial", navigation: "Connected", backend: "Unavailable", completeness: "Champion and selected final-day facts are sourced; full fixtures, squads and disciplinary records are absent.", sourceUrl: "https://fam.mw/silver-strikers-crowned-nbm-womens-premiership-champions/", reviewedAt: "2026-10-14" },
  { id: "clubs-super-league", area: "Club directory", record: "2025/26 Super League clubs", seasonOrScope: "16 licensing records", contentStatus: "Partial", navigation: "Connected", backend: "Unavailable", completeness: "FAM licensing notice verifies season membership and licensing outcome. Club histories, squads, venues and honours require separate sources.", sourceUrl: "https://fam.mw/fam-grants-full-licenses-to-11-clubs/", reviewedAt: "2026-10-14" },
  { id: "clubs-all", area: "Club directory", record: "All Malawian clubs", seasonOrScope: "Men, women and youth over time", contentStatus: "Partial", navigation: "Connected", backend: "Unavailable", completeness: "Searchable seed directory only. It is not a complete register and does not imply current activity.", sourceUrl: "https://fam.mw/club/", reviewedAt: "2026-10-14" },
  { id: "team-flames", area: "National team", record: "The Flames", seasonOrScope: "Senior men and selected milestones", contentStatus: "Partial", navigation: "Connected", backend: "Unavailable", completeness: "Identity and selected FAM-published milestones are present. Current squad, staff and live campaign feeds are unavailable.", sourceUrl: "https://fam.mw/history-made/", reviewedAt: "2026-10-14" },
  { id: "team-scorchers", area: "National team", record: "The Scorchers", seasonOrScope: "Senior women", contentStatus: "Partial", navigation: "Connected", backend: "Unavailable", completeness: "Official identity and FAM overview are linked. Current selection and staff require dated announcements.", sourceUrl: "https://fam.mw/womens-senior-national-team/", reviewedAt: "2026-10-14" },
  { id: "team-u20", area: "National team", record: "Malawi Men's Under-20", seasonOrScope: "Identity and historical overview", contentStatus: "Partial", navigation: "Connected", backend: "Unavailable", completeness: "Age-group identity and published historical overview only; no current squad is inferred.", sourceUrl: "https://fam.mw/mens-u-20-national-team/", reviewedAt: "2026-10-14" },
  { id: "team-u17", area: "National team", record: "Malawi Men's Under-17", seasonOrScope: "Identity and historical overview", contentStatus: "Partial", navigation: "Connected", backend: "Unavailable", completeness: "Age-group identity and published historical overview only; no current squad is inferred.", sourceUrl: "https://fam.mw/mens-u-17-national-team/", reviewedAt: "2026-10-14" },
  { id: "archive-timeline", area: "Historical archive", record: "Football timeline", seasonOrScope: "Selected milestones", contentStatus: "Partial", navigation: "Connected", backend: "Unavailable", completeness: "Editorially selected milestones. Entries without direct record-level URLs remain candidates for source hardening.", reviewedAt: "2026-10-14" },
  { id: "archive-seasons", area: "Historical archive", record: "Season and trophy archive", seasonOrScope: "Selected editions", contentStatus: "Partial", navigation: "Connected", backend: "Unavailable", completeness: "Incomplete seed archive; blank seasons are intentional and authoritative tables are not calculated.", reviewedAt: "2026-10-14" },
  { id: "archive-goals", area: "Historical archive", record: "Great goals", seasonOrScope: "Editorial collection", contentStatus: "Demonstration", navigation: "Connected", backend: "Unavailable", completeness: "Interface preview only. No footage is hosted and no item is presented as a definitive ranking.", reviewedAt: "2026-10-14" },
  { id: "live-api", area: "Live data", record: "Fixtures, results and match centres", seasonOrScope: "Public event feeds", contentStatus: "Demonstration", navigation: "Connected", backend: "Unavailable", completeness: "Routes and tabs work with labelled demonstration records. Failed connected requests do not fall back to fictional scores.", reviewedAt: "2026-10-14" },
];
