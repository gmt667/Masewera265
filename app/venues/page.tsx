import { VenuesView } from "@/components/venues-view";
import { DataNotice, PageHero } from "@/components/ui";

export const metadata = {
  title: "Malawian Sporting Venues & Stadiums | Masewera265",
  description:
    "Explore Malawi's national stadiums, indoor arenas, and sports complexes across the Southern, Central, and Northern regions.",
};

export default function VenuesPage() {
  return (
    <>
      <PageHero
        eyebrow="NATIONAL SPORTING INFRASTRUCTURE"
        title="Venues, Stadiums & Arenas"
        intro="The places where Malawian sport happens — from the 45,000-seater Kamuzu Stadium in Blantyre and Bingu National Stadium in Lilongwe to regional arenas and multi-sport complexes."
      />
      <div className="container page-content">
        <DataNotice
          title="Verified Sporting Facilities"
          body="Facility capacities, surface specifications, resident clubs, and technical amenities are sourced from official FAM, SULOM, and municipal registries."
        />
        <VenuesView />
      </div>
    </>
  );
}
