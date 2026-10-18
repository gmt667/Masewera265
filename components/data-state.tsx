"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import type { DataState } from "@/lib/data-service";

export function DataStatePanel({ state, message }: { state: Exclude<DataState, "ready">; message?: string }) {
  const title = state === "empty"
    ? "No records available"
    : state === "stale"
      ? "Previously loaded records"
      : state === "unavailable"
        ? "Connected data is not configured"
        : "Connected data could not be loaded";
  const canRetry = state === "error" || state === "stale";

  return (
    <div className={`empty-state data-state data-state-${state}`} role={state === "error" ? "alert" : "status"}>
      <span><AlertCircle size={24} /></span>
      <h2>{title}</h2>
      <p>{message || "No approved public records were returned for this view."}</p>
      {canRetry && (
        <button className="button secondary" type="button" onClick={() => window.location.reload()}>
          <RefreshCw size={16} /> Try again
        </button>
      )}
    </div>
  );
}
