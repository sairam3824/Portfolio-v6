import Seo from "@/shared/Seo";
import { educationData } from "@/data/educationData";
import { PageHeader, profileDetails, ROUTE_PATHS } from "../shared";

export default function EducationPage() {
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
