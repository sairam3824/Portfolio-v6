import { ReactNode, Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Activity,
    ArrowRight,
    Brain,
    Code2,
    Cpu,
    Database,
    Github,
    Globe,
    KeyRound,
    Leaf,
    Linkedin,
    Mail,
    Mic,
    Phone,
    Rocket,
    Search,
    Shield,
    Terminal,
    Zap,
} from "lucide-react";
import Seo from "@/shared/Seo";
import { profileDetails, siteMetadata } from "@/data/siteMetadata";
import { ROUTE_PATHS, getWritingPath } from "@/data/siteRoutes";
import { blogPosts } from "@/features/blog/blogData";
import { certifications } from "@/features/certifications/certificationsData";
import { codingProfilesData } from "@/features/coding-profiles/codingProfilesData";
import { educationData } from "@/data/educationData";
import { projectsData } from "@/features/projects/projectsData";
import { skillCategories } from "@/features/skills/skillsData";

const ChatWidget = lazy(() => import("@/features/chat/ChatWidget"));

export type WritingEntry = (typeof blogPosts)[number];
export type ProjectEntry = (typeof projectsData)[number];

export const routerBasename =
    import.meta.env.BASE_URL === "/" ? "/" : import.meta.env.BASE_URL.replace(/\/$/, "");

export const titleLines = ["Turn Data into", "Business Decisions."];

export const navigationItems = [
    { to: ROUTE_PATHS.projects, label: "Work" },
    { to: ROUTE_PATHS.about, label: "About" },
    { to: ROUTE_PATHS.skills, label: "Skills" },
    { to: ROUTE_PATHS.writing, label: "Writing" },
    { to: ROUTE_PATHS.contact, label: "Contact" },
] as const;

export const serviceCards = [
    {
        title: "Business Analytics & BI",
        desc: "Power BI, SQL, and Excel modelling that turn raw data into dashboards and decisions stakeholders can act on.",
    },
    {
        title: "Applied ML & Decision Science",
        desc: "Churn, forecasting, segmentation, and A/B testing — predictive models framed around the business decision they drive.",
    },
    {
        title: "Agentic AI Products",
        desc: "Multi-agent systems, RAG pipelines, and LLM-first workflows shaped by the portfolio's production AI projects.",
    },
    {
        title: "Cloud-Native AI Systems",
        desc: "Shipping AI/ML pipelines into secure, cost-efficient environments across AWS, Vercel, and Docker.",
    },
] as const;

export const nonLegalBlogPosts = [...blogPosts]
    .filter((post) => !post.isLegalDoc)
    .sort((left, right) => Date.parse(right.date) - Date.parse(left.date));

export const featuredProjects = projectsData.filter((project) => project.featured);
export const featuredEducation = educationData.filter((entry) => entry.featured);
export const featuredProfiles = codingProfilesData.filter((profile) => profile.featured).length
    ? codingProfilesData.filter((profile) => profile.featured)
    : codingProfilesData.slice(0, 4);
export const totalSkills = skillCategories.reduce(
    (count, category) => count + category.skills.length,
    0,
);
export const liveSaasProjects = projectsData.filter((project) => Boolean(project.link)).length;
export const leetCodeProfile = codingProfilesData.find((profile) => profile.label === "LeetCode");
export const codeChefProfile = codingProfilesData.find((profile) => profile.label === "CodeChef");
export const dsaProfile = codingProfilesData.find((profile) => profile.label === "LeetCode Streak");

export const stats = [
    { label: "LeetCode", target: 2400, suffix: "+", display: leetCodeProfile?.stats ?? "2400+" },
    { label: "DSA Solved", target: 1000, suffix: "+", display: dsaProfile?.stats ?? "1000+" },
    { label: "Projects", target: projectsData.length, suffix: "+", display: `${projectsData.length}+` },
    { label: "CodeChef", display: codeChefProfile?.stats.split(" • ")[0] ?? "3★" },
    { label: "Skills", target: totalSkills, suffix: "+", display: `${totalSkills}+` },
    { label: "Live SaaS", target: liveSaasProjects, suffix: "+", display: `${liveSaasProjects}+` },
    { label: "Certs", target: certifications.length, suffix: "+", display: `${certifications.length}+` },
] as const;

export const contactLinks = [
    { label: profileDetails.email, href: `mailto:${profileDetails.email}`, icon: <Mail size={14} /> },
    { label: profileDetails.phone, href: `tel:${profileDetails.phone.replace(/\s+/g, "")}`, icon: <Phone size={14} /> },
    { label: "github.com/sairam3824", href: profileDetails.socials.github, icon: <Github size={14} /> },
    { label: "linkedin.com/in/sairam-maruri", href: profileDetails.socials.linkedin, icon: <Linkedin size={14} /> },
] as const;

export const liveIslandItems = [
    "Turning data into decisions",
    `${featuredProjects.length}+ featured projects`,
    `${nonLegalBlogPosts.length}+ essays published`,
    `${skillCategories.length} skill domains`,
    "India-based builder",
] as const;

export const projectIconMap = {
    Activity,
    Brain,
    Code2,
    Cpu,
    Database,
    Globe,
    Key: KeyRound,
    Leaf,
    Mic,
    Rocket,
    Search,
    Shield,
    Terminal,
    Zap,
} as const;

export function formatReadableDate(value: string) {
    const timestamp = Date.parse(value);
    if (Number.isNaN(timestamp)) return value;

    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(timestamp);
}

export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, [pathname]);

    return null;
}

export function Counter({ target, suffix }: { target: number; suffix: string }) {
    const [value, setValue] = useState(0);
    const ref = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;

                let startedAt = 0;
                const durationMs = 1100;

                const tick = (timestamp: number) => {
                    if (!startedAt) startedAt = timestamp;
                    const progress = Math.min((timestamp - startedAt) / durationMs, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    setValue(Math.floor(target * eased));

                    if (progress < 1) {
                        window.requestAnimationFrame(tick);
                    } else {
                        setValue(target);
                    }
                };

                window.requestAnimationFrame(tick);
                observer.disconnect();
            },
            { threshold: 0.25 },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [target]);

    return (
        <span ref={ref}>
            {value}
            {suffix}
        </span>
    );
}

export function LiveStatusIsland({ className = "" }: { className?: string }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [time, setTime] = useState(() =>
        new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Kolkata",
        }).format(new Date()),
    );

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setTime(
                new Intl.DateTimeFormat("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "Asia/Kolkata",
                }).format(new Date()),
            );
        }, 1000);

        return () => window.clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const rotationId = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % liveIslandItems.length);
        }, 3200);

        return () => window.clearInterval(rotationId);
    }, []);

    return (
        <div className={`rd-island rd-island-static ${className}`.trim()}>
            <span className="rd-island-dot" />
            <span className="rd-island-copy">
                <span>{liveIslandItems[activeIndex]}</span>
                <span className="rd-island-separator">·</span>
                <span>{time}</span>
            </span>
        </div>
    );
}

export function SectionLabel({ children }: { children: ReactNode }) {
    return <p className="rd-section-label">{children}</p>;
}

export function PageHeader({
    label,
    title,
    description,
}: {
    label: string;
    title: string;
    description?: string;
}) {
    return (
        <div className="rd-page-header">
            <p className="rd-page-label">{label}</p>
            <h1>{title}</h1>
            {description ? <p className="rd-page-description">{description}</p> : null}
        </div>
    );
}

export function DeferredChatWidget() {
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        const idleWindow = window as Window & {
            requestIdleCallback?: (
                callback: IdleRequestCallback,
                options?: IdleRequestOptions,
            ) => number;
            cancelIdleCallback?: (handle: number) => void;
        };

        if (idleWindow.requestIdleCallback) {
            const idleId = idleWindow.requestIdleCallback(() => setShouldLoad(true), { timeout: 4500 });
            return () => idleWindow.cancelIdleCallback?.(idleId);
        }

        const timeoutId = window.setTimeout(() => setShouldLoad(true), 3500);
        return () => window.clearTimeout(timeoutId);
    }, []);

    if (!shouldLoad) return null;

    return (
        <Suspense fallback={null}>
            <ChatWidget />
        </Suspense>
    );
}

export function WritingListItem({
    post,
    variant = "default",
}: {
    post: WritingEntry;
    variant?: "default" | "home";
}) {
    const body = (
        <>
            <div>
                <div className="rd-writing-meta">
                    <span className="rd-chip">{post.tags[0] || "Writing"}</span>
                    <span className="rd-meta-text">{formatReadableDate(post.date)}</span>
                    <span className="rd-meta-text">· {post.readTime}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
            </div>
            <span className="rd-card-arrow">→</span>
        </>
    );

    if (post.externalLink) {
        return (
            <a
                className={`rd-writing-item ${variant === "home" ? "rd-writing-item-home" : ""}`.trim()}
                href={post.externalLink}
                target="_blank"
                rel="noreferrer"
            >
                {body}
            </a>
        );
    }

    return (
        <Link
            className={`rd-writing-item ${variant === "home" ? "rd-writing-item-home" : ""}`.trim()}
            to={getWritingPath(post.id)}
        >
            {body}
        </Link>
    );
}

export function NotFoundPage() {
    return (
        <>
            <Seo
                title={`Not Found | ${profileDetails.name}`}
                description="The requested page was not found."
                robots="noindex, nofollow"
            />
            <main className="rd-page rd-page-pad">
                <PageHeader
                    label="404"
                    title="This page drifted off course."
                    description="The route you're looking for does not exist in the updated portfolio structure."
                />
                <Link className="rd-button rd-button-primary" to={ROUTE_PATHS.home}>
                    Return Home <ArrowRight size={16} />
                </Link>
            </main>
        </>
    );
}

export { profileDetails, siteMetadata, ROUTE_PATHS, getWritingPath };
export {
    blogPosts,
    certifications,
    codingProfilesData,
    projectsData,
    skillCategories,
};
