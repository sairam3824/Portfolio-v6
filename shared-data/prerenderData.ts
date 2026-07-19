/**
 * Centralized SEO metadata for every indexable route.
 *
 * Used at **build time** by the prerender plugin (vite.config.ts) to inject
 * per-route \<title\>, \<meta\>, \<link rel="canonical"\>, and JSON-LD into the
 * static HTML files that Googlebot receives — eliminating the dependency on
 * client-side JS rendering for indexing.
 *
 * Also serves as the authoritative reference for the Seo.tsx Helmet component.
 */

import { blogPosts } from "./blogData";
import { siteMetadata, profileDetails } from "./siteMetadata";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type OgType = "website" | "article";
type PageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "ProfilePage";

export type RouteSeoEntry = {
    path: string;
    title: string;
    description: string;
    ogType: OgType;
    pageType: PageType;
    robots: string;
    keywords: readonly string[];
    /** Override image for OG/Twitter (defaults to site preview) */
    image?: string;
    /** ISO date strings for article pages */
    publishedTime?: string;
    modifiedTime?: string;
};

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const DEFAULT_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const NAME = profileDetails.name;

// ---------------------------------------------------------------------------
// Static routes
// ---------------------------------------------------------------------------

const STATIC_ROUTES: RouteSeoEntry[] = [
    {
        path: "/",
        title: siteMetadata.defaultTitle,
        description: siteMetadata.defaultDescription,
        ogType: "website",
        pageType: "ProfilePage",
        robots: DEFAULT_ROBOTS,
        keywords: siteMetadata.keywords,
    },
    {
        path: "/about",
        title: `About | ${NAME}`,
        description: "Profile, focus areas, education, and current direction for MARURI SAI RAMA LINGA REDDY — GenAI & ML engineer pursuing an MBA in Business Analytics (BITS Pilani) and MS in Data Science (IIIT Hyderabad).",
        ogType: "website",
        pageType: "AboutPage",
        robots: DEFAULT_ROBOTS,
        keywords: ["About Sairam Maruri", "Business Analyst", "Data Analyst", "GenAI Engineer India", "BITS Pilani Business Analytics", "IIIT Hyderabad Data Science", "VIT-AP"],
    },
    {
        path: "/projects",
        title: `Work | ${NAME}`,
        description: "Selected AI products, agent systems, SaaS builds, and engineering work from MARURI SAI RAMA LINGA REDDY.",
        ogType: "website",
        pageType: "CollectionPage",
        robots: DEFAULT_ROBOTS,
        keywords: ["AI projects", "GenAI applications", "Machine Learning projects", "Full Stack projects", "SaaS", "Sairam Maruri"],
    },
    {
        path: "/skills",
        title: `Skills | ${NAME}`,
        description: "A broad stack across business analytics, BI, GenAI, cloud, full-stack engineering, vector search, and delivery systems.",
        ogType: "website",
        pageType: "CollectionPage",
        robots: DEFAULT_ROBOTS,
        keywords: ["Business Analytics", "Power BI", "SQL", "Python", "Machine Learning", "GenAI", "RAG", "AWS", "skills"],
    },
    {
        path: "/education",
        title: `Education | ${NAME}`,
        description: "Academic background — MBA in Business Analytics (BITS Pilani), MS in Data Science (IIIT Hyderabad), and B.Tech in Computer Science (VIT-AP).",
        ogType: "website",
        pageType: "CollectionPage",
        robots: DEFAULT_ROBOTS,
        keywords: ["BITS Pilani Business Analytics", "IIIT Hyderabad Data Science", "MBA", "MS Data Science", "VIT-AP University", "Computer Science", "education", "Sairam Maruri"],
    },
    {
        path: "/coding-profiles",
        title: `Coding Profiles | ${NAME}`,
        description: "Competitive programming and public coding platforms that document algorithmic range and consistency.",
        ogType: "website",
        pageType: "CollectionPage",
        robots: DEFAULT_ROBOTS,
        keywords: ["LeetCode", "CodeChef", "Codeforces", "competitive programming", "DSA", "algorithms", "Sairam Maruri"],
    },
    {
        path: "/writing",
        title: `Writing | ${NAME}`,
        description: "Technical essays, AI digests, architecture perspectives, and production engineering notes.",
        ogType: "website",
        pageType: "CollectionPage",
        robots: DEFAULT_ROBOTS,
        keywords: ["AI writing", "Machine Learning blog", "GenAI essays", "technical writing", "LLM", "RAG", "agents"],
    },
    {
        path: "/certifications",
        title: `Certifications | ${NAME}`,
        description: "Professional certifications and public credential links.",
        ogType: "website",
        pageType: "CollectionPage",
        robots: DEFAULT_ROBOTS,
        keywords: ["AWS certifications", "AI certifications", "ML credentials", "professional certifications", "Sairam Maruri"],
    },
    {
        path: "/contact",
        title: `Contact | ${NAME}`,
        description: "Direct ways to reach MARURI SAI RAMA LINGA REDDY for collaboration, roles, or interesting builds.",
        ogType: "website",
        pageType: "ContactPage",
        robots: DEFAULT_ROBOTS,
        keywords: ["contact Sairam Maruri", "hire Business Analyst", "hire Data Analyst", "hire AI ML Engineer", "GenAI Engineer India", "collaboration"],
    },
    {
        path: "/privacy",
        title: `Privacy Policy | ${NAME}`,
        description: "Privacy Policy for the portfolio of Sai Ram Maruri — what data is collected, how it is used, and your rights.",
        ogType: "website",
        pageType: "WebPage",
        robots: DEFAULT_ROBOTS,
        keywords: [],
    },
    {
        path: "/terms",
        title: `Terms & Conditions | ${NAME}`,
        description: "Terms and Conditions for using the portfolio of Sai Ram Maruri — content rights, acceptable use, and disclaimers.",
        ogType: "website",
        pageType: "WebPage",
        robots: DEFAULT_ROBOTS,
        keywords: [],
    },
];

// ---------------------------------------------------------------------------
// Blog post routes (dynamic)
// ---------------------------------------------------------------------------

const toIsoDate = (value: string): string => {
    const ts = Date.parse(value);
    return Number.isNaN(ts) ? value : new Date(ts).toISOString();
};

const createBlogRoutes = (): RouteSeoEntry[] =>
    blogPosts
        .filter((post) => !post.externalLink && !post.isLegalDoc)
        .map((post) => ({
            path: `/writing/${post.id}`,
            title: `${post.title} | ${NAME}`,
            description: post.excerpt,
            ogType: "article" as const,
            pageType: "WebPage" as const,
            robots: DEFAULT_ROBOTS,
            keywords: post.tags,
            image: `/api/og?slug=${post.id}`,
            publishedTime: toIsoDate(post.date),
            modifiedTime: toIsoDate(post.date),
        }));

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export const getAllRouteSeo = (): RouteSeoEntry[] => [
    ...STATIC_ROUTES,
    ...createBlogRoutes(),
];
