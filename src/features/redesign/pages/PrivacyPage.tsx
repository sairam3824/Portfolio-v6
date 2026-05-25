import { Link } from "react-router-dom";
import Seo from "@/shared/Seo";
import { PageHeader, profileDetails, ROUTE_PATHS, siteMetadata } from "../shared";

export default function PrivacyPage() {
    return (
        <>
            <Seo
                title={`Privacy Policy | ${profileDetails.name}`}
                description="Privacy Policy for the portfolio of Sai Ram Maruri — what data is collected, how it is used, and your rights."
                pageType="WebPage"
            />
            <main className="rd-page rd-page-pad">
                <PageHeader
                    label="Legal"
                    title="Privacy Policy"
                    description="Last updated: April 20, 2026"
                />
                <div className="rd-legal-body">
                    <section className="rd-legal-section">
                        <p className="rd-legal-intro">
                            This Privacy Policy describes how {profileDetails.brand} (&ldquo;I&rdquo;, &ldquo;my&rdquo;) collects, uses, and protects information when you visit this portfolio at <strong>{siteMetadata.siteUrl}</strong>. By using this site you agree to the practices described below.
                        </p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>1. Information I Collect</h2>
                        <h3>Information you provide directly</h3>
                        <p>When you use the contact message form, the following data is submitted and stored securely via Supabase:</p>
                        <ul>
                            <li>Your message content</li>
                            <li>Submission timestamp</li>
                            <li>Browser user-agent string (for spam prevention)</li>
                        </ul>
                        <p>If you subscribe to the newsletter or writing updates, your email address is stored in a Supabase database.</p>

                        <h3>Automatically collected information</h3>
                        <p>This site may collect standard server-side logs including IP addresses and page request data as part of normal web hosting operations via Vercel. This data is used solely for diagnostics and is not linked to personal profiles.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>2. How I Use Your Information</h2>
                        <ul>
                            <li>To read and respond to messages you send via the contact form</li>
                            <li>To send writing updates if you have subscribed to the newsletter</li>
                            <li>To diagnose technical errors and maintain site performance</li>
                            <li>I do not sell, rent, or share your personal data with third parties for marketing purposes</li>
                        </ul>
                    </section>

                    <section className="rd-legal-section">
                        <h2>3. Data Storage &amp; Security</h2>
                        <p>Messages and subscriber data are stored in <strong>Supabase</strong>, a secure cloud database provider. Data is protected by row-level security policies and accessible only to authenticated administrators. Supabase&apos;s infrastructure is hosted on AWS and complies with SOC 2 and ISO 27001 standards.</p>
                        <p>This site is hosted on <strong>Vercel</strong>, which applies TLS encryption for all data in transit.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>4. Cookies</h2>
                        <p>This portfolio does not use tracking cookies, analytics cookies, or advertising cookies. The only browser storage used is session-level state for the contact form draft (which resets on page reload and is never sent to a server unless you submit the form).</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>5. Third-Party Services</h2>
                        <p>This site links to or integrates with the following third-party platforms, each governed by their own privacy policies:</p>
                        <ul>
                            <li><strong>Supabase</strong> — database and authentication (supabase.com)</li>
                            <li><strong>Vercel</strong> — site hosting and edge network (vercel.com)</li>
                            <li><strong>GitHub</strong> — code repositories linked from project pages</li>
                            <li><strong>LinkedIn</strong> — professional profile links</li>
                            <li><strong>LeetCode / CodeChef / Codeforces</strong> — competitive programming profiles</li>
                        </ul>
                        <p>Clicking external links means you leave this site; I am not responsible for the privacy practices of those destinations.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>6. AI Chat Widget</h2>
                        <p>This site includes an AI-powered chat assistant (&ldquo;Ask Sai AI&rdquo;). Messages sent through the widget are processed via a serverless API endpoint. Conversation history is held only in your browser session and is not persistently stored on the server between sessions.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>7. Data Retention</h2>
                        <p>Contact messages are retained until I manually delete them from the admin dashboard. Newsletter subscriber records are retained until you request unsubscription. You may request deletion of any data submitted by you at any time by emailing <a href={`mailto:${profileDetails.email}`}>{profileDetails.email}</a>.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>8. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Access the data I hold about you</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Withdraw consent for newsletter communications at any time</li>
                        </ul>
                        <p>To exercise any of these rights, contact me at <a href={`mailto:${profileDetails.email}`}>{profileDetails.email}</a>.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>9. Changes to This Policy</h2>
                        <p>I may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the top will always reflect the most recent revision. Continued use of the site after changes constitutes acceptance of the updated policy.</p>
                    </section>

                    <section className="rd-legal-section">
                        <h2>10. Contact</h2>
                        <p>For any privacy-related questions or requests, reach out at <a href={`mailto:${profileDetails.email}`}>{profileDetails.email}</a> or via the <Link to={ROUTE_PATHS.contact}>Contact page</Link>.</p>
                    </section>
                </div>
            </main>
        </>
    );
}
