import Seo from "@/shared/Seo";
import { PageHeader, codingProfilesData, profileDetails, ROUTE_PATHS } from "../shared";

export default function CodingProfilesPage() {
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
