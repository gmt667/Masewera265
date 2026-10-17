import { footballStadiums } from "@/lib/football-data";
import { DataNotice } from "@/components/ui";
import { FootballStadiumsView } from "@/components/football-stadiums-view";

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

        <FootballStadiumsView stadiums={footballStadiums} />
      </main>
    </div>
  );
}
