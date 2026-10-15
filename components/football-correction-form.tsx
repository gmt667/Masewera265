"use client";

import { useState } from "react";
import { CheckCircle2, Send, X } from "lucide-react";
import { validateCorrection } from "@/lib/football-logic";

export function FootballCorrectionForm() {
  const [recordType, setRecordType] = useState("Competition season");
  const [subject, setSubject] = useState("");
  const [proposedChange, setProposedChange] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [evidenceNotes, setEvidenceNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateCorrection({ subject, proposedChange, sourceUrl });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      return;
    }
    const draft = {
      recordType,
      subject,
      proposedChange,
      sourceUrl,
      evidenceNotes,
      submittedAt: new Date().toISOString(),
    };
    try {
      const existing = JSON.parse(localStorage.getItem("m265-correction-drafts") || "[]");
      existing.unshift(draft);
      localStorage.setItem("m265-correction-drafts", JSON.stringify(existing.slice(0, 10)));
    } catch {
      // Local demo fallback
    }
    setSubmitted(true);
    setErrors({});
  };

  const handleReset = () => {
    setRecordType("Competition season");
    setSubject("");
    setProposedChange("");
    setSourceUrl("");
    setEvidenceNotes("");
    setSubmitted(false);
    setErrors({});
  };

  return (
    <div className="correction-form-wrap">
      {submitted && (
        <div className="success-message" role="status" style={{ marginBottom: 24, padding: "16px 20px" }}>
          <CheckCircle2 size={20} />
          <div>
            <strong>Local Demonstration Draft Recorded</strong>
            <p style={{ margin: "4px 0 0", fontSize: 11, color: "var(--teal-dark)" }}>
              Your correction for &ldquo;{subject}&rdquo; has been saved locally on this device. In connected production mode, this enters the editor review queue with source comparison.
            </p>
          </div>
          <button type="button" onClick={() => setSubmitted(false)} style={{ marginLeft: "auto" }}>
            <X size={16} />
          </button>
        </div>
      )}

      <form className="correction-form" onSubmit={handleSubmit}>
        <label>
          Record Category:
          <select value={recordType} onChange={(e) => setRecordType(e.target.value)} required>
            <option value="Competition season">Competition Season / Standings</option>
            <option value="Club identity">Club Identity, Stadium or Founding Date</option>
            <option value="Fixture or result">Fixture, Result or Goal Scorer</option>
            <option value="Historical claim">Historical Trophy, Legend or Milestone</option>
            <option value="Player or coach">Player Profile, Transfers or Caps</option>
            <option value="Women's football">Women&apos;s Football Record</option>
          </select>
        </label>

        <label>
          Record or Subject Name:
          <input
            required
            minLength={3}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. 1988 CECAFA Final Scorers or Moyale Barracks Home Ground"
          />
          {errors.subject && <small className="field-error" role="alert">{errors.subject}</small>}
        </label>

        <label className="full">
          Public Source Evidence URL:
          <input
            required
            type="url"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            placeholder="https://fam.mw/news/ or link to verified gazette / match report"
          />
          {errors.sourceUrl && <small className="field-error" role="alert">{errors.sourceUrl}</small>}
        </label>

        <label className="full">
          Proposed Correction / Missing Record Details:
          <textarea
            required
            rows={4}
            value={proposedChange}
            onChange={(e) => setProposedChange(e.target.value)}
            placeholder="Describe the discrepancy clearly, citing exact dates, scorelines, players, or competition names as documented in the source."
          />
          {errors.proposedChange && <small className="field-error" role="alert">{errors.proposedChange}</small>}
        </label>

        <label className="full">
          Additional Context or Archive Reference (Optional):
          <textarea
            rows={2}
            value={evidenceNotes}
            onChange={(e) => setEvidenceNotes(e.target.value)}
            placeholder="e.g. Page number in FAM 2023 season review, newspaper clipping, or official gazette number"
          />
        </label>

        <div style={{ display: "flex", gap: 12, gridColumn: "1/-1", marginTop: 8 }}>
          <button className="button design-primary" type="submit">
            <Send size={15} /> Validate &amp; Save Draft Locally
          </button>
          <button className="button design-outline" type="button" onClick={handleReset}>
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}
