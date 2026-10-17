import { Suspense } from "react";
import { TeamDirectory } from "@/components/directory-pages";
import { DataNotice, PageHero } from "@/components/ui";

export const metadata = {
  title: "Teams & Clubs Directory | Masewera265",
  description: "Find supported clubs, squads, and national selections across all 14 Malawian sporting disciplines.",
};

export default function TeamsPage() {
  return (
    <>
      <PageHero
        eyebrow="NATIONAL DIRECTORY"
        title="Teams & Clubs of Malawi"
        intro="Explore clubs, military teams, collegiate sides, and national squads across all 14 sporting disciplines and 3 geographic regions."
      />
      <div className="container page-content">
        <DataNotice />
        <Suspense fallback={<div className="loading-state">Loading teams directory...</div>}>
          <TeamDirectory />
        </Suspense>
      </div>
    </>
  );
}
