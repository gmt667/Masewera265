import { athletes, competitions, districts, events, sports, teams, articles } from "./demo-data";
import type { Athlete, Competition, EventRecord, NewsArticle, Sport, Team } from "./types";
import { malawiVenues, type VenueDetail } from "./venues-data";

export type DataMode = "demo" | "connected";
export type DataResource = "sports" | "events" | "competitions" | "teams" | "athletes" | "venues" | "articles" | "places";
export type DataState = "ready" | "empty" | "stale" | "unavailable" | "error";

export interface PublicDataResult<T> {
  state: DataState;
  data: T[];
  isDemo: boolean;
  updatedAt?: string;
  message?: string;
  retryable: boolean;
}

export interface PublicDataQuery {
  page?: number;
  pageSize?: number;
  sport?: string;
  dateFrom?: string;
  dateTo?: string;
  competition?: string;
  location?: string;
  lifecycleStatus?: string;
  participation?: string;
}

interface ConnectedEnvelope<T> {
  data: T[];
  stale?: boolean;
  updatedAt?: string;
}

const paths: Record<DataResource, string> = {
  sports: "/v1/public/sports",
  events: "/v1/public/events",
  competitions: "/v1/public/competitions",
  teams: "/v1/public/teams",
  athletes: "/v1/public/athletes",
  venues: "/v1/public/venues",
  articles: "/v1/public/articles",
  places: "/v1/public/places",
};

export const dataMode: DataMode = process.env.NEXT_PUBLIC_DATA_MODE === "connected" ? "connected" : "demo";
const apiBaseUrl = process.env.MASEWERA265_API_BASE_URL?.replace(/\/$/, "");
export const connectedDataAvailable = dataMode === "connected" && Boolean(apiBaseUrl);

function demoResult<T>(data: T[]): PublicDataResult<T> {
  return { state: data.length ? "ready" : "empty", data, isDemo: true, retryable: false };
}

function failureResult<T>(state: "unavailable" | "error", message: string): PublicDataResult<T> {
  return { state, data: [], isDemo: false, message, retryable: state === "error" };
}

function appendQuery(url: URL, query?: PublicDataQuery) {
  if (!query) return;
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  }
}

export async function fetchConnectedResource<T>(
  resource: DataResource,
  query?: PublicDataQuery,
): Promise<PublicDataResult<T>> {
  if (!apiBaseUrl) {
    return failureResult("unavailable", "Connected data is enabled, but no approved API endpoint is configured.");
  }

  const url = new URL(`${apiBaseUrl}${paths[resource]}`);
  appendQuery(url, query);

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) {
      return failureResult("error", `The ${resource} service returned HTTP ${response.status}.`);
    }

    const payload: unknown = await response.json();
    const envelope: ConnectedEnvelope<T> = Array.isArray(payload)
      ? { data: payload as T[] }
      : (payload as ConnectedEnvelope<T>);

    if (!envelope || !Array.isArray(envelope.data)) {
      return failureResult("error", `The ${resource} service returned an invalid response.`);
    }
    if (!envelope.data.length) {
      return { state: "empty", data: [], isDemo: false, updatedAt: envelope.updatedAt, retryable: false };
    }
    return {
      state: envelope.stale ? "stale" : "ready",
      data: envelope.data,
      isDemo: false,
      updatedAt: envelope.updatedAt,
      message: envelope.stale ? "Showing the last successful update while the source refresh is unavailable." : undefined,
      retryable: Boolean(envelope.stale),
    };
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    return failureResult("error", timedOut ? `The ${resource} request timed out.` : `The ${resource} service could not be reached.`);
  }
}

export async function fetchConnectedItem<T>(resource: DataResource, slug: string): Promise<PublicDataResult<T>> {
  if (!apiBaseUrl) {
    return failureResult("unavailable", "Connected data is enabled, but no approved API endpoint is configured.");
  }
  try {
    const response = await fetch(`${apiBaseUrl}${paths[resource]}/${encodeURIComponent(slug)}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    if (response.status === 404) return { state: "empty", data: [], isDemo: false, retryable: false };
    if (!response.ok) return failureResult("error", `The ${resource} service returned HTTP ${response.status}.`);
    const payload: unknown = await response.json();
    const item = payload && typeof payload === "object" && "data" in payload
      ? (payload as { data: T }).data
      : payload as T;
    if (!item || typeof item !== "object") return failureResult("error", `The ${resource} service returned an invalid record.`);
    return { state: "ready", data: [item], isDemo: false, retryable: false };
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    return failureResult("error", timedOut ? `The ${resource} request timed out.` : `The ${resource} service could not be reached.`);
  }
}

function resource<T>(resourceName: DataResource, demoData: T[]) {
  return (query?: PublicDataQuery) =>
    dataMode === "connected" ? fetchConnectedResource<T>(resourceName, query) : Promise.resolve(demoResult(demoData));
}

function itemResource<T extends { slug: string }>(resourceName: DataResource, demoData: T[]) {
  return (slug: string) => dataMode === "connected"
    ? fetchConnectedItem<T>(resourceName, slug)
    : Promise.resolve(demoResult(demoData.filter((item) => item.slug === slug)));
}

export const publicData = {
  sports: resource<Sport>("sports", sports),
  events: resource<EventRecord>("events", events),
  competitions: resource<Competition>("competitions", competitions),
  teams: resource<Team>("teams", teams),
  athletes: resource<Athlete>("athletes", athletes),
  venues: resource<VenueDetail>("venues", malawiVenues),
  news: resource<NewsArticle>("articles", articles),
  places: resource<(typeof districts)[number]>("places", districts),
  sport: itemResource<Sport>("sports", sports),
  event: itemResource<EventRecord>("events", events),
  competition: itemResource<Competition>("competitions", competitions),
  team: itemResource<Team>("teams", teams),
  athlete: itemResource<Athlete>("athletes", athletes),
  venue: itemResource<VenueDetail>("venues", malawiVenues),
  article: itemResource<NewsArticle>("articles", articles),
};

export function assertPublicDataMode() {
  if (dataMode === "connected" && !connectedDataAvailable) {
    throw new Error("Connected data requested, but no approved Masewera265 API endpoint is configured.");
  }
}
