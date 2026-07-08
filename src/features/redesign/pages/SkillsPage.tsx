import Seo from "@/shared/Seo";
import { PageHeader, profileDetails, ROUTE_PATHS, skillCategories } from "../shared";

export default function SkillsPage() {
    return (
        <>
            <Seo
                title={`Skills | ${profileDetails.name}`}
                description="A broad stack across business analytics, BI, GenAI, cloud, full-stack engineering, vector search, and delivery systems."
                pageType="CollectionPage"
                keywords={["Business Analytics", "Power BI", "SQL", "Python", "Machine Learning", "GenAI", "RAG", "AWS", "skills"]}
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
