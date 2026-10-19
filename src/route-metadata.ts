import { articles, athletes, competitions, events, sports, teams } from "../lib/demo-data";
import { malawiVenues } from "../lib/venues-data";

export interface RouteMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  robots?: "index,follow" | "noindex,nofollow";
  type?: "website" | "article";
}

export const defaultDescription = "Malawi sports, fixtures, results, teams, athletes, competitions and communities on Masewera265.";

export const publicStaticRoutes = [
  "/", "/about", "/athletes", "/competitions", "/explore-malawi", "/fixtures", "/results", "/live",
  "/national-teams", "/news", "/organizations", "/search", "/sports", "/teams", "/venues",
  "/football/compare-players", "/football/compare-teams", "/football/competitions", "/football/corrections",
  "/football/coverage", "/football/derbies", "/football/history", "/football/season/2026-27",
  "/football/stadiums", "/football/transfers",
] as const;

const staticMetadata: Record<string, Omit<RouteMetadata, "canonicalPath">> = {
  "/": { title: "Masewera265 | Malawi's Digital Home for Sport", description: "Discover Malawi sports, fixtures, results, national teams, competitions, clubs, athletes and sporting communities." },
  "/about": { title: "About & Coverage", description: "How Masewera265 labels sources, demonstration records, connected data and unavailable coverage." },
  "/athletes": { title: "Athletes Directory", description: "Explore sourced and demonstration athlete profiles across Malawian sport." },
  "/competitions": { title: "Competitions & Tournaments", description: "Browse supported Malawian leagues, cups and championships by sport and season." },
  "/explore-malawi": { title: "Explore Malawi", description: "Discover sporting communities, venues and participation pathways across Malawi's regions and districts." },
  "/fixtures": { title: "Fixtures & Schedules", description: "Browse available Malawian sporting fixtures by sport, status, competition and venue." },
  "/results": { title: "Latest Results", description: "Browse available final scores and match outcomes across supported Malawian sports." },
  "/live": { title: "Live Match Centre", description: "Open ongoing and recently updated event records, with demo and connected states clearly identified." },
  "/national-teams": { title: "Malawi National Teams", description: "Explore independent profiles for Malawi's national sporting selections." },
  "/news": { title: "Sports News", description: "Read available Masewera265 sports stories and features from across Malawi." },
  "/organizations": { title: "Sports Organizations", description: "Directory architecture for Malawi's governing bodies, clubs, schools and sporting institutions." },
  "/search": { title: "Search", description: "Search Masewera265 sports, clubs, athletes, venues, competitions and news." },
  "/sports": { title: "Sports", description: "Explore Masewera265 hubs for Malawi's sporting disciplines and governing pathways." },
  "/teams": { title: "Teams & Clubs Directory", description: "Find supported Malawian clubs, squads and national selections." },
  "/venues": { title: "Sporting Venues & Stadiums", description: "Explore available stadium, court, arena and community-ground records across Malawi." },
  "/football/compare-players": { title: "Compare Football Players", description: "Compare available Malawian football player records without inventing unavailable statistics." },
  "/football/compare-teams": { title: "Compare Football Teams", description: "Compare available Malawian football club and national-team records." },
  "/football/competitions": { title: "Malawian Football Competitions", description: "Season-aware profiles for Malawian football leagues and cups." },
  "/football/corrections": { title: "Football Correction Draft", description: "Prepare a device-local correction draft with source notes for future backend review." },
  "/football/coverage": { title: "Football Coverage", description: "Review the scope, sources and limitations of Masewera265 football coverage." },
  "/football/derbies": { title: "Malawian Football Derbies", description: "Explore documented Malawian football rivalries and their source-aware histories." },
  "/football/history": { title: "Malawian Football Archive", description: "Explore source-aware milestones, teams, matches and records from Malawian football history." },
  "/football/season/2026-27": { title: "FDH Bank Premiership 2026/27", description: "Season-aware coverage architecture for the 2026/27 FDH Bank Premiership." },
  "/football/stadiums": { title: "Malawian Football Stadiums", description: "Explore available records for major Malawian football venues and stadiums." },
  "/football/transfers": { title: "Malawian Football Transfers", description: "Source-aware transfer tracking with unsupported moves kept unavailable." },
};

function dynamicMetadata(pathname: string): RouteMetadata | undefined {
  const match = pathname.match(/^\/(sports|teams|athletes|competitions|events|news|venues)\/([^/]+)$/);
  if (!match) return undefined;
  const [, resource, encodedSlug] = match;
  const slug = decodeURIComponent(encodedSlug);

  if (resource === "sports") {
    const item = sports.find((record) => record.slug === slug);
    if (item) return { title: `${item.name} in Malawi`, description: item.summary, canonicalPath: pathname };
  }
  if (resource === "teams") {
    const item = teams.find((record) => record.slug === slug);
    if (item) return { title: item.name, description: item.about, canonicalPath: pathname };
  }
  if (resource === "athletes") {
    const item = athletes.find((record) => record.slug === slug);
    if (item) return { title: `${item.name} | ${item.sport}`, description: `${item.name} is listed as a ${item.role} associated with ${item.team}. Record trust: ${item.trust}.`, canonicalPath: pathname };
  }
  if (resource === "competitions") {
    const item = competitions.find((record) => record.slug === slug);
    if (item) return { title: item.name, description: `${item.season} ${item.sport} competition record organized by ${item.organizer}. ${item.scope}.`, canonicalPath: pathname };
  }
  if (resource === "events") {
    const item = events.find((record) => record.slug === slug);
    if (item) return { title: `${item.home} vs ${item.away}`, description: `${item.competition} event record at ${item.venue} on ${item.date}. Status: ${item.status}.`, canonicalPath: pathname };
  }
  if (resource === "news") {
    const item = articles.find((record) => record.slug === slug);
    if (item) return { title: item.title, description: item.excerpt, canonicalPath: pathname, type: "article" };
  }
  if (resource === "venues") {
    const item = malawiVenues.find((record) => record.slug === slug);
    if (item) return { title: item.name, description: item.summary, canonicalPath: pathname };
  }
  return undefined;
}

export function resolveRouteMetadata(pathname: string): RouteMetadata {
  const normalizedPath = pathname !== "/" ? pathname.replace(/\/$/, "") : pathname;
  if (normalizedPath.startsWith("/dashboard")) {
    return { title: normalizedPath === "/dashboard/platform" ? "Platform Management Demo" : "Dashboard Demo", description: "Device-local Masewera265 role and workflow demonstration. No authentication or protected access is provided.", canonicalPath: normalizedPath, robots: "noindex,nofollow" };
  }
  const dynamic = dynamicMetadata(normalizedPath);
  if (dynamic) return dynamic;
  const metadata = staticMetadata[normalizedPath];
  if (metadata) return { ...metadata, canonicalPath: normalizedPath, robots: "index,follow" };
  return { title: "Page not found", description: "The requested Masewera265 page could not be found.", canonicalPath: normalizedPath, robots: "noindex,nofollow" };
}

export function getSitemapPaths() {
  return [
    ...publicStaticRoutes,
    ...sports.map(({ slug }) => `/sports/${slug}`),
    ...teams.map(({ slug }) => `/teams/${slug}`),
    ...athletes.map(({ slug }) => `/athletes/${slug}`),
    ...competitions.map(({ slug }) => `/competitions/${slug}`),
    ...events.map(({ slug }) => `/events/${slug}`),
    ...articles.map(({ slug }) => `/news/${slug}`),
    ...malawiVenues.map(({ slug }) => `/venues/${slug}`),
  ];
}
