import Link from "next/link";
import { Activity, ArrowLeft, Database, FileCheck2, PlugZap, ShieldAlert } from "lucide-react";

const indicators = [
  { label: "Football coverage", value: "Partial demo", note: "FAM references are linked; no backend-supplied coverage total exists.", icon: Database },
  { label: "Publication activity", value: "Unavailable", note: "A publication service and audit history are required.", icon: FileCheck2 },
  { label: "Football data quality", value: "Not calculated", note: "Season completeness and source-review metrics are unavailable.", icon: Activity },
  { label: "Football integration", value: "Not connected", note: "Fixtures, results, squads, tables and workflow APIs remain outstanding.", icon: PlugZap },
];

export const metadata = { title: "Platform Management Demo | Masewera265" };
export default function PlatformPage() { return <div className="platform-page"><div className="container"><Link className="back-link" href="/dashboard"><ArrowLeft/> Back to dashboard</Link><p className="eyebrow">EXECUTIVE VIEW</p><h1>Platform management overview</h1><div className="dashboard-warning"><ShieldAlert/><div><strong>Demonstration overview</strong><p>These cards describe integration state; they are not production monitoring, commercial analytics or backend health claims.</p></div></div><section className="platform-grid">{indicators.map(({label,value,note,icon:Icon})=><article key={label}><Icon/><p>{label}</p><strong>{value}</strong><small>{note}</small></article>)}</section><section className="dashboard-panel"><h2>Required operational feeds</h2><div className="table-wrap"><table><thead><tr><th>Feed</th><th>Owner</th><th>State</th></tr></thead><tbody><tr><td>Coverage and freshness</td><td>Public data API</td><td><span className="workflow-status">Unavailable</span></td></tr><tr><td>Publication and review activity</td><td>Editorial workflow API</td><td><span className="workflow-status">Unavailable</span></td></tr><tr><td>Authorization and audit history</td><td>Identity / audit services</td><td><span className="workflow-status">Unavailable</span></td></tr><tr><td>Provider health</td><td>Server integrations</td><td><span className="workflow-status">Unavailable</span></td></tr></tbody></table></div></section></div></div>; }
