"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-MW">
      <body>
        <main className="route-state error-state" role="alert">
          <span>!</span>
          <h1>Masewera265 could not load</h1>
          <p>A critical page error occurred. Please retry; no demonstration records have been substituted.</p>
          <button className="button secondary" onClick={reset}>Try again</button>
        </main>
      </body>
    </html>
  );
}
