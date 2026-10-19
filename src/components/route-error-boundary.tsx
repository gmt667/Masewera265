import { Component, type ErrorInfo, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { DataStatePanel } from "@/components/data-state";

interface BoundaryState {
  error?: Error;
}

class RouteErrorBoundary extends Component<{ children: ReactNode }, BoundaryState> {
  state: BoundaryState = {};

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error("Route rendering failed", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="container page-content">
          <DataStatePanel
            state="error"
            message="This page module could not be loaded. Check your connection and try again."
          />
        </main>
      );
    }
    return this.props.children;
  }
}

export function RouteErrorBoundaryShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return <RouteErrorBoundary key={pathname}>{children}</RouteErrorBoundary>;
}
