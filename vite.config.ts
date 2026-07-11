import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Root-level Vite config used by Vercel.
// Replit uses artifacts/vyakti-parichay/vite.config.ts directly via pnpm --filter.
// Here we point Vite's root at the frontend artifact so all source files,
// index.html and CSS are picked up correctly, while outputting to /dist at
// the repo root where Vercel's outputDirectory expects it.

const frontendDir = path.resolve(import.meta.dirname, "artifacts/vyakti-parichay");

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(frontendDir, "src"),
      "@assets": path.resolve(frontendDir, "src", "assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: frontendDir,
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
});
