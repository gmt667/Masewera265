import { Suspense } from "react";
import { CompetitionDirectory } from "@/components/directory-pages";
import { DataNotice, PageHero } from "@/components/ui";

export const metadata = {
  title: "Competitions & Tournaments | Masewera265",
  description: "Browse leagues, cups, and championships across Malawi's sporting landscape.",
};

export default function CompetitionsPage() {
  return (
    <>
      <PageHero
        eyebrow="SEASONS & TOURNAMENTS"
        title="Competitions & Cups"
        intro="Browse available leagues, knockout cups, and national championships across Malawi's sporting disciplines."
      />
      <div className="container page-content">
        <DataNotice />
        <Suspense fallback={<div className="loading-state">Loading competitions...</div>}>
          <CompetitionDirectory />
        </Suspense>
      </div>
    </>
  );
}
