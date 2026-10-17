import { Suspense } from "react";
import { AthleteDirectory } from "@/components/directory-pages";
import { DataNotice, PageHero } from "@/components/ui";

export const metadata = {
  title: "Athletes Directory | Masewera265",
  description: "Explore verified athlete identities, affiliations, and profiles across Malawian sports.",
};

export default function AthletesPage() {
  return (
    <>
      <PageHero
        eyebrow="ATHLETES & PLAYERS"
        title="Malawian Athletes"
        intro="Explore verified sporting identities, positions, club affiliations, and achievements across Malawi's sporting disciplines."
      />
      <div className="container page-content">
        <DataNotice />
        <Suspense fallback={<div className="loading-state">Loading athlete directory...</div>}>
          <AthleteDirectory />
        </Suspense>
      </div>
    </>
  );
}
