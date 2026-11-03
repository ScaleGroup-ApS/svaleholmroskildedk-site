// app/lib/legacyRedirects.ts
// Single source of truth for retired URLs → their 301 target. The pivot away
// from events + tourist lodging retires the whole /fest/* tree and the
// tourist-only /overnatning/* slugs; everything lands on the håndværker pillar.

/** The håndværker pillar page — the hub every retired URL redirects to. */
export const PILLAR_PATH = "/indkvartering-haandvaerkere";

/** Tourist-only lodging slugs removed from landingPages.ts (301 → pillar). */
export const RETIRED_OVERNATNING_SLUGS: ReadonlySet<string> = new Set([
  "naer-roskilde-domkirke",
  "naer-vikingeskibsmuseet",
  "naer-roskilde-festival",
  "naer-dyrskuepladsen",
  "naer-sagnlandet-lejre",
]);

/**
 * Resolve a 301 target for a retired landing-page URL, or null if the URL is
 * still a live page. All /fest/* URLs are retired (events are gone).
 */
export function redirectTargetFor(
  category: "overnatning" | "fest",
  slug: string | undefined,
): string | null {
  if (category === "fest") return PILLAR_PATH;
  if (slug && RETIRED_OVERNATNING_SLUGS.has(slug)) return PILLAR_PATH;
  return null;
}
