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
  errorCode?: "CONFIGURATION" | "HTTP" | "TIMEOUT" | "NETWORK" | "INVALID_RESPONSE" | "CANCELLED";
  pagination?: PublicPagination;
}

export interface PublicPagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
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
  pagination?: PublicPagination;
}

type FetchImplementation = typeof fetch;

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

export const dataMode: DataMode = import.meta.env.VITE_DATA_MODE === "connected" ? "connected" : "demo";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
export const connectedDataAvailable = dataMode === "connected" && Boolean(apiBaseUrl);

function demoResult<T>(data: T[]): PublicDataResult<T> {
  return { state: data.length ? "ready" : "empty", data, isDemo: true, retryable: false };
}

function failureResult<T>(
  state: "unavailable" | "error",
  message: string,
  errorCode: PublicDataResult<T>["errorCode"],
  retryable = state === "error",
): PublicDataResult<T> {
  return { state, data: [], isDemo: false, message, retryable, errorCode };
}

function appendQuery(url: URL, query?: PublicDataQuery) {
  if (!query) return;
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function hasString(record: Record<string, unknown>, field: string) {
  return typeof record[field] === "string" && record[field] !== "";
}

function isValidRecord(resource: DataResource, value: unknown) {
  if (!isRecord(value)) return false;
  if (resource === "events") return hasString(value, "slug") && hasString(value, "home") && hasString(value, "away");
  if (resource === "places") return hasString(value, "region") && Array.isArray(value.places);
  return hasString(value, "slug") && hasString(value, resource === "articles" ? "title" : "name");
}

function isValidPagination(value: unknown): value is PublicPagination {
  if (!isRecord(value)) return false;
  return ["page", "pageSize", "total", "totalPages"].every((field) => Number.isInteger(value[field]) && Number(value[field]) >= 0);
}

export interface ConnectedDataClientOptions {
  baseUrl?: string;
  fetchImpl?: FetchImplementation;
  timeoutMs?: number;
}

export interface PublicDataRequestOptions {
  signal?: AbortSignal;
}

export function createConnectedDataClient({ baseUrl, fetchImpl = fetch, timeoutMs = 8_000 }: ConnectedDataClientOptions) {
  const normalizedBaseUrl = baseUrl?.replace(/\/$/, "");
  const inFlight = new Map<string, Promise<PublicDataResult<unknown>>>();
  const signalIds = new WeakMap<AbortSignal, number>();
  let nextSignalId = 1;

  const requestKey = (url: string, signal?: AbortSignal) => {
    if (!signal) return url;
    let id = signalIds.get(signal);
    if (!id) {
      id = nextSignalId++;
      signalIds.set(signal, id);
    }
    return `${url}#signal-${id}`;
  };

  const request = <T>(key: string, load: () => Promise<PublicDataResult<T>>) => {
    const existing = inFlight.get(key) as Promise<PublicDataResult<T>> | undefined;
    if (existing) return existing;
    const promise = load().finally(() => inFlight.delete(key));
    inFlight.set(key, promise as Promise<PublicDataResult<unknown>>);
    return promise;
  };

  const requestSignal = (signal?: AbortSignal) => signal
    ? AbortSignal.any([signal, AbortSignal.timeout(timeoutMs)])
    : AbortSignal.timeout(timeoutMs);

  const fetchResource = <T>(resource: DataResource, query?: PublicDataQuery, options?: PublicDataRequestOptions): Promise<PublicDataResult<T>> => {
    if (!normalizedBaseUrl) return Promise.resolve(failureResult("unavailable", "Connected data is enabled, but no approved API endpoint is configured.", "CONFIGURATION", false));
    const url = new URL(`${normalizedBaseUrl}${paths[resource]}`);
    appendQuery(url, query);
    return request<T>(requestKey(url.toString(), options?.signal), async () => {
      try {
        const response = await fetchImpl(url, { headers: { Accept: "application/json" }, cache: "no-store", signal: requestSignal(options?.signal) });
        if (!response.ok) {
          const retryable = response.status === 408 || response.status === 429 || response.status >= 500;
          return failureResult("error", `The ${resource} service returned HTTP ${response.status}.`, "HTTP", retryable);
        }
        const payload: unknown = await response.json();
        const envelope: ConnectedEnvelope<T> | undefined = Array.isArray(payload)
          ? { data: payload as T[] }
          : isRecord(payload) && Array.isArray(payload.data)
            ? payload as unknown as ConnectedEnvelope<T>
            : undefined;
        if (!envelope || !envelope.data.every((item) => isValidRecord(resource, item))) {
          return failureResult("error", `The ${resource} service returned an invalid response.`, "INVALID_RESPONSE", false);
        }
        if (envelope.pagination !== undefined && !isValidPagination(envelope.pagination)) {
          return failureResult("error", `The ${resource} service returned invalid pagination metadata.`, "INVALID_RESPONSE", false);
        }
        if (!envelope.data.length) {
          return { state: "empty", data: [], isDemo: false, updatedAt: envelope.updatedAt, retryable: false, pagination: envelope.pagination };
        }
        return {
          state: envelope.stale ? "stale" : "ready",
          data: envelope.data,
          isDemo: false,
          updatedAt: envelope.updatedAt,
          message: envelope.stale ? "Showing the last successful update while the source refresh is unavailable." : undefined,
          retryable: Boolean(envelope.stale),
          pagination: envelope.pagination,
        };
      } catch (error) {
        if (options?.signal?.aborted) return failureResult("error", `The ${resource} request was cancelled.`, "CANCELLED", false);
        const timedOut = error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");
        return failureResult("error", timedOut ? `The ${resource} request timed out.` : `The ${resource} service could not be reached.`, timedOut ? "TIMEOUT" : "NETWORK", true);
      }
    });
  };

  const fetchItem = <T>(resource: DataResource, slug: string, options?: PublicDataRequestOptions): Promise<PublicDataResult<T>> => {
    if (!normalizedBaseUrl) return Promise.resolve(failureResult("unavailable", "Connected data is enabled, but no approved API endpoint is configured.", "CONFIGURATION", false));
    const url = `${normalizedBaseUrl}${paths[resource]}/${encodeURIComponent(slug)}`;
    return request<T>(requestKey(url, options?.signal), async () => {
      try {
        const response = await fetchImpl(url, { headers: { Accept: "application/json" }, cache: "no-store", signal: requestSignal(options?.signal) });
        if (response.status === 404) return { state: "empty", data: [], isDemo: false, retryable: false };
        if (!response.ok) return failureResult("error", `The ${resource} service returned HTTP ${response.status}.`, "HTTP", response.status === 408 || response.status === 429 || response.status >= 500);
        const payload: unknown = await response.json();
        const item = isRecord(payload) && "data" in payload ? payload.data : payload;
        if (!isValidRecord(resource, item)) return failureResult("error", `The ${resource} service returned an invalid record.`, "INVALID_RESPONSE", false);
        return { state: "ready", data: [item as T], isDemo: false, retryable: false };
      } catch (error) {
        if (options?.signal?.aborted) return failureResult("error", `The ${resource} request was cancelled.`, "CANCELLED", false);
        const timedOut = error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");
        return failureResult("error", timedOut ? `The ${resource} request timed out.` : `The ${resource} service could not be reached.`, timedOut ? "TIMEOUT" : "NETWORK", true);
      }
    });
  };

  return { fetchResource, fetchItem };
}

const connectedClient = createConnectedDataClient({ baseUrl: apiBaseUrl });

export async function fetchConnectedResource<T>(
  resource: DataResource,
  query?: PublicDataQuery,
  options?: PublicDataRequestOptions,
): Promise<PublicDataResult<T>> {
  return connectedClient.fetchResource<T>(resource, query, options);
}

export async function fetchConnectedItem<T>(resource: DataResource, slug: string, options?: PublicDataRequestOptions): Promise<PublicDataResult<T>> {
  return connectedClient.fetchItem<T>(resource, slug, options);
}

function resource<T>(resourceName: DataResource, demoData: T[]) {
  return (query?: PublicDataQuery, options?: PublicDataRequestOptions) =>
    dataMode === "connected" ? fetchConnectedResource<T>(resourceName, query, options) : Promise.resolve(demoResult(demoData));
}

function itemResource<T extends { slug: string }>(resourceName: DataResource, demoData: T[]) {
  return (slug: string, options?: PublicDataRequestOptions) => dataMode === "connected"
    ? fetchConnectedItem<T>(resourceName, slug, options)
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
