import Image from "@/src/platform/image";
import Link from "@/src/platform/link";
import { ArrowRight, BookOpen, History, MapPin, ShieldCheck, Trophy, ExternalLink, ArrowLeftRight, Landmark } from "lucide-react";
import { articles, athletes, events, teams } from "@/lib/demo-data";
import { footballCompetitions, footballSources } from "@/lib/football-data";
import { DataNotice, EventCard, SectionHeading, TrustBadge } from "./ui";
import { TeamLogo } from "./team-logo";
import { SportIcon } from "./sport-icon";

export function FootballHome() {
  const footballEvents = events.filter((e) => e.sport === "Football");
  const footballClubs = teams.filter((t) => t.sport === "Football" && !t.isNationalTeam).slice(0, 8);
  const footballPlayers = athletes.filter((a) => a.sport === "Football").slice(0, 6);
  const footballNews = articles.filter((a) => a.sport === "Football").slice(0, 3);
  const superLeague = footballCompetitions.find((c) => c.slug === "tnm-super-league");

  return (
    <div className="football-home">
      {/* Hero Section */}
      <section className="football-hero">
        <Image
          src="/images/hero-football.jpg"
          width={1680}
          height={945}
          priority
          sizes="100vw"
          alt="Malawian football players representing The Flames and domestic clubs"
          className="football-hero-bg"
        />
        <div className="football-hero-overlay" />
        <div className="container football-hero-content">
          <p className="eyebrow-football">MALAWIAN FOOTBALL HUB</p>
          <h1>
            One game.<br />
            <em>Every level.</em>
          </h1>
          <p className="hero-lead">
            Explore The Flames, The Scorchers, TNM Super League, domestic cups, clubs, grassroots development, and the preserved historical record of Malawian football.
          </p>

          <div className="hero-actions">
            <Link className="button design-primary" href="/fixtures?sport=football">
              Fixtures &amp; Results <ArrowRight size={16} />
            </Link>
            <Link className="button design-outline" href="/football/history">
              Football History Centre <History size={16} />
            </Link>
          </div>

          <div className="football-hero-stats">
            <div>
              <strong>16</strong>
              <span>Premiership Clubs</span>
            </div>
            <div>
              <strong>2</strong>
              <span>National Selections</span>
            </div>
            <div>
              <strong>5</strong>
              <span>Pyramid Tiers</span>
            </div>
            <div>
              <strong>28</strong>
              <span>Football Districts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Football Nav */}
      <div className="football-nav-bar">
        <nav className="football-nav container" aria-label="Football sections">
          <Link href="#national">Flames &amp; Scorchers</Link>
          <Link href="#matches">Matches</Link>
          <Link href="/football/competitions">Leagues &amp; Cups</Link>
          <Link href="#clubs">Clubs</Link>
          <Link href="#women">Women&apos;s Football</Link>
          <Link href="/football/history">History Centre</Link>
          <Link href="/football/transfers">Transfers</Link>
          <Link href="/football/derbies">Derbies</Link>
          <Link href="/football/stadiums">Stadiums</Link>
          <Link href="/football/coverage">Coverage Ledger</Link>
        </nav>
      </div>

      <main className="container football-content">
        <DataNotice
          title="Football coverage is actively expanding"
          body="Competition calendar and tournament structures are linked to official FAM and SULOM sources. Match outcomes, historical champions, squad lists, and transfer records are sourced from verified sporting documentation."
        />

        {/* National Teams Highlight */}
        <section id="national" className="football-section">
          <SectionHeading
            eyebrow="Malawi Selections"
            title="The Flames &amp; The Scorchers"
            action="All National Teams"
            href="/national-teams"
          />
          <div className="football-national-grid">
            {teams
              .filter((t) => ["the-flames", "the-scorchers"].includes(t.slug))
              .map((team) => (
                <div className="football-national-card" key={team.slug}>
                  <div className="card-top">
                    <TeamLogo slug={team.slug} name={team.shortName} size={80} />
                    <div>
                      <div className="badge-row">
                        <span className="national-pill">FAM National Selection</span>
                        <TrustBadge label={team.trust} />
                      </div>
                      <h2>{team.name}</h2>
                      <p className="team-grounds">
                        <MapPin size={13} /> {team.venue}
                      </p>
                    </div>
                  </div>
                  <p className="about-text">{team.about}</p>
                  {team.honors && team.honors.length > 0 && (
                    <div className="team-honors-preview">
                      <b>Key Honours:</b>
                      <ul>
                        {team.honors.slice(0, 2).map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="card-actions">
                    <Link className="button design-primary" href={`/teams/${team.slug}`}>
                      Explore {team.shortName} Profile <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Fixtures, Results & Ongoing Matches */}
        <section id="matches" className="football-section">
          <SectionHeading
            eyebrow="Match Centre"
            title="Fixtures, Results &amp; Live Action"
            action="All Football Fixtures"
            href="/fixtures?sport=football"
          />
          {footballEvents.length ? (
            <div className="event-grid">
              {footballEvents.slice(0, 3).map((e) => (
                <EventCard event={e} key={e.id} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span><SportIcon sport="football" size={28} /></span>
              <h3>No scheduled football matches</h3>
              <p>Fixtures will appear as published by FAM and SULOM.</p>
            </div>
          )}
        </section>

        {/* Leagues & Cups + Super League Standings Preview */}
        <section id="competitions" className="football-section">
          <SectionHeading
            eyebrow="Pyramid Architecture"
            title="Leagues &amp; Cup Competitions"
            action="Full Competition Directory"
            href="/football/competitions"
          />
          <div className="football-competitions-split">
            <div className="competitions-card-list">
              {footballCompetitions.slice(0, 6).map((comp) => (
                <Link className="comp-item-card" href={`/competitions/${comp.slug}`} key={comp.slug}>
                  <div className="comp-icon-box">
                    <Trophy size={20} />
                  </div>
                  <div className="comp-info">
                    <span className="tier-tag">{comp.tier}</span>
                    <h3>{comp.name}</h3>
                    <p>{comp.summary}</p>
                    <small>Champion: <b>{comp.currentChampion}</b></small>
                  </div>
                  <ArrowRight size={16} className="arrow" />
                </Link>
              ))}
            </div>

            {/* Standings Table Preview */}
            {superLeague && superLeague.standings && (
              <div className="standings-preview-box">
                <div className="standings-header">
                  <div>
                    <span className="tier-tag">Tier 1 · Standings</span>
                    <h3>TNM Super League Table</h3>
                  </div>
                  <Link href={`/competitions/${superLeague.slug}`} className="view-more-link">
                    Full table <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="mini-table-wrap">
                  <table className="mini-standings-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th colSpan={2}>Club</th>
                        <th>P</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>GD</th>
                        <th>Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {superLeague.standings.slice(0, 8).map((row) => (
                        <tr key={row.teamSlug} className={row.rank === 1 ? "row-champions" : row.rank <= 4 ? "row-caf" : ""}>
                          <td><b>{row.rank}</b></td>
                          <td className="logo-cell">
                            <TeamLogo slug={row.teamSlug} name={row.team} size={24} />
                          </td>
                          <td>
                            <Link href={`/teams/${row.teamSlug}`} className="team-table-link">
                              {row.team}
                            </Link>
                          </td>
                          <td>{row.played}</td>
                          <td>{row.won}</td>
                          <td>{row.drawn}</td>
                          <td>{row.lost}</td>
                          <td>{row.gd > 0 ? `+${row.gd}` : row.gd}</td>
                          <td><b>{row.points}</b></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="table-footer-note">
                  <span>Top 8 qualify for Airtel Top 8 Cup · 1st qualifies for CAF Champions League</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Featured Clubs */}
        <section id="clubs" className="football-section">
          <SectionHeading
            eyebrow="Club Football"
            title="Senior Football Clubs"
            action="Search All Clubs"
            href="/teams?sport=football"
          />
          <div className="directory-grid">
            {footballClubs.map((team) => (
              <Link className="directory-card team-directory-card" href={`/teams/${team.slug}`} key={team.slug}>
                <TeamLogo slug={team.slug} name={team.name} size={60} />
                <div className="team-card-info">
                  <h2>{team.shortName}</h2>
                  <p><MapPin size={13} /> {team.location}</p>
                  <div className="team-badges-row">
                    <span className="sport-pill">{team.sport}</span>
                    <TrustBadge label={team.trust} />
                  </div>
                </div>
                <ArrowRight size={18} className="card-arrow" />
              </Link>
            ))}
          </div>
        </section>

        {/* Women's Football Callout */}
        <section id="women" className="football-callout-banner">
          <div className="callout-content">
            <span className="pill-white">WOMEN&apos;S FOOTBALL IN MALAWI</span>
            <h2>The Rise of The Scorchers &amp; Global Trailblazers</h2>
            <p>
              From the 2023 COSAFA Women&apos;s Championship victory to Tabitha and Temwa Chawinga dominating European and American leagues, women&apos;s football in Malawi is reaching historic heights. Explore national selections, the NBM Women&apos;s Premiership, and local club academies.
            </p>
            <div className="callout-actions">
              <Link className="button design-primary" href="/teams/the-scorchers">
                The Scorchers Profile <ArrowRight size={16} />
              </Link>
              <Link className="button design-outline" href="/football/history#womens-history">
                Women&apos;s Football History <History size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Players & Figures */}
        <section className="football-section">
          <SectionHeading
            eyebrow="Documented Players"
            title="Featured Players &amp; Figures"
            action="All Athletes"
            href="/athletes"
          />
          <div className="football-players-grid">
            {footballPlayers.map((player) => (
              <Link className="player-card" href={`/athletes/${player.slug}`} key={player.slug}>
                <div className="player-number-avatar">#{player.number}</div>
                <div className="player-info">
                  <h3>{player.name}</h3>
                  <p>{player.role} · {player.team}</p>
                  <TrustBadge label={player.trust} />
                </div>
                <ArrowRight size={16} />
              </Link>
            ))}
          </div>
        </section>

        {/* Extended Football Discovery Grid */}
        <section className="football-section">
          <SectionHeading
            eyebrow="Deep Discovery"
            title="Explore Malawian Football Dimensions"
          />
          <div className="football-dimensions-grid">
            <Link className="dimension-card" href="/football/history">
              <div className="dim-icon"><BookOpen size={24} /></div>
              <h3>Football History Centre</h3>
              <p>Browse documented seasons, trophies, legends, historic teams, and memorable matches from 1964 to 2026.</p>
              <b>Explore Archives <ArrowRight size={14} /></b>
            </Link>

            <Link className="dimension-card" href="/football/transfers">
              <div className="dim-icon"><ArrowLeftRight size={24} /></div>
              <h3>Transfer Tracker</h3>
              <p>Confirmed player transfers, contract extensions, overseas departures, and squad movements with verified sources.</p>
              <b>View Transfers <ArrowRight size={14} /></b>
            </Link>

            <Link className="dimension-card" href="/football/derbies">
              <div className="dim-icon"><Trophy size={24} /></div>
              <h3>Derbies &amp; Rivalries</h3>
              <p>The Blantyre Derby, Lilongwe Derby, Forces Derby, and regional clashes with head-to-head records and folklore.</p>
              <b>Read Rivalries <ArrowRight size={14} /></b>
            </Link>

            <Link className="dimension-card" href="/football/stadiums">
              <div className="dim-icon"><Landmark size={24} /></div>
              <h3>Stadium Directory</h3>
              <p>Kamuzu Stadium, Bingu National Stadium, CIVO, Silver Stadium, Mzuzu Stadium, capacities, and facilities.</p>
              <b>Browse Grounds <ArrowRight size={14} /></b>
            </Link>

            <Link className="dimension-card" href="/explore-malawi">
              <div className="dim-icon"><MapPin size={24} /></div>
              <h3>Grassroots &amp; Districts</h3>
              <p>Discover regional leagues (CRFA, SRFA, NRFA), district championships, school, and university football.</p>
              <b>Browse Regions <ArrowRight size={14} /></b>
            </Link>

            <Link className="dimension-card" href="/football/corrections">
              <div className="dim-icon"><ShieldCheck size={24} /></div>
              <h3>Suggest a Correction</h3>
              <p>Found a missing record, incorrect statistic, or unverified claim? Submit evidence to our review queue.</p>
              <b>Submit Details <ArrowRight size={14} /></b>
            </Link>
          </div>
        </section>

        {/* Published Stories */}
        <section className="football-section">
          <SectionHeading
            eyebrow="Published News"
            title="Latest Football Stories"
            action="All Football News"
            href="/news"
          />
          <div className="news-grid">
            {footballNews.map((article) => (
              <article className="news-card" key={article.slug}>
                <div className="news-visual">
                  <Image
                    src="/images/news-football.jpg"
                    width={400}
                    height={220}
                    alt={article.title}
                    sizes="(max-width: 720px) 100vw, 33vw"
                    className="news-card-img"
                  />
                  <span>Football</span>
                </div>
                <div className="news-body">
                  <p className="news-meta">{article.published} · {article.readTime}</p>
                  <h3>
                    <Link href={`/news/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p>{article.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Sourced Reference Notes */}
        <section className="football-sources">
          <div className="sources-header">
            <h2>Authoritative Sources &amp; Coverage Policy</h2>
            <p>
              Reviewed 14 October 2026. Masewera265 strictly requires published evidence before records become verified.
            </p>
          </div>
          <div className="sources-list">
            {footballSources.map((source) => (
              <a href={source.url} target="_blank" rel="noreferrer" key={source.url} className="source-item">
                <div>
                  <strong>{source.title}</strong>
                  {source.note && <p>{source.note}</p>}
                </div>
                <div className="source-meta">
                  <small>Reviewed {source.reviewed}</small>
                  <ExternalLink size={14} />
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
