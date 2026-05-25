import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import Seo from "@/shared/Seo";
import { PageHeader, profileDetails } from "../shared";

export default function ResumeRedirectPage() {
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
