// app/routes/fest.$slug.tsx
// Events are retired. Every legacy /fest/<slug> URL 301s to the håndværker
// pillar so Google's indexed event URLs keep their link equity instead of 404.
import { redirect } from "react-router";
import { PILLAR_PATH } from "~/lib/legacyRedirects";

export function loader() {
  return redirect(PILLAR_PATH, 301);
}
