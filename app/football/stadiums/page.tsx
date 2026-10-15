import Link from "next/link";
import { ArrowRight, MapPin, Users } from "lucide-react";
import { footballStadiums } from "@/lib/football-data";
import { DataNotice } from "@/components/ui";

export const metadata = {
  title: "Malawian Football Stadiums Directory | Masewera265",
  description: "Kamuzu Stadium, Bingu National Stadium, CIVO, Silver Stadium, and major football venues across Malawi with capacities, surfaces, and history.",
};

export default function FootballStadiumsPage() {
  return (
    <div className="football-stadiums-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">INFRASTRUCTURE &amp; VENUES</p>
          <h1>Malawi Stadium Directory</h1>
          <p className="lead">
            The grounds, arenas, and cultural fortresses where Malawian football history is played out every matchday.
          </p>
        </div>
      </section>

      <main className="container page-content">
        <DataNotice
          title="Venue verification and safety standards"
          body="Capacities and facility data are compiled from FAM Club Licensing and sports ministry records. Venues must satisfy SULOM safety inspections for hosting top-flight Premiership matches."
        />

        <div className="stadiums-grid">
          {footballStadiums.map((stad) => (
            <article className="stadium-full-card" key={stad.slug}>
              <div className="stadium-card-top">
                <span className="region-pill">{stad.region} Region</span>
                <span className="capacity-badge">
                  <Users size={13} /> Capacity: <b>{stad.capacity}</b>
                </span>
              </div>

              <h2>{stad.name}</h2>
              <p className="location-line">
                <MapPin size={14} /> {stad.location} ({stad.district} District)
              </p>

              <p className="stadium-summary">{stad.summary}</p>

              <div className="stadium-details-box">
                <div className="detail-item">
                  <span>Surface:</span>
                  <b>{stad.surface}</b>
                </div>
                <div className="detail-item">
                  <span>Opened / Renovated:</span>
                  <b>{stad.opened}</b>
                </div>
                <div className="detail-item full-width">
                  <span>Resident Clubs:</span>
                  <b>{stad.residentClubs.join(", ")}</b>
                </div>
              </div>

              <footer className="stadium-card-footer">
                <Link className="button design-primary" href={`/fixtures?location=${encodeURIComponent(stad.district)}`}>
                  Fixtures at {stad.name} <ArrowRight size={13} />
                </Link>
              </footer>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
