import type { Route } from "./+types/fest.$slug";
import { LandingPageView } from "~/components/LandingPageView";
import { findLandingPage, landingPagePath } from "~/lib/landingPages";
import { pageMeta } from "~/lib/seo";

// Event-intent local landing pages, served at /fest/:slug.
// Content lives in app/lib/landingPages.ts (category "fest").

export function meta({ params }: Route.MetaArgs) {
  const page = findLandingPage("fest", params.slug);
  if (!page) {
    return [{ title: "Siden blev ikke fundet | Svaleholm Gaard" }, { name: "robots", content: "noindex" }];
  }
  return pageMeta({
    path: landingPagePath(page),
    title: page.metaTitle,
    description: page.metaDescription,
    image: page.image,
    imageAlt: page.imageAlt,
  });
}

export function loader({ params }: Route.LoaderArgs) {
  const page = findLandingPage("fest", params.slug);
  if (!page) throw new Response("Not Found", { status: 404 });
  return { page };
}

export default function FestLandingRoute({ loaderData }: Route.ComponentProps) {
  return <LandingPageView page={loaderData.page} />;
}
