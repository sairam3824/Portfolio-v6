import { prerender } from "react-dom/static";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom";
import { getBlogContent } from "@/features/blog/blogContent";
import { PortfolioRoutes } from "@/features/redesign/PortfolioRedesign";
import { routerBasename } from "@/features/redesign/shared";
import { ROUTE_PATHS } from "@/data/siteRoutes";

/**
 * Build-time renderer used by the prerender plugin (vite.config.ts).
 * Returns the body markup for a route so crawlers receive real page content
 * in the initial HTML instead of an empty #root.
 */
export async function render(url: string): Promise<string> {
    const writingPrefix = `${ROUTE_PATHS.writing}/`;
    if (url.startsWith(writingPrefix)) {
        // Warms the content cache so WritingPostPage renders the article synchronously.
        await getBlogContent(url.slice(writingPrefix.length));
    }

    const { prelude } = await prerender(
        <HelmetProvider>
            <StaticRouter basename={routerBasename} location={url}>
                <PortfolioRoutes />
            </StaticRouter>
        </HelmetProvider>,
    );

    const html = await new Response(prelude).text();

    // React emits Helmet's <title>/<meta>/<link>/JSON-LD ahead of the app markup.
    // The prerender plugin already writes those into <head>, so drop them from the body.
    const shellStart = html.indexOf('<div class="rd-app-shell"');
    return shellStart === -1 ? html : html.slice(shellStart);
}
