import { Suspense } from "react";
import { FixtureBrowser } from "@/components/directory-pages";
import { DataNotice, PageHero } from "@/components/ui";

export const metadata = {
  title: "Fixtures & Results | Masewera265",
  description: "Browse supported sporting fixtures and results across Malawi by sport, status, and venue.",
};

export default function FixturesPage() {
  return (
    <>
      <PageHero
        eyebrow="EVENTS & RESULTS"
        title="Fixtures & Results"
        intro="Browse supported events by sport discipline, match status, location, and competition."
      />
      <div className="container page-content">
        <DataNotice />
        <Suspense fallback={<div className="loading-state">Loading fixtures...</div>}>
          <FixtureBrowser />
        </Suspense>
      </div>
    </>
  );
}
