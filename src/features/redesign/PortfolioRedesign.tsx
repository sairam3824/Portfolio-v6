import { Suspense, lazy, useEffect, useState } from "react";
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
    ArrowUpRight,
    ExternalLink,
    Github,
    Linkedin,
    Mail,
    Menu,
    Phone,
    X,
} from "lucide-react";
import {
    DeferredChatWidget,
    NotFoundPage,
    ScrollToTop,
    navigationItems,
    profileDetails,
    ROUTE_PATHS,
    routerBasename,
    siteMetadata,
    getWritingPath,
} from "./shared";
import { getLegacyWritingPath, getPluralWritingPath } from "@/data/siteRoutes";
import HomePage from "./pages/HomePage";

const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const WritingPage = lazy(() => import("./pages/WritingPage"));
const WritingPostPage = lazy(() => import("./pages/WritingPostPage"));
const CertificationsPage = lazy(() => import("./pages/CertificationsPage"));
const CodingProfilesPage = lazy(() => import("./pages/CodingProfilesPage"));
const EducationPage = lazy(() => import("./pages/EducationPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));

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

            <Suspense fallback={<div className="rd-page rd-page-pad" />}>
                <Outlet />
            </Suspense>

            <footer className="rd-footer">
                <div className="rd-footer-accent-bar" />

                <div className="rd-footer-grid">
                    <div className="rd-footer-brand-col">
                        <div className="rd-footer-brand-name">{profileDetails.brand}</div>
                        <p className="rd-footer-tagline">{profileDetails.role}</p>
                    </div>

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
            <DeferredChatWidget />
        </div>
    );
}

function LegacyWritingPostRedirect() {
    const { id } = useParams<{ id: string }>();
    return <Navigate to={getWritingPath(id)} replace />;
}

function PluralWritingPostRedirect() {
    const { id } = useParams<{ id: string }>();
    return <Navigate to={getWritingPath(id)} replace />;
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
                    <Route path={ROUTE_PATHS.legacyWriting} element={<Navigate to={ROUTE_PATHS.writing} replace />} />
                    <Route path={`${ROUTE_PATHS.legacyWriting}/:id`} element={<LegacyWritingPostRedirect />} />
                    <Route path={getPluralWritingPath()} element={<Navigate to={ROUTE_PATHS.writing} replace />} />
                    <Route path={`${getPluralWritingPath()}/:id`} element={<PluralWritingPostRedirect />} />
                </Routes>
            </Router>
        </HelmetProvider>
    );
}

export default PortfolioRedesign;
