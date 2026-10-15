"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Activity, Bell, CalendarDays, CheckCircle2, ChevronRight, ClipboardCheck, FileText, LayoutDashboard, Save, Search, Settings, ShieldAlert, Trophy, Users } from "lucide-react";
import { recoverLocalDraft } from "@/lib/football-logic";

const roles = {
  supporter: { label: "Supporter", sections: ["Football overview", "Followed clubs", "Flames & Scorchers", "Saved news"], stats: [["Following", "Football demo"], ["Fixtures", "Sample records"], ["Saved", "Device-local"]] },
  athlete: { label: "Athlete", sections: ["Profile", "Affiliations", "Performances", "Change requests"], stats: [["Profile", "72% complete"], ["Records", "Demo only"], ["Requests", "1 pending"]] },
  manager: { label: "Club & team manager", sections: ["Football club overview", "Men's, women's & youth teams", "Fixtures", "Submissions"], stats: [["Teams", "Demo records"], ["Squads", "Backend required"], ["Review", "Demo queue"]] },
  organizer: { label: "Association / organizer", sections: ["Football seasons", "Club entries", "Scheduling", "Competition structures"], stats: [["Seasons", "Demo interface"], ["Entries", "Unavailable"], ["Fixtures", "Local drafts"]] },
  reporter: { label: "Reporter", sections: ["Football assignments", "Device-local reports", "Match evidence", "Submission history"], stats: [["Assigned", "Demo matches"], ["Local drafts", "Device-local"], ["Sync", "Unavailable"]] },
  editor: { label: "Editor & verifier", sections: ["Football review queue", "Results & transfers", "Archive claims", "Corrections"], stats: [["In review", "Demo records"], ["Sources", "Comparison demo"], ["Published", "Unavailable"]] },
  administrator: { label: "Administrator", sections: ["Football entities", "Coverage & sources", "Users & roles", "Integrations"], stats: [["Coverage", "Partial football"], ["Sources", "Metadata demo"], ["Integrations", "Not connected"]] },
} as const;

type Role = keyof typeof roles;

export function DashboardDemo({ initialRole = "supporter" }: { initialRole?: Role }) {
  const [role, setRole] = useState<Role>(initialRole);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [following, setFollowing] = useState(true);
  const [workflow, setWorkflow] = useState("Draft");
  const [draftTitle, setDraftTitle] = useState("");
  const [draftNotes, setDraftNotes] = useState("");
  useEffect(() => {
    const saved = localStorage.getItem("m265-demo-role") as Role | null;
    if (saved && roles[saved]) setRole(saved);
    const savedFollowing = localStorage.getItem("m265-demo-following");
    if (savedFollowing !== null) setFollowing(savedFollowing === "true");
    const savedDraft = localStorage.getItem("m265-football-draft");
    const recoveredDraft = recoverLocalDraft(savedDraft);
    if (recoveredDraft) { setDraftTitle(recoveredDraft.title); setDraftNotes(recoveredDraft.notes); setWorkflow(recoveredDraft.status); }
  }, []);
  const current = roles[role];
  const rows = useMemo(() => [
    ["Flames campaign record", "Archive verification", "Pending review"],
    ["Football result record", "Result submission", "Draft"],
    ["Club historical name", "Correction", "Returned for correction"],
  ].filter(row => row.join(" ").toLowerCase().includes(query.toLowerCase())), [query]);
  const changeRole = (next: Role) => { setRole(next); localStorage.setItem("m265-demo-role", next); setNotice(`Preview changed to ${roles[next].label}.`); };
  const changeFollowing = () => { const next = !following; setFollowing(next); localStorage.setItem("m265-demo-following", String(next)); setNotice(`${next ? "Followed" : "Unfollowed"} in this browser only.`); };
  const resetDemo = () => { localStorage.removeItem("m265-demo-role"); localStorage.removeItem("m265-demo-following"); localStorage.removeItem("m265-football-draft"); setRole("supporter"); setFollowing(true); setQuery(""); setDraftTitle(""); setDraftNotes(""); setWorkflow("Draft"); setNotice("Device-local football dashboard state reset."); };
  const saveDraft = () => { localStorage.setItem("m265-football-draft", JSON.stringify({ title: draftTitle, notes: draftNotes, status: workflow })); setNotice("Football draft saved on this device only."); };
  const submitDraft = () => { if (!draftTitle.trim() || draftNotes.trim().length < 10) { setNotice("Validation failed: add a record title and at least 10 characters of source notes."); return; } setWorkflow("Submitted"); localStorage.setItem("m265-football-draft", JSON.stringify({ title: draftTitle, notes: draftNotes, status: "Submitted" })); setNotice("Demo submission recorded locally; no server or public record changed."); };
  const returnForCorrection = () => { setWorkflow("Returned for correction"); setNotice("Demo reviewer returned this football record for correction."); };

  return <div className="dashboard-shell">
    <aside className="dashboard-sidebar">
      <Link href="/" className="dashboard-brand">MASEWERA<span>265</span></Link>
      <p className="dashboard-mode"><ShieldAlert size={16}/> Dashboard Demo</p>
      <label>Preview role<select value={role} onChange={e => changeRole(e.target.value as Role)}>{Object.entries(roles).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}</select></label>
      <nav aria-label="Dashboard navigation"><a className="active" href="#overview"><LayoutDashboard size={18}/> Overview</a>{current.sections.map((item, index) => <a href={`#section-${index}`} key={item}><ChevronRight size={18}/>{item}</a>)}</nav>
      <Link href="/dashboard/platform">Platform management</Link><button className="dashboard-reset" onClick={resetDemo}>Reset local demo</button><Link href="/about#data-modes">Data & security notes</Link>
    </aside>
    <div className="dashboard-main">
      <header className="dashboard-top"><div><p>Dashboard / {current.label}</p><h1>{current.label} workspace</h1></div><Link className="button secondary" href="/">Public website</Link></header>
      <div className="dashboard-warning"><ShieldAlert size={20}/><div><strong>Demonstration interface — not real authorization</strong><p>No account, private record, notification, publication or synchronization service is connected. Role switching only previews interfaces in this browser.</p></div></div>
      {notice && <div className="success-message" role="status"><CheckCircle2 size={18}/>{notice}<button onClick={() => setNotice("")}>Dismiss</button></div>}
      <section id="overview" className="dashboard-stat-grid">{current.stats.map(([label, value], i) => <article key={label}><span>{[<Users key="u"/>, <Activity key="a"/>, <ClipboardCheck key="c"/>][i]}</span><p>{label}</p><strong>{value}</strong></article>)}</section>
      <section className="dashboard-panel"><div className="panel-heading"><div><p className="eyebrow">FOOTBALL WORKFLOW PREVIEW</p><h2>{current.sections[0]}</h2></div><span className={`workflow-status workflow-${workflow.toLowerCase().replaceAll(" ", "-")}`}>{workflow}</span></div>
        {role === "supporter" ? <div className="follow-row"><div><Trophy/><span><strong>The Flames</strong><small>Malawi men&apos;s national football selection</small></span></div><button className="button secondary" onClick={changeFollowing}>{following ? "Unfollow" : "Follow"}</button></div> :
        <form className="dashboard-form" onSubmit={e => {e.preventDefault(); submitDraft();}}><label>Football record title<input value={draftTitle} onChange={e=>setDraftTitle(e.target.value)} required minLength={4} placeholder="e.g. Flames campaign source review"/></label><label>Workflow status<select value={workflow} onChange={e=>setWorkflow(e.target.value)}><option>Draft</option><option>Submitted</option><option>Under review</option><option>Returned for correction</option><option disabled>Approved — backend controlled</option><option disabled>Published — backend controlled</option></select></label><label className="full">Source notes / correction reason<textarea value={draftNotes} onChange={e=>setDraftNotes(e.target.value)} required rows={3} placeholder="Add source URL, evidence or correction details"/></label><div className="form-actions"><button className="button secondary" type="button" onClick={saveDraft}><Save size={17}/> Save draft locally</button><button className="button" type="submit">Submit demo record</button>{(workflow === "Submitted" || workflow === "Under review") && <button className="button secondary" type="button" onClick={returnForCorrection}>Return for correction</button>}</div></form>}
      </section>
      <section className="dashboard-panel"><div className="panel-heading"><div><p className="eyebrow">ACTIVITY</p><h2>Records and requests</h2></div><label className="table-search"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search records" aria-label="Search records"/></label></div>
        <div className="table-wrap"><table><thead><tr><th>Record</th><th>Type</th><th>Status</th><th>Action</th></tr></thead><tbody>{rows.map(row => <tr key={row[0]}><td>{row[0]}</td><td>{row[1]}</td><td><span className="workflow-status">{row[2]}</span></td><td><button onClick={() => setNotice(`Opened demo record: ${row[0]}`)}>View</button></td></tr>)}</tbody></table>{!rows.length && <p className="table-empty">No records match this search.</p>}</div>
      </section>
      <section className="dashboard-actions"><article><Bell/><h3>Notifications</h3><p>Simulated preferences only. No messages are sent.</p><button onClick={() => setNotice("Notification preference updated locally.")}>Manage</button></article><article><CalendarDays/><h3>Schedule</h3><p>Representative events in Africa/Blantyre time.</p><Link href="/fixtures">View fixtures</Link></article><article><FileText/><h3>Integration contract</h3><p>Backend requirements and ownership are documented.</p><Link href="/about#data-modes">Review modes</Link></article><article><Settings/><h3>Settings</h3><p>Display preferences remain on this device.</p><button onClick={() => setNotice("Demo settings opened.")}>Open</button></article></section>
    </div>
  </div>;
}
