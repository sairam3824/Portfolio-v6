import { useState } from "react";
import { ArrowUpRight, Github, Rocket, Search } from "lucide-react";
import Seo from "@/shared/Seo";
import {
    PageHeader,
    ProjectEntry,
    profileDetails,
    projectIconMap,
    projectsData,
    ROUTE_PATHS,
} from "../shared";

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

export default function ProjectsPage() {
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
