import { FormEvent, lazy, ReactNode, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import {
    BrowserRouter as Router,
    Link,
    Navigate,
    NavLink,
    Outlet,
    Route,
    Routes,
    useLocation,
    useParams,
} from "react-router-dom";
import {
    Activity,
    ArrowRight,
    ArrowUpRight,
    Brain,
    ChevronLeft,
    ChevronRight,
    Code,
    Code2,
    Cpu,
    ExternalLink,
    Github,
    Globe,
    KeyRound,
    Leaf,
    Linkedin,
    Mail,
    Menu,
    Mic,
    Phone,
    Rocket,
    Search,
    Shield,
    Target,
    Terminal,
    X,
    Zap,
} from "lucide-react";
import Seo from "@/shared/Seo";
const ChatWidget = lazy(() => import("@/features/chat/ChatWidget"));
import { educationData } from "@/data/educationData";
import { profileDetails, siteMetadata } from "@/data/siteMetadata";
import { ROUTE_PATHS, getWritingPath } from "@/data/siteRoutes";
import { blogPosts } from "@/features/blog/blogData";
import { getBlogContent } from "@/features/blog/blogContent";
import { certifications } from "@/features/certifications/certificationsData";
import { codingProfilesData } from "@/features/coding-profiles/codingProfilesData";
import { projectsData } from "@/features/projects/projectsData";
import { skillCategories } from "@/features/skills/skillsData";

type WritingEntry = (typeof blogPosts)[number];
type ProjectEntry = (typeof projectsData)[number];

const routerBasename =
    import.meta.env.BASE_URL === "/" ? "/" : import.meta.env.BASE_URL.replace(/\/$/, "");

const titleLines = ["Build Intelligence", "that Ships."];

const navigationItems = [
    { to: ROUTE_PATHS.projects, label: "Work" },
    { to: ROUTE_PATHS.about, label: "About" },
    { to: ROUTE_PATHS.skills, label: "Skills" },
    { to: ROUTE_PATHS.writing, label: "Writing" },
    { to: ROUTE_PATHS.contact, label: "Contact" },
] as const;

const serviceCards = [
    {
        title: "Agentic AI Products",
        desc: "Multi-agent systems, retrieval pipelines, and LLM-first workflows shaped by the portfolio's production AI projects.",
    },
    {
        title: "AI SaaS Interfaces",
        desc: "Full-stack experiences that make complex AI systems feel fast, clear, and usable on the frontend.",
    },
    {
        title: "Cloud Deployment",
        desc: "Shipping prototypes into reliable environments across Vercel, Docker, Supabase, and modern cloud tooling.",
    },
    {
        title: "Applied ML Systems",
        desc: "From deep learning experiments to search, ranking, and evaluation loops that support real product decisions.",
    },
] as const;

const nonLegalBlogPosts = [...blogPosts]
    .filter((post) => !post.isLegalDoc)
    .sort((left, right) => Date.parse(right.date) - Date.parse(left.date));

const featuredProjects = projectsData.filter((project) => project.featured);
const featuredProfiles = codingProfilesData.filter((profile) => profile.featured).length
    ? codingProfilesData.filter((profile) => profile.featured)
    : codingProfilesData.slice(0, 4);
const totalSkills = skillCategories.reduce((count, category) => count + category.skills.length, 0);
const liveSaasProjects = projectsData.filter((project) => Boolean(project.link)).length;
const leetCodeProfile = codingProfilesData.find((profile) => profile.label === "LeetCode");
const codeChefProfile = codingProfilesData.find((profile) => profile.label === "CodeChef");
const dsaProfile = codingProfilesData.find((profile) => profile.label === "LeetCode Streak");

const stats = [
    { label: "LeetCode", target: 2400, suffix: "+", display: leetCodeProfile?.stats ?? "2400+" },
    { label: "DSA Solved", target: 1000, suffix: "+", display: dsaProfile?.stats ?? "1000+" },
    { label: "Projects", target: projectsData.length, suffix: "+", display: `${projectsData.length}+` },
    { label: "CodeChef", display: codeChefProfile?.stats.split(" • ")[0] ?? "3★" },
    { label: "Skills", target: totalSkills, suffix: "+", display: `${totalSkills}+` },
    { label: "Live SaaS", target: liveSaasProjects, suffix: "+", display: `${liveSaasProjects}+` },
    { label: "Certs", target: certifications.length, suffix: "+", display: `${certifications.length}+` },
] as const;

const contactLinks = [
    { label: profileDetails.email, href: `mailto:${profileDetails.email}`, icon: <Mail size={14} /> },
    { label: profileDetails.phone, href: `tel:${profileDetails.phone.replace(/\s+/g, "")}`, icon: <Phone size={14} /> },
    { label: "github.com/sairam3824", href: profileDetails.socials.github, icon: <Github size={14} /> },
    { label: "linkedin.com/in/sairam-maruri", href: profileDetails.socials.linkedin, icon: <Linkedin size={14} /> },
] as const;

const liveIslandItems = [
    "Building AI-powered SaaS",
    `${featuredProjects.length}+ featured projects`,
    `${nonLegalBlogPosts.length}+ essays published`,
    `${skillCategories.length} skill domains`,
    "India-based builder",
] as const;

const projectIconMap = {
    Activity,
    Brain,
    Code2,
    Cpu,
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

function formatReadableDate(value: string) {
    const timestamp = Date.parse(value);
    if (Number.isNaN(timestamp)) return value;

    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(timestamp);
}

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, [pathname]);

    return null;
}

function Counter({ target, suffix }: { target: number; suffix: string }) {
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

function LiveStatusIsland({ className = "" }: { className?: string }) {
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

function SectionLabel({ children }: { children: ReactNode }) {
    return <p className="rd-section-label">{children}</p>;
}

function PageHeader({ label, title, description }: { label: string; title: string; description?: string }) {
    return (
        <div className="rd-page-header">
            <p className="rd-page-label">{label}</p>
            <h1>{title}</h1>
            {description ? <p className="rd-page-description">{description}</p> : null}
        </div>
    );
}

function PortfolioLayout() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    return (
        <div className="rd-app-shell">
            <ScrollToTop />
            <header className="rd-header">
                <div className="rd-header-row">
                    <div className="rd-brand-shell">
                        <Link to={ROUTE_PATHS.home} className="rd-brand">
                            <span className="rd-brand-default">{profileDetails.brand}</span>
                            <span className="rd-brand-hover">AI BUILDER ·</span>
                        </Link>
                    </div>

                    <div className="rd-nav-shell rd-desktop-only">
                        <nav className="rd-nav" aria-label="Primary">
                            {navigationItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) => `rd-nav-link ${isActive ? "is-active" : ""}`}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                    <div className="rd-header-right">
                        <a className="rd-resume-link rd-desktop-only" href={profileDetails.resumeHref} target="_blank" rel="noreferrer">
                            View Resume <ArrowUpRight size={14} />
                        </a>
                        <button
                            type="button"
                            className="rd-menu-button rd-mobile-only"
                            onClick={() => setMenuOpen((current) => !current)}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                        >
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {menuOpen ? (
                    <div className="rd-mobile-menu">
                        {navigationItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) => `rd-mobile-link ${isActive ? "is-active" : ""}`}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                        <a className="rd-mobile-resume" href={profileDetails.resumeHref} target="_blank" rel="noreferrer">
                            Open Resume <ArrowUpRight size={16} />
                        </a>
                    </div>
                ) : null}
            </header>

            <Outlet />

            <footer className="rd-footer">
                <div className="rd-footer-accent-bar" />

                <div className="rd-footer-grid">
                    {/* Brand column */}
                    <div className="rd-footer-brand-col">
                        <div className="rd-footer-brand-name">{profileDetails.brand}</div>
                        <p className="rd-footer-tagline">{profileDetails.role}</p>
                        <div className="rd-footer-avail">
                            <span className="rd-status-dot" />
                            {profileDetails.availability}
                        </div>
                        <div className="rd-footer-socials">
                            <a href={profileDetails.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
                                <Github size={15} />
                            </a>
                            <a href={profileDetails.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
                                <Linkedin size={15} />
                            </a>
                            <a href={`mailto:${profileDetails.email}`} aria-label="Email" title="Email">
                                <Mail size={15} />
                            </a>
                            <a href={`tel:${profileDetails.phone.replace(/\s+/g, "")}`} aria-label="Phone" title="Phone">
                                <Phone size={15} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation column */}
                    <div>
                        <p className="rd-footer-label">Navigation</p>
                        <div className="rd-footer-links">
                            <Link to={ROUTE_PATHS.projects}>Work</Link>
                            <Link to={ROUTE_PATHS.about}>About</Link>
                            <Link to={ROUTE_PATHS.skills}>Skills</Link>
                            <Link to={ROUTE_PATHS.writing}>Writing</Link>
                            <Link to={ROUTE_PATHS.contact}>Contact</Link>
                        </div>
                    </div>

                    {/* Resources column */}
                    <div>
                        <p className="rd-footer-label">Resources</p>
                        <div className="rd-footer-links">
                            <Link to={ROUTE_PATHS.education}>Education</Link>
                            <Link to={ROUTE_PATHS.codingProfiles}>Coding Profiles</Link>
                            <Link to={ROUTE_PATHS.certifications}>Certifications</Link>
                            <a href={profileDetails.resumeHref} target="_blank" rel="noreferrer">
                                Resume <ExternalLink size={11} style={{ display: "inline", verticalAlign: "middle", opacity: 0.6 }} />
                            </a>
                        </div>
                    </div>

                    {/* Contact column */}
                    <div>
                        <p className="rd-footer-label">Get in Touch</p>
                        <div className="rd-footer-contact-list">
                            <a href={`mailto:${profileDetails.email}`}>
                                <span className="rd-contact-icon"><Mail size={13} /></span>
                                <span>{profileDetails.email}</span>
                            </a>
                            <a href={`tel:${profileDetails.phone.replace(/\s+/g, "")}`}>
                                <span className="rd-contact-icon"><Phone size={13} /></span>
                                <span>{profileDetails.phone}</span>
                            </a>
                            <a href={profileDetails.socials.github} target="_blank" rel="noreferrer">
                                <span className="rd-contact-icon"><Github size={13} /></span>
                                <span>github.com/sairam3824</span>
                            </a>
                            <a href={profileDetails.socials.linkedin} target="_blank" rel="noreferrer">
                                <span className="rd-contact-icon"><Linkedin size={13} /></span>
                                <span>linkedin.com/in/sairam-maruri</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="rd-footer-bottom">
                    <p className="rd-footer-copy-line">
                        &copy; {siteMetadata.copyrightYear} {profileDetails.brand}. All rights reserved.
                    </p>
                    <div className="rd-footer-legal-links">
                        <Link to={ROUTE_PATHS.privacy}>Privacy Policy</Link>
                        <span className="rd-footer-divider" aria-hidden>·</span>
                        <Link to={ROUTE_PATHS.terms}>Terms &amp; Conditions</Link>
                    </div>
                    <p className="rd-footer-location">India &nbsp;·&nbsp; Open to Remote</p>
                </div>
            </footer>
            <Suspense fallback={null}>
                <ChatWidget />
            </Suspense>
        </div>
    );
}

function HomePage() {
    return (
        <>
            <Seo
                title={siteMetadata.defaultTitle}
                description={siteMetadata.defaultDescription}
                pageType="ProfilePage"
                keywords={siteMetadata.keywords}
            />
            <main className="rd-page">
                <section className="rd-section rd-hero-section">
                    <p className="rd-kicker">{profileDetails.shortRole} · 2026</p>
                    <h1 className="rd-hero-title">
                        {titleLines.map((line) => (
                            <span key={line}>{line}</span>
                        ))}
                    </h1>
                    <p className="rd-hero-copy">{profileDetails.summary}</p>
                    <div className="rd-actions">
                        <Link className="rd-button rd-button-primary" to={ROUTE_PATHS.projects}>
                            View Projects <ArrowRight size={16} />
                        </Link>
                        <Link className="rd-button rd-button-secondary" to={ROUTE_PATHS.contact}>
                            Get in Touch
                        </Link>
                    </div>
                </section>

                <section className="rd-section">
                        <SectionLabel>At a glance</SectionLabel>
                        <div className="rd-stats-grid">
                            {stats.map((stat) => (
                                <article key={stat.label} className="rd-stat-card">
                                    <p className="rd-stat-value">
                                        {"target" in stat && typeof stat.target === "number" ? (
                                            <Counter target={stat.target} suffix={stat.suffix ?? ""} />
                                        ) : (
                                            stat.display
                                        )}
                                    </p>
                                    <p className="rd-stat-label">{stat.label}</p>
                                </article>
                            ))}
                        </div>
                </section>

                <section className="rd-section">
                    <div className="rd-section-header">
                        <SectionLabel>Featured Work</SectionLabel>
                        <Link className="rd-inline-link" to={ROUTE_PATHS.projects}>
                            All projects <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="rd-card-grid">
                        {featuredProjects.slice(0, 4).map((project) => (
                            <div key={project.title} className="rd-card" style={{ display: "flex", flexDirection: "column" }}>
                                <Link to={ROUTE_PATHS.projects} style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}>
                                    <div className="rd-card-meta">
                                        <span className="rd-chip">{project.category}</span>
                                        <span className="rd-meta-text">{project.tech.slice(0, 3).join(" · ")}</span>
                                    </div>
                                    <h3>{project.title}</h3>
                                    <p>{project.tagline || project.description}</p>
                                </Link>
                                <div style={{ display: "flex", gap: "16px", marginTop: "16px", alignItems: "center" }}>
                                    <Link to={ROUTE_PATHS.projects} className="rd-card-arrow" style={{ textDecoration: "none" }}>↗</Link>
                                    <div style={{ display: "flex", gap: "16px", marginLeft: "auto" }}>
                                        {project.github && (
                                            <a href={project.github} target="_blank" rel="noreferrer" className="rd-inline-link" style={{ fontSize: "0.8rem" }}>
                                                <Github size={14} style={{ marginRight: "4px" }} /> GitHub
                                            </a>
                                        )}
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noreferrer" className="rd-inline-link" style={{ fontSize: "0.8rem" }}>
                                                <Globe size={14} style={{ marginRight: "4px" }} /> Live
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rd-section">
                    <div className="rd-section-header">
                        <div>
                            <h2 className="rd-section-title">
                                Credentials<span>.</span>
                            </h2>
                            <p className="rd-section-subtitle">Competitive programming signals, active platforms, and public proof of work.</p>
                        </div>
                    </div>

                    <div className="rd-profiles-grid">
                        {codingProfilesData.map((profile) => {
                            const colorMap: Record<string, string> = {
                                orange: "#ea580c",
                                blue: "#2563eb",
                                cyan: "#0891b2",
                                indigo: "#4f46e5",
                                emerald: "#059669",
                                rose: "#e11d48",
                                slate: "#475569",
                            };
                            const iconMap: Record<string, React.ReactNode> = {
                                "leetcode-img": <img src="/LeetCode_logo_rvs.webp" alt="LeetCode" className="w-full h-full object-contain" width="18" height="18" loading="lazy" decoding="async" />,
                                "codechef-img": <img src="/codechef.webp" alt="CodeChef" className="w-full h-full object-cover" width="18" height="18" loading="lazy" decoding="async" />,
                                Activity: <Activity size={14} />,
                                Target: <Target size={14} />,
                                Cpu: <Cpu size={14} />,
                                Globe: <Globe size={14} />,
                                Code: <Code size={14} />,
                            };
                            const statColor = colorMap[profile.color] ?? "#1b2433";
                            const icon = iconMap[profile.iconName] ?? <Code size={14} />;
                            return (
                                <a key={profile.label} className="rd-profile-card" href={profile.href} target="_blank" rel="noreferrer">
                                    <div className="rd-profile-card-icon" style={{ color: statColor, borderColor: `${statColor}22`, background: `${statColor}0f` }}>
                                        {icon}
                                    </div>
                                    <p className="rd-profile-stat" style={{ color: statColor }}>{profile.stats}</p>
                                    <p className="rd-profile-label">{profile.label}</p>
                                    <div className="rd-profile-popup">
                                        <p className="rd-profile-popup-title" style={{ color: statColor }}>{profile.label}</p>
                                        <p className="rd-profile-popup-desc">{profile.desc}</p>
                                        <span className="rd-profile-popup-cta">Visit profile ↗</span>
                                    </div>
                                </a>
                            );
                        })}
                    </div>

                    <div className="rd-info-grid">
                        <article className="rd-surface-card">
                            <p className="rd-surface-label">Research Interests</p>
                            <div className="rd-pill-wrap">
                                {profileDetails.researchInterests.map((interest) => (
                                    <span key={interest} className="rd-pill">
                                        {interest}
                                    </span>
                                ))}
                            </div>
                            <p className="rd-surface-copy">Topics that consistently shape the projects, essays, and systems thinking across the portfolio.</p>

                            {/* Published paper */}
                            <div style={{ marginTop: "12px", padding: "9px 10px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.07)" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
                                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "currentColor", opacity: 0.6, flexShrink: 0, display: "inline-block" }} />
                                    <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.5 }}>Published · ICISML 2026</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                                    <p style={{ fontSize: "0.78rem", fontWeight: 600, lineHeight: 1.3, margin: 0 }}>Orravyn: LLM-Powered Research Platform</p>
                                    <a href="https://github.com/sairam3824/Orravyn-Research-Platform-with-LLM" target="_blank" rel="noreferrer" className="rd-inline-link" style={{ fontSize: "0.7rem", whiteSpace: "nowrap", flexShrink: 0 }}>
                                        <Github size={11} style={{ marginRight: "3px" }} /> GitHub <ArrowUpRight size={10} />
                                    </a>
                                </div>
                            </div>

                            {/* Journal target paper */}
                            <div style={{ marginTop: "6px", padding: "9px 10px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.07)" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
                                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", border: "1.5px solid currentColor", opacity: 0.45, flexShrink: 0, display: "inline-block" }} />
                                    <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.4 }}>Targeting Journal</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                                    <p style={{ fontSize: "0.78rem", fontWeight: 600, lineHeight: 1.3, margin: 0 }}>Multi-Modal RAG Engine</p>
                                    <a href="https://github.com/sairam3824/multi-modal-engine" target="_blank" rel="noreferrer" className="rd-inline-link" style={{ fontSize: "0.7rem", whiteSpace: "nowrap", flexShrink: 0 }}>
                                        <Github size={11} style={{ marginRight: "3px" }} /> GitHub <ArrowUpRight size={10} />
                                    </a>
                                </div>
                            </div>
                        </article>

                        <article className="rd-surface-card">
                            <p className="rd-surface-label">Right Now</p>
                            <div className="rd-status-list">
                                {profileDetails.currentFocus.map((item) => (
                                    <div key={item}>
                                        <p className="rd-status-key">FOCUS</p>
                                        <p className="rd-status-value">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </article>

                        <article className="rd-surface-card">
                            <div className="rd-surface-header">
                                <p className="rd-surface-label">Certifications</p>
                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                    <Link to={ROUTE_PATHS.certifications} className="rd-inline-link" style={{ fontSize: "0.7rem" }}>
                                        All <ArrowRight size={12} />
                                    </Link>
                                    <span className="rd-surface-count">{certifications.length}</span>
                                </div>
                            </div>
                            <div className="rd-simple-list">
                                {certifications.slice(0, 5).map((certification) => (
                                    <a key={certification.title} href={certification.link} target="_blank" rel="noreferrer">
                                        <span>{certification.title}</span>
                                        <ArrowUpRight size={14} />
                                    </a>
                                ))}
                            </div>
                        </article>
                    </div>
                </section>

                <section className="rd-section">
                    <div className="rd-section-header">
                        <SectionLabel>Latest Writing</SectionLabel>
                        <Link className="rd-inline-link" to={ROUTE_PATHS.writing}>
                            All posts <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="rd-writing-list">
                        {nonLegalBlogPosts.slice(0, 3).map((post) => (
                            <WritingListItem key={post.id} post={post} variant="home" />
                        ))}
                    </div>
                </section>

                <section className="rd-section rd-connect-section">
                    <div className="rd-connect-header">
                        <div>
                            <SectionLabel>Let's connect</SectionLabel>
                            <h2 className="rd-connect-title">Best ways to reach me.</h2>
                            <p className="rd-connect-copy">
                                Use the route that fits the conversation: email for real work, LinkedIn for context, GitHub for proof, and the resume for a fast summary.
                            </p>
                        </div>
                        <Link to={ROUTE_PATHS.contact} className="rd-inline-link">
                            Open contact page <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="rd-connect-grid">
                        <a className="rd-connect-card" href={`mailto:${profileDetails.email}`}>
                            <span className="rd-connect-label">Email</span>
                            <strong>{profileDetails.email}</strong>
                            <p>Best for projects, consulting, and direct collaboration.</p>
                            <span className="rd-connect-arrow">↗</span>
                        </a>
                        <a className="rd-connect-card" href={profileDetails.socials.linkedin} target="_blank" rel="noreferrer">
                            <span className="rd-connect-label">LinkedIn</span>
                            <strong>Professional context</strong>
                            <p>Roles, introductions, and background at a glance.</p>
                            <span className="rd-connect-arrow">↗</span>
                        </a>
                        <a className="rd-connect-card" href={profileDetails.socials.github} target="_blank" rel="noreferrer">
                            <span className="rd-connect-label">GitHub</span>
                            <strong>Code and shipped work</strong>
                            <p>Repos, experiments, architecture, and implementation depth.</p>
                            <span className="rd-connect-arrow">↗</span>
                        </a>
                        <a className="rd-connect-card" href={profileDetails.resumeHref} target="_blank" rel="noreferrer">
                            <span className="rd-connect-label">Resume</span>
                            <strong>One-page snapshot</strong>
                            <p>Quick scan of skills, projects, and current direction.</p>
                            <span className="rd-connect-arrow">↗</span>
                        </a>
                    </div>
                </section>
            </main>
        </>
    );
}

function ProjectsPage() {
    const [query, setQuery] = useState("");

    const normalizedQuery = query.trim().toLowerCase();
    const filteredProjects = projectsData.filter((project) => {
        if (!normalizedQuery) return true;

        const haystack = [
            project.title,
            project.category,
            project.tagline ?? "",
            project.description,
            project.tech.join(" "),
        ]
            .join(" ")
            .toLowerCase();

        return haystack.includes(normalizedQuery);
    });

    return (
        <>
            <Seo
                title={`Work | ${profileDetails.name}`}
                description="Selected AI products, agent systems, SaaS builds, and engineering work from MARURI SAI RAMA LINGA REDDY."
                pageType="CollectionPage"
                keywords={["AI projects", "GenAI applications", "Machine Learning projects", "Full Stack projects", "SaaS", "Sairam Maruri"]}
                breadcrumbs={[{ name: "Home", url: ROUTE_PATHS.home }, { name: "Work", url: ROUTE_PATHS.projects }]}
            />
            <main className="rd-page rd-page-pad">
                <PageHeader
                    label="Work"
                    title="Projects That Ship"
                    description="Production-minded builds spanning AI agents, full-stack SaaS, search systems, and cloud-delivered products."
                />
                <div className="rd-project-toolbar">
                    <label className="rd-project-search" aria-label="Search projects">
                        <Search size={15} />
                        <input
                            type="text"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search projects, tech, or category"
                        />
                    </label>
                    <p className="rd-project-count">
                        {filteredProjects.length} project{filteredProjects.length === 1 ? "" : "s"}
                    </p>
                </div>
                <div className="rd-project-gallery">
                    {filteredProjects.map((project) => (
                        <ProjectShowcaseCard key={project.title} project={project} />
                    ))}
                </div>
                {filteredProjects.length === 0 ? (
                    <div className="rd-project-empty">
                        <p>No projects matched that search yet.</p>
                    </div>
                ) : null}
            </main>
        </>
    );
}

function ProjectShowcaseCard({ project }: { project: ProjectEntry }) {
    const Icon = projectIconMap[project.iconName as keyof typeof projectIconMap] ?? Rocket;
    const repoLabel = project.github
        ? project.github.replace(/^https?:\/\/github\.com\//, "").replace(/\/$/, "")
        : null;
    const liveLabel = project.link
        ? project.link.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "")
        : null;

    return (
        <article className="rd-project-card">
            <div className="rd-project-card-top">
                <div className="rd-project-icon-badge">
                    <Icon size={18} strokeWidth={2.1} />
                </div>
                <p className="rd-project-category">{project.category}</p>
            </div>

            <div className="rd-project-copy">
                <h3>{project.title}</h3>
                <p className="rd-project-tagline">{project.tagline || project.category}</p>
                <p className="rd-project-description">{project.description}</p>
            </div>

            <div className="rd-project-tech-wrap">
                {project.tech.slice(0, 8).map((item) => (
                    <span key={`${project.title}-${item}`} className="rd-project-tech-pill">
                        {item}
                    </span>
                ))}
            </div>

            <div className="rd-project-actions">
                {project.github && repoLabel ? (
                    <a href={project.github} target="_blank" rel="noreferrer" className="rd-project-action rd-project-action-secondary">
                        <span>{repoLabel}</span>
                        <Github size={14} />
                    </a>
                ) : null}
                {project.link && liveLabel ? (
                    <a href={project.link} target="_blank" rel="noreferrer" className="rd-project-action rd-project-action-primary">
                        <span>{liveLabel}</span>
                        <ArrowUpRight size={14} />
                    </a>
                ) : null}
            </div>
        </article>
    );
}

function AboutPage() {
    return (
        <>
            <Seo
                title={`About | ${profileDetails.name}`}
                description="Profile, focus areas, education, and current direction for MARURI SAI RAMA LINGA REDDY."
                pageType="AboutPage"
                keywords={["About Sairam Maruri", "GenAI Engineer India", "ML Engineer", "AI developer", "VIT-AP"]}
                breadcrumbs={[{ name: "Home", url: ROUTE_PATHS.home }, { name: "About", url: ROUTE_PATHS.about }]}
            />
            <main className="rd-page rd-page-pad">
                <PageHeader label="About" title={profileDetails.name} description={profileDetails.role} />
                <div className="rd-two-column">
                    <section>
                        <p className="rd-long-copy">{profileDetails.summary}</p>
                        <div className="rd-stack-block">
                            <p className="rd-surface-label">Current Focus</p>
                            {profileDetails.currentFocus.map((item) => (
                                <div key={item} className="rd-line-item">
                                    <span className="rd-line-dot" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                        <div className="rd-stack-block">
                            <p className="rd-surface-label">Seeking Roles</p>
                            <div className="rd-pill-wrap">
                                {profileDetails.seekingRoles.map((role) => (
                                    <span key={role} className="rd-pill">
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="rd-stack-block">
                            <p className="rd-surface-label">Services</p>
                            <div className="rd-card-grid">
                                {serviceCards.map((service) => (
                                    <article key={service.title} className="rd-service-card">
                                        <span className="rd-service-dot" />
                                        <h3>{service.title}</h3>
                                        <p>{service.desc}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section>
                        <p className="rd-surface-label">Education</p>
                        <div className="rd-surface-stack">
                            {educationData.map((entry) => (
                                <article key={`${entry.org}-${entry.date}`} className="rd-surface-card">
                                    <p className="rd-entry-meta">
                                        {entry.type} · {entry.date}
                                    </p>
                                    <h3>{entry.title}</h3>
                                    <p className="rd-entry-title">
                                        {entry.major ? `${entry.major} · ` : ""}
                                        {entry.org}
                                        {entry.campus ? ` ${entry.campus}` : ""}
                                    </p>
                                    <p className="rd-entry-copy">{entry.place}</p>
                                    <p className="rd-entry-copy">{entry.grade}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

function SkillsPage() {
    return (
        <>
            <Seo
                title={`Skills | ${profileDetails.name}`}
                description="A broad technical stack across GenAI, cloud, full-stack engineering, vector search, and delivery systems."
                pageType="CollectionPage"
                keywords={["Python", "React", "AWS", "LangChain", "RAG", "Machine Learning", "GenAI", "TypeScript", "skills"]}
                breadcrumbs={[{ name: "Home", url: ROUTE_PATHS.home }, { name: "Skills", url: ROUTE_PATHS.skills }]}
            />
            <main className="rd-page rd-page-pad">
                <PageHeader label="Skills" title="What I Work With" description="Grouped by capability rather than hype cycles." />
                <div className="rd-card-grid">
                    {skillCategories.map((category) => (
                        <article key={category.category} className="rd-skill-card">
                            <p className="rd-surface-label">{category.category}</p>
                            <p className="rd-card-copy">{category.description}</p>
                            <div className="rd-pill-wrap">
                                {category.skills.slice(0, 12).map((skill) => (
                                    <span key={skill.name} className="rd-pill">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </main>
        </>
    );
}


function WritingSubscribe() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = email.trim().toLowerCase();
        if (!trimmed) return;
        setStatus("loading");
        try {
            const { supabase } = await import("@/lib/supabase");
            if (!supabase) throw new Error("not_configured");
            const { error } = await supabase.from("newsletter_subscribers").insert([{ email: trimmed }]);
            if (error) {
                setStatus(error.code === "23505" ? "duplicate" : "error");
            } else {
                setStatus("success");
                setEmail("");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="rd-subscribe-banner">
            <div className="rd-subscribe-left">
                <div className="rd-subscribe-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                    <p className="rd-subscribe-title">Stay in the loop</p>
                    <p className="rd-subscribe-desc">New essays on AI, engineering, and shipping — delivered when they drop.</p>
                </div>
            </div>
            <div className="rd-subscribe-right">
                {status === "success" ? (
                    <div className="rd-subscribe-done">
                        <span className="rd-status-dot" />
                        You&apos;re subscribed — welcome aboard.
                    </div>
                ) : status === "duplicate" ? (
                    <div className="rd-subscribe-done">
                        <span className="rd-status-dot" />
                        This email is already subscribed.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="rd-subscribe-form">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            disabled={status === "loading"}
                            className="rd-subscribe-input"
                        />
                        <button type="submit" disabled={status === "loading" || !email.trim()} className="rd-subscribe-btn">
                            {status === "loading" ? <span className="rd-subscribe-spinner" /> : "Subscribe"}
                        </button>
                    </form>
                )}
                {status === "error" && (
                    <p className="rd-subscribe-error">Could not subscribe — try emailing me directly.</p>
                )}
            </div>
        </div>
    );
}

function WritingPage() {
    return (
        <>
            <Seo
                title={`Writing | ${profileDetails.name}`}
                description="Technical essays, AI digests, architecture perspectives, and production engineering notes."
                pageType="CollectionPage"
                keywords={["AI writing", "Machine Learning blog", "GenAI essays", "technical writing", "LLM", "RAG", "agents"]}
                breadcrumbs={[{ name: "Home", url: ROUTE_PATHS.home }, { name: "Writing", url: ROUTE_PATHS.writing }]}
            />
            <main className="rd-page rd-page-pad">
                <PageHeader label="Writing" title="Essays, Digests, and Deep Dives" description="Long-form writing across GenAI, infra, developer tooling, and what actually matters for builders." />
                <WritingSubscribe />
                <div className="rd-writing-list rd-writing-list-wide">
                    {nonLegalBlogPosts.map((post) => (
                        <WritingListItem key={post.id} post={post} />
                    ))}
                </div>
            </main>
        </>
    );
}

function WritingPostPage() {
    const { id } = useParams<{ id: string }>();
    const post = nonLegalBlogPosts.find((entry) => entry.id === id);
    const [content, setContent] = useState<string | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "loaded" | "error">("idle");
    const processedContent = useMemo(
        () => content?.replace(/<img /g, '<img loading="lazy" decoding="async" ') ?? null,
        [content],
    );

    useEffect(() => {
        if (!post) return;

        let cancelled = false;
        setStatus("loading");

        void getBlogContent(post.id)
            .then((value) => {
                if (cancelled) return;
                setContent(value);
                setStatus("loaded");
            })
            .catch(() => {
                if (cancelled) return;
                setStatus("error");
            });

        return () => {
            cancelled = true;
        };
    }, [post]);

    if (!post) {
        return <NotFoundPage />;
    }

    return (
        <>
            <Seo
                title={`${post.title} | ${profileDetails.name}`}
                description={post.excerpt}
                type="article"
                pageType="WebPage"
                canonical={getWritingPath(post.id)}
                publishedTime={post.date}
                modifiedTime={post.date}
                keywords={post.tags}
                breadcrumbs={[
                    { name: "Home", url: ROUTE_PATHS.home },
                    { name: "Writing", url: ROUTE_PATHS.writing },
                    { name: post.title, url: getWritingPath(post.id) },
                ]}
            />
            <main className="rd-page rd-page-pad">
                <article className="rd-article-shell">
                    <Link to={ROUTE_PATHS.writing} className="rd-back-link">
                        <ChevronLeft size={16} />
                        Back to writing
                    </Link>
                    <p className="rd-page-label">Article</p>
                    <h1 className="rd-article-title">{post.title}</h1>
                    <div className="rd-article-meta">
                        <span>{formatReadableDate(post.date)}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                    </div>
                    <p className="rd-article-excerpt">{post.excerpt}</p>
                    <div className="rd-pill-wrap">
                        {post.tags.map((tag) => (
                            <span key={tag} className="rd-pill">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {post.externalLink ? (
                        <a className="rd-button rd-button-secondary" href={post.externalLink} target="_blank" rel="noreferrer">
                            Read External Article <ArrowUpRight size={16} />
                        </a>
                    ) : null}

                    {status === "loading" ? <p className="rd-article-status">Loading article…</p> : null}
                    {status === "error" ? (
                        <p className="rd-article-status">This article content could not be loaded right now.</p>
                    ) : null}
                    {processedContent ? (
                        <div className="blog-content rd-article-content" dangerouslySetInnerHTML={{ __html: processedContent }} />
                    ) : null}
                </article>
            </main>
        </>
    );
}

function CertificationsPage() {
    return (
        <>
            <Seo
                title={`Certifications | ${profileDetails.name}`}
                description="Professional certifications and public credential links."
                pageType="CollectionPage"
                keywords={["AWS certifications", "AI certifications", "ML credentials", "professional certifications", "Sairam Maruri"]}
                breadcrumbs={[{ name: "Home", url: ROUTE_PATHS.home }, { name: "Certifications", url: ROUTE_PATHS.certifications }]}
            />
            <main className="rd-page rd-page-pad">
                <PageHeader label="Certifications" title="Credentials & Validation" />
                <div className="rd-simple-list rd-simple-list-wide">
                    {certifications.map((certification) => (
                        <a key={certification.title} href={certification.link} target="_blank" rel="noreferrer">
                            <span>{certification.title}</span>
                            <ArrowUpRight size={15} />
                        </a>
                    ))}
                </div>
            </main>
        </>
    );
}

function CodingProfilesPage() {
    return (
        <>
            <Seo
                title={`Coding Profiles | ${profileDetails.name}`}
                description="Competitive programming and public coding platforms that document algorithmic range and consistency."
                pageType="CollectionPage"
                keywords={["LeetCode", "CodeChef", "Codeforces", "competitive programming", "DSA", "algorithms", "Sairam Maruri"]}
                breadcrumbs={[{ name: "Home", url: ROUTE_PATHS.home }, { name: "Coding Profiles", url: ROUTE_PATHS.codingProfiles }]}
            />
            <main className="rd-page rd-page-pad">
                <PageHeader label="Coding Profiles" title="Public Competitive Proof" />
                <div className="rd-card-grid">
                    {codingProfilesData.map((profile) => (
                        <a key={profile.label} className="rd-card" href={profile.href} target="_blank" rel="noreferrer">
                            <div className="rd-card-meta">
                                <span className="rd-chip">{profile.label}</span>
                                <span className="rd-meta-text">{profile.stats}</span>
                            </div>
                            <h3>{profile.label}</h3>
                            <p>{profile.desc}</p>
                            <span className="rd-card-arrow">↗</span>
                        </a>
                    ))}
                </div>
            </main>
        </>
    );
}

function EducationPage() {
    return (
        <>
            <Seo
                title={`Education | ${profileDetails.name}`}
                description="Academic background and foundational learning trajectory."
                pageType="CollectionPage"
                keywords={["VIT-AP University", "Computer Science", "B.Tech", "education", "Sairam Maruri"]}
                breadcrumbs={[{ name: "Home", url: ROUTE_PATHS.home }, { name: "Education", url: ROUTE_PATHS.education }]}
            />
            <main className="rd-page rd-page-pad">
                <PageHeader label="Education" title="Academic Foundation" />
                <div className="rd-surface-stack">
                    {educationData.map((entry) => (
                        <article key={`${entry.org}-${entry.date}`} className="rd-project-row">
                            <div>
                                <p className="rd-entry-meta">
                                    {entry.type} · {entry.date}
                                </p>
                                <h3>{entry.title}</h3>
                                <p>{entry.major ? `${entry.major} · ` : ""}{entry.org}{entry.campus ? ` ${entry.campus}` : ""}</p>
                                <p className="rd-entry-copy">{entry.place}</p>
                            </div>
                            <div className="rd-entry-grade">{entry.grade}</div>
                        </article>
                    ))}
                </div>
            </main>
        </>
    );
}

function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const name = form.name.trim();
        const email = form.email.trim();
        const message = form.message.trim();

        if (!name && !email && !message) {
            setStatus("error");
            setErrorMessage("Add at least one detail or message before sending.");
            return;
        }

        setStatus("loading");
        setErrorMessage("");

        try {
            const { supabase } = await import("@/lib/supabase");
            if (!supabase) {
                throw new Error("Messaging backend is not configured.");
            }

            const baseContent =
                message ||
                [
                    name ? `Name: ${name}` : null,
                    email ? `Email: ${email}` : null,
                    "Sent without a message body.",
                ]
                    .filter(Boolean)
                    .join("\n");

            const payload = {
                content: baseContent,
                timestamp: new Date().toISOString(),
                user_agent: navigator.userAgent,
                sender_name: name || null,
                sender_email: email || null,
                source: "anonymous_messenger",
            };

            let insertError: { message: string } | null = null;

            const firstAttempt = await supabase.from("portfolio_messages").insert([payload]);
            insertError = firstAttempt.error;

            if (insertError) {
                const fallbackContent = [
                    name ? `Name: ${name}` : null,
                    email ? `Email: ${email}` : null,
                    message ? `Message:\n${message}` : "Message: [empty]",
                ]
                    .filter(Boolean)
                    .join("\n\n");

                const fallbackAttempt = await supabase.from("portfolio_messages").insert([
                    {
                        content: fallbackContent,
                        timestamp: new Date().toISOString(),
                        user_agent: navigator.userAgent,
                    },
                ]);

                insertError = fallbackAttempt.error;
            }

            if (insertError) {
                throw new Error(insertError.message);
            }

            setStatus("success");
            setForm({ name: "", email: "", message: "" });
        } catch (error) {
            setStatus("error");
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Could not send the message right now.",
            );
        }
    };

    return (
        <>
            <Seo
                title={`Contact | ${profileDetails.name}`}
                description="Direct ways to reach MARURI SAI RAMA LINGA REDDY for collaboration, roles, or interesting builds."
                pageType="ContactPage"
                keywords={["contact Sairam Maruri", "hire AI Engineer", "hire ML Engineer", "GenAI Engineer India", "collaboration"]}
                breadcrumbs={[{ name: "Home", url: ROUTE_PATHS.home }, { name: "Contact", url: ROUTE_PATHS.contact }]}
            />
            <main className="rd-page rd-page-pad">
                <PageHeader
                    label="Contact"
                    title="Let's Build Something"
                    description="The quickest route is email, but the form below will also open a drafted message in your mail app."
                />
                <div className="rd-two-column">
                    <section>
                        <p className="rd-long-copy">
                            Reach out for AI products, agent workflows, full-stack engineering, writing collaborations, or interesting systems work.
                        </p>
                        <div className="rd-contact-list">
                            {contactLinks.map((item) => (
                                <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                                    <span className="rd-page-label">{item.label.includes("@") ? "Email" : item.label.includes("github") ? "GitHub" : item.label.includes("linkedin") ? "LinkedIn" : "Phone"}</span>
                                    <span>{item.label}</span>
                                </a>
                            ))}
                        </div>
                    </section>

                    <section>
                        {status === "success" ? (
                            <div className="rd-surface-card">
                                <span className="rd-service-dot" />
                                <h3>Message received.</h3>
                                <p>Your anonymous message has been stored successfully.</p>
                            </div>
                        ) : (
                            <form className="rd-contact-form" onSubmit={submit}>
                                <div className="rd-contact-form-header">
                                    <p className="rd-surface-label">Anonymous Messenger</p>
                                    <h3>Drop a note without friction.</h3>
                                    <p>All fields are optional. Share as much or as little context as you want.</p>
                                </div>
                                <label>
                                    <span>Name</span>
                                    <input
                                        value={form.name}
                                        onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                                    />
                                </label>
                                <label>
                                    <span>Email</span>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                                    />
                                </label>
                                <label>
                                    <span>Message</span>
                                    <textarea
                                        rows={6}
                                        value={form.message}
                                        onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                                    />
                                </label>
                                <button className="rd-button rd-button-primary" type="submit" disabled={status === "loading"}>
                                    Send Message <ArrowRight size={16} />
                                </button>
                                {status === "error" ? <p className="rd-contact-error">{errorMessage}</p> : null}
                            </form>
                        )}
                    </section>
                </div>
            </main>
        </>
    );
}

function PrivacyPage() {
    return (
        <>
            <Seo
                title={`Privacy Policy | ${profileDetails.name}`}
                description="Privacy Policy for the portfolio of Sai Ram Maruri — what data is collected, how it is used, and your rights."
                pageType="WebPage"
            />
            <main className="rd-page rd-page-pad">
                <PageHeader
                    label="Legal"
                    title="Privacy Policy"
                    description="Last updated: April 20, 2026"
                />
                <div className="rd-legal-body">
                    <section className="rd-legal-section">
                        <p className="rd-legal-intro">
                            This Privacy Policy describes how {profileDetails.brand} (&ldquo;I&rdquo;, &ldquo;my&rdquo;) collects, uses, and protects information when you visit this portfolio at <strong>{siteMetadata.siteUrl}</strong>. By using this site you agree to the practices described below.
                        </p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>1. Information I Collect</h2>
                        <h3>Information you provide directly</h3>
                        <p>When you use the contact message form, the following data is submitted and stored securely via Supabase:</p>
                        <ul>
                            <li>Your message content</li>
                            <li>Submission timestamp</li>
                            <li>Browser user-agent string (for spam prevention)</li>
                        </ul>
                        <p>If you subscribe to the newsletter or writing updates, your email address is stored in a Supabase database.</p>

                        <h3>Automatically collected information</h3>
                        <p>This site may collect standard server-side logs including IP addresses and page request data as part of normal web hosting operations via Vercel. This data is used solely for diagnostics and is not linked to personal profiles.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>2. How I Use Your Information</h2>
                        <ul>
                            <li>To read and respond to messages you send via the contact form</li>
                            <li>To send writing updates if you have subscribed to the newsletter</li>
                            <li>To diagnose technical errors and maintain site performance</li>
                            <li>I do not sell, rent, or share your personal data with third parties for marketing purposes</li>
                        </ul>
                    </section>

                    <section className="rd-legal-section">
                        <h2>3. Data Storage &amp; Security</h2>
                        <p>Messages and subscriber data are stored in <strong>Supabase</strong>, a secure cloud database provider. Data is protected by row-level security policies and accessible only to authenticated administrators. Supabase&apos;s infrastructure is hosted on AWS and complies with SOC 2 and ISO 27001 standards.</p>
                        <p>This site is hosted on <strong>Vercel</strong>, which applies TLS encryption for all data in transit.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>4. Cookies</h2>
                        <p>This portfolio does not use tracking cookies, analytics cookies, or advertising cookies. The only browser storage used is session-level state for the contact form draft (which resets on page reload and is never sent to a server unless you submit the form).</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>5. Third-Party Services</h2>
                        <p>This site links to or integrates with the following third-party platforms, each governed by their own privacy policies:</p>
                        <ul>
                            <li><strong>Supabase</strong> — database and authentication (supabase.com)</li>
                            <li><strong>Vercel</strong> — site hosting and edge network (vercel.com)</li>
                            <li><strong>GitHub</strong> — code repositories linked from project pages</li>
                            <li><strong>LinkedIn</strong> — professional profile links</li>
                            <li><strong>LeetCode / CodeChef / Codeforces</strong> — competitive programming profiles</li>
                        </ul>
                        <p>Clicking external links means you leave this site; I am not responsible for the privacy practices of those destinations.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>6. AI Chat Widget</h2>
                        <p>This site includes an AI-powered chat assistant (&ldquo;Ask Sai AI&rdquo;). Messages sent through the widget are processed via a serverless API endpoint. Conversation history is held only in your browser session and is not persistently stored on the server between sessions.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>7. Data Retention</h2>
                        <p>Contact messages are retained until I manually delete them from the admin dashboard. Newsletter subscriber records are retained until you request unsubscription. You may request deletion of any data submitted by you at any time by emailing <a href={`mailto:${profileDetails.email}`}>{profileDetails.email}</a>.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>8. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Access the data I hold about you</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Withdraw consent for newsletter communications at any time</li>
                        </ul>
                        <p>To exercise any of these rights, contact me at <a href={`mailto:${profileDetails.email}`}>{profileDetails.email}</a>.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>9. Changes to This Policy</h2>
                        <p>I may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the top will always reflect the most recent revision. Continued use of the site after changes constitutes acceptance of the updated policy.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>10. Contact</h2>
                        <p>For any privacy-related questions or requests, reach out at <a href={`mailto:${profileDetails.email}`}>{profileDetails.email}</a> or via the <Link to={ROUTE_PATHS.contact}>Contact page</Link>.</p>
                    </section>
                </div>
            </main>
        </>
    );
}

function TermsPage() {
    return (
        <>
            <Seo
                title={`Terms & Conditions | ${profileDetails.name}`}
                description="Terms and Conditions for using the portfolio of Sai Ram Maruri — content rights, acceptable use, and disclaimers."
                pageType="WebPage"
            />
            <main className="rd-page rd-page-pad">
                <PageHeader
                    label="Legal"
                    title="Terms & Conditions"
                    description="Last updated: April 20, 2026"
                />
                <div className="rd-legal-body">
                    <section className="rd-legal-section">
                        <p className="rd-legal-intro">
                            Please read these Terms &amp; Conditions carefully before using <strong>{siteMetadata.siteUrl}</strong>. By accessing or using this portfolio you agree to be bound by these terms. If you do not agree, please do not use the site.
                        </p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>1. Acceptance of Terms</h2>
                        <p>By browsing or interacting with this site, you confirm that you are at least 13 years of age and agree to these Terms &amp; Conditions. These terms apply to all visitors and users of the site.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>2. Intellectual Property</h2>
                        <p>All content on this site — including but not limited to written essays, project descriptions, design choices, code snippets, and portfolio presentation — is the intellectual property of <strong>MARURI SAI RAMA LINGA REDDY</strong> unless explicitly attributed to a third party.</p>
                        <p>You may:</p>
                        <ul>
                            <li>Share links to this portfolio or individual pages</li>
                            <li>Quote short excerpts for commentary or educational purposes, with attribution</li>
                        </ul>
                        <p>You may not:</p>
                        <ul>
                            <li>Reproduce, copy, or redistribute any content for commercial use without prior written permission</li>
                            <li>Claim authorship of any original work published here</li>
                            <li>Scrape or mirror this site&apos;s content in bulk</li>
                        </ul>
                    </section>

                    <section className="rd-legal-section">
                        <h2>3. Acceptable Use</h2>
                        <p>When using the contact form or AI chat widget, you agree not to:</p>
                        <ul>
                            <li>Submit spam, unsolicited marketing, or automated messages</li>
                            <li>Attempt to probe, scan, or test the security of the site</li>
                            <li>Transmit any malicious code, viruses, or harmful content</li>
                            <li>Impersonate any individual or entity</li>
                        </ul>
                        <p>I reserve the right to block access to any user or IP address that violates these terms.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>4. AI Chat Disclaimer</h2>
                        <p>The &ldquo;Ask Sai AI&rdquo; chat widget is an AI assistant trained on information about my portfolio and background. Its responses are generated automatically and may not always be accurate, complete, or current. Do not rely on AI-generated responses for consequential decisions. For accurate information, contact me directly.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>5. Open Source &amp; Third-Party Code</h2>
                        <p>Some projects linked from this portfolio may include open-source components governed by their respective licenses (MIT, Apache 2.0, etc.). Refer to the individual project repositories for applicable license terms.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>6. Disclaimer of Warranties</h2>
                        <p>This portfolio is provided on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis. I make no warranties, express or implied, regarding the accuracy, reliability, completeness, or fitness for a particular purpose of any content. I do not guarantee uninterrupted or error-free availability of the site.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>7. Limitation of Liability</h2>
                        <p>To the fullest extent permitted by applicable law, I shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of — or inability to use — this site or its content.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>8. External Links</h2>
                        <p>This site contains links to external websites (GitHub, LinkedIn, LeetCode, etc.) for reference and verification. I do not control those sites and am not responsible for their content, privacy practices, or availability. Inclusion of a link does not constitute endorsement.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>9. Governing Law</h2>
                        <p>These Terms &amp; Conditions are governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes arising from or relating to these terms shall be subject to the exclusive jurisdiction of the courts of India.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>10. Changes to These Terms</h2>
                        <p>I reserve the right to modify these Terms &amp; Conditions at any time. Changes are effective immediately upon posting to this page. The &ldquo;Last updated&rdquo; date at the top will reflect the most recent revision. Continued use of the site constitutes acceptance of the revised terms.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>11. Contact</h2>
                        <p>Questions about these Terms? Email me at <a href={`mailto:${profileDetails.email}`}>{profileDetails.email}</a> or use the <Link to={ROUTE_PATHS.contact}>Contact page</Link>.</p>
                    </section>
                </div>
            </main>
        </>
    );
}

function ResumeRedirectPage() {
    useEffect(() => {
        window.location.assign(profileDetails.resumeHref);
    }, []);

    return (
        <>
            <Seo
                title={`Resume | ${profileDetails.name}`}
                description="Download or view the résumé of MARURI SAI RAMA LINGA REDDY — GenAI Engineer & Full Stack Developer."
                robots="noindex, follow"
            />
            <main className="rd-page rd-page-pad">
                <PageHeader label="Resume" title="Opening Resume" description="If the PDF does not open automatically, use the link below." />
                <a className="rd-button rd-button-secondary" href={profileDetails.resumeHref} target="_blank" rel="noreferrer">
                    Open Resume <ArrowUpRight size={16} />
                </a>
            </main>
        </>
    );
}

function LegacyWritingPostRedirect() {
    const { id } = useParams<{ id: string }>();
    return <Navigate to={getWritingPath(id)} replace />;
}

function NotFoundPage() {
    return (
        <>
            <Seo title={`Not Found | ${profileDetails.name}`} description="The requested page was not found." robots="noindex, nofollow" />
            <main className="rd-page rd-page-pad">
                <PageHeader label="404" title="This page drifted off course." description="The route you're looking for does not exist in the updated portfolio structure." />
                <Link className="rd-button rd-button-primary" to={ROUTE_PATHS.home}>
                    Return Home <ArrowRight size={16} />
                </Link>
            </main>
        </>
    );
}

function WritingListItem({ post, variant = "default" }: { post: WritingEntry; variant?: "default" | "home" }) {
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
            <a className={`rd-writing-item ${variant === "home" ? "rd-writing-item-home" : ""}`.trim()} href={post.externalLink} target="_blank" rel="noreferrer">
                {body}
            </a>
        );
    }

    return (
        <Link className={`rd-writing-item ${variant === "home" ? "rd-writing-item-home" : ""}`.trim()} to={getWritingPath(post.id)}>
            {body}
        </Link>
    );
}

function PortfolioRedesign() {
    return (
        <HelmetProvider>
            <Router basename={routerBasename}>
                <Routes>
                    <Route element={<PortfolioLayout />}>
                        <Route path={ROUTE_PATHS.home} element={<HomePage />} />
                        <Route path={ROUTE_PATHS.projects} element={<ProjectsPage />} />
                        <Route path={ROUTE_PATHS.about} element={<AboutPage />} />
                        <Route path={ROUTE_PATHS.skills} element={<SkillsPage />} />
                        <Route path={ROUTE_PATHS.writing} element={<WritingPage />} />
                        <Route path={`${ROUTE_PATHS.writing}/:id`} element={<WritingPostPage />} />
                        <Route path={ROUTE_PATHS.certifications} element={<CertificationsPage />} />
                        <Route path={ROUTE_PATHS.codingProfiles} element={<CodingProfilesPage />} />
                        <Route path={ROUTE_PATHS.education} element={<EducationPage />} />
                        <Route path={ROUTE_PATHS.contact} element={<ContactPage />} />
                        <Route path={ROUTE_PATHS.privacy} element={<PrivacyPage />} />
                        <Route path={ROUTE_PATHS.terms} element={<TermsPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                    <Route path={ROUTE_PATHS.resume} element={<ResumeRedirectPage />} />
                    <Route path={ROUTE_PATHS.legacyWriting} element={<Navigate to={ROUTE_PATHS.writing} replace />} />
                    <Route path={`${ROUTE_PATHS.legacyWriting}/:id`} element={<LegacyWritingPostRedirect />} />
                </Routes>
            </Router>
        </HelmetProvider>
    );
}

export default PortfolioRedesign;
