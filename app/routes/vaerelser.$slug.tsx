import { redirect } from "react-router";

// Luxury room-detail pages (fabricated suites, "DKK 2.495–6.995", clawfoot
// bathtub, minibar) contradicted the "8 simple shared rooms from 650 kr"
// business. They were orphaned (not linked, not in sitemap) but reachable by
// direct URL, and noindex'd. The suite concept no longer exists, so retire
// these pages entirely (don't rewrite content). 301 to /vaerelser.
export function loader() {
  return redirect("/vaerelser", 301);
}
