import { Link } from "react-router-dom";
import Seo from "@/shared/Seo";
import { PageHeader, profileDetails, ROUTE_PATHS, siteMetadata } from "../shared";

export default function TermsPage() {
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
