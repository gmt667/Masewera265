export type RouteSearchParams = Record<string, string | string[] | undefined>;

export function requestedPage(searchParams: RouteSearchParams) {
  const value = searchParams.page;
  const parsed = Number(Array.isArray(value) ? value[0] : value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : 1;
}
