import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile — the CAPTCHA layer for the contact form.
 *
 * Renders nothing unless a site key is passed, so the form is unchanged until
 * TURNSTILE_SITE_KEY / TURNSTILE_SECRET_KEY are provisioned. Turnstile is
 * usually invisible: most visitors see a short "verifying" line and never
 * click anything, and it sets no tracking cookies (GDPR-friendly, which
 * reCAPTCHA is not).
 *
 * The widget writes a `cf-turnstile-response` field into the surrounding
 * <form>; app/lib/antispam.server.ts verifies it server-side.
 *
 * Rendered explicitly rather than via the `cf-turnstile` class, because the
 * implicit scan only runs at script load — it would miss the form when the
 * page is reached through a client-side navigation.
 */

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string | undefined;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise: Promise<void> | null = null;

function loadTurnstile(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    const el = existing ?? document.createElement("script");
    el.addEventListener("load", () => resolve());
    el.addEventListener("error", () => reject(new Error("turnstile script failed to load")));
    if (!existing) {
      el.src = SCRIPT_SRC;
      el.async = true;
      el.defer = true;
      document.head.appendChild(el);
    }
  }).catch((err) => {
    // Let a later mount retry rather than caching the failure forever.
    scriptPromise = null;
    throw err;
  });
  return scriptPromise;
}

export function Turnstile({
  siteKey,
  lang,
  resetKey,
  className,
}: {
  /** Public site key. Falsy renders nothing. */
  siteKey?: string | null;
  /** "da" | "en" — matches the widget's copy to the page. */
  lang?: string;
  /** Change this to force a fresh challenge (tokens are single-use). */
  resetKey?: unknown;
  className?: string;
}) {
  const holder = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;

    loadTurnstile()
      .then(() => {
        if (cancelled || !holder.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(holder.current, {
          sitekey: siteKey,
          theme: "dark",
          language: lang === "en" ? "en" : "da",
          action: "kontakt",
        });
      })
      .catch((err) => {
        // The server fails open when Cloudflare is unreachable, so a blocked
        // script must not block the form either.
        console.warn("[turnstile]", err);
      });

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = undefined;
      }
    };
  }, [siteKey, lang]);

  // A token is spent on submit; after a rejected submission, get a new one.
  useEffect(() => {
    if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
  }, [resetKey]);

  if (!siteKey) return null;
  return <div ref={holder} className={className} />;
}
