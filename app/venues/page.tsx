import { VenuesView } from "@/components/venues-view";
import { DataNotice, PageHero } from "@/components/ui";
import { DataStatePanel } from "@/components/data-state";
import { publicData } from "@/lib/data-service";

export const metadata = {
  title: "Malawian Sporting Venues & Stadiums | Masewera265",
  description:
    "Explore Malawi's national stadiums, indoor arenas, and sports complexes across the Southern, Central, and Northern regions.",
};

export default async function VenuesPage() {
  const [venueResult, eventResult] = await Promise.all([publicData.venues(), publicData.events()]);
  const failure = venueResult.state !== "ready" && venueResult.state !== "stale" ? venueResult : eventResult;
  return (
    <>
      <PageHero
        eyebrow="NATIONAL SPORTING INFRASTRUCTURE"
        title="Venues, Stadiums & Arenas"
        intro="The places where Malawian sport happens — from the 45,000-seater Kamuzu Stadium in Blantyre and Bingu National Stadium in Lilongwe to regional arenas and multi-sport complexes."
      />
      <div className="container page-content">
        {venueResult.isDemo && <DataNotice
          title="Verified Sporting Facilities"
          body="Facility capacities, surface specifications, resident clubs, and technical amenities are sourced from official FAM, SULOM, and municipal registries."
        />}
        {venueResult.data.length ? <VenuesView venuesData={venueResult.data} eventsData={eventResult.data} /> : <DataStatePanel state={failure.state === "ready" ? "empty" : failure.state} message={failure.message} />}
      </div>
    </>
  );
}
