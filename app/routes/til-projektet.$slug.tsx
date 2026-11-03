import type { Route } from "./+types/til-projektet.$slug";
import { LandingPageView } from "~/components/LandingPageView";
import { findLandingPage, landingPagePath } from "~/lib/landingPages";
import { pageMeta } from "~/lib/seo";

// Håndværker use-case landing pages, served at /til-projektet/:slug.
// Content lives in app/lib/landingPages.ts (category "usecase").

export function meta({ params }: Route.MetaArgs) {
  const page = findLandingPage("usecase", params.slug);
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
  const page = findLandingPage("usecase", params.slug);
  if (!page) throw new Response("Not Found", { status: 404 });
  return { page };
}

export default function TilProjektetLandingRoute({ loaderData }: Route.ComponentProps) {
  return <LandingPageView page={loaderData.page} />;
}
