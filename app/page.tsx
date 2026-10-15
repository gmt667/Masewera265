import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronDown, MapPin, Trophy, Users, BarChart3 } from "lucide-react";
import { DemoBadge } from "@/components/ui";

const sampleFixtures = [
  {
    id: "fix-1",
    sport: "Football",
    category: "Friendly",
    date: "Sat, 14 Sep 2024",
    time: "15:00",
    home: "Blantyre United",
    homeColor: "#c92c38",
    away: "Mzuzu City",
    awayColor: "#168149",
    venue: "Kamuzu Stadium, Blantyre",
    link: "/events/blantyre-united-vs-mzuzu-city",
  },
  {
    id: "fix-2",
    sport: "Netball",
    category: "League",
    date: "Sun, 15 Sep 2024",
    time: "14:00",
    home: "Capital Queens",
    homeColor: "#111827",
    away: "Southern Sparks",
    awayColor: "#0284c7",
    venue: "Bingu National Arena, Lilongwe",
    link: "/events/capital-queens-vs-southern-sparks",
  },
  {
    id: "fix-3",
    sport: "Basketball",
    category: "League",
    date: "Sat, 21 Sep 2024",
    time: "16:00",
    home: "Lilongwe Titans",
    homeColor: "#ea580c",
    away: "Blantyre Falcons",
    awayColor: "#1e3a8a",
    venue: "CIVO Arena, Lilongwe",
    link: "/events/lilongwe-titans-vs-blantyre-falcons",
  },
];

const nationalTeamsHighlight = [
  {
    slug: "the-flames",
    name: "The Flames",
    title: "Malawi Men's National Football Team",
    image: "/images/card-flames.jpg",
    link: "/teams/the-flames",
  },
  {
    slug: "the-scorchers",
    name: "The Scorchers",
    title: "Malawi Women's National Football Team",
    image: "/images/card-scorchers.jpg",
    link: "/teams/the-scorchers",
  },
  {
    slug: "malawi-queens",
    name: "The Queens",
    title: "Malawi Women's National Netball Team",
    image: "/images/card-queens.jpg",
    link: "/teams/malawi-queens",
  },
];

const latestNews = [
  {
    slug: "grassroots-football-growth",
    sport: "Football",
    tagColor: "bg-blue",
    title: "Grassroots football continues to grow across Malawi",
    date: "12 Sep 2024",
    image: "/images/news-football.jpg",
  },
  {
    slug: "netball-inspiring-youth",
    sport: "Netball",
    tagColor: "bg-purple",
    title: "Netball inspiring a new generation of young athletes",
    date: "10 Sep 2024",
    image: "/images/news-netball.jpg",
  },
  {
    slug: "athletes-shine-regional",
    sport: "Athletics",
    tagColor: "bg-orange",
    title: "Malawian athletes shine at regional championships",
    date: "8 Sep 2024",
    image: "/images/news-athletics.jpg",
  },
];

const regions = [
  {
    name: "Northern Region",
    tagline: "Sporting talent. Thriving communities.",
    image: "/images/region-north.jpg",
    query: "Northern",
  },
  {
    name: "Central Region",
    tagline: "Active people. Stronger together.",
    image: "/images/region-central.jpg",
    query: "Central",
  },
  {
    name: "Southern Region",
    tagline: "Passion in every game. Brighter futures.",
    image: "/images/region-south.jpg",
    query: "Southern",
  },
];

const allSportsTiles = [
  { name: "Cricket", slug: "cricket", image: "/images/sport-cricket.jpg" },
  { name: "Rugby", slug: "rugby", image: "/images/sport-rugby.jpg" },
  { name: "Swimming", slug: "swimming", image: "/images/sport-swimming.jpg" },
  { name: "Cycling", slug: "cycling", image: "/images/sport-cycling.jpg" },
  { name: "Tennis", slug: "tennis", image: "/images/sport-tennis.jpg" },
  { name: "Chess", slug: "chess", image: "/images/sport-chess.jpg" },
];

export default function HomePage() {
  return (
    <div className="design-home">
      {/* Hero Section */}
      <section className="design-hero">
        <Image
          src="/images/hero-banner.jpg"
          width={1680}
          height={945}
          priority
          sizes="100vw"
          alt="Malawi multi-sport athletes representing the Flames, Scorchers, Queens and athletics against a Malawi landscape"
          className="design-hero-bg"
        />
        <div className="design-hero-shade" />

        <div className="container design-hero-container">
          <div className="design-hero-content">
            <h1 className="hero-headline">
              Malawi&apos;s Digital<br />
              <em>Home for Sport</em>
            </h1>
            <p className="hero-subtext">Every sport. Every community.</p>

            <div className="hero-actions">
              <Link className="button design-primary" href="/sports">
                Explore Sports <ArrowRight size={18} />
              </Link>
              <Link className="button design-outline" href="/fixtures">
                View Fixtures <CalendarDays size={18} />
              </Link>
            </div>

            <div className="design-promises">
              <span>
                <div className="promise-icon"><Users size={16} /></div>
                <div>
                  <b>More People</b>
                  <small>A Stronger Sporting Nation</small>
                </div>
              </span>
              <span>
                <div className="promise-icon"><BarChart3 size={16} /></div>
                <div>
                  <b>More Opportunities</b>
                  <small>Across Every Community</small>
                </div>
              </span>
              <span>
                <div className="promise-icon"><Trophy size={16} /></div>
                <div>
                  <b>More Stories</b>
                  <small>Malawi Moves Forward</small>
                </div>
              </span>
            </div>
          </div>

          <div className="hero-motto-wrapper" aria-hidden="true">
            <span className="hero-motto">Same Passion, A Brighter Malawi</span>
            <div className="motto-ribbons">
              <span className="ribbon red" />
              <span className="ribbon green" />
            </div>
          </div>
        </div>

        <span className="concept-label">Concept artwork — not real national-team players</span>
      </section>

      {/* Horizontal Sports Navigation Bar */}
      <div className="design-sport-bar-wrap">
        <nav className="design-sport-nav container" aria-label="Featured sports">
          <Link className="sport-nav-item active" href="/sports/football">
            <span className="sport-nav-icon">⚽</span> Football
          </Link>
          <Link className="sport-nav-item" href="/sports/netball">
            <span className="sport-nav-icon">◉</span> Netball
          </Link>
          <Link className="sport-nav-item" href="/sports/basketball">
            <span className="sport-nav-icon">🏀</span> Basketball
          </Link>
          <Link className="sport-nav-item" href="/sports/athletics">
            <span className="sport-nav-icon">🏃</span> Athletics
          </Link>
          <Link className="sport-nav-item" href="/sports/volleyball">
            <span className="sport-nav-icon">🏐</span> Volleyball
          </Link>
          <Link className="sport-nav-item more-sports-btn" href="/sports">
            <span>•••</span> More Sports <ChevronDown size={14} />
          </Link>
        </nav>
      </div>

      {/* Fixtures & Results */}
      <section className="design-band">
        <div className="container">
          <div className="design-heading">
            <div className="heading-left">
              <h2>Fixtures &amp; Results</h2>
              <DemoBadge />
              <span className="design-heading-sub">These are sample fixtures for demonstration purposes only.</span>
            </div>
            <Link className="view-all-link" href="/fixtures">
              View all fixtures <ArrowRight size={14} />
            </Link>
          </div>

          <div className="design-fixtures">
            {sampleFixtures.map((fixture) => (
              <article className="fixture-card" key={fixture.id}>
                <header className="fixture-card-header">
                  <div className="fixture-sport-badge">
                    <span>{fixture.sport === "Football" ? "⚽" : fixture.sport === "Netball" ? "◉" : "🏀"}</span>
                    <b>{fixture.sport}</b>
                    <small>• {fixture.category}</small>
                  </div>
                  <time className="fixture-datetime">
                    <span>{fixture.date}</span>
                    <b>{fixture.time}</b>
                  </time>
                </header>

                <div className="fixture-matchup">
                  <div className="fixture-team home">
                    <span className="team-circle-avatar" style={{ backgroundColor: fixture.homeColor }}>
                      {fixture.home.charAt(0)}
                    </span>
                    <span className="team-name">{fixture.home}</span>
                  </div>
                  <i className="vs-badge">VS</i>
                  <div className="fixture-team away">
                    <span className="team-circle-avatar" style={{ backgroundColor: fixture.awayColor }}>
                      {fixture.away.charAt(0)}
                    </span>
                    <span className="team-name">{fixture.away}</span>
                  </div>
                </div>

                <footer className="fixture-card-footer">
                  <span className="fixture-venue" title={fixture.venue}>
                    <MapPin size={13} /> {fixture.venue}
                  </span>
                  <Link className="fixture-preview-btn" href={fixture.link}>
                    Match Preview <ArrowRight size={12} />
                  </Link>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Malawi National Teams */}
      <section className="container design-section">
        <div className="design-heading">
          <div>
            <h2>Malawi National Teams</h2>
            <p>Pride. Opportunity. A Brighter Tomorrow.</p>
          </div>
          <Link className="view-all-link" href="/national-teams">
            Explore all national teams <ArrowRight size={14} />
          </Link>
        </div>

        <div className="design-national-grid">
          {nationalTeamsHighlight.map((team) => (
            <Link className="national-card" href={team.link} key={team.slug}>
              <div className="national-card-media">
                <Image
                  src={team.image}
                  width={600}
                  height={380}
                  sizes="(max-width: 720px) 100vw, 33vw"
                  alt={team.title}
                  className="national-card-img"
                />
                <span className="design-card-shade" />
              </div>
              <div className="national-card-body">
                <h3>{team.name}</h3>
                <p>{team.title}</p>
                <b>Explore team <ArrowRight size={13} /></b>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Split Section: Latest News & Explore Malawi */}
      <section className="container design-split">
        {/* Latest News */}
        <div className="split-column">
          <div className="design-heading">
            <div className="heading-left">
              <h2>Latest News</h2>
              <DemoBadge />
            </div>
            <Link className="view-all-link" href="/news">
              View all news <ArrowRight size={14} />
            </Link>
          </div>

          <div className="design-news-grid">
            {latestNews.map((article) => (
              <Link className="news-photo-card" href={`/news/${article.slug}`} key={article.slug}>
                <div className="news-card-media">
                  <Image
                    src={article.image}
                    width={400}
                    height={220}
                    sizes="(max-width: 720px) 100vw, 20vw"
                    alt={article.title}
                    className="news-card-img"
                  />
                  <span className={`news-sport-tag ${article.sport.toLowerCase()}`}>
                    {article.sport}
                  </span>
                </div>
                <div className="news-card-body">
                  <h3>{article.title}</h3>
                  <div className="news-card-footer">
                    <time>{article.date}</time>
                    <ArrowRight size={14} className="news-arrow" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Explore Malawi */}
        <div className="split-column">
          <div className="design-heading">
            <div>
              <h2>Explore Malawi</h2>
              <p>Find sport in your region. Stronger communities through sport.</p>
            </div>
          </div>

          <div className="design-region-grid">
            {regions.map((reg) => (
              <Link className="region-photo-card" href={`/explore-malawi?region=${reg.query}`} key={reg.name}>
                <div className="region-card-media">
                  <Image
                    src={reg.image}
                    width={400}
                    height={220}
                    sizes="(max-width: 720px) 100vw, 15vw"
                    alt={`${reg.name} landscapes and communities`}
                    className="region-card-img"
                  />
                </div>
                <div className="region-card-body">
                  <h3>{reg.name}</h3>
                  <p>{reg.tagline}</p>
                  <b>Browse sport near you <ArrowRight size={11} /></b>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Sports */}
      <section className="container design-section design-all-sports">
        <div className="design-heading">
          <div>
            <h2>All Sports</h2>
            <p>Every sport. Every community. Explore more.</p>
          </div>
          <Link className="view-all-link" href="/sports">
            View all sports <ArrowRight size={14} />
          </Link>
        </div>

        <div className="sports-tiles-grid">
          {allSportsTiles.map((sport) => (
            <Link className="sport-image-tile" href={`/sports/${sport.slug}`} key={sport.slug}>
              <Image
                src={sport.image}
                width={300}
                height={160}
                sizes="(max-width: 720px) 50vw, 16vw"
                alt={`${sport.name} in Malawi`}
                className="sport-tile-img"
              />
              <span className="sport-tile-overlay" />
              <div className="sport-tile-content">
                <b>{sport.name}</b>
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
