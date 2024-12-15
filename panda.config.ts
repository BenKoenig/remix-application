import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  presets: ["@pandacss/preset-base"],
  include: [
    "./app/root.tsx",
    "./app/routes/**/*.{ts,tsx,js,jsx}",
    "./app/components/**/*.{ts,tsx,js,jsx}",
  ],
  exclude: [],
  theme: {
    extend: {},
  },
  jsxFramework: "react",
  outdir: "styled-system",
});
