import { Suspense } from "react";
import { FixtureBrowser } from "@/components/directory-pages";
import { PageHero } from "@/components/ui";

export const metadata = {
  title: "Live Match Centre | Masewera265",
  description: "Real-time updates, scores, and ongoing sporting action across Malawi.",
};

export default function LivePage() {
  return (
    <>
      <PageHero
        eyebrow="ONGOING ACTION"
        title="Live Match Centre"
        intro="Follow matches and competitions currently in progress across football, netball, basketball and other Malawian sports."
      />
      <div className="container page-content">
        <Suspense fallback={<div className="loading-state">Loading live centre...</div>}>
          <FixtureBrowser liveOnly />
        </Suspense>
      </div>
    </>
  );
}
