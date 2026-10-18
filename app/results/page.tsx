import { Suspense } from "react";
import { FixtureBrowser } from "@/components/directory-pages";
import { PageHero } from "@/components/ui";
import { DataStatePanel } from "@/components/data-state";
import { publicData } from "@/lib/data-service";

export const metadata = {
  title: "Latest Results | Masewera265",
  description: "Published final scores and match outcomes from verified sporting events across Malawi.",
};

export default async function ResultsPage() {
  const [eventResult, sportResult] = await Promise.all([
    publicData.events({ lifecycleStatus: "FINAL" }),
    publicData.sports(),
  ]);
  const failure = eventResult.state !== "ready" && eventResult.state !== "stale" ? eventResult : sportResult;
  return (
    <>
      <PageHero
        eyebrow="COMPLETED EVENTS"
        title="Latest Results"
        intro="Browse completed event records with their source and demonstration status clearly identified."
      />
      <div className="container page-content">
        {eventResult.state === "stale" && <DataStatePanel state="stale" message={eventResult.message} />}
        {eventResult.data.length && sportResult.data.length ? (
          <Suspense fallback={<div className="loading-state">Loading match results...</div>}>
            <FixtureBrowser resultOnly eventsData={eventResult.data} sportsData={sportResult.data} />
          </Suspense>
        ) : <DataStatePanel state={failure.state === "ready" ? "empty" : failure.state} message={failure.message} />}
      </div>
    </>
  );
}
