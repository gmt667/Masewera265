import { Suspense } from "react";
import { AthleteDirectory } from "@/components/directory-pages";
import { DataNotice, PageHero } from "@/components/ui";
import { DataStatePanel } from "@/components/data-state";
import { publicData } from "@/lib/data-service";

export const metadata = {
  title: "Athletes Directory | Masewera265",
  description: "Explore verified athlete identities, affiliations, and profiles across Malawian sports.",
};

export default async function AthletesPage() {
  const [athleteResult, sportResult] = await Promise.all([publicData.athletes(), publicData.sports()]);
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
      </div>
    </>
  );
}
