import { useState } from "react";
import Seo from "@/shared/Seo";
import {
    PageHeader,
    WritingListItem,
    nonLegalBlogPosts,
    profileDetails,
    ROUTE_PATHS,
} from "../shared";

function WritingSubscribe() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = email.trim().toLowerCase();
        if (!trimmed) return;
        setStatus("loading");
        try {
            const { supabase } = await import("@/lib/supabase");
            if (!supabase) throw new Error("not_configured");
            const { error } = await supabase.from("newsletter_subscribers").insert([{ email: trimmed }]);
            if (error) {
                setStatus(error.code === "23505" ? "duplicate" : "error");
            } else {
                setStatus("success");
                setEmail("");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="rd-subscribe-banner">
            <div className="rd-subscribe-left">
                <div className="rd-subscribe-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                    <p className="rd-subscribe-title">Stay in the loop</p>
                    <p className="rd-subscribe-desc">New essays on AI, engineering, and shipping — delivered when they drop.</p>
                </div>
            </div>
            <div className="rd-subscribe-right">
                {status === "success" ? (
                    <div className="rd-subscribe-done">
                        <span className="rd-status-dot" />
                        You&apos;re subscribed — welcome aboard.
                    </div>
                ) : status === "duplicate" ? (
                    <div className="rd-subscribe-done">
                        <span className="rd-status-dot" />
                        This email is already subscribed.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="rd-subscribe-form">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            disabled={status === "loading"}
                            className="rd-subscribe-input"
                        />
                        <button type="submit" disabled={status === "loading" || !email.trim()} className="rd-subscribe-btn">
                            {status === "loading" ? <span className="rd-subscribe-spinner" /> : "Subscribe"}
                        </button>
                    </form>
                )}
                {status === "error" && (
                    <p className="rd-subscribe-error">Could not subscribe — try emailing me directly.</p>
                )}
            </div>
        </div>
    );
}

export default function WritingPage() {
    return (
        <>
            <Seo
                title={`Writing | ${profileDetails.name}`}
                description="Technical essays, AI digests, architecture perspectives, and production engineering notes."
                pageType="CollectionPage"
                keywords={["AI writing", "Machine Learning blog", "GenAI essays", "technical writing", "LLM", "RAG", "agents"]}
                breadcrumbs={[{ name: "Home", url: ROUTE_PATHS.home }, { name: "Writing", url: ROUTE_PATHS.writing }]}
            />
            <main className="rd-page rd-page-pad">
                <PageHeader label="Writing" title="Essays, Digests, and Deep Dives" description="Long-form writing across GenAI, infra, developer tooling, and what actually matters for builders." />
                <WritingSubscribe />
                <div className="rd-writing-list rd-writing-list-wide">
                    {nonLegalBlogPosts.map((post) => (
                        <WritingListItem key={post.id} post={post} />
                    ))}
                </div>
            </main>
        </>
    );
}
