"use client";
export default function ErrorPage({ reset }: { reset: () => void }) { return <div className="route-state error-state"><span>!</span><h1>Something went wrong</h1><p>The page could not be displayed. No demonstration records were inserted as a fallback.</p><button className="button secondary" onClick={reset}>Try again</button></div>; }
