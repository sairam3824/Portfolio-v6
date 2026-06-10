import { blogPosts } from "./shared-data/blogData";
import { profileDetails, siteMetadata } from "./shared-data/siteMetadata";

export const config = { matcher: "/writing/:slug+" };

// Preview crawlers that do NOT execute JavaScript and therefore never see the
// meta tags react-helmet renders client-side. Googlebot/Bingbot are deliberately
// excluded: they render JS, and serving them different HTML risks cloaking.
const SOCIAL_CRAWLERS = [
    "facebookexternalhit",
    "facebot",
    "twitterbot",
    "linkedinbot",
    "whatsapp",
    "slackbot",
    "telegrambot",
    "discordbot",
    "pinterest",
    "redditbot",
    "embedly",
    "quora link preview",
    "skypeuripreview",
    "vkshare",
    "tumblr",
];

const isSocialCrawler = (userAgent: string) => {
    const normalized = userAgent.toLowerCase();
    return SOCIAL_CRAWLERS.some((bot) => normalized.includes(bot));
};

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

const toIsoDate = (value: string) => {
    const timestamp = Date.parse(value);
    return Number.isNaN(timestamp) ? value : new Date(timestamp).toISOString();
};

export default function middleware(request: Request): Response | undefined {
    const userAgent = request.headers.get("user-agent") ?? "";
    if (!isSocialCrawler(userAgent)) return undefined;

    const { pathname } = new URL(request.url);
    const slug = pathname.replace(/^\/writing\//, "").replace(/\/+$/, "");
    const post = blogPosts.find(
        (entry) => entry.id === slug && !entry.externalLink && !entry.isLegalDoc,
    );
    if (!post) return undefined;

    const siteUrl = siteMetadata.siteUrl;
    const pageUrl = `${siteUrl}/writing/${post.id}`;
    const imageUrl = `${siteUrl}/api/og?slug=${encodeURIComponent(post.id)}`;
    const title = escapeHtml(`${post.title} | ${profileDetails.name}`);
    const description = escapeHtml(post.excerpt);
    const isoDate = toIsoDate(post.date);

    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<meta name="description" content="${description}" />
<meta name="author" content="${escapeHtml(profileDetails.name)}" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="${pageUrl}" />
<meta property="og:type" content="article" />
<meta property="og:url" content="${pageUrl}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:image:secure_url" content="${imageUrl}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:alt" content="${title}" />
<meta property="og:site_name" content="${escapeHtml(profileDetails.name)}" />
<meta property="og:locale" content="en_US" />
<meta property="article:author" content="${escapeHtml(profileDetails.name)}" />
<meta property="article:published_time" content="${isoDate}" />
<meta property="article:modified_time" content="${isoDate}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="${siteMetadata.twitterHandle}" />
<meta name="twitter:creator" content="${siteMetadata.twitterHandle}" />
<meta name="twitter:url" content="${pageUrl}" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${imageUrl}" />
</head>
<body>
<article>
<h1>${title}</h1>
<p>${description}</p>
<p><a href="${pageUrl}">Read the full post</a></p>
</article>
</body>
</html>`;

    return new Response(html, {
        status: 200,
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
    });
}
