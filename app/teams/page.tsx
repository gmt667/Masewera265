import { Suspense } from "react";
import { TeamDirectory } from "@/components/directory-pages";
import { DataNotice, PageHero } from "@/components/ui";
import { DataStatePanel } from "@/components/data-state";
import { publicData } from "@/lib/data-service";

export const metadata = {
  title: "Teams & Clubs Directory | Masewera265",
  description: "Find supported clubs, squads, and national selections across all 14 Malawian sporting disciplines.",
};

export default async function TeamsPage() {
  const [teamResult, sportResult] = await Promise.all([publicData.teams(), publicData.sports()]);
  const failure = teamResult.state !== "ready" && teamResult.state !== "stale" ? teamResult : sportResult;
  return (
    <>
      <PageHero
        eyebrow="NATIONAL DIRECTORY"
        title="Teams & Clubs of Malawi"
        intro="Explore clubs, military teams, collegiate sides, and national squads across all 14 sporting disciplines and 3 geographic regions."
      />
      <div className="container page-content">
        {teamResult.isDemo && <DataNotice />}
        {teamResult.state === "stale" && <DataStatePanel state="stale" message={teamResult.message} />}
        {teamResult.data.length && sportResult.data.length ? (
          <Suspense fallback={<div className="loading-state">Loading teams directory...</div>}>
            <TeamDirectory teamsData={teamResult.data} sportsData={sportResult.data} />
          </Suspense>
        ) : <DataStatePanel state={failure.state === "ready" ? "empty" : failure.state} message={failure.message} />}
      </div>
    </>
  );
}
