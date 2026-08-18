import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { ReactNode } from "react";
import type { Route } from "./+types/root";
import { LanguageProvider } from "~/lib/i18n";
import { JsonLd } from "~/components/JsonLd";
import { siteGraph } from "~/lib/schema";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Karla:wght@300;400;500;600;700&display=swap",
  },
  // Favicons — reuse the existing logo assets. A dedicated favicon.ico and a
  // 180×180 apple-touch-icon PNG would be ideal to add to /public later.
  { rel: "icon", href: "/images/logo.svg", type: "image/svg+xml" },
  { rel: "icon", href: "/images/logo.png", type: "image/png" },
  { rel: "apple-touch-icon", href: "/images/logo.png" },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="da">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0F1714" />
        <Meta />
        <Links />
        {/* Site-wide structured data: Organization + WebSite + LocalBusiness/EventVenue.
            Per-page JSON-LD references these nodes by @id. */}
        <JsonLd data={siteGraph()} />
        {/* Matomo */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
  var _paq = window._paq = window._paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="https://scaleweb.matomo.cloud/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '11']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src='https://cdn.matomo.cloud/scaleweb.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
  })();
            `.trim(),
          }}
        />
        {/* End Matomo Code */}
      </head>
      <body className="min-h-screen bg-surface text-text antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Outlet />
    </LanguageProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "Der opstod en uventet fejl.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : `Fejl ${error.status}`;
    details =
      error.status === 404
        ? "Siden blev ikke fundet."
        : error.statusText || details;
  } else if (error instanceof Error) {
    if (import.meta.env.DEV) {
      details = error.message;
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center" style={{ background: "#0F1714" }}>
      <div className="text-center max-w-md mx-auto px-6 py-16">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: "rgba(201,169,106,0.12)" }}>
            <svg
              className="w-10 h-10"
              style={{ color: "#C9A96A" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="heading-section mb-3" style={{ color: "#F2EFE7" }}>{message}</h1>
          <p className="text-lg" style={{ color: "rgba(242,239,231,0.7)" }}>{details}</p>
        </div>
        <a href="/" className="btn-primary">
          Gå til forsiden
        </a>
      </div>
    </main>
  );
}
