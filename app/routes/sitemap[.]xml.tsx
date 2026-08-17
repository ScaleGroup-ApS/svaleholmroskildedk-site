/**
 * sitemap[.]xml route — served at /sitemap.xml
 *
 * Dynamically generates an XML sitemap from all published WordPress pages.
 */
import type { Route } from "./+types/sitemap[.]xml";
import { getPages, getPosts } from "~/lib/wp-api";

export async function loader({ request }: Route.LoaderArgs) {
  const siteUrl = new URL(request.url).origin;

  // Fetch all published pages and posts from WordPress
  const [pages, posts] = await Promise.all([
    getPages({ per_page: 100 }).catch(() => []),
    getPosts({ per_page: 100 }).catch(() => []),
  ]);

  const urls: Array<{ loc: string; lastmod: string; priority: string; changefreq: string }> = [];

  // Homepage
  urls.push({
    loc: siteUrl,
    lastmod: new Date().toISOString().split("T")[0],
    priority: "1.0",
    changefreq: "daily",
  });

  // Faste sider i appen. De findes ikke i WordPress, så uden dem manglede
  // hele sitet på nær forsiden i sitemap'et.
  const today = new Date().toISOString().split("T")[0];
  const STATIC_PATHS: Array<{ path: string; priority: string; changefreq: string }> = [
    { path: "/tjenester", priority: "0.9", changefreq: "weekly" },
    { path: "/vaerelser", priority: "0.9", changefreq: "weekly" },
    { path: "/inspiration", priority: "0.8", changefreq: "weekly" },
    { path: "/priser", priority: "0.8", changefreq: "weekly" },
    { path: "/galleri", priority: "0.7", changefreq: "monthly" },
    { path: "/kontakt", priority: "0.7", changefreq: "monthly" },
    { path: "/privatlivspolitik", priority: "0.2", changefreq: "yearly" },
  ];
  for (const s of STATIC_PATHS) {
    urls.push({ loc: `${siteUrl}${s.path}`, lastmod: today, priority: s.priority, changefreq: s.changefreq });
  }

  // Pages
  for (const page of pages) {
    if (page.status !== "publish") continue;
    urls.push({
      loc: `${siteUrl}/${page.slug}`,
      lastmod: page.modified_gmt.split("T")[0],
      priority: "0.8",
      changefreq: "weekly",
    });
  }

  // Posts
  for (const post of posts) {
    if (post.status !== "publish") continue;
    urls.push({
      loc: `${siteUrl}/${post.slug}`,
      lastmod: post.modified_gmt.split("T")[0],
      priority: "0.6",
      changefreq: "monthly",
    });
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      (u) =>
        `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    ),
    "</urlset>",
  ].join("\n");

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
