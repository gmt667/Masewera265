import { Suspense } from "react";
import { AthleteDirectory } from "@/components/directory-pages";
import { DataNotice, PageHero } from "@/components/ui";
import { DataStatePanel } from "@/components/data-state";
import { publicData } from "@/lib/data-service";
import { DataPagination } from "@/components/data-pagination";
import { requestedPage, type RouteSearchParams } from "@/lib/pagination";

export const metadata = {
  title: "Athletes Directory | Masewera265",
  description: "Explore verified athlete identities, affiliations, and profiles across Malawian sports.",
};

export default async function AthletesPage({ searchParams, signal }: { searchParams: Promise<RouteSearchParams>; signal: AbortSignal }) {
  const params = await searchParams;
  const requestOptions = { signal };
  const [athleteResult, sportResult] = await Promise.all([
    publicData.athletes({ page: requestedPage(params), pageSize: 24 }, requestOptions),
    publicData.sports({ pageSize: 100 }, requestOptions),
  ]);
  const failure = athleteResult.state !== "ready" && athleteResult.state !== "stale" ? athleteResult : sportResult;
  return (
    <>
      <PageHero
        eyebrow="ATHLETES & PLAYERS"
        title="Malawian Athletes"
        intro="Explore verified sporting identities, positions, club affiliations, and achievements across Malawi's sporting disciplines."
      />
      <div className="container page-content">
        {athleteResult.isDemo && <DataNotice />}
        {athleteResult.data.length && sportResult.data.length ? <Suspense fallback={<div className="loading-state">Loading athlete directory...</div>}>
          <AthleteDirectory athletesData={athleteResult.data} sportsData={sportResult.data} />
        </Suspense> : <DataStatePanel state={failure.state === "ready" ? "empty" : failure.state} message={failure.message} />}
        <DataPagination pagination={athleteResult.pagination} />
      </div>
    </>
  );
}
