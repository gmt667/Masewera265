import { Suspense } from "react";
import { CompetitionDirectory } from "@/components/directory-pages";
import { DataNotice, PageHero } from "@/components/ui";
import { DataStatePanel } from "@/components/data-state";
import { publicData } from "@/lib/data-service";
import { DataPagination } from "@/components/data-pagination";
import { requestedPage, type RouteSearchParams } from "@/lib/pagination";

export const metadata = {
  title: "Competitions & Tournaments | Masewera265",
  description: "Browse leagues, cups, and championships across Malawi's sporting landscape.",
};

export default async function CompetitionsPage({ searchParams, signal }: { searchParams: Promise<RouteSearchParams>; signal: AbortSignal }) {
  const params = await searchParams;
  const requestOptions = { signal };
  const [competitionResult, sportResult] = await Promise.all([
    publicData.competitions({ page: requestedPage(params), pageSize: 24 }, requestOptions),
    publicData.sports({ pageSize: 100 }, requestOptions),
  ]);
  const failure = competitionResult.state !== "ready" && competitionResult.state !== "stale" ? competitionResult : sportResult;
  return (
    <>
      <PageHero
        eyebrow="SEASONS & TOURNAMENTS"
        title="Competitions & Cups"
        intro="Browse available leagues, knockout cups, and national championships across Malawi's sporting disciplines."
      />
      <div className="container page-content">
        {competitionResult.isDemo && <DataNotice />}
        {competitionResult.data.length && sportResult.data.length ? <Suspense fallback={<div className="loading-state">Loading competitions...</div>}>
          <CompetitionDirectory competitionsData={competitionResult.data} sportsData={sportResult.data} />
        </Suspense> : <DataStatePanel state={failure.state === "ready" ? "empty" : failure.state} message={failure.message} />}
        <DataPagination pagination={competitionResult.pagination} />
      </div>
    </>
  );
}
