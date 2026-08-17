import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("vaerelser", "routes/vaerelser.tsx"),
  route("vaerelser/:slug", "routes/vaerelser.$slug.tsx"),
  route("tjenester", "routes/tjenester.tsx"),
  route("priser", "routes/priser.tsx"),
  route("inspiration", "routes/inspiration.tsx"),
  route("galleri", "routes/galleri.tsx"),
  route("kontakt", "routes/kontakt.tsx"),
  // The kontakt action redirects here on success. Without this entry /tak fell
  // through to the "*" catch-all, which looks for a WordPress page of that
  // slug and 404s — so every successful enquiry landed on a 404.
  route("tak", "routes/tak.tsx"),
  // Linked from the Footer on every page — unregistered it 404'd site-wide.
  route("privatlivspolitik", "routes/privatlivspolitik.tsx"),
  route("robots.txt", "routes/robots[.]txt.tsx"),
  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
