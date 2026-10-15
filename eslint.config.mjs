import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });
const config = [
  { ignores: [".next/**", "node_modules/**", "temp_doc/**", "temp_plan/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { files: ["scripts/**/*.js", "scripts/**/*.cjs"], rules: { "@typescript-eslint/no-require-imports": "off" } },
];
export default config;
