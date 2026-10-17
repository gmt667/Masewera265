import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, Trophy } from "lucide-react";
import { events } from "@/lib/demo-data";
import { malawiVenues, getVenueBySlug } from "@/lib/venues-data";
import { DataNotice, EventCard, SectionHeading, TrustBadge } from "@/components/ui";

export function generateStaticParams() {
  return malawiVenues.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  return {
    title: venue ? `${venue.name} | Masewera265 Venues` : "Venue Profile | Masewera265",
    description: venue?.summary,
  };
}

export default async function VenueSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);

  if (!venue) notFound();

  const venueEvents = events.filter((e) => e.venueSlug === slug);

  return (
    <div className="venue-detail-page">
      {/* Venue Hero */}
      <section className="profile-hero venue-hero-section">
        <div className="container">
          <div className="venue-hero-image-wrap">
            <Image
              src={venue.image}
              alt={venue.name}
              width={260}
              height={180}
              className="venue-hero-thumb"
              priority
            />
          </div>
          <div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
              <span className="sport-pill">{venue.type}</span>
              <span className="national-pill">{venue.tier}</span>
              <TrustBadge label="Verified" />
            </div>
            <h1>{venue.name}</h1>
            <p className="profile-sub">
              <MapPin size={16} /> {venue.location} · <b>{venue.district} District</b> ({venue.region} Region)
            </p>
          </div>
        </div>
      </section>

      <div className="container page-content">
        <div className="profile-back-bar">
          <Link href="/venues" className="button secondary">
            <ArrowLeft size={16} /> All Venues &amp; Stadiums
          </Link>
        </div>

        <DataNotice
          title={`${venue.name} Facility Specifications`}
          body="Technical dimensions, official capacity, floodlighting capabilities, and tenant club affiliations are documented from verified registry records."
        />

        {/* Specifications Grid */}
        <div className="profile-grid">
          <div>
            <section className="content-card">
              <h2>About the Facility</h2>
              <p className="lead">{venue.summary}</p>

              <div className="venue-specs-table-wrap">
                <table className="history-data-table">
                  <tbody>
                    <tr>
                      <td><strong>Official Capacity</strong></td>
                      <td><b>{venue.capacity}</b> spectators</td>
                    </tr>
                    <tr>
                      <td><strong>Playing Surface</strong></td>
                      <td>{venue.surface}</td>
                    </tr>
                    <tr>
                      <td><strong>Opened / Upgraded</strong></td>
                      <td>{venue.opened}</td>
                    </tr>
                    <tr>
                      <td><strong>Floodlight System</strong></td>
                      <td>{venue.floodlights ? "Yes — broadcast and night match compliant" : "No evening lighting installed"}</td>
                    </tr>
                    <tr>
                      <td><strong>Geographic District</strong></td>
                      <td>{venue.district} ({venue.region} Region, Malawi)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Scheduled Matches & Events at Venue */}
            <section className="content-card">
              <SectionHeading
                title={`Events at ${venue.name}`}
                eyebrow="CALENDAR & RESULTS"
              />
              {venueEvents.length > 0 ? (
                <div className="event-list">
                  {venueEvents.map((e) => (
                    <EventCard event={e} key={e.id} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <CalendarDays size={32} />
                  <h3>No fixtures currently scheduled</h3>
                  <p>
                    There are no live or upcoming public events logged on the calendar for this facility right now.
                  </p>
                  <Link href="/fixtures" className="button secondary">
                    View full national fixtures &rarr;
                  </Link>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            <section className="content-card">
              <h2>Sports Hosted</h2>
              <div className="venue-sports-pills" style={{ marginTop: 12 }}>
                {venue.sports.map((sport) => (
                  <span className="sport-tag-mini" key={sport}>
                    {sport}
                  </span>
                ))}
              </div>
            </section>

            {venue.residentClubs.length > 0 && (
              <section className="content-card">
                <h2>Resident &amp; Hosting Teams</h2>
                <ul className="venue-clubs-list">
                  {venue.residentClubs.map((club) => (
                    <li key={club}>
                      <Trophy size={14} /> {club}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="content-card">
              <h2>Explore Region</h2>
              <p>Find other sports, teams and clubs in the {venue.region} Region:</p>
              <Link
                href={`/explore-malawi?region=${encodeURIComponent(venue.region)}`}
                className="button secondary"
                style={{ width: "100%", justifyContent: "center", marginTop: 10 }}
              >
                {venue.region} Region Hub <ArrowRight size={14} />
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
