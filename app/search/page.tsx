import { Suspense } from "react";
import { SearchExperience } from "@/components/search-page";
import { PageHero } from "@/components/ui";
import { DataStatePanel } from "@/components/data-state";
import { publicData } from "@/lib/data-service";

export const metadata = {
  title: "Search | Masewera265",
  description: "Search sports, clubs, athletes, venues and competitions across Malawi.",
};

export default async function SearchPage() {
  const results = await Promise.all([
    publicData.sports(), publicData.teams(), publicData.athletes(),
    publicData.competitions(), publicData.venues(), publicData.news(),
  ]);
  const [sportsResult, teamsResult, athletesResult, competitionsResult, venuesResult, newsResult] = results;
  const failure = results.find((result) => result.state === "unavailable" || result.state === "error");
  return (
    <>
      <PageHero
        eyebrow="CONNECTED DISCOVERY"
        title="Search Masewera265"
        intro="Find sports, clubs, athletes, venues, and competitions across Malawi's 28 districts."
      />
      <div className="container page-content">
        {failure ? <DataStatePanel state={failure.state === "ready" ? "error" : failure.state} message={failure.message} /> : <Suspense fallback={<div className="loading-state">Loading search experience...</div>}>
          <SearchExperience data={{ sports: sportsResult.data, teams: teamsResult.data, athletes: athletesResult.data, competitions: competitionsResult.data, venues: venuesResult.data, articles: newsResult.data }} />
        </Suspense>}
      </div>
    </>
  );
}
