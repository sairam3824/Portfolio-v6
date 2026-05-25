import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { writeFileSync } from "fs";
import { buildRootSitemapXml, buildRootRobotsTxt } from "./shared-data/seoArtifacts";

function seoGeneratorPlugin() {
  const generate = () => {
    writeFileSync("shared-public/sitemap.xml", buildRootSitemapXml());
    writeFileSync("shared-public/robots.txt", buildRootRobotsTxt());
  };
  return {
    name: "portfolio-seo-generator",
    buildStart: generate,
    configureServer(server: { watcher: { on: (event: string, cb: (f: string) => void) => void } }) {
      generate();
      server.watcher.on("change", (file) => {
        if (file.includes("blogData") || file.includes("seoArtifacts") || file.includes("siteMetadata")) {
          generate();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tsconfigPaths(), seoGeneratorPlugin()],
  publicDir: "shared-public",
  server: {
    port: 3000,
  },
  build: {
    target: "es2020",
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-ui": ["lucide-react", "react-helmet-async"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
