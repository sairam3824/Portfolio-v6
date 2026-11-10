import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import Seo from "@/shared/Seo";
import { getBlogContent, getCachedBlogContent } from "@/features/blog/blogContent";
import {
    NotFoundPage,
    formatReadableDate,
    getWritingPath,
    nonLegalBlogPosts,
    profileDetails,
    ROUTE_PATHS,
    WritingListItem,
    type WritingEntry,
} from "../shared";

// Tags too broad to signal topical similarity on their own.
const GENERIC_TAGS = new Set(["AI/ML", "LLM", "Production AI"]);
const RELATED_COUNT = 3;

function getRelatedPosts(post: WritingEntry): WritingEntry[] {
    const tags = new Set(post.tags.filter((tag) => !GENERIC_TAGS.has(tag)));
    return nonLegalBlogPosts
        .filter((entry) => entry.id !== post.id && !entry.externalLink)
        .map((entry) => ({
            entry,
            score: entry.tags.filter((tag) => tags.has(tag)).length,
            time: Date.parse(entry.date) || 0,
        }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score || b.time - a.time)
        .slice(0, RELATED_COUNT)
        .map(({ entry }) => entry);
}

export default function WritingPostPage() {
    const { id } = useParams<{ id: string }>();
    const post = nonLegalBlogPosts.find((entry) => entry.id === id);
    const cachedContent = post ? getCachedBlogContent(post.id) : undefined;
    const [content, setContent] = useState<string | null>(cachedContent ?? null);
    const [status, setStatus] = useState<"idle" | "loading" | "loaded" | "error">(
        cachedContent !== undefined ? "loaded" : "idle",
    );
    const processedContent = useMemo(
        () => content?.replace(/<img /g, '<img loading="lazy" decoding="async" ') ?? null,
        [content],
    );
    const relatedPosts = useMemo(() => (post ? getRelatedPosts(post) : []), [post]);

    useEffect(() => {
        if (!post) return;
        if (getCachedBlogContent(post.id) !== undefined) {
            setContent(getCachedBlogContent(post.id) ?? null);
            setStatus("loaded");
            return;
        }

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

                    {relatedPosts.length > 0 ? (
                        <section className="rd-related" aria-labelledby="rd-related-heading">
                            <h2 id="rd-related-heading" className="rd-section-label">
                                Related writing
                            </h2>
                            <div className="rd-writing-list rd-related-list">
                                {relatedPosts.map((entry) => (
                                    <WritingListItem key={entry.id} post={entry} />
                                ))}
                            </div>
                        </section>
                    ) : null}
                </article>
            </main>
        </>
    );
}
