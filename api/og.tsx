import { ImageResponse } from "@vercel/og";
import { blogPosts } from "../shared-data/blogData";

export const config = { runtime: "edge" };

const titleFontSize = (title: string) => {
    if (title.length > 110) return 40;
    if (title.length > 75) return 48;
    return 58;
};

export default function handler(req: Request) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug") ?? "";

    const post = blogPosts.find(
        (entry) => entry.id === slug && !entry.externalLink && !entry.isLegalDoc,
    );

    if (!post) {
        return new Response("Not found", { status: 404 });
    }

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: "#f7f4ee",
                    padding: "64px 72px",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                            color: "#8b8578",
                            fontSize: 26,
                            letterSpacing: 6,
                            textTransform: "uppercase",
                        }}
                    >
                        <div style={{ width: 48, height: 4, backgroundColor: "#17140f", display: "flex" }} />
                        Sairam Maruri · Writing
                    </div>
                    <div
                        style={{
                            display: "flex",
                            marginTop: 48,
                            color: "#17140f",
                            fontSize: titleFontSize(post.title),
                            fontWeight: 700,
                            lineHeight: 1.15,
                            letterSpacing: -1.5,
                            maxWidth: 1020,
                        }}
                    >
                        {post.title}
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderTop: "2px solid #e3ded2",
                        paddingTop: 32,
                        color: "#5f594c",
                        fontSize: 28,
                    }}
                >
                    <div style={{ display: "flex", gap: 18 }}>
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                    </div>
                    <div style={{ display: "flex", fontWeight: 700, color: "#17140f" }}>www.saiii.in</div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            headers: {
                "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
            },
        },
    );
}
