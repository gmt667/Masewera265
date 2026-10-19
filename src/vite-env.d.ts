/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DATA_MODE?: "demo" | "connected";
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta { readonly env: ImportMetaEnv }
