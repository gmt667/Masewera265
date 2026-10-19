import { createContext, useContext } from "react";

export const RouteRetryContext = createContext<(() => void) | undefined>(undefined);

export function useRouteRetry() {
  return useContext(RouteRetryContext);
}
