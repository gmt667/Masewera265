"use client";
import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <div className="route-state error-state" role="alert"><span>!</span><h1>Something went wrong</h1><p>The page could not be displayed. No demonstration records were inserted as a fallback.</p><button className="button secondary" onClick={reset}>Try again</button></div>;
}
