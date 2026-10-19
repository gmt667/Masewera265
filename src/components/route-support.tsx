import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { DataStatePanel } from "@/components/data-state";
import NotFound from "@/app/not-found";
import { NotFoundError, RedirectError } from "@/src/platform/navigation";
import { RouteRetryContext } from "@/src/components/route-retry";

export function AsyncRoute({ load }: { load: (signal: AbortSignal) => Promise<ReactNode> }) {
  const [state, setState] = useState<{ node?: ReactNode; error?: unknown }>({});
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    setState({});
    load(controller.signal)
      .then((node) => !controller.signal.aborted && setState({ node }))
      .catch((error) => !controller.signal.aborted && setState({ error }));
    return () => controller.abort();
  }, [attempt, load]);
  if (state.error instanceof RedirectError) return <Navigate to={state.error.to} replace />;
  if (state.error instanceof NotFoundError) return <NotFound />;
  if (state.error) return <DataStatePanel state="error" message="This page could not be loaded." onRetry={retry} />;
  if (!state.node) return <div className="route-state" role="status" aria-live="polite"><span className="state-spinner" /><h1>Loading Masewera265</h1><p>Preparing the latest available page data.</p></div>;
  return <RouteRetryContext.Provider value={retry}>{state.node}</RouteRetryContext.Provider>;
}

function ensureMeta(selector: string, attributes: Record<string, string>) {
  let element = document.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
}

export function RouteMeta({ title, description, canonicalPath = "/", robots = "index,follow", type = "website" }: {
  title: string;
  description?: string;
  canonicalPath?: string;
  robots?: "index,follow" | "noindex,nofollow";
  type?: "website" | "article";
}) {
  useEffect(() => {
    const fullTitle = title.includes("Masewera265") ? title : `${title} | Masewera265`;
    const siteUrl = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, "");
    const canonicalUrl = `${siteUrl}${canonicalPath === "/" ? "/" : canonicalPath}`;
    document.title = fullTitle;
    if (description) ensureMeta('meta[name="description"]', { name: "description", content: description });
    ensureMeta('meta[name="robots"]', { name: "robots", content: robots });
    ensureMeta('meta[property="og:title"]', { property: "og:title", content: fullTitle });
    if (description) ensureMeta('meta[property="og:description"]', { property: "og:description", content: description });
    ensureMeta('meta[property="og:type"]', { property: "og:type", content: type });
    ensureMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    ensureMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary" });
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [title, description, canonicalPath, robots, type]);
  return null;
}
