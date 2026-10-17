import { Suspense } from "react";
import { FixtureBrowser } from "@/components/directory-pages";
import { PageHero } from "@/components/ui";

export const metadata = {
  title: "Latest Results | Masewera265",
  description: "Published final scores and match outcomes from verified sporting events across Malawi.",
};

export default function ResultsPage() {
  return (
    <>
      <PageHero
        eyebrow="COMPLETED EVENTS"
        title="Latest Results"
        intro="Published final scores from verified sporting events and leagues across Malawi."
      />
      <div className="container page-content">
        <Suspense fallback={<div className="loading-state">Loading match results...</div>}>
          <FixtureBrowser resultOnly />
        </Suspense>
      </div>
    </>
  );
}
