"use client";

import Link from "@/src/platform/link";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  LogOut,
  Save,
  Search,
  Settings,
  ShieldAlert,
  Trophy,
  Users,
} from "lucide-react";
import { recoverLocalDraft } from "@/lib/football-logic";
import {
  DashboardAuth,
  getStoredDemoProfile,
  clearDemoProfile,
  type AuthUser,
} from "./dashboard-auth";

const roles = {
  supporter: { label: "Supporter", sections: ["Football overview", "Followed clubs", "Flames & Scorchers", "Saved news"], stats: [["Following", "The Flames"], ["Fixtures", "View schedule"], ["Saved", "This device"]] },
  athlete: { label: "Athlete", sections: ["Profile", "Affiliations", "Performances", "Change requests"], stats: [["Profile", "72% complete"], ["Records", "Pending sync"], ["Requests", "1 pending"]] },
  manager: { label: "Club & team manager", sections: ["Football club overview", "Men's, women's & youth teams", "Fixtures", "Submissions"], stats: [["Teams", "Registered"], ["Squads", "Backend required"], ["Review", "Pending queue"]] },
  organizer: { label: "Association / organizer", sections: ["Football seasons", "Club entries", "Scheduling", "Competition structures"], stats: [["Seasons", "Active"], ["Entries", "Unavailable"], ["Fixtures", "Local drafts"]] },
  reporter: { label: "Reporter", sections: ["Football assignments", "Device-local reports", "Match evidence", "Submission history"], stats: [["Assigned", "Upcoming matches"], ["Local drafts", "This device"], ["Sync", "Unavailable"]] },
  editor: { label: "Editor & verifier", sections: ["Football review queue", "Results & transfers", "Archive claims", "Corrections"], stats: [["In review", "3 records"], ["Sources", "Comparison"], ["Published", "Unavailable"]] },
  administrator: { label: "Administrator", sections: ["Football entities", "Coverage & sources", "Users & roles", "Integrations"], stats: [["Coverage", "Partial football"], ["Sources", "Verified"], ["Integrations", "Not connected"]] },
} as const;

type Role = keyof typeof roles;
const dashboardSectionIds = ["workflow", "activity", "tools", "data-notes"];

export function DashboardDemo({ initialRole = "supporter" }: { initialRole?: Role }) {
  const [role, setRole] = useState<Role>(initialRole);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [following, setFollowing] = useState(true);
  const [workflow, setWorkflow] = useState("Draft");
  const [draftTitle, setDraftTitle] = useState("");
  const [draftNotes, setDraftNotes] = useState("");

  // Device-local access demonstration state. This is not authentication.
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const session = getStoredDemoProfile();
    if (session) {
      setAuthUser(session);
      if (roles[session.role]) {
        setRole(session.role);
      }
    }
    setAuthChecked(true);

    const saved = localStorage.getItem("m265-demo-role") as Role | null;
    if (saved && roles[saved]) setRole(saved);
    const savedFollowing = localStorage.getItem("m265-demo-following");
    if (savedFollowing !== null) setFollowing(savedFollowing === "true");
    const savedDraft = localStorage.getItem("m265-football-draft");
    const recoveredDraft = recoverLocalDraft(savedDraft);
    if (recoveredDraft) {
      setDraftTitle(recoveredDraft.title);
      setDraftNotes(recoveredDraft.notes);
      setWorkflow(recoveredDraft.status);
    }
  }, []);

  const current = roles[role];
  const rows = useMemo(() => [
    ["Flames campaign record", "Archive verification", "Pending review"],
    ["Football result record", "Result submission", "Draft"],
    ["Club historical name", "Correction", "Returned for correction"],
  ].filter(row => row.join(" ").toLowerCase().includes(query.toLowerCase())), [query]);

  const changeRole = (next: Role) => {
    setRole(next);
    localStorage.setItem("m265-demo-role", next);
    setNotice(`Preview changed to ${roles[next].label}.`);
  };

  const changeFollowing = () => {
    const next = !following;
    setFollowing(next);
    localStorage.setItem("m265-demo-following", String(next));
    setNotice(`${next ? "Followed" : "Unfollowed"} in this browser only.`);
  };

  const handleSignOut = () => {
    clearDemoProfile();
    setAuthUser(null);
    setNotice("Closed the device-local dashboard preview.");
  };

  const resetDemo = () => {
    clearDemoProfile();
    setAuthUser(null);
    localStorage.removeItem("m265-demo-role");
    localStorage.removeItem("m265-demo-following");
    localStorage.removeItem("m265-football-draft");
    setRole("supporter");
    setFollowing(true);
    setQuery("");
    setDraftTitle("");
    setDraftNotes("");
    setWorkflow("Draft");
    setNotice("Device-local dashboard preview reset.");
  };

  const saveDraft = () => {
    localStorage.setItem("m265-football-draft", JSON.stringify({ title: draftTitle, notes: draftNotes, status: workflow }));
    setNotice("Football draft saved on this device only.");
  };

  const submitDraft = () => {
    if (!draftTitle.trim() || draftNotes.trim().length < 10) {
      setNotice("Validation failed: add a record title and at least 10 characters of source notes.");
      return;
    }
    setWorkflow("Submitted");
    localStorage.setItem("m265-football-draft", JSON.stringify({ title: draftTitle, notes: draftNotes, status: "Submitted" }));
    setNotice("Demo submission recorded locally; no server or public record changed.");
  };

  const returnForCorrection = () => {
    setWorkflow("Returned for correction");
    setNotice("Demo reviewer returned this football record for correction.");
  };

  // Wait for local storage session inspection
  if (!authChecked) {
    return (
      <div className="dashboard-shell auth-shell">
        <div className="auth-loading-state">
          <span>Loading the device-local workspace preview...</span>
        </div>
      </div>
    );
  }

  // Show the access-flow demonstration before entering the role preview.
  if (!authUser) {
    return (
      <div className="dashboard-shell auth-shell">
        <DashboardAuth
          defaultRole={role}
          onDemoStarted={(user) => {
            setAuthUser(user);
            setRole(user.role);
            setNotice(`Demo profile ready for ${user.fullName}. No account or authenticated session was created.`);
          }}
        />
      </div>
    );
  }

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <Link href="/" className="dashboard-brand">MASEWERA<span>265</span></Link>
        <p className="dashboard-mode"><ShieldAlert size={16}/> Dashboard Preview</p>

        {/* Device-local demo profile card */}
        <div className="dashboard-user-card">
          <div className="user-avatar-wrap">
            <span className="user-avatar-initials">
              {authUser.fullName.slice(0, 2).toUpperCase()}
            </span>
            <span className="user-online-badge" title="Device-local demo profile active" />
          </div>
          <div className="user-text-info">
            <strong className="user-name">{authUser.fullName}</strong>
            <span className="user-org-badge">{authUser.organization || current.label}</span>
            <small className="user-phone-meta">
              <ShieldAlert size={12} className="verified-shield-icon" /> Demo identifier ({authUser.phone})
            </small>
          </div>
          <button className="auth-signout-btn" onClick={handleSignOut} title="Close dashboard preview">
            <LogOut size={13} />
            <span>Close preview</span>
          </button>
        </div>

        <label>
          Preview role
          <select value={role} onChange={e => changeRole(e.target.value as Role)}>
            {Object.entries(roles).map(([key, value]) => (
              <option key={key} value={key}>{value.label}</option>
            ))}
          </select>
        </label>
        <nav aria-label="Dashboard navigation">
          <a className="active" href="#overview"><LayoutDashboard size={18}/> Overview</a>
          {current.sections.map((item, index) => (
            <a href={`#${dashboardSectionIds[index]}`} key={item}><ChevronRight size={18}/>{item}</a>
          ))}
        </nav>
        <Link href="/dashboard/platform">Platform management</Link>
        <button className="dashboard-reset" onClick={resetDemo}>Reset local demo</button>
        <Link href="/about#data-modes">Data & security notes</Link>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-top">
          <div>
            <p>
              Dashboard / {current.label} • <span className="session-pill"><ShieldAlert size={12}/> Local demo: {authUser.fullName}</span>
            </p>
            <h1>{current.label} workspace</h1>
          </div>
          <div className="top-action-group">
            <button className="button secondary auth-logout-quick" onClick={handleSignOut}>
              <LogOut size={14}/> Close preview
            </button>
            <Link className="button secondary" href="/">Public website</Link>
          </div>
        </header>

        <div className="dashboard-warning">
          <ShieldAlert size={20}/>
          <div>
            <strong>Demonstration interface — no authentication or authorization</strong>
            <p><strong>{authUser.fullName}</strong> is a device-local demo profile. The fixed code does not verify identity, and role switching grants no permissions or backend access.</p>
          </div>
        </div>

        {notice && (
          <div className="success-message" role="status">
            <CheckCircle2 size={18}/>
            {notice}
            <button onClick={() => setNotice("")}>Dismiss</button>
          </div>
        )}

        <section id="overview" className="dashboard-stat-grid">
          {current.stats.map(([label, value], i) => (
            <article key={label}>
              <span>{[<Users key="u"/>, <Activity key="a"/>, <ClipboardCheck key="c"/>][i]}</span>
              <p>{label}</p>
              <strong>{value}</strong>
            </article>
          ))}
        </section>

        <section id="workflow" className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">FOOTBALL WORKFLOW PREVIEW</p>
              <h2>{current.sections[0]}</h2>
            </div>
            <span className={`workflow-status workflow-${workflow.toLowerCase().replaceAll(" ", "-")}`}>{workflow}</span>
          </div>
          {role === "supporter" ? (
            <div className="follow-row">
              <div>
                <Trophy/>
                <span>
                  <strong>The Flames</strong>
                  <small>Malawi men&apos;s national football selection</small>
                </span>
              </div>
              <button className="button secondary" onClick={changeFollowing}>
                {following ? "Unfollow" : "Follow"}
              </button>
            </div>
          ) : (
            <form className="dashboard-form" onSubmit={e => { e.preventDefault(); submitDraft(); }}>
              <label>
                Football record title
                <input
                  value={draftTitle}
                  onChange={e => setDraftTitle(e.target.value)}
                  required
                  minLength={4}
                  placeholder="e.g. Flames campaign source review"
                />
              </label>
              <label>
                Workflow status
                <select value={workflow} onChange={e => setWorkflow(e.target.value)}>
                  <option>Draft</option>
                  <option>Submitted</option>
                  <option>Under review</option>
                  <option>Returned for correction</option>
                  <option disabled>Approved — backend controlled</option>
                  <option disabled>Published — backend controlled</option>
                </select>
              </label>
              <label className="full">
                Source notes / correction reason
                <textarea
                  value={draftNotes}
                  onChange={e => setDraftNotes(e.target.value)}
                  required
                  rows={3}
                  placeholder="Add source URL, evidence or correction details"
                />
              </label>
              <div className="form-actions">
                <button className="button secondary" type="button" onClick={saveDraft}>
                  <Save size={17}/> Save draft locally
                </button>
                <button className="button" type="submit">Submit demo record</button>
                {(workflow === "Submitted" || workflow === "Under review") && (
                  <button className="button secondary" type="button" onClick={returnForCorrection}>
                    Return for correction
                  </button>
                )}
              </div>
            </form>
          )}
        </section>

        <section id="activity" className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">ACTIVITY</p>
              <h2>Records and requests</h2>
            </div>
            <label className="table-search">
              <Search size={17}/>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search records"
                aria-label="Search records"
              />
            </label>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Record</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(row => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td><span className="workflow-status">{row[2]}</span></td>
                    <td>
                      <button onClick={() => setNotice(`Opened demo record: ${row[0]}`)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!rows.length && <p className="table-empty">No records match this search.</p>}
          </div>
        </section>

        <section id="tools" className="dashboard-actions">
          <article>
            <Bell/>
            <h3>Notifications</h3>
            <p>Simulated preferences only. No messages are sent.</p>
            <button onClick={() => setNotice("Notification preference updated locally.")}>Manage</button>
          </article>
          <article>
            <CalendarDays/>
            <h3>Schedule</h3>
            <p>Representative events in Africa/Blantyre time.</p>
            <Link href="/fixtures">View fixtures</Link>
          </article>
          <article id="data-notes">
            <FileText/>
            <h3>Integration contract</h3>
            <p>Backend requirements and ownership are documented.</p>
            <Link href="/about#data-modes">Review modes</Link>
          </article>
          <article>
            <Settings/>
            <h3>Settings</h3>
            <p>Display preferences remain on this device.</p>
            <button onClick={() => setNotice("Demo settings opened.")}>Open</button>
          </article>
        </section>
      </div>
    </div>
  );
}
