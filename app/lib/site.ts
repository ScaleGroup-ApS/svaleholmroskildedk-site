// ─────────────────────────────────────────────────────────────────────────────
// Site config — single source of truth for canonical URL, NAP (Name/Address/
// Phone), geo, social profiles and other SEO constants.
//
// Everything that feeds meta tags, canonical URLs and JSON-LD structured data
// reads from here, so the business identity (NAP) stays consistent everywhere
// and canonicals no longer depend on the request host header.
// ─────────────────────────────────────────────────────────────────────────────

/** Canonical production origin. Used for canonical URLs, OG URLs, sitemap, JSON-LD @id. */
export const SITE_URL = "https://svaleholmroskilde.dk";

/** Brand name used in titles/OG. */
export const SITE_NAME = "Svaleholm Gaard Roskilde";

/** Short brand used in some UI contexts. */
export const SHORT_NAME = "Svaleholm";

/** Legal/organisation name. */
export const LEGAL_NAME = "Svaleholm Gaard";

/** Default locale. */
export const LOCALE = "da_DK";

/** Name / Address / Phone — must match the Footer, contact page and Google Business Profile verbatim. */
export const NAP = {
  streetAddress: "Frederiksborgvej 388",
  postalCode: "4000",
  addressLocality: "Roskilde",
  addressRegion: "Region Sjælland",
  addressCountry: "DK",
  telephone: "+4571531379",
  telephoneDisplay: "+45 71 53 13 79",
  email: "kontakt@svaleholmroskilde.dk",
} as const;

/**
 * Geo coordinates for the venue.
 * NOTE: taken from the contact-page Google Maps embed (Roskilde area). Verify
 * against the exact pin in the Google Business Profile before final launch.
 */
export const GEO = {
  latitude: 55.6415,
  longitude: 12.0803,
} as const;

/** Google Maps link (place). */
export const MAP_URL = "https://www.google.com/maps?q=Svaleholm+Gaard,+Frederiksborgvej+388,+4000+Roskilde";

/**
 * Public profiles for schema.org `sameAs` (strengthens entity/knowledge-graph
 * signals). Add the Google Business Profile / Facebook URL here when available.
 */
export const SAME_AS: string[] = [
  "https://www.instagram.com/svaleholmroskilde/",
  // "https://www.facebook.com/…",              // add if it exists
  // "https://www.google.com/maps/place/…",     // add the Google Business Profile place URL
];

/** Broad price range across lodging (from 650 kr) and event packages (up to 26.000 kr). */
export const PRICE_RANGE = "650–26.000 kr";

/** Areas served (local SEO). */
export const AREA_SERVED = ["Roskilde", "Sjælland", "Danmark"];

/** Max guest capacity of the festsal (event hall). */
export const MAX_GUESTS = 150;

/** Number of lodging rooms. */
export const NUMBER_OF_ROOMS = 8;

/** Default social-share image (absolute URL built via `abs()`). */
export const DEFAULT_OG_IMAGE = "/images/festsal-hvid-1.png";

/** Logo (absolute URL built via `abs()`). */
export const LOGO = "/images/logo.png";

/**
 * Real Google review numbers for AggregateRating.
 * Leave `null` until the real, verifiable figures are supplied — AggregateRating
 * is only emitted when this is set, so no fabricated rating can ship.
 */
export const RATING: { value: number; count: number } | null = null;

/**
 * CVR (Danish company reg. no.) for Organization.vatID and the privacy policy.
 * Fill in when supplied.
 */
export const VAT_ID: string | null = null;

/** Build an absolute URL from a site-relative path (leaves absolute URLs untouched). */
export function abs(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}
