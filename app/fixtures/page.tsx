import { Suspense } from "react";
import { FixtureBrowser } from "@/components/directory-pages";
import { DataNotice, PageHero } from "@/components/ui";
import { DataStatePanel } from "@/components/data-state";
import { publicData } from "@/lib/data-service";

export const metadata = {
  title: "Fixtures & Results | Masewera265",
  description: "Browse supported sporting fixtures and results across Malawi by sport, status, and venue.",
};

export default async function FixturesPage() {
  const [eventResult, sportResult] = await Promise.all([publicData.events(), publicData.sports()]);
  const failure = eventResult.state !== "ready" && eventResult.state !== "stale" ? eventResult : sportResult;
  return (
    <>
      <PageHero
        eyebrow="EVENTS & RESULTS"
        title="Fixtures & Results"
        intro="Browse supported events by sport discipline, match status, location, and competition."
      />
      <div className="container page-content">
        {eventResult.isDemo && <DataNotice />}
        {eventResult.state === "stale" && <DataStatePanel state="stale" message={eventResult.message} />}
        {eventResult.data.length && sportResult.data.length ? (
          <Suspense fallback={<div className="loading-state">Loading fixtures...</div>}>
            <FixtureBrowser eventsData={eventResult.data} sportsData={sportResult.data} />
          </Suspense>
        ) : <DataStatePanel state={failure.state === "ready" ? "empty" : failure.state} message={failure.message} />}
      </div>
    </>
  );
}
