import { Link as RouterLink, type LinkProps } from "react-router-dom";
import type { ReactNode } from "react";

type AppLinkProps = Omit<LinkProps, "to"> & { href: string; children?: ReactNode };

export default function Link({ href, ...props }: AppLinkProps) {
  if (/^(https?:|mailto:|tel:)/.test(href)) return <a href={href} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  return <RouterLink to={href} {...props} />;
}
