import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { buildRootSitemapXml, buildRootRobotsTxt, buildRootRssXml } from "./shared-data/seoArtifacts";

function seoGeneratorPlugin() {
  const generate = () => {
    writeFileSync("shared-public/sitemap.xml", buildRootSitemapXml());
    writeFileSync("shared-public/robots.txt", buildRootRobotsTxt());
    writeFileSync("shared-public/feed.xml", buildRootRssXml());
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

/**
 * Post-build plugin: injects <link rel="modulepreload"> and <link rel="preload">
 * tags into the built HTML for the entry chunk and its direct imports.
 * This eliminates the waterfall where the browser must parse index.html → discover
 * main.tsx → parse main.tsx → discover vendor-react, vendor-ui, CSS.
 * With these hints all critical resources start downloading in parallel immediately.
 */
function preloadInjectionPlugin(): Plugin {
  return {
    name: "portfolio-preload-injection",
    enforce: "post",
    apply: "build",
    closeBundle() {
      const distDir = resolve(__dirname, "dist");
      const htmlPath = resolve(distDir, "index.html");

      let html: string;
      try {
        html = readFileSync(htmlPath, "utf-8");
      } catch {
        return; // HTML not found — skip
      }

      // Find the entry module script tag that Vite already inserted
      // e.g. <script type="module" ... src="/assets/index-XXXX.js">
      const entryMatch = html.match(/src="(\/assets\/index-[^"]+\.js)"/);
      if (!entryMatch) return;

      // Read the entry JS to find its static imports (vendor chunks)
      const entryJsPath = resolve(distDir, entryMatch[1].slice(1)); // remove leading /
      let entryJs: string;
      try {
        entryJs = readFileSync(entryJsPath, "utf-8");
      } catch {
        return;
      }

      // Collect modulepreload targets: entry + its static imports
      // Vite outputs relative imports like: from"./vendor-react-HASH.js"
      const importMatches = entryJs.matchAll(/from\s*"\.\/([^"]+\.js)"/g);
      const preloadJs = new Set<string>([entryMatch[1]]);
      for (const m of importMatches) {
        preloadJs.add(`/assets/${m[1]}`);
      }

      // Find CSS link already in the HTML
      const cssMatch = html.match(/href="(\/assets\/index-[^"]+\.css)"/);

      // Build preload tags
      const tags: string[] = [];

      // Preload CSS first (render-blocking)
      if (cssMatch) {
        tags.push(`    <link rel="preload" href="${cssMatch[1]}" as="style" />`);
      }

      // Modulepreload JS chunks
      for (const src of preloadJs) {
        tags.push(`    <link rel="modulepreload" href="${src}" />`);
      }

      if (tags.length === 0) return;

      // Inject right before </head>
      const injection = `\n    <!-- Perf: preload critical resources to eliminate waterfall -->\n${tags.join("\n")}\n`;
      html = html.replace("</head>", `${injection}  </head>`);

      writeFileSync(htmlPath, html);
      console.log(`\n  ⚡ Injected ${tags.length} preload hints into index.html`);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoGeneratorPlugin(), preloadInjectionPlugin()],
  publicDir: "shared-public",
  resolve: {
    tsconfigPaths: true,
  },
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
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("/react/") ||
              id.includes("/react-dom/") ||
              id.includes("/react-router/") ||
              id.includes("/react-router-dom/") ||
              id.includes("/@remix-run/")
            ) {
              return "vendor-react";
            }
            if (id.includes("/lucide-react/") || id.includes("/react-helmet-async/")) {
              return "vendor-ui";
            }
            return "vendor-other";
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
