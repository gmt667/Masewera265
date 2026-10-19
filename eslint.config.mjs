import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  { ignores: ["dist/**", ".next/**", "node_modules/**", "temp_doc/**", "temp_plan/**", "app/layout.tsx", "app/robots.ts", "app/sitemap.ts"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { react, "react-hooks": hooks },
    languageOptions: {
      globals: { window: "readonly", document: "readonly", navigator: "readonly", localStorage: "readonly", console: "readonly", URL: "readonly", AbortSignal: "readonly", fetch: "readonly", HTMLElement: "readonly", HTMLAnchorElement: "readonly", HTMLMetaElement: "readonly", Node: "readonly", MouseEvent: "readonly", KeyboardEvent: "readonly" },
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...hooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/set-state-in-effect": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
  { files: ["scripts/**/*.{js,cjs,mjs}"], languageOptions: { sourceType: "commonjs", globals: { require: "readonly", console: "readonly", process: "readonly", URL: "readonly", Buffer: "readonly", fetch: "readonly" } }, rules: { "@typescript-eslint/no-require-imports": "off", "no-empty": "off", "no-control-regex": "off" } },
);
