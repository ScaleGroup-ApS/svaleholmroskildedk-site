/**
 * robots[.]txt route — served at /robots.txt
 *
 * Allows all crawlers, points to the sitemap.
 */
import type { Route } from "./+types/robots[.]txt";
import { SITE_URL } from "~/lib/site";

export function loader(_args: Route.LoaderArgs) {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    "",
    "# Post-submission confirmation page — no search value",
    "Disallow: /tak",
    "",
    "# WordPress admin — not publicly relevant",
    "Disallow: /wp-admin/",
    "Disallow: /wp-login.php",
    "Disallow: /wp-json/",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
  ].join("\n");

  return new Response(robotsTxt, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
