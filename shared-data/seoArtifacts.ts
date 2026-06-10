import { blogPosts } from "./blogData";
import { siteMetadata } from "./siteMetadata";

type SitemapChangeFreq = "daily" | "weekly" | "monthly" | "yearly";

type SitemapEntry = {
    path: string;
    lastmod: string;
    changefreq: SitemapChangeFreq;
    priority: number;
};

const buildDate = () => new Date().toISOString().slice(0, 10);

const ROOT_STATIC_ROUTES: readonly Omit<SitemapEntry, "lastmod">[] = [
    { path: "/", changefreq: "weekly", priority: 1.0 },
    { path: "/about", changefreq: "monthly", priority: 0.8 },
    { path: "/projects", changefreq: "monthly", priority: 0.9 },
    { path: "/skills", changefreq: "monthly", priority: 0.7 },
    { path: "/education", changefreq: "monthly", priority: 0.7 },
    { path: "/coding-profiles", changefreq: "weekly", priority: 0.8 },
    { path: "/resume", changefreq: "monthly", priority: 0.8 },
    { path: "/writing", changefreq: "weekly", priority: 0.8 },
    { path: "/certifications", changefreq: "monthly", priority: 0.7 },
    { path: "/contact", changefreq: "monthly", priority: 0.6 },
    { path: "/privacy", changefreq: "yearly", priority: 0.3 },
    { path: "/terms", changefreq: "yearly", priority: 0.3 },
];

const escapeXml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

const toAbsoluteUrl = (path: string) => `${siteMetadata.siteUrl}${path}`;

const toLastmodDate = (value: string | undefined, fallback: string) => {
    if (!value) {
        return fallback;
    }

    const timestamp = Date.parse(value);
    if (Number.isNaN(timestamp)) {
        return fallback;
    }

    return new Date(timestamp).toISOString().slice(0, 10);
};

const latestBlogLastmod = () => {
    const fallback = buildDate();
    const dates = blogPosts
        .filter((post) => !post.externalLink)
        .map((post) => Date.parse(post.date))
        .filter((value) => !Number.isNaN(value));

    if (dates.length === 0) {
        return fallback;
    }

    return new Date(Math.max(...dates)).toISOString().slice(0, 10);
};

const createStaticEntries = (
    routes: readonly Omit<SitemapEntry, "lastmod">[],
    lastmod: string,
): SitemapEntry[] => routes.map((route) => ({ ...route, lastmod }));

const createBlogEntries = (basePath: "/writing"): SitemapEntry[] =>
    blogPosts
        .filter((post) => !post.externalLink)
        .map((post) => ({
            path: `${basePath}/${post.id}`,
            lastmod: toLastmodDate(post.date, buildDate()),
            changefreq: "monthly" as const,
            priority: 0.6,
        }));

const createSitemapXml = (entries: readonly SitemapEntry[]) => {
    const lines = entries.map((entry) => `  <url>
    <loc>${escapeXml(toAbsoluteUrl(entry.path))}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`);

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${lines.join("\n")}
</urlset>
`;
};

const createRobotsTxt = (sitemapUrls: readonly string[]) =>
    [
        "User-agent: *",
        "Allow: /",
        "",
        "# Explicitly allow AI crawlers",
        "User-agent: ClaudeBot",
        "Allow: /",
        "",
        "User-agent: GPTBot",
        "Allow: /",
        "",
        "User-agent: Google-Extended",
        "Allow: /",
        "",
        "User-agent: Googlebot",
        "Allow: /",
        "",
        "User-agent: Bingbot",
        "Allow: /",
        "",
        ...sitemapUrls.map((url) => `Sitemap: ${url}`),
        "",
    ].join("\n");

export const buildRootSitemapXml = () => {
    const staticLastmod = buildDate();
    const blogIndexLastmod = latestBlogLastmod();

    return createSitemapXml([
        ...createStaticEntries(ROOT_STATIC_ROUTES, staticLastmod).map((entry) =>
            entry.path === "/writing" ? { ...entry, lastmod: blogIndexLastmod } : entry,
        ),
        ...createBlogEntries("/writing"),
    ]);
};

export const buildRootRobotsTxt = () =>
    createRobotsTxt([
        `${siteMetadata.siteUrl}/sitemap.xml`,
    ]);

const RSS_MAX_ITEMS = 30;

const toRfc822Date = (value: string) => {
    const timestamp = Date.parse(value);
    return new Date(Number.isNaN(timestamp) ? Date.now() : timestamp).toUTCString();
};

export const buildRootRssXml = () => {
    const feedPosts = blogPosts
        .filter((post) => !post.externalLink && !post.isLegalDoc)
        .slice()
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
        .slice(0, RSS_MAX_ITEMS);

    const items = feedPosts.map((post) => {
        const url = toAbsoluteUrl(`/writing/${post.id}`);
        const categories = post.tags
            .map((tag) => `      <category>${escapeXml(tag)}</category>`)
            .join("\n");

        return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${toRfc822Date(post.date)}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
${categories}
    </item>`;
    });

    const lastBuildDate = feedPosts.length > 0 ? toRfc822Date(feedPosts[0].date) : new Date().toUTCString();

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteMetadata.defaultTitle)}</title>
    <link>${escapeXml(`${siteMetadata.siteUrl}/writing`)}</link>
    <description>${escapeXml(siteMetadata.defaultDescription)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(`${siteMetadata.siteUrl}/feed.xml`)}" rel="self" type="application/rss+xml" />
${items.join("\n")}
  </channel>
</rss>
`;
};
