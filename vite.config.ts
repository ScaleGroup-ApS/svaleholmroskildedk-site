import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],
  // Replaces the vite-tsconfig-paths plugin — Vite 8 resolves the `~/*` alias
  // from tsconfig.json natively.
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 5175,
  },
});
