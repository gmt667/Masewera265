import type { MetadataRoute } from "next";
import { articles, athletes, competitions, events, sports, teams } from "@/lib/demo-data";
import { dataMode, publicData } from "@/lib/data-service";
import { malawiVenues } from "@/lib/venues-data";

const staticRoutes = [
  "", "/about", "/athletes", "/competitions", "/explore-malawi", "/fixtures",
  "/live", "/national-teams", "/news", "/organizations", "/results", "/search",
  "/sports", "/teams", "/venues",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://masewera265.com";
  const connected = dataMode === "connected"
    ? await Promise.all([
        publicData.sports(), publicData.teams(), publicData.athletes(), publicData.competitions(),
        publicData.events(), publicData.news(), publicData.venues(),
      ])
    : null;
  const [sportRecords, teamRecords, athleteRecords, competitionRecords, eventRecords, articleRecords, venueRecords] = connected
    ? connected.map((result) => result.data)
    : [sports, teams, athletes, competitions, events, articles, malawiVenues];
  const dynamicRoutes = [
    ...sportRecords.map(({ slug }) => `/sports/${slug}`),
    ...teamRecords.map(({ slug }) => `/teams/${slug}`),
    ...athleteRecords.map(({ slug }) => `/athletes/${slug}`),
    ...competitionRecords.map(({ slug }) => `/competitions/${slug}`),
    ...eventRecords.map(({ slug }) => `/events/${slug}`),
    ...articleRecords.map(({ slug }) => `/news/${slug}`),
    ...venueRecords.map(({ slug }) => `/venues/${slug}`),
  ];
  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${base}${route}`,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
