import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import Seo from "@/shared/Seo";
import { getBlogContent } from "@/features/blog/blogContent";
import {
    NotFoundPage,
    formatReadableDate,
    getWritingPath,
    nonLegalBlogPosts,
    profileDetails,
    ROUTE_PATHS,
} from "../shared";

export default function WritingPostPage() {
    const { id } = useParams<{ id: string }>();
    const post = nonLegalBlogPosts.find((entry) => entry.id === id);
    const [content, setContent] = useState<string | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "loaded" | "error">("idle");
    const processedContent = useMemo(
        () => content?.replace(/<img /g, '<img loading="lazy" decoding="async" ') ?? null,
        [content],
    );

    useEffect(() => {
        if (!post) return;

        let cancelled = false;
        setStatus("loading");

        void getBlogContent(post.id)
            .then((value) => {
                if (cancelled) return;
                setContent(value);
                setStatus("loaded");
            })
            .catch(() => {
                if (cancelled) return;
                setStatus("error");
            });

        return () => {
            cancelled = true;
        };
    }, [post]);

    if (!post) {
        return <NotFoundPage />;
    }

    return (
        <>
            <Seo
                title={`${post.title} | ${profileDetails.name}`}
                description={post.excerpt}
                image={`/api/og?slug=${post.id}`}
                type="article"
                pageType="WebPage"
                canonical={getWritingPath(post.id)}
                publishedTime={post.date}
                modifiedTime={post.date}
                keywords={post.tags}
                breadcrumbs={[
                    { name: "Home", url: ROUTE_PATHS.home },
                    { name: "Writing", url: ROUTE_PATHS.writing },
                    { name: post.title, url: getWritingPath(post.id) },
                ]}
            />
            <main className="rd-page rd-page-pad">
                <article className="rd-article-shell">
                    <Link to={ROUTE_PATHS.writing} className="rd-back-link">
                        <ChevronLeft size={16} />
                        Back to writing
                    </Link>
                    <p className="rd-page-label">Article</p>
                    <h1 className="rd-article-title">{post.title}</h1>
                    <div className="rd-article-meta">
                        <span>{formatReadableDate(post.date)}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                    </div>
                    <p className="rd-article-excerpt">{post.excerpt}</p>
                    <div className="rd-pill-wrap">
                        {post.tags.map((tag) => (
                            <span key={tag} className="rd-pill">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {post.externalLink ? (
                        <a className="rd-button rd-button-secondary" href={post.externalLink} target="_blank" rel="noreferrer">
                            Read External Article <ArrowUpRight size={16} />
                        </a>
                    ) : null}

                    {status === "loading" ? <p className="rd-article-status">Loading article…</p> : null}
                    {status === "error" ? (
                        <p className="rd-article-status">This article content could not be loaded right now.</p>
                    ) : null}
                    {processedContent ? (
                        <div className="blog-content rd-article-content" dangerouslySetInnerHTML={{ __html: processedContent }} />
                    ) : null}
                </article>
            </main>
        </>
    );
}
