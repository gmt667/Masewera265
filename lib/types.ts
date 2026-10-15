export type TrustLabel = "Official" | "Verified" | "Reported" | "Unverified";
export type EventStatus = "LIVE" | "UPCOMING" | "FINAL" | "POSTPONED";
export type Availability = "Functional" | "Preview" | "Limited";

export interface Sport {
  slug: string;
  name: string;
  icon: string;
  availability: Availability;
  summary: string;
  format: string;
  federation?: string;
  ranking?: string;
  teamsCount?: number;
  accentColor?: string;
  coverPattern?: string;
}

export interface Team {
  slug: string;
  name: string;
  shortName: string;
  location: string;
  region: string;
  sport: string;
  colors: [string, string];
  trust: TrustLabel;
  about: string;
  isNationalTeam?: boolean;
  nickname?: string;
  founded?: string;
  venue?: string;
  honors?: string[];
  division?: string;
  kind?: "National team" | "Club" | "Institution";
  gender?: "Men" | "Women" | "Mixed";
  logo?: string;
  logoSource?: string;
  logoVerified?: boolean;
  sourceUrl?: string;
  sourceReviewedAt?: string;
  sourceNote?: string;
  completeness?: "Verified" | "Partial" | "Demonstration" | "Unavailable";
  activeStatus?: "Active" | "Historical";
  seasonAffiliations?: { season: string; competition: string; sourceUrl: string }[];
}

export interface EventRecord {
  id: string;
  slug: string;
  sport: string;
  competition: string;
  competitionSlug: string;
  home: string;
  homeSlug: string;
  away: string;
  awaySlug: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time: string;
  venue: string;
  venueSlug: string;
  location: string;
  status: EventStatus;
  trust: TrustLabel;
  updated: string;
  attendance?: string;
}

export interface Competition {
  slug: string;
  name: string;
  sport: string;
  organizer: string;
  season: string;
  scope: string;
  teams: number;
  format: string;
  trust: TrustLabel;
}

export interface Athlete {
  slug: string;
  name: string;
  sport: string;
  team: string;
  teamSlug: string;
  role: string;
  region: string;
  number: string;
  trust: TrustLabel;
  sourceUrl?: string;
  sourceReviewedAt?: string;
  sourceNote?: string;
  completeness?: "Verified" | "Partial" | "Demonstration" | "Unavailable";
  affiliations?: { season: string; team: string; teamSlug?: string; sourceUrl: string }[];
}

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  sport: string;
  location: string;
  published: string;
  readTime: string;
  category: string;
}
