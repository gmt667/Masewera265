import Link from "next/link";
export default function NotFound() { return <div className="route-state"><span>404</span><h1>Page not found</h1><p>This sporting record is unavailable or its address has changed.</p><Link className="button secondary" href="/">Return home</Link></div>; }
