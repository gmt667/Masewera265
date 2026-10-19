import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { DataStatePanel } from "@/components/data-state";
import NotFound from "@/app/not-found";
import { NotFoundError, RedirectError } from "@/src/platform/navigation";

export function AsyncRoute({ load }: { load: () => Promise<ReactNode> }) {
  const [state, setState] = useState<{ node?: ReactNode; error?: unknown }>({});
  useEffect(() => {
    let active = true;
    setState({});
    load().then((node) => active && setState({ node })).catch((error) => active && setState({ error }));
    return () => { active = false; };
  }, [load]);
  if (state.error instanceof RedirectError) return <Navigate to={state.error.to} replace />;
  if (state.error instanceof NotFoundError) return <NotFound />;
  if (state.error) return <DataStatePanel state="error" message="This page could not be loaded." />;
  return state.node ?? <div className="route-state" role="status" aria-live="polite"><span className="state-spinner" /><h1>Loading Masewera265</h1><p>Preparing the latest available page data.</p></div>;
}

export function RouteMeta({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    document.title = title.includes("Masewera265") ? title : `${title} | Masewera265`;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta && description) meta.content = description;
  }, [title, description]);
  return null;
}
