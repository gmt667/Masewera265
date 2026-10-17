import { Suspense } from "react";
import { SearchExperience } from "@/components/search-page";
import { PageHero } from "@/components/ui";

export const metadata = {
  title: "Search | Masewera265",
  description: "Search sports, clubs, athletes, venues and competitions across Malawi.",
};

export default function SearchPage() {
  return (
    <>
      <PageHero
        eyebrow="CONNECTED DISCOVERY"
        title="Search Masewera265"
        intro="Find sports, clubs, athletes, venues, and competitions across Malawi's 28 districts."
      />
      <div className="container page-content">
        <Suspense fallback={<div className="loading-state">Loading search experience...</div>}>
          <SearchExperience />
        </Suspense>
      </div>
    </>
  );
}
