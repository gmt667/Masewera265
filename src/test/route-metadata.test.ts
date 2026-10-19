import { describe, expect, it } from "vitest";
import { getSitemapPaths, resolveRouteMetadata } from "@/src/route-metadata";

describe("route metadata registry", () => {
  it("restores record-specific metadata for dynamic public routes", () => {
    const team = resolveRouteMetadata("/teams/the-flames");
    expect(team.title).toContain("The Flames");
    expect(team.description).toContain("national football");
    expect(team.canonicalPath).toBe("/teams/the-flames");
  });

  it("keeps dashboard and unknown routes out of search indexes", () => {
    expect(resolveRouteMetadata("/dashboard").robots).toBe("noindex,nofollow");
    expect(resolveRouteMetadata("/dashboard/platform").robots).toBe("noindex,nofollow");
    expect(resolveRouteMetadata("/does-not-exist").robots).toBe("noindex,nofollow");
  });

  it("builds a unique public sitemap without dashboard routes", () => {
    const paths = getSitemapPaths();
    expect(paths).toContain("/sports/football");
    expect(paths).toContain("/teams/the-flames");
    expect(paths).toContain("/football/history");
    expect(paths.some((path) => path.startsWith("/dashboard"))).toBe(false);
    expect(new Set(paths).size).toBe(paths.length);
  });
});
