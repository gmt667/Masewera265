import Link from "@/src/platform/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { footballTransfers } from "@/lib/football-data";
import { DataNotice, TrustBadge } from "@/components/ui";

export const metadata = {
  title: "Malawian Football Transfers Tracker | Masewera265",
  description: "Confirmed domestic and international transfers, contract extensions, and squad movements involving Malawian football players.",
};

export default function FootballTransfersPage() {
  return (
    <div className="football-transfers-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">CONFIRMED PLAYER MOVEMENTS</p>
          <h1>Football Transfer Tracker</h1>
          <p className="lead">
            Documented signings, overseas professional departures, loan agreements, and contract extensions across the TNM Super League and Malawian national players.
          </p>
        </div>
      </section>

      <main className="container page-content">
        <DataNotice
          title="Transfer policy: Confirmed announcements only"
          body="Masewera265 strictly tracks confirmed player registrations and verified club statements. Transfer speculation, social media rumours, and unconfirmed agent claims are excluded to preserve sporting data integrity."
        />

        <div className="table-wrap">
          <table className="history-data-table transfers-table">
            <thead>
              <tr>
                <th>Player</th>
                <th>Position</th>
                <th>From Club</th>
                <th>To Club</th>
                <th>Transfer Terms</th>
                <th>Date</th>
                <th>Status</th>
                <th>Verification Source</th>
              </tr>
            </thead>
            <tbody>
              {footballTransfers.map((tx) => (
                <tr key={tx.id}>
                  <td>
                    <strong>{tx.player}</strong>
                  </td>
                  <td>{tx.position}</td>
                  <td>{tx.fromTeam}</td>
                  <td>
                    <strong className="text-teal">{tx.toTeam}</strong>
                  </td>
                  <td>
                    <span className="fee-badge">{tx.feeType}</span>
                  </td>
                  <td>{tx.date}</td>
                  <td>
                    <TrustBadge label={tx.status} />
                  </td>
                  <td>
                    <small className="source-note">
                      <ShieldCheck size={12} /> {tx.source}
                    </small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="transfer-guidelines-box">
          <h3>Transfer Reporting Guidelines</h3>
          <p>
            Domestic transfers within the TNM Super League and National Division League require official clearance certificates (CR10 forms) lodged with SULOM and FAM. International transfers require FIFA TMS (Transfer Matching System) completion.
          </p>
          <Link className="button design-primary" href="/football/corrections">
            Submit a Confirmed Transfer Announcement <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    </div>
  );
}
