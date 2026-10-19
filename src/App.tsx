import { lazy, Suspense, useCallback, useEffect, type ReactNode } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AsyncRoute, RouteMeta } from "@/src/components/route-support";
import { resolveRouteMetadata } from "@/src/route-metadata";
import { RouteErrorBoundaryShell } from "@/src/components/route-error-boundary";
import NotFound from "@/app/not-found";

type AsyncPage = (props: { searchParams: Promise<Record<string, string | string[] | undefined>>; signal: AbortSignal }) => Promise<ReactNode>;
type DynamicPage = (props: { params: Promise<{ slug: string }>; signal: AbortSignal }) => Promise<ReactNode>;
type AsyncPageLoader = () => Promise<{ default: AsyncPage }>;
type DynamicPageLoader = () => Promise<{ default: DynamicPage }>;

const loadHomePage = () => import("@/app/page");
const loadAthletesPage = () => import("@/app/athletes/page");
const loadAthletePage = () => import("@/app/athletes/[slug]/page");
const loadCompetitionsPage = () => import("@/app/competitions/page");
const loadCompetitionPage = () => import("@/app/competitions/[slug]/page");
const loadEventPage = () => import("@/app/events/[slug]/page");
const loadExplorePage = () => import("@/app/explore-malawi/page");
const loadFixturesPage = () => import("@/app/fixtures/page");
const loadLivePage = () => import("@/app/live/page");
const loadNationalTeamsPage = () => import("@/app/national-teams/page");
const loadNewsPage = () => import("@/app/news/page");
const loadNewsArticlePage = () => import("@/app/news/[slug]/page");
const loadResultsPage = () => import("@/app/results/page");
const loadSearchPage = () => import("@/app/search/page");
const loadSportsPage = () => import("@/app/sports/page");
const loadSportPage = () => import("@/app/sports/[slug]/page");
const loadTeamsPage = () => import("@/app/teams/page");
const loadTeamPage = () => import("@/app/teams/[slug]/page");
const loadVenuesPage = () => import("@/app/venues/page");
const loadVenuePage = () => import("@/app/venues/[slug]/page");

const AboutPage = lazy(() => import("@/app/about/page"));
const DashboardPage = lazy(() => import("@/app/dashboard/page"));
const PlatformPage = lazy(() => import("@/app/dashboard/platform/page"));
const OrganizationsPage = lazy(() => import("@/app/organizations/page"));
const ComparePlayersPage = lazy(() => import("@/app/football/compare-players/page"));
const CompareTeamsPage = lazy(() => import("@/app/football/compare-teams/page"));
const FootballCompetitionsPage = lazy(() => import("@/app/football/competitions/page"));
const CorrectionsPage = lazy(() => import("@/app/football/corrections/page"));
const CoveragePage = lazy(() => import("@/app/football/coverage/page"));
const DerbiesPage = lazy(() => import("@/app/football/derbies/page"));
const HistoryPage = lazy(() => import("@/app/football/history/page"));
const SeasonPage = lazy(() => import("@/app/football/season/2026-27/page"));
const StadiumsPage = lazy(() => import("@/app/football/stadiums/page"));
const TransfersPage = lazy(() => import("@/app/football/transfers/page"));

function AsyncPageRoute({ loadPage }: { loadPage: AsyncPageLoader }) {
  const { search } = useLocation();
  const load = useCallback(async (signal: AbortSignal) => {
    const values: Record<string, string | string[]> = {};
    for (const [key, value] of new URLSearchParams(search)) {
      const current = values[key];
      values[key] = current === undefined ? value : Array.isArray(current) ? [...current, value] : [current, value];
    }
    const { default: page } = await loadPage();
    return page({ searchParams: Promise.resolve(values), signal });
  }, [loadPage, search]);
  return <AsyncRoute load={load} />;
}

function DynamicPageRoute({ loadPage }: { loadPage: DynamicPageLoader }) {
  const { slug = "" } = useParams();
  const load = useCallback(async (signal: AbortSignal) => {
    const { default: page } = await loadPage();
    return page({ params: Promise.resolve({ slug }), signal });
  }, [loadPage, slug]);
  return <AsyncRoute load={load} />;
}

function MetadataManager() {
  const { pathname } = useLocation();
  const metadata = resolveRouteMetadata(pathname);
  return <RouteMeta {...metadata} />;
}

export function RouteScrollManager() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    window.requestAnimationFrame(() => document.getElementById("main")?.focus({ preventScroll: true }));
  }, [pathname, search, hash]);

  return null;
}

export default function App() {
  return <><MetadataManager /><RouteScrollManager /><SiteHeader /><div id="main" role="main" tabIndex={-1}><RouteErrorBoundaryShell><Suspense fallback={<div className="route-state" role="status" aria-live="polite">Loading page…</div>}><Routes>
    <Route path="/" element={<AsyncPageRoute loadPage={loadHomePage} />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/athletes" element={<AsyncPageRoute loadPage={loadAthletesPage} />} />
    <Route path="/athletes/:slug" element={<DynamicPageRoute loadPage={loadAthletePage} />} />
    <Route path="/competitions" element={<AsyncPageRoute loadPage={loadCompetitionsPage} />} />
    <Route path="/competitions/:slug" element={<DynamicPageRoute loadPage={loadCompetitionPage} />} />
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/dashboard/platform" element={<PlatformPage />} />
    <Route path="/events/:slug" element={<DynamicPageRoute loadPage={loadEventPage} />} />
    <Route path="/explore-malawi" element={<AsyncPageRoute loadPage={loadExplorePage} />} />
    <Route path="/fixtures" element={<AsyncPageRoute loadPage={loadFixturesPage} />} />
    <Route path="/results" element={<AsyncPageRoute loadPage={loadResultsPage} />} />
    <Route path="/live" element={<AsyncPageRoute loadPage={loadLivePage} />} />
    <Route path="/national-teams" element={<AsyncPageRoute loadPage={loadNationalTeamsPage} />} />
    <Route path="/news" element={<AsyncPageRoute loadPage={loadNewsPage} />} />
    <Route path="/news/:slug" element={<DynamicPageRoute loadPage={loadNewsArticlePage} />} />
    <Route path="/organizations" element={<OrganizationsPage />} />
    <Route path="/search" element={<AsyncPageRoute loadPage={loadSearchPage} />} />
    <Route path="/sports" element={<AsyncPageRoute loadPage={loadSportsPage} />} />
    <Route path="/sports/:slug" element={<DynamicPageRoute loadPage={loadSportPage} />} />
    <Route path="/teams" element={<AsyncPageRoute loadPage={loadTeamsPage} />} />
    <Route path="/teams/:slug" element={<DynamicPageRoute loadPage={loadTeamPage} />} />
    <Route path="/venues" element={<AsyncPageRoute loadPage={loadVenuesPage} />} />
    <Route path="/venues/:slug" element={<DynamicPageRoute loadPage={loadVenuePage} />} />
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
  </Routes></Suspense></RouteErrorBoundaryShell></div><SiteFooter /></>;
}
