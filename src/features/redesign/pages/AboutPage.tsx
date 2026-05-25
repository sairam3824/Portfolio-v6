import Seo from "@/shared/Seo";
import { educationData } from "@/data/educationData";
import {
    PageHeader,
    profileDetails,
    ROUTE_PATHS,
    serviceCards,
} from "../shared";

export default function AboutPage() {
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
