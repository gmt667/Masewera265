"use client";
import { useState } from "react";
import { Radio } from "lucide-react";
import type { EventRecord } from "@/lib/types";
const tabs = ["Overview", "Timeline", "Participants", "Statistics"] as const;
type Tab = typeof tabs[number];
export function EventTabs({ event }: { event: EventRecord }) {
  const [active, setActive] = useState<Tab>("Overview");
  return <><div className="tabs" role="tablist" aria-label="Event information">{tabs.map(tab => <button key={tab} role="tab" aria-selected={active === tab} className={active === tab ? "active" : ""} onClick={() => setActive(tab)}>{tab}</button>)}</div><section className="content-card" role="tabpanel"><h2>{active}</h2>{active === "Overview" && <div className="unavailable-field"><span>Demo</span><h3>{event.status === "FINAL" ? "Demonstration result" : "Demonstration fixture"}</h3><p>{event.status === "FINAL" ? `${event.home} ${event.homeScore} – ${event.awayScore} ${event.away}. This sample score is not an official result.` : `${event.date} at ${event.time} CAT. This schedule is representative and not an official fixture.`}</p></div>}{active === "Timeline" && (event.status === "LIVE" ? <div className="timeline"><div><b>LIVE</b><span><Radio size={14}/> Demonstration timeline · {event.updated}</span></div></div> : <Unavailable label="Timeline"/>)}{active === "Participants" && <Unavailable label="Participant or lineup data"/>}{active === "Statistics" && <Unavailable label="Sport-specific statistics"/>}</section></>;
}
function Unavailable({ label }: { label: string }) { return <div className="unavailable-field"><span>—</span><h3>{label} unavailable</h3><p>An approved backend record is required. No fictional values have been substituted.</p></div>; }
