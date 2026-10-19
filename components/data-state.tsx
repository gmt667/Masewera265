"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import type { DataState } from "@/lib/data-service";
import { useRouteRetry } from "@/src/components/route-retry";

interface DataStatePanelProps {
  state: Exclude<DataState, "ready">;
  message?: string;
  retryable?: boolean;
  onRetry?: () => void;
}

export function DataStatePanel({ state, message, retryable, onRetry }: DataStatePanelProps) {
  const retryRoute = useRouteRetry();
  const title = state === "empty"
    ? "No records available"
    : state === "stale"
      ? "Previously loaded records"
      : state === "unavailable"
        ? "Connected data is not configured"
        : "Connected data could not be loaded";
  const canRetry = retryable ?? (state === "error" || state === "stale");
  const handleRetry = onRetry ?? retryRoute ?? (() => window.location.reload());

  return (
    <div className={`empty-state data-state data-state-${state}`} role={state === "error" ? "alert" : "status"}>
      <span><AlertCircle size={24} /></span>
      <h2>{title}</h2>
      <p>{message || "No approved public records were returned for this view."}</p>
      {canRetry && (
        <button className="button secondary" type="button" onClick={handleRetry}>
          <RefreshCw size={16} /> Try again
        </button>
      )}
    </div>
  );
}
