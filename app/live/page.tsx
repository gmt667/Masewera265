import { Suspense } from "react";
import { FixtureBrowser } from "@/components/directory-pages";
import { PageHero } from "@/components/ui";
import { DataStatePanel } from "@/components/data-state";
import { publicData } from "@/lib/data-service";

export const metadata = {
  title: "Live Match Centre | Masewera265",
  description: "Ongoing event records across supported Malawian sports, with demo and connected states clearly identified.",
};

export default async function LivePage() {
  const [eventResult, sportResult] = await Promise.all([
    publicData.events({ lifecycleStatus: "LIVE" }),
    publicData.sports(),
  ]);
  const failure = eventResult.state !== "ready" && eventResult.state !== "stale" ? eventResult : sportResult;
  return (
    <>
      <PageHero
        eyebrow="ONGOING ACTION"
        title="Match Centre"
        intro="Browse events marked in progress. Demo records are not real-time reports; connected records depend on an approved public source."
      />
      <div className="container page-content">
        {eventResult.state === "stale" && <DataStatePanel state="stale" message={eventResult.message} />}
        {eventResult.data.length && sportResult.data.length ? (
          <Suspense fallback={<div className="loading-state">Loading match centre...</div>}>
            <FixtureBrowser liveOnly eventsData={eventResult.data} sportsData={sportResult.data} />
          </Suspense>
        ) : <DataStatePanel state={failure.state === "ready" ? "empty" : failure.state} message={failure.message} />}
      </div>
    </>
  );
}
