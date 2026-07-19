import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { buildRootSitemapXml, buildRootRobotsTxt, buildRootRssXml } from "./shared-data/seoArtifacts";
import { getAllRouteSeo, type RouteSeoEntry } from "./shared-data/prerenderData";
import { profileDetails, siteMetadata } from "./shared-data/siteMetadata";

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

// ---------------------------------------------------------------------------
// Pre-render Plugin — generates per-route HTML files at build time
// so Googlebot receives fully-formed HTML without needing JS rendering.
// ---------------------------------------------------------------------------

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

function buildMetaTags(entry: RouteSeoEntry): string {
    const siteUrl = siteMetadata.siteUrl;
    const canonicalPath = entry.path === "/" ? "/" : entry.path.replace(/\/+$/, "");
    const canonicalUrl = entry.path === "/" ? `${siteUrl}/` : `${siteUrl}${canonicalPath}`;
    const fullImage = entry.image?.startsWith("http")
        ? entry.image
        : `${siteUrl}${entry.image ?? siteMetadata.previewImage}`;
    const imageType = fullImage.includes("/api/og") ? "image/png"
        : fullImage.endsWith(".webp") ? "image/webp"
        : fullImage.endsWith(".png") ? "image/png"
        : siteMetadata.previewImageType;
    const imageAlt = `${entry.title} | ${profileDetails.name}`;

    const lines: string[] = [
        `    <title>${escapeHtml(entry.title)}</title>`,
        `    <meta name="title" content="${escapeHtml(entry.title)}" />`,
        `    <meta name="description" content="${escapeHtml(entry.description)}" />`,
        `    <meta name="author" content="${escapeHtml(profileDetails.name)}" />`,
        `    <meta name="robots" content="${entry.robots}" />`,
        `    <meta name="googlebot" content="${entry.robots}" />`,
        `    <link rel="canonical" href="${canonicalUrl}" />`,
    ];

    if (entry.keywords.length > 0) {
        lines.push(`    <meta name="keywords" content="${escapeHtml(entry.keywords.join(", "))}" />`);
    }

    // Open Graph
    lines.push(
        `    <meta property="og:title" content="${escapeHtml(entry.title)}" />`,
        `    <meta property="og:description" content="${escapeHtml(entry.description)}" />`,
        `    <meta property="og:type" content="${entry.ogType}" />`,
        `    <meta property="og:url" content="${canonicalUrl}" />`,
        `    <meta property="og:image" content="${fullImage}" />`,
        `    <meta property="og:image:secure_url" content="${fullImage}" />`,
        `    <meta property="og:image:width" content="1200" />`,
        `    <meta property="og:image:height" content="630" />`,
        `    <meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />`,
        `    <meta property="og:image:type" content="${imageType}" />`,
        `    <meta property="og:site_name" content="${escapeHtml(profileDetails.name)}" />`,
        `    <meta property="og:locale" content="en_US" />`,
    );

    // Twitter
    lines.push(
        `    <meta name="twitter:card" content="summary_large_image" />`,
        `    <meta name="twitter:url" content="${canonicalUrl}" />`,
        `    <meta name="twitter:title" content="${escapeHtml(entry.title)}" />`,
        `    <meta name="twitter:description" content="${escapeHtml(entry.description)}" />`,
        `    <meta name="twitter:image" content="${fullImage}" />`,
        `    <meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />`,
        `    <meta name="twitter:creator" content="${siteMetadata.twitterHandle}" />`,
        `    <meta name="twitter:site" content="${siteMetadata.twitterHandle}" />`,
    );

    // Article-specific meta
    if (entry.ogType === "article") {
        lines.push(`    <meta property="article:author" content="${escapeHtml(profileDetails.name)}" />`);
        if (entry.publishedTime) {
            lines.push(`    <meta property="article:published_time" content="${entry.publishedTime}" />`);
        }
        if (entry.modifiedTime) {
            lines.push(`    <meta property="article:modified_time" content="${entry.modifiedTime}" />`);
            lines.push(`    <meta property="og:updated_time" content="${entry.modifiedTime}" />`);
        }
        for (const tag of entry.keywords) {
            lines.push(`    <meta property="article:tag" content="${escapeHtml(tag)}" />`);
        }
    }

    // JSON-LD structured data
    const schemaType = entry.ogType === "article" ? "Article" : entry.pageType;
    const schemaId = entry.pageType === "ProfilePage" ? `${siteUrl}/#profilepage` : canonicalUrl;
    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": schemaType,
        "@id": schemaId,
        "name": entry.title,
        "description": entry.description,
        "url": canonicalUrl,
        "image": fullImage,
        "isPartOf": { "@id": `${siteUrl}/#website` },
        "about": { "@id": `${siteUrl}/#person` },
        "inLanguage": "en-US",
    };

    if (entry.ogType === "article") {
        schema["headline"] = entry.title;
        schema["mainEntityOfPage"] = { "@type": "WebPage", "@id": canonicalUrl };
        schema["author"] = { "@type": "Person", "@id": `${siteUrl}/#person`, "name": profileDetails.name, "url": `${siteUrl}/` };
        schema["publisher"] = { "@type": "Person", "@id": `${siteUrl}/#person`, "name": profileDetails.name, "url": `${siteUrl}/` };
        if (entry.publishedTime) schema["datePublished"] = entry.publishedTime;
        if (entry.modifiedTime) schema["dateModified"] = entry.modifiedTime;
    }

    if (entry.pageType === "ProfilePage") {
        schema["mainEntity"] = { "@id": `${siteUrl}/#person` };
        schema["dateCreated"] = "2024-01-01T00:00:00+05:30";
        schema["dateModified"] = new Date().toISOString();
    }

    lines.push(`    <script type="application/ld+json">${JSON.stringify(schema)}</script>`);

    return lines.join("\n");
}

function prerenderPlugin(): Plugin {
    return {
        name: "portfolio-prerender-seo",
        enforce: "post",
        apply: "build",
        closeBundle() {
            const distDir = resolve(__dirname, "dist");
            const baseHtmlPath = resolve(distDir, "index.html");

            let baseHtml: string;
            try {
                baseHtml = readFileSync(baseHtmlPath, "utf-8");
            } catch {
                console.warn("  ⚠ Prerender: dist/index.html not found — skipping.");
                return;
            }

            // Strip ALL generic/hardcoded SEO tags from the base HTML.
            // Each pre-rendered route gets its own complete set injected below.
            const shellHtml = baseHtml
                // Title and basic meta
                .replace(/<title>[^<]*<\/title>/, "<!-- prerender:title -->")
                .replace(/<meta\s+name="description"[\s\S]*?\/>/g, "<!-- prerender:description -->")
                .replace(/<meta\s+name="keywords"[\s\S]*?\/>/g, "<!-- prerender:keywords -->")
                .replace(/<meta\s+name="author"[\s\S]*?\/>/g, "<!-- prerender:author -->")
                // Open Graph tags (single-line and multi-line)
                .replace(/<meta\s+property="og:[^"]*"[\s\S]*?\/>/g, "")
                // Twitter Card tags (single-line and multi-line)
                .replace(/<meta\s+name="twitter:[^"]*"[\s\S]*?\/>/g, "")
                // Inline JSON-LD blocks (Person + WebSite schemas from index.html)
                .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/g, "")
                // Clean up resulting blank lines
                .replace(/\n\s*\n\s*\n/g, "\n\n");

            const routes = getAllRouteSeo();
            let generated = 0;

            for (const entry of routes) {
                const metaBlock = buildMetaTags(entry);

                // Insert the per-route meta tags right before </head>
                const routeHtml = shellHtml.replace(
                    "</head>",
                    `\n    <!-- Prerender: per-route SEO metadata -->\n${metaBlock}\n  </head>`,
                );

                // Determine output path: "/" → dist/index.html, "/about" → dist/about/index.html
                let outPath: string;
                if (entry.path === "/") {
                    outPath = baseHtmlPath; // overwrite the root index.html
                } else {
                    const routeDir = resolve(distDir, entry.path.replace(/^\//, ""));
                    if (!existsSync(routeDir)) {
                        mkdirSync(routeDir, { recursive: true });
                    }
                    outPath = resolve(routeDir, "index.html");
                }

                writeFileSync(outPath, routeHtml);
                generated++;
            }

            console.log(`\n  🔍 Pre-rendered ${generated} route(s) with per-page SEO metadata.`);
        },
    };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoGeneratorPlugin(), preloadInjectionPlugin(), prerenderPlugin()],
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
