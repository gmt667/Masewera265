import { useCallback, useEffect, type ReactNode } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AsyncRoute, RouteMeta } from "@/src/components/route-support";
import { resolveRouteMetadata } from "@/src/route-metadata";
import HomePage from "@/app/page";
import AboutPage from "@/app/about/page";
import AthletesPage from "@/app/athletes/page";
import AthletePage from "@/app/athletes/[slug]/page";
import CompetitionsPage from "@/app/competitions/page";
import CompetitionPage from "@/app/competitions/[slug]/page";
import DashboardPage from "@/app/dashboard/page";
import PlatformPage from "@/app/dashboard/platform/page";
import EventPage from "@/app/events/[slug]/page";
import ExplorePage from "@/app/explore-malawi/page";
import FixturesPage from "@/app/fixtures/page";
import ComparePlayersPage from "@/app/football/compare-players/page";
import CompareTeamsPage from "@/app/football/compare-teams/page";
import FootballCompetitionsPage from "@/app/football/competitions/page";
import CorrectionsPage from "@/app/football/corrections/page";
import CoveragePage from "@/app/football/coverage/page";
import DerbiesPage from "@/app/football/derbies/page";
import HistoryPage from "@/app/football/history/page";
import SeasonPage from "@/app/football/season/2026-27/page";
import StadiumsPage from "@/app/football/stadiums/page";
import TransfersPage from "@/app/football/transfers/page";
import LivePage from "@/app/live/page";
import NationalTeamsPage from "@/app/national-teams/page";
import NewsPage from "@/app/news/page";
import NewsArticlePage from "@/app/news/[slug]/page";
import OrganizationsPage from "@/app/organizations/page";
import ResultsPage from "@/app/results/page";
import SearchPage from "@/app/search/page";
import SportsPage from "@/app/sports/page";
import SportPage from "@/app/sports/[slug]/page";
import TeamsPage from "@/app/teams/page";
import TeamPage from "@/app/teams/[slug]/page";
import VenuesPage from "@/app/venues/page";
import VenuePage from "@/app/venues/[slug]/page";
import NotFound from "@/app/not-found";

type AsyncPage = () => Promise<ReactNode>;
type DynamicPage = (props: { params: Promise<{ slug: string }> }) => Promise<ReactNode>;

function AsyncPageRoute({ page }: { page: AsyncPage }) {
  const load = useCallback(() => page(), [page]);
  return <AsyncRoute load={load} />;
}

function DynamicPageRoute({ page }: { page: DynamicPage }) {
  const { slug = "" } = useParams();
  const load = useCallback(() => page({ params: Promise.resolve({ slug }) }), [page, slug]);
  return <AsyncRoute load={load} />;
}

function MetadataManager() {
  const { pathname } = useLocation();
  const metadata = resolveRouteMetadata(pathname);
  return <RouteMeta {...metadata} />;
}

function RouteScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return <><MetadataManager /><RouteScrollManager /><SiteHeader /><div id="main" tabIndex={-1}><Routes>
    <Route path="/" element={<AsyncPageRoute page={HomePage} />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/athletes" element={<AsyncPageRoute page={AthletesPage} />} />
    <Route path="/athletes/:slug" element={<DynamicPageRoute page={AthletePage} />} />
    <Route path="/competitions" element={<AsyncPageRoute page={CompetitionsPage} />} />
    <Route path="/competitions/:slug" element={<DynamicPageRoute page={CompetitionPage} />} />
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/dashboard/platform" element={<PlatformPage />} />
    <Route path="/events/:slug" element={<DynamicPageRoute page={EventPage} />} />
    <Route path="/explore-malawi" element={<AsyncPageRoute page={ExplorePage} />} />
    <Route path="/fixtures" element={<AsyncPageRoute page={FixturesPage} />} />
    <Route path="/results" element={<AsyncPageRoute page={ResultsPage} />} />
    <Route path="/live" element={<AsyncPageRoute page={LivePage} />} />
    <Route path="/national-teams" element={<AsyncPageRoute page={NationalTeamsPage} />} />
    <Route path="/news" element={<AsyncPageRoute page={NewsPage} />} />
    <Route path="/news/:slug" element={<DynamicPageRoute page={NewsArticlePage} />} />
    <Route path="/organizations" element={<OrganizationsPage />} />
    <Route path="/search" element={<AsyncPageRoute page={SearchPage} />} />
    <Route path="/sports" element={<AsyncPageRoute page={SportsPage} />} />
    <Route path="/sports/:slug" element={<DynamicPageRoute page={SportPage} />} />
    <Route path="/teams" element={<AsyncPageRoute page={TeamsPage} />} />
    <Route path="/teams/:slug" element={<DynamicPageRoute page={TeamPage} />} />
    <Route path="/venues" element={<AsyncPageRoute page={VenuesPage} />} />
    <Route path="/venues/:slug" element={<DynamicPageRoute page={VenuePage} />} />
    <Route path="/football" element={<Navigate to="/sports/football" replace />} />
    <Route path="/netball" element={<Navigate to="/sports/netball" replace />} />
    <Route path="/basketball" element={<Navigate to="/sports/basketball" replace />} />
    <Route path="/netball/competitions" element={<Navigate to="/competitions?sport=netball" replace />} />
    <Route path="/basketball/competitions" element={<Navigate to="/competitions?sport=basketball" replace />} />
    <Route path="/football/compare-players" element={<ComparePlayersPage />} />
    <Route path="/football/compare-teams" element={<CompareTeamsPage />} />
    <Route path="/football/competitions" element={<FootballCompetitionsPage />} />
    <Route path="/football/corrections" element={<CorrectionsPage />} />
    <Route path="/football/coverage" element={<CoveragePage />} />
    <Route path="/football/derbies" element={<DerbiesPage />} />
    <Route path="/football/history" element={<HistoryPage />} />
    <Route path="/football/season/2026-27" element={<SeasonPage />} />
    <Route path="/football/stadiums" element={<StadiumsPage />} />
    <Route path="/football/transfers" element={<TransfersPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes></div><SiteFooter /></>;
}
