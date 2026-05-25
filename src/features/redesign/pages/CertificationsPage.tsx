import { ArrowUpRight } from "lucide-react";
import Seo from "@/shared/Seo";
import { PageHeader, certifications, profileDetails, ROUTE_PATHS } from "../shared";

export default function CertificationsPage() {
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
