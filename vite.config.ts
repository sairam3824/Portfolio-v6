import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  publicDir: "shared-public",
  server: {
    port: 3000,
  },
  build: {
    target: "es2020",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-ui": ["lucide-react", "react-helmet-async"],
          "vendor-supabase": ["@supabase/supabase-js"],
          "vendor-analytics": ["web-vitals"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
