import { Link } from "react-router-dom";
import {
    Activity,
    ArrowRight,
    ArrowUpRight,
    Code,
    Cpu,
    Github,
    Globe,
    Target,
} from "lucide-react";
import Seo from "@/shared/Seo";
import {
    Counter,
    SectionLabel,
    WritingListItem,
    certifications,
    codingProfilesData,
    featuredProjects,
    nonLegalBlogPosts,
    profileDetails,
    ROUTE_PATHS,
    siteMetadata,
    stats,
    titleLines,
} from "../shared";

export default function HomePage() {
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
