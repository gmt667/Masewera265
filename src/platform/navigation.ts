import { useLocation, useNavigate, useSearchParams as useRouterSearchParams } from "react-router-dom";

export class NotFoundError extends Error {}
export class RedirectError extends Error { constructor(public readonly to: string) { super(`Redirect to ${to}`); } }

export function notFound(): never { throw new NotFoundError("Route record not found"); }
export function redirect(to: string): never { throw new RedirectError(to); }
export function usePathname() { return useLocation().pathname; }
export function useSearchParams() { return useRouterSearchParams()[0]; }
export function useRouter() {
  const navigate = useNavigate();
  return { push: (to: string) => navigate(to), replace: (to: string) => navigate(to, { replace: true }), back: () => navigate(-1) };
}
