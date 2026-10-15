export interface CorrectionInput { subject: string; proposedChange: string; sourceUrl: string }

export function validateCorrection(input: CorrectionInput) {
  const errors: Record<string, string> = {};
  if (input.subject.trim().length < 3) errors.subject = "Enter at least 3 characters.";
  if (input.proposedChange.trim().length < 15) errors.proposedChange = "Describe the correction in at least 15 characters.";
  try {
    const url = new URL(input.sourceUrl);
    if (url.protocol !== "https:" && url.protocol !== "http:") errors.sourceUrl = "Use a public HTTP or HTTPS source URL.";
  } catch { errors.sourceUrl = "Enter a valid public source URL."; }
  return errors;
}

export function filterRecords<T>(records: T[], query: string, text: (record: T) => string) {
  const needle = query.trim().toLocaleLowerCase();
  if (!needle) return records;
  return records.filter((record) => text(record).toLocaleLowerCase().includes(needle));
}

export interface LocalDraft { title: string; notes: string; status: string }

export function recoverLocalDraft(raw: string | null): LocalDraft | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<LocalDraft>;
    if (typeof value.title !== "string" || typeof value.notes !== "string" || typeof value.status !== "string") return null;
    return { title: value.title, notes: value.notes, status: value.status };
  } catch { return null; }
}

export function connectedFailureMessage(mode: "demo" | "connected", hasEndpoint: boolean) {
  return mode === "connected" && !hasEndpoint
    ? "Connected data requested, but no approved Masewera265 API endpoint is configured."
    : null;
}
