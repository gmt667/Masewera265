// Fallback declarations for environments where the package registry cannot
// finish extracting Next.js. A normal npm install supplies the full types.
declare module "next" {
  export interface Metadata {
    title?: string | { default: string; template: string };
    description?: string;
  }
  export interface NextConfig {
    reactStrictMode?: boolean;
    poweredByHeader?: boolean;
  }
}
declare module "next/link" {
  import type { ComponentType, AnchorHTMLAttributes } from "react";
  const Link: ComponentType<AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>;
  export default Link;
}
declare module "next/image" {
  import type { ComponentType, ImgHTMLAttributes } from "react";
  const Image: ComponentType<ImgHTMLAttributes<HTMLImageElement> & { src: string; width: number; height: number; priority?: boolean; unoptimized?: boolean }>;
  export default Image;
}
declare module "next/navigation" {
  export function usePathname(): string;
  export function notFound(): never;
}
