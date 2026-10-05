import type { Config } from "@react-router/dev/config";
import { SITE_URL } from "./app/lib/site";

const CANONICAL_HOST = new URL(SITE_URL).host;

export default {
  // SSR enabled — pages are server-rendered with loader data from WP-REST API
  ssr: true,
  // React Router 8 guards action (form POST) submissions: if the browser `Origin`
  // header's host differs from the server-seen `new URL(request.url).host` and is
  // not allow-listed here, the request is treated as a CSRF attempt and rejected
  // with 400 before the action runs. Behind the production proxy the pod sees an
  // internal host, so genuine same-origin submissions from the public domain fail
  // (the contact form returned 400 → the error boundary's generic "Oops!" page).
  // Allow-list the canonical public host(s). `www` 301-redirects to the apex, but
  // keep it listed defensively.
  allowedActionOrigins: [CANONICAL_HOST, `www.${CANONICAL_HOST}`],
} satisfies Config;
