# Håndværker-pivot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-position svaleholmroskilde.dk from festsal/events + tourist lodging to a single product — B2B accommodation for tradespeople (håndværkere) on construction projects near Roskilde.

**Architecture:** Lean re-positioning on the existing React Router 8 (SSR) app. Remove the event business (routes, landing pages, price-calculator flow, schema nodes), retarget the retained lodging pages and data from tourist→project intent, add a pillar page + use-case landing pages, and rebuild the SEO/GEO layer (schema, llms.txt, pricing.md). Legacy URLs 301-redirect so link equity is preserved.

**Tech Stack:** React Router 8 (framework mode, SSR), React 19, TypeScript, TailwindCSS 4, Framer Motion, Bun (lockfile) / npm scripts, Node ≥ 22.

## Global Constraints

- **Verification cadence (this repo has no working unit-test runner — see note).** Each task's gate is, in order: `npm run typecheck` → `npm run build` (for any task touching routes/components/schema) → a `grep` assertion that the change landed and no removed term remains → commit. Visual/page tasks additionally require a manual render check (dev server) before commit.
- **Why not TDD unit tests:** the single existing test (`tests/contact-spam.test.ts`) does not run under the installed Node 24 (extensionless ESM import) and there is no `test` npm script. This is a content/data/SEO pivot; TypeScript + build + grep + render are the reliable gates. Do **not** add a test framework — out of scope.
- **Canonical language:** Danish. `meta*`, `jsonLd*`, `breadcrumbLabel`, llms.txt and pricing.md are Danish-only. Body copy carries DA + EN via the existing `t(da, en)` / `*Da`/`*En` pattern.
- **Never fabricate facts.** The following are UNVERIFIED (spec §9) and must NOT be asserted as fact anywhere until the user confirms them: washing machine, wifi speed, van/trailer parking, tool/material storage space, driving times/distances to specific towns, whole-house price. Where copy needs them, use the confirmed-facts set below or phrase as a question/offer ("spørg om parkering til varevogne"), never a claim. Each task that would use one flags it inline.
- **Confirmed facts (safe to state):** address Frederiksborgvej 388, 4000 Roskilde; up to 8 simple rooms; shared kitchen, 4 shared baths/toilets, shared lounge; digital self check-in via door code; 650 kr per overnatning incl. moms; **minimum 4 nætter**; hele huset kan lejes; skræddersyede aftaler; fakturabetaling mod CVR.
- **Pricing copy:** always "650 kr pr. overnatning" + "min. 4 nætter" + "inkl. moms". Remove all event prices (1.800 / 9.000 / 15.000 / 26.000).
- **Brand name unchanged:** "Svaleholm Gaard Roskilde" (`SITE_NAME`), NAP unchanged.
- **Removed URL policy:** every retired URL returns HTTP 301 to `/indkvartering-haandvaerkere` (events/tourist) or its new home. No new 404s.
- **Commits:** frequent, one per task minimum. Work on branch `feat/haandvaerker-pivot` (already created; the design spec is committed there).

---

## File Structure

**Create:**
- `app/lib/legacyRedirects.ts` — map + resolver for retired slugs → 301 targets.
- `app/routes/indkvartering-haandvaerkere.tsx` — the pillar page (category hub).
- `public/pricing.md` — machine-readable pricing for AI agents.

**Modify:**
- `app/routes.ts` — drop `fest/:slug` as a content route (repurpose to redirect), add pillar route.
- `app/routes/fest.$slug.tsx` — becomes a generic 301 → pillar.
- `app/routes/overnatning.$slug.tsx` — honor redirect map before lookup.
- `app/lib/landingPages.ts` — remove "fest" category + entries, remove tourist-only entries, retarget retained entries, add use-case entries, update shared FAQ constants.
- `app/lib/site.ts` — pricing/area/image/night constants.
- `app/lib/schema.ts` — drop EventVenue + event nodes, update lodging + services.
- `app/components/Prisberegner.tsx` — remove the Fest flow, keep the Ophold flow with min. 4 nights.
- `app/routes/index.tsx` — homepage copy/meta/hero/services/CTA pivot.
- `app/routes/vaerelser.tsx`, `app/routes/tjenester.tsx`, `app/routes/priser.tsx`, `app/routes/kontakt.tsx` — copy pivot; kontakt gets firma/CVR fields.
- `app/routes/llms[.]txt.tsx` — full rewrite.
- `app/routes/inspiration.tsx` — remove event framing/FAQ (sweep).

**Auto-updated (no direct edit needed, verify only):** `app/routes/sitemap[.]xml.tsx` and `app/routes/llms[.]txt.tsx` read `landingPages.ts` helpers, so removed entries drop out automatically.

---

### Task 1: Legacy URL redirects (301)

Retire the event route and tourist-only lodging slugs without creating 404s. The pillar path they target (`/indkvartering-haandvaerkere`) is created in Task 9; a 301 to a not-yet-live path still typechecks and builds — redirect **targets** are verified in Task 12.

**Files:**
- Create: `app/lib/legacyRedirects.ts`
- Modify: `app/routes/fest.$slug.tsx` (whole file → redirect)
- Modify: `app/routes/overnatning.$slug.tsx:23-27` (loader)
- Modify: `app/routes.ts` (comment on the repurposed fest route)

**Interfaces:**
- Produces: `PILLAR_PATH: "/indkvartering-haandvaerkere"`, `RETIRED_OVERNATNING_SLUGS: ReadonlySet<string>`, `redirectTargetFor(category: "overnatning" | "fest", slug: string | undefined): string | null`.
- Consumes: nothing.

- [ ] **Step 1: Create the redirect module**

```ts
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
```

- [ ] **Step 2: Turn `fest.$slug.tsx` into a generic 301**

Replace the entire file with:

```tsx
// app/routes/fest.$slug.tsx
// Events are retired. Every legacy /fest/<slug> URL 301s to the håndværker
// pillar so Google's indexed event URLs keep their link equity instead of 404.
import { redirect } from "react-router";
import { PILLAR_PATH } from "~/lib/legacyRedirects";

export function loader() {
  return redirect(PILLAR_PATH, 301);
}
```

- [ ] **Step 3: Honor the redirect map in `overnatning.$slug.tsx`**

In `app/routes/overnatning.$slug.tsx`, add the import and a redirect check at the top of `loader` (before `findLandingPage`):

```tsx
import { redirect } from "react-router";
import { redirectTargetFor } from "~/lib/legacyRedirects";
// ...
export function loader({ params }: Route.LoaderArgs) {
  const target = redirectTargetFor("overnatning", params.slug);
  if (target) throw redirect(target, 301);
  const page = findLandingPage("overnatning", params.slug);
  if (!page) throw new Response("Not Found", { status: 404 });
  return { page };
}
```

- [ ] **Step 4: Update the `fest/:slug` comment in `routes.ts`**

Change the comment above `route("fest/:slug", "routes/fest.$slug.tsx")` to: `// Retired event URLs — loader 301s every /fest/* to the håndværker pillar.`

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck`
Expected: PASS (no type errors).

- [ ] **Step 6: Build**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 7: Commit**

```bash
git add app/lib/legacyRedirects.ts app/routes/fest.\$slug.tsx app/routes/overnatning.\$slug.tsx app/routes.ts
git commit -m "feat(routing): 301 retired event + tourist lodging URLs to pillar"
```

---

### Task 2: Retarget the data layer (`landingPages.ts`)

Remove the event category and all event entries, remove the tourist-only lodging entries (now redirected), retarget the retained area pages to håndværker intent, add the use-case pages, and rewrite the shared FAQ constants for a B2B audience.

**Files:**
- Modify: `app/lib/landingPages.ts`

**Interfaces:**
- Consumes: `RETIRED_OVERNATNING_SLUGS` (Task 1) — the slugs removed here must match that set exactly.
- Produces: `LANDING_PAGES` with `category: "overnatning" | "usecase"` only; retained slugs `naer-lejre`, `naer-holbaek`, `naer-koege`, `naer-hvalsoe`, `naer-frederikssund`; new slugs `mandskabsindkvartering-roskilde`, `skurby-alternativ`, `hele-huset-til-sjak`, `langtidsleje-haandvaerkere`. `LandingCategory = "overnatning" | "usecase"`.

- [ ] **Step 1: Narrow the category union**

Change line 20: `export type LandingCategory = "overnatning" | "fest";` → `export type LandingCategory = "overnatning" | "usecase";`

Update the `serviceName`/`serviceDescription` doc comment (line 51) from "For category 'fest'" to "For category 'usecase' → an håndværkerService node".

- [ ] **Step 2: Rewrite the shared FAQ constants for B2B**

Replace `FAQ_ROOMS` (lines 80-85) and add two new shared B2B FAQs. Keep `FAQ_LOCATION` and `FAQ_CHECKIN` as-is (facts unchanged).

```ts
const FAQ_ROOMS: FaqItem = {
  qDa: "Hvor mange håndværkere kan bo her?",
  qEn: "How many tradespeople can stay here?",
  aDa: "Der er op til 8 enkle værelser med fælles køkken, bad og opholdsrum – plads til et helt sjak. Hele huset kan lejes eksklusivt til ét firma. Overnatning koster 650 kr pr. nat inkl. moms, min. 4 nætter.",
  aEn: "There are up to 8 simple rooms with a shared kitchen, bath and lounge – room for a whole crew. The whole house can be rented exclusively to one company. A stay is DKK 650 per night incl. VAT, minimum 4 nights.",
};
const FAQ_INVOICE: FaqItem = {
  qDa: "Kan I fakturere firmaet mod CVR?",
  qEn: "Can you invoice the company?",
  aDa: "Ja. Vi laver en fast aftale og fakturerer virksomheden mod CVR, så administrationen er enkel for byggelederen.",
  aEn: "Yes. We set up a fixed agreement and invoice the company, so administration is simple for the site manager.",
};
const FAQ_WHOLE_HOUSE: FaqItem = {
  qDa: "Kan vi leje hele gården til sjakket?",
  qEn: "Can we rent the whole place for the crew?",
  aDa: "Ja. Hele huset kan lejes eksklusivt, så sjakket bor samlet. Vi laver en skræddersyet aftale ud fra antal mand og periode.",
  aEn: "Yes. The whole house can be rented exclusively so the crew stays together. We tailor the agreement to crew size and period.",
};
```

- [ ] **Step 3: Delete the tourist-only + all event entries**

Remove these entries from `LANDING_PAGES` entirely:
- Tourist-only overnatning (now 301'd): `naer-roskilde-domkirke`, `naer-vikingeskibsmuseet`, `naer-roskilde-festival`, `naer-dyrskuepladsen`, `naer-sagnlandet-lejre`.
- All `category: "fest"` entries: `bryllup-naer-roskilde`, `konfirmation-naer-roskilde`, `rund-foedselsdag-naer-roskilde`, `firmafest-naer-roskilde`, `barnedaab-naer-roskilde`, `mindesammenkomst-naer-roskilde`, `julefrokost-naer-roskilde`, `polterabend-naer-roskilde`, `reception-naer-roskilde`, `firmatur-naer-roskilde`.

- [ ] **Step 4: Retarget the 5 retained area pages**

For each of `naer-lejre`, `naer-holbaek`, `naer-koege`, `naer-hvalsoe`, `naer-frederikssund`, rewrite the SEO fields to håndværker intent. Use the exact field values below for `naer-lejre`; apply the same structure to the other four, swapping the town name and its construction context (do NOT state driving distances — unverified). Keep `image`/`imageAlt` pointing at existing non-event assets (`natur-eng.jpg`, `bygning-have.jpg`, `gaardsplads.jpg`, `vaerelse-seng.jpg`).

`naer-lejre` fields:
```ts
metaTitle: "Indkvartering til håndværkere nær Lejre | Svaleholm Gaard",
metaDescription:
  "Bygge- eller renoveringsprojekt i Lejre-området? Svaleholm Gaard udlejer indkvartering til håndværkere ved Roskilde – op til 8 værelser, fælles køkken, fakturabetaling. 650 kr/nat, min. 4 nætter.",
heroEyebrowDa: "Håndværkerindkvartering nær Lejre",
heroEyebrowEn: "Tradesperson lodging near Lejre",
h1Da: "Indkvartering til håndværkere nær Lejre",
h1En: "Accommodation for tradespeople near Lejre",
heroSubDa:
  "Et roligt, praktisk sted for sjak på projekt i Lejre-området – enkle værelser med fælles køkken, nem selvcheck-in og fakturabetaling til firmaet.",
heroSubEn:
  "A quiet, practical base for crews on a project in the Lejre area – simple rooms with a shared kitchen, easy self check-in and company invoicing.",
jsonLdName: "Indkvartering til håndværkere nær Lejre",
jsonLdDescription:
  "Svaleholm Gaard udlejer enkle værelser til håndværkere på projekt nær Lejre og Roskilde. Fælles køkken, fakturabetaling, 650 kr pr. nat, min. 4 nætter.",
breadcrumbLabel: "Håndværkere nær Lejre",
faqs: [FAQ_LOCATION, FAQ_ROOMS, FAQ_INVOICE, FAQ_WHOLE_HOUSE, FAQ_CHECKIN],
relatedSlugs: ["naer-holbaek", "mandskabsindkvartering-roskilde", "hele-huset-til-sjak"],
```
For the two `intro` sections, write ~80-110 word DA + EN each: section 1 = "crews on a project near [town]" (why a real base beats skurvogn — kitchen, lounge, rest), section 2 = "simple, flexible, invoiced" (rooms/shared facilities, self check-in, 650 kr/nat min. 4 nætter, invoice to company, whole house possible). **Only use confirmed facts.** Rewrite `highlightsDa`/`highlightsEn` to: rural practical base near [town]; up to 8 rooms from 650 kr/nat incl. moms, min. 4 nights; shared kitchen/bath/lounge; digital self check-in; invoicing to company (CVR).

Per-town context for the other four (construction/commute angle, no distances):
- `naer-holbaek`: projekter langs Holbæk/Roskilde-korridoren; relatedSlugs `["naer-lejre","naer-koege","langtidsleje-haandvaerkere"]`.
- `naer-koege`: store anlægs- og boligprojekter i Køge-området; relatedSlugs `["naer-roskilde?no" → use "mandskabsindkvartering-roskilde","naer-hvalsoe","hele-huset-til-sjak"]` → use `["mandskabsindkvartering-roskilde","naer-hvalsoe","hele-huset-til-sjak"]`.
- `naer-hvalsoe`: projekter i Hvalsø/Lejre kommune; relatedSlugs `["naer-lejre","naer-koege","skurby-alternativ"]`.
- `naer-frederikssund`: byudvikling og byggeri omkring Frederikssund; relatedSlugs `["naer-holbaek","mandskabsindkvartering-roskilde","langtidsleje-haandvaerkere"]`.

- [ ] **Step 5: Add the four use-case pages**

Append four `category: "usecase"` entries. Full SEO fields below; write the two intro sections (~80-110 words DA+EN) per the brief, confirmed facts only. All four share `faqs: [FAQ_ROOMS, FAQ_INVOICE, FAQ_WHOLE_HOUSE, FAQ_CHECKIN, FAQ_LOCATION]` and set `serviceName`/`serviceDescription` for the schema Service node.

1. `mandskabsindkvartering-roskilde`
```ts
metaTitle: "Mandskabsindkvartering i Roskilde | Svaleholm Gaard",
metaDescription: "Indkvartering af mandskab og håndværkere i Roskilde-området. Op til 8 værelser eller hele huset til sjakket, fælles køkken, fakturabetaling. 650 kr/nat, min. 4 nætter.",
h1Da: "Mandskabsindkvartering i Roskilde-området",
h1En: "Crew accommodation in the Roskilde area",
serviceName: "Mandskabsindkvartering",
serviceDescription: "Indkvartering af håndværkere og mandskab på projekt i Roskilde-området – enkeltværelser eller hele huset, fakturabetaling.",
relatedSlugs: ["hele-huset-til-sjak","langtidsleje-haandvaerkere","naer-koege"],
```
Intro brief: (1) who it's for — entrepreneur/byggeleder housing 2-8 mand near a Roskilde-area site; (2) how it works — single rooms per person or whole house, 650 kr/nat min. 4 nætter, invoice to CVR, self check-in.

2. `skurby-alternativ`
```ts
metaTitle: "Alternativ til skurvogn og skurby | Svaleholm Gaard Roskilde",
metaDescription: "Et bedre alternativ til skurvogn: rigtige værelser med køkken, bad og opholdsrum til håndværkere nær Roskilde. 650 kr/nat, min. 4 nætter, fakturabetaling.",
h1Da: "Et alternativ til skurvogn og skurby",
h1En: "An alternative to site cabins",
serviceName: "Alternativ til skurvogn",
serviceDescription: "Fast indkvartering med køkken, bad og opholdsrum som alternativ til skurvogn/skurby for håndværkere nær Roskilde.",
relatedSlugs: ["mandskabsindkvartering-roskilde","hele-huset-til-sjak","naer-hvalsoe"],
```
Intro brief: (1) the problem with skurvogne for longer projects (comfort, rest, cooking) — frame as benefits of a real house, no disparagement claims that need data; (2) what Svaleholm offers instead, confirmed facts + 650 kr/nat min. 4 nætter + invoicing.

3. `hele-huset-til-sjak`
```ts
metaTitle: "Lej hele huset til sjakket | Svaleholm Gaard Roskilde",
metaDescription: "Lej hele gården eksklusivt til dit sjak nær Roskilde – op til 8 værelser, fælles køkken og opholdsrum. Skræddersyet aftale, fakturabetaling, min. 4 nætter.",
h1Da: "Lej hele huset til sjakket",
h1En: "Rent the whole house for your crew",
serviceName: "Hele huset til ét sjak",
serviceDescription: "Eksklusiv leje af hele gården til ét firmas sjak nær Roskilde, skræddersyet aftale efter antal mand og periode.",
relatedSlugs: ["mandskabsindkvartering-roskilde","langtidsleje-haandvaerkere","naer-lejre"],
```
Intro brief: (1) crew stays together, exclusive use, up to 8 rooms + shared kitchen/lounge; (2) tailored agreement by crew size/period, invoicing, self check-in, 650 kr/nat baseline. **Do NOT state a whole-house total price (unverified).**

4. `langtidsleje-haandvaerkere`
```ts
metaTitle: "Langtidsleje til håndværkere nær Roskilde | Svaleholm Gaard",
metaDescription: "Langvarigt bygge- eller renoveringsprojekt? Langtidsindkvartering til håndværkere nær Roskilde med fælles køkken og fakturabetaling. Fra 650 kr/nat, skræddersyet aftale.",
h1Da: "Langtidsleje til håndværkere på projekt",
h1En: "Long-stay lodging for tradespeople",
serviceName: "Langtidsleje til håndværkere",
serviceDescription: "Langtidsindkvartering til håndværkere på længerevarende projekter nær Roskilde, skræddersyet aftale og fakturabetaling.",
relatedSlugs: ["mandskabsindkvartering-roskilde","hele-huset-til-sjak","naer-frederikssund"],
```
Intro brief: (1) for projects running weeks/months — a stable base near the site; (2) tailored long-stay agreement, 650 kr/nat baseline min. 4 nætter, invoicing, self check-in.

- [ ] **Step 5b: Wire up `usecase` routing + retarget `LandingPageView`**

Narrowing `LandingCategory` to `"overnatning" | "usecase"` breaks `app/components/LandingPageView.tsx`, which branches on `"fest"`. Update it and add a route so `usecase` pages are reachable.

1. `app/lib/landingPages.ts` — `landingPagePath`: map `usecase` → `/til-projektet/${slug}`, keep `overnatning` → `/overnatning/${slug}`:
   ```ts
   export function landingPagePath(p: Pick<LandingPage, "category" | "slug">): string {
     const prefix = p.category === "usecase" ? "til-projektet" : "overnatning";
     return `/${prefix}/${p.slug}`;
   }
   ```
2. Create `app/routes/til-projektet.$slug.tsx` — mirror `overnatning.$slug.tsx` but `findLandingPage("usecase", params.slug)` (no redirect check needed; usecase slugs are all new). Same meta/loader/component shape.
3. `app/routes.ts` — register `route("til-projektet/:slug", "routes/til-projektet.$slug.tsx"),` directly below the `overnatning/:slug` line (above the `*` catch-all).
4. `app/components/LandingPageView.tsx` — replace every `"fest"` branch with `"usecase"`:
   - Import `haandvaerkerServiceNodes` instead of `eventServiceNodes`.
   - `buildJsonLd`: breadcrumb 2nd crumb for non-overnatning → `{ name: "Håndværkerindkvartering", path: "/indkvartering-haandvaerkere" }`; the service branch → `haandvaerkerServiceNodes([{ name: page.serviceName, description: page.serviceDescription }])`.
   - `pillarHref`/`pillarLabel`: non-overnatning → `/indkvartering-haandvaerkere`, label `t("Se håndværkerindkvartering","See tradesperson lodging")`.
   - Intro CTA button label: non-overnatning → `t("Få et tilbud til sjakket","Get a quote for your crew")`.
   - "Se også" heading non-overnatning → `t("indkvartering til projektet","lodging for the project")`.
   - `FaqSection` eyebrow non-overnatning → `"Til projektet"` / `"For the project"`.
   - Bottom CTA section (currently "Lad os fejre sammen") → pivot to håndværker: eyebrow `t("Klar til at booke til sjakket?","Ready to book for the crew?")`, H2 `t("Lad os finde en ","Let's find an ")`+accent `t("aftale","agreement")`, body a B2B line (quote by crew size/period, invoicing — confirmed facts only). Keep phone CTA. This section renders on ALL landing pages, so it must be de-evented here.

- [ ] **Step 6: Typecheck + build**

Run: `npm run typecheck` → PASS, then `npm run build` → PASS. (With Task 4 already merged, schema exports align; `eventServiceNodes` is no longer imported by `LandingPageView` after this task — it remains only in `priser.tsx`/`tjenester.tsx` until Tasks 10/11.)

- [ ] **Step 7: Grep assertions**

```bash
grep -n '"fest"' app/lib/landingPages.ts || echo "OK: no fest category"
grep -nE 'bryllup|konfirmation|festsal|polterabend' app/lib/landingPages.ts || echo "OK: no event copy"
grep -nE 'naer-vikingeskibsmuseet|naer-roskilde-festival|naer-dyrskuepladsen' app/lib/landingPages.ts || echo "OK: tourist-only removed"
```
Expected: all three print their OK line.

- [ ] **Step 8: Commit**

```bash
git add app/lib/landingPages.ts
git commit -m "feat(content): retarget landing pages to håndværker intent; add use-case pages"
```

---

### Task 3: Pivot site constants (`site.ts`)

**Files:**
- Modify: `app/lib/site.ts`

**Interfaces:**
- Produces: `PRICE_RANGE = "650 kr/nat"`, `NIGHTLY_PRICE = 650`, `MIN_NIGHTS = 4`, `DEFAULT_OG_IMAGE` pointing at a non-event image. Removes reliance on `MAX_GUESTS` for event framing (keep export only if still referenced after Task 4/5; otherwise remove).

- [ ] **Step 1: Edit the constants**

```ts
export const PRICE_RANGE = "650 kr/nat";
export const NIGHTLY_PRICE = 650;
export const MIN_NIGHTS = 4;
export const DEFAULT_OG_IMAGE = "/images/gaardsplads.jpg";
```
Update the `PRICE_RANGE` doc comment to: `/** Nightly lodging price (from 650 kr). */`. Update `DEFAULT_OG_IMAGE` comment accordingly. Keep `NUMBER_OF_ROOMS = 8`. Narrow `AREA_SERVED` to `["Roskilde", "Lejre", "Køge", "Holbæk", "Frederikssund"]`.

- [ ] **Step 2: Handle `MAX_GUESTS`**

`MAX_GUESTS` is consumed by `schema.ts` (`maximumAttendeeCapacity`) and `llms[.]txt.tsx`, both rewritten in Tasks 4 and 6. Leave the `MAX_GUESTS` export in place for now (removing it now breaks typecheck); Task 4 and Task 6 remove the last references, and Task 12 deletes the now-unused export. Add a comment: `// Deprecated after event removal — last refs cleared in Task 4/6, export removed in Task 12.`

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add app/lib/site.ts
git commit -m "feat(seo): pivot site constants to nightly lodging pricing and area"
```

---

### Task 4: Rebuild schema.org graph (`schema.ts`)

Drop the `EventVenue` type and all event nodes; model the business as lodging only; add håndværker `Service` nodes and tighten the lodging offer to reflect min. 4 nætter.

**Files:**
- Modify: `app/lib/schema.ts`

**Interfaces:**
- Consumes: `NIGHTLY_PRICE`, `MIN_NIGHTS`, `NUMBER_OF_ROOMS`, `AREA_SERVED` (site.ts).
- Produces: `localBusinessNode()` of `@type ["LodgingBusiness","LocalBusiness"]` (no EventVenue, no `maximumAttendeeCapacity`); removes `eventOfferCatalogNode` and `eventServiceNodes`; `lodgingNode()` with min-4-nights offer; new `haandvaerkerServiceNodes(services)`.

- [ ] **Step 1: Narrow the business node**

In `localBusinessNode()` (lines 86-122): change `"@type": ["LocalBusiness", "EventVenue"]` → `"@type": ["LodgingBusiness", "LocalBusiness"]`; remove the `maximumAttendeeCapacity: MAX_GUESTS` line; change default `image` from `/images/festsal-hvid-1.png` to `/images/gaardsplads.jpg`. Remove `MAX_GUESTS` from the import block.

- [ ] **Step 2: DEFER deletion of event node builders**

`eventOfferCatalogNode()` and `eventServiceNodes()` are still imported by `LandingPageView.tsx`, `priser.tsx` and `tjenester.tsx`, which are migrated only in Tasks 10/11. Deleting them now breaks typecheck. **Keep both functions as (soon-to-be) dead code** with a comment `// Deprecated — event business retired; consumers removed in Tasks 10/11, delete in Task 12.` Their actual deletion happens in Task 12 Step 2b, after their consumers are gone.

- [ ] **Step 3: Add håndværker service builder**

Add in their place:

```ts
/** Service nodes for håndværker lodging use-cases (from landingPages usecase entries). */
export function haandvaerkerServiceNodes(
  services: Array<{ name: string; description: string }>,
): Node[] {
  return services.map((s) => ({
    "@type": "Service",
    name: s.name,
    description: s.description,
    serviceType: s.name,
    provider: { "@id": BUSINESS_ID },
    areaServed: AREA_SERVED,
    audience: { "@type": "Audience", audienceType: "Byggefirmaer og håndværkere" },
  }));
}
```

- [ ] **Step 4: Tighten the lodging offer**

In `lodgingNode()`, update `price`/offer wording and add the minimum-nights signal. Replace the `makesOffer` block's `priceSpecification` with one that carries the 4-night eligible range, and update `description` default handling:

```ts
    priceRange: "fra 650 kr/nat",
    numberOfRooms: NUMBER_OF_ROOMS,
    // ...
    makesOffer: {
      "@type": "Offer",
      name: "Indkvartering til håndværkere pr. værelse pr. nat",
      price: String(NIGHTLY_PRICE),
      priceCurrency: "DKK",
      availability: "https://schema.org/InStock",
      eligibleDuration: {
        "@type": "QuantitativeValue",
        minValue: MIN_NIGHTS,
        unitCode: "DAY",
      },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: String(NIGHTLY_PRICE),
        priceCurrency: "DKK",
        unitCode: "DAY",
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "DAY" },
      },
    },
```
Update the `amenityFeature` list to keep only confirmed facts: fælles opholdsrum, fælles bad og toilet (4 stk.), fælles køkken, selvcheck-in. **Do not add parkering/vaskemaskine/wifi (unverified).** Import `NIGHTLY_PRICE` and `MIN_NIGHTS` from `./site`.

- [ ] **Step 5: Point the usecase routes at the service builder**

(Consumed in Task 9's pillar page.) No change needed here beyond the export existing.

- [ ] **Step 6: Typecheck + build + grep**

Run: `npm run typecheck` → PASS. `npm run build` → PASS.
```bash
grep -nE 'EventVenue|eventOfferCatalog|eventServiceNodes|maximumAttendeeCapacity|festsal' app/lib/schema.ts || echo "OK: schema de-evented"
```
Expected: prints OK line.

- [ ] **Step 7: Commit**

```bash
git add app/lib/schema.ts
git commit -m "feat(seo): model business as lodging-only schema; drop event nodes"
```

---

### Task 5: Remove the Fest flow from `Prisberegner.tsx`

The price calculator has two flows (Ophold + Fest). Keep Ophold (retarget to min. 4 nætter), delete Fest.

**Files:**
- Modify: `app/components/Prisberegner.tsx`

**Interfaces:**
- Produces: `ROOM_PRICE_PER_NIGHT = 650`, `MIN_NIGHTS = 4`, `MAX_ROOMS = 8`. Removes `SAL_PRICE`, `MIN_GUESTS_FESTSAL`, `MAX_GUESTS_FESTSAL` and all festsal UI.

- [ ] **Step 1: Read the file fully** to map the two flows (the Ophold calculator vs. the Fest calculator, the tab/toggle between them, and every festsal constant/subcomponent).

- [ ] **Step 2: Delete festsal constants** (`SAL_PRICE`, `MIN_GUESTS_FESTSAL`, `MAX_GUESTS_FESTSAL`) and keep `ROOM_PRICE_PER_NIGHT`, `MAX_ROOMS`. Add `export const MIN_NIGHTS = 4;`.

- [ ] **Step 3: Delete the Fest calculator** flow/subcomponent and any tab/toggle that switches between Ophold and Fest, so only the Ophold calculator renders. Enforce a 4-night minimum in the nights input (min=4, clamp, and a hint "min. 4 nætter"). Any copy mentioning festsal/gæster is removed.

- [ ] **Step 4: Fix consumers.** Grep for importers and update them:
```bash
grep -rnE 'SAL_PRICE|MIN_GUESTS_FESTSAL|MAX_GUESTS_FESTSAL' app/
```
Update `app/routes/inspiration.tsx` and `app/routes/priser.tsx` (and any other hit) to drop festsal numbers.

- [ ] **Step 5: Typecheck + build + manual render**

Run: `npm run typecheck` → PASS. `npm run build` → PASS. Start dev (`npm run dev`) and open `/priser`; confirm only the lodging calculator shows, nights enforce min. 4, total = rooms × nights × 650.

- [ ] **Step 6: Commit**

```bash
git add app/components/Prisberegner.tsx app/routes/inspiration.tsx app/routes/priser.tsx
git commit -m "feat(prisberegner): drop festsal flow; enforce 4-night lodging minimum"
```

---

### Task 6: Rewrite `llms.txt`

**Files:**
- Modify: `app/routes/llms[.]txt.tsx`

**Interfaces:**
- Consumes: `landingPagesByCategory("overnatning")`, `landingPagesByCategory("usecase")`, `NIGHTLY_PRICE`, `MIN_NIGHTS`, `NUMBER_OF_ROOMS`.

- [ ] **Step 1: Rewrite the loader body** — remove `MAX_GUESTS`, event sections and event prices. New structure:

```ts
import { SITE_URL, SITE_NAME, NAP, NIGHTLY_PRICE, MIN_NIGHTS, NUMBER_OF_ROOMS, SAME_AS } from "~/lib/site";
import { landingPagesByCategory, landingPagePath } from "~/lib/landingPages";
// ...
const lodging = landingPagesByCategory("overnatning");
const usecases = landingPagesByCategory("usecase");
```
Body headline + summary:
```
# Svaleholm Gaard Roskilde

> Indkvartering til håndværkere på bygge- og renoveringsprojekter nær Roskilde på
> Sjælland. Op til 8 enkle værelser eller hele huset til ét sjak. Fælles køkken,
> fakturabetaling mod CVR, nem selvcheck-in. 650 kr pr. nat inkl. moms, min. 4 nætter.
```
Sections: `## Kontakt (NAP)` (unchanged fields), `## Det tilbyder vi` (lodging-only bullets, confirmed facts, whole-house + invoicing), `## Priser` (650 kr/nat inkl. moms; min. 4 nætter; skræddersyet aftale ved hele huset/længere ophold — no event prices), `## Vigtige sider` (Forside, /indkvartering-haandvaerkere, /vaerelser, /priser, /kontakt — drop /tjenester if redirected, drop /inspiration event framing), `## Indkvartering i nærområdet` (lodging LPs), `## Til byggeprojektet` (usecase LPs), `## Ofte stillede spørgsmål` (the B2B FAQ set from Task 2).

- [ ] **Step 2: Build + verify output**

Run: `npm run build` → PASS. `npm run dev`, fetch `/llms.txt`:
```bash
grep -iE 'festsal|bryllup|26.000|150 gæster' <(curl -s http://localhost:5175/llms.txt) || echo "OK: llms.txt de-evented"
grep -iE 'håndværker|min. 4 nætter|fakturabetaling' <(curl -s http://localhost:5175/llms.txt) && echo "OK: B2B content present"
```
Expected: first prints OK line; second matches.

- [ ] **Step 3: Commit**

```bash
git add app/routes/llms\[.\]txt.tsx
git commit -m "feat(geo): rewrite llms.txt for håndværker lodging"
```

---

### Task 7: Add `public/pricing.md`

Machine-readable pricing served at `/pricing.md` (public assets are served at the site root).

**Files:**
- Create: `public/pricing.md`

- [ ] **Step 1: Write the file**

```markdown
# Priser — Svaleholm Gaard Roskilde

Indkvartering til håndværkere på projekt nær Roskilde. Alle priser inkl. moms.

## Enkeltværelse
- Pris: 650 kr pr. værelse pr. nat
- Minimum: 4 nætter
- Inkluderet: fælles køkken, 4 fælles bad/toilet, fælles opholdsrum, selvcheck-in via dørkode
- Antal værelser: op til 8

## Hele huset (til ét sjak)
- Pris: skræddersyet aftale efter antal mand og periode
- Minimum: 4 nætter
- Eksklusiv brug af hele gården

## Langtidsleje
- Pris: skræddersyet aftale ved længerevarende projekter
- Fra 650 kr pr. nat

## Betaling
- Fakturabetaling mod CVR (B2B)
- Kontakt: kontakt@svaleholmroskilde.dk · +45 71 53 13 79
```

- [ ] **Step 2: Build + verify served**

Run: `npm run dev`, then `curl -s http://localhost:5175/pricing.md | head -5` → shows the heading.

- [ ] **Step 3: Commit**

```bash
git add public/pricing.md
git commit -m "feat(geo): add machine-readable /pricing.md for AI agents"
```

---

### Task 8: Pivot the homepage (`index.tsx`)

**Files:**
- Modify: `app/routes/index.tsx`

- [ ] **Step 1: Meta + WebPage node**

`meta()`:
```ts
title: "Indkvartering til håndværkere nær Roskilde | Svaleholm Gaard",
description:
  "Få dit sjak til at bo tæt på pladsen. Svaleholm Gaard udlejer enkle værelser eller hele huset til håndværkere nær Roskilde – fælles køkken, fakturabetaling. 650 kr/nat, min. 4 nætter.",
image: "/images/gaardsplads.jpg",
imageAlt: "Svaleholm Gaards gårdsplads",
```
`webPageNode`: name "Svaleholm Gaard Roskilde – Indkvartering til håndværkere"; matching description.

- [ ] **Step 2: Hero copy**

Eyebrow unchanged. H1: line 1 `t("Indkvartering til", "Lodging for")`, line 2 accent `t("håndværkere", "tradespeople")`. Subtitle: `t("Et praktisk hjem til sjakket tæt på pladsen – enkle værelser eller hele huset, fælles køkken og fakturabetaling. 650 kr pr. nat, min. 4 nætter.", "A practical base for the crew close to the site – simple rooms or the whole house, a shared kitchen and company invoicing. DKK 650 per night, minimum 4 nights.")`. Primary CTA → `/kontakt` label `t("Få tilbud til dit sjak", "Get a quote for your crew")`; ghost CTA → `/indkvartering-haandvaerkere` label `t("Se faciliteter", "See the facilities")`.

- [ ] **Step 3: Intro + Services**

IntroSection: replace the "oase af ro / fejre livets øjeblikke" copy with a B2B framing (practical base near Roskilde, crew stays together, invoice to company — confirmed facts only; drop the "Historien skal leves" quote or replace with a plain value line). ServicesSection: two cards → (A) "Enkeltværelser til sjakket" → `/vaerelser`; (B) "Hele huset til ét firma" → `/indkvartering-haandvaerkere`. Remove the festsal card, `festsal-fest-1.png` image, and "op til 150 gæster" copy. Use `vaerelse-seng.jpg` and `gaardsplads.jpg`.

- [ ] **Step 4: CTA banner**

Eyebrow `t("Klar til at booke til sjakket?", "Ready to book for the crew?")`; H2 `t("Lad os finde en ", "Let's find an ")` + accent `t("aftale", "agreement")`; body a B2B line (quote by crew size/period, invoicing); keep phone CTA. Primary → `/kontakt`.

- [ ] **Step 5: Reviews** — keep (real Google reviews); no event-specific framing to change.

- [ ] **Step 6: Typecheck + build + manual render**

`npm run typecheck` → PASS; `npm run build` → PASS; `npm run dev`, open `/`, confirm no festsal imagery/copy and CTAs route correctly.
```bash
grep -niE 'festsal|fejring|150 gæster|bryllup' app/routes/index.tsx || echo "OK: homepage de-evented"
```

- [ ] **Step 7: Commit**

```bash
git add app/routes/index.tsx
git commit -m "feat(content): pivot homepage to håndværker lodging"
```

---

### Task 9: Create the pillar page `/indkvartering-haandvaerkere`

The hub every retired URL and internal link points at. Targets "håndværkerindkvartering / indkvartering af håndværkere".

**Files:**
- Create: `app/routes/indkvartering-haandvaerkere.tsx`
- Modify: `app/routes.ts` (register the route)

**Interfaces:**
- Consumes: `pageMeta` (`~/lib/seo`), `graph`, `webPageNode`, `breadcrumb`, `lodgingNode`, `haandvaerkerServiceNodes`, `faqNode` (`~/lib/schema`), `landingPagesByCategory` (`~/lib/landingPages`), `Header`/`Footer`/`JsonLd`/`Faq` components, `useT`.

- [ ] **Step 1: Register the route**

In `app/routes.ts`, add above the `overnatning/:slug` line:
```ts
route("indkvartering-haandvaerkere", "routes/indkvartering-haandvaerkere.tsx"),
```

- [ ] **Step 2: Build the page**

Create `app/routes/indkvartering-haandvaerkere.tsx` following the structure of `index.tsx`/`LandingPageView.tsx` (Header, JsonLd, hero, value sections, hub links to usecase + overnatning LPs via `landingPagesByCategory`, FAQ via `Faq`, CTA to `/kontakt`, Footer). Content: the 6 driftsargumenter (confirmed facts only — omit parkering/vaskemaskine/wifi until verified), 40-60 word answer block (Global Constraints), pricing line (650 kr/nat, min. 4 nætter, skræddersyet ved hele huset). Meta:
```ts
title: "Håndværkerindkvartering nær Roskilde | Svaleholm Gaard",
description: "Indkvartering af håndværkere på projekt nær Roskilde – enkeltværelser eller hele huset til sjakket, fælles køkken, fakturabetaling mod CVR. 650 kr/nat, min. 4 nætter, skræddersyet aftale.",
image: "/images/gaardsplads.jpg",
```
JSON-LD graph: `webPageNode` + `breadcrumb([{Forside,""},{Håndværkerindkvartering,"/indkvartering-haandvaerkere"}])` + `lodgingNode({description})` + `haandvaerkerServiceNodes([...four usecase services...])` + `faqNode([...B2B FAQ...])`.

- [ ] **Step 3: Typecheck + build + manual render**

`npm run typecheck` → PASS; `npm run build` → PASS; `npm run dev`, open `/indkvartering-haandvaerkere`, confirm it renders and hub links resolve.

- [ ] **Step 4: Commit**

```bash
git add app/routes/indkvartering-haandvaerkere.tsx app/routes.ts
git commit -m "feat(seo): add håndværkerindkvartering pillar page"
```

---

### Task 10: Pivot `/vaerelser`, `/tjenester`, `/priser`, `/kontakt`

**Files:**
- Modify: `app/routes/vaerelser.tsx`, `app/routes/tjenester.tsx`, `app/routes/priser.tsx`, `app/routes/kontakt.tsx`

- [ ] **Step 1: Read each file** to locate meta, hero and body copy.

- [ ] **Step 2: `/tjenester` decision — redirect.** Per spec §9.3 the recommendation is to repurpose, but the cleanest single-product IA is to 301 `/tjenester` → `/indkvartering-haandvaerkere` (the pillar now carries "hvad vi tilbyder"). Replace the route file with a redirect loader (like `hotel.tsx`): `return redirect("/indkvartering-haandvaerkere", 301);`. Remove `/tjenester` from the sitemap `STATIC_PATHS` (Task 12 handles the sitemap sweep; note it here). **If the user prefers a repurposed /tjenester page instead, build that rather than redirect — flag at execution.**

- [ ] **Step 3: `/vaerelser`** — retarget meta + copy from "ophold i naturen" to "værelser til håndværkere / sjak": shared kitchen/bath/lounge, self check-in, 650 kr/nat min. 4 nætter, whole-house option, invoicing. Confirmed facts only. Update `lodgingNode` description usage if referenced.

- [ ] **Step 4: `/priser`** — meta + copy: single lodging calculator (Task 5), 650 kr/nat, min. 4 nætter, skræddersyet ved hele huset/langtidsleje. Remove every festsal price.

- [ ] **Step 5: `/kontakt`** — retarget copy to "Få tilbud til dit sjak". Add optional form fields (follow the existing form + `crm.server.ts`/contact action pattern): Firma/virksomhed, CVR, Antal håndværkere, Periode (fra–til), Projekt-adresse/by. Keep existing spam protection (ALTCHA/Turnstile) and the `/tak` redirect intact. Verify the CRM payload mapping in `app/lib/crm.server.ts` accepts the new fields (add them to the payload if the CRM supports it; otherwise append to the message body).

- [ ] **Step 6: Typecheck + build + manual render + grep**

`npm run typecheck` → PASS; `npm run build` → PASS; `npm run dev`, open `/vaerelser`, `/priser`, `/kontakt`, and confirm `/tjenester` 301s to the pillar. Submit the kontakt form once to confirm it still reaches `/tak`.
```bash
grep -rniE 'festsal|bryllup|konfirmation|150 gæster' app/routes/vaerelser.tsx app/routes/priser.tsx app/routes/kontakt.tsx || echo "OK: pages de-evented"
```

- [ ] **Step 7: Commit**

```bash
git add app/routes/vaerelser.tsx app/routes/tjenester.tsx app/routes/priser.tsx app/routes/kontakt.tsx app/lib/crm.server.ts
git commit -m "feat(content): pivot rooms/pricing/contact to B2B; redirect /tjenester"
```

---

### Task 11: Sweep remaining event content (`inspiration.tsx`, `galleri.tsx`, header/footer)

**Files:**
- Modify: `app/routes/inspiration.tsx`, `app/routes/galleri.tsx`, `app/components/Header.tsx`, `app/components/Footer.tsx` (as grep reveals)

- [ ] **Step 1: Grep the whole app for residual event language**

```bash
grep -rniE 'festsal|bryllup|konfirmation|polterabend|barnedåb|julefrokost|reception|firmafest|150 gæster|fejring|/fest/|/tjenester' app/ public/
```

- [ ] **Step 2: Fix each hit.** Header/Footer nav: replace any "Fest/Events/Tjenester" link with "Indkvartering" → `/indkvartering-haandvaerkere` (or "Faciliteter"). `inspiration.tsx`: remove event FAQ/ideas or retarget to håndværker use (or redirect the route if it no longer earns its keep — flag at execution). `galleri.tsx`: remove festsal images from the gallery list; keep rooms/kitchen/gård/nature.

- [ ] **Step 3: Typecheck + build + re-grep**

`npm run typecheck` → PASS; `npm run build` → PASS; re-run the Step 1 grep → only acceptable hits remain (e.g. a redirect string, the word in a comment). Document any intentional remaining hit.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore(content): sweep residual event language from nav, gallery, inspiration"
```

---

### Task 12: Final verification + cleanup

**Files:**
- Modify: `app/routes/sitemap[.]xml.tsx` (STATIC_PATHS), `app/lib/site.ts` (`MAX_GUESTS`), `public/robots.txt` or `app/routes/robots[.]txt.tsx` (verify)

- [ ] **Step 1: Sitemap** — in `sitemap[.]xml.tsx` `STATIC_PATHS`, remove `/tjenester` (now a redirect) and add `/indkvartering-haandvaerkere` (priority 0.9). Confirm landing-page URLs come only from the retargeted set (auto via `landingPagePaths()`).

- [ ] **Step 2: Remove the dead `MAX_GUESTS` export** from `site.ts` now that Tasks 4 and 6 cleared its references. Verify no references remain:
```bash
grep -rn 'MAX_GUESTS' app/ && echo "STILL REFERENCED — fix before removing" || echo "OK: safe to remove"
```

- [ ] **Step 2b: Delete the deferred event node builders** — now that Tasks 10/11 removed `LandingPageView.tsx`/`priser.tsx`/`tjenester.tsx` consumers, delete `eventOfferCatalogNode()` and `eventServiceNodes()` from `schema.ts`. Verify no importers remain first:
```bash
grep -rn 'eventOfferCatalogNode\|eventServiceNodes' app/ && echo "STILL REFERENCED — do not delete" || echo "OK: safe to delete"
```

- [ ] **Step 3: Full-site grep gate**

```bash
grep -rniE 'festsal|EventVenue|eventOfferCatalog|26.000|9.000|150 gæster' app/ public/ || echo "OK: event business fully removed"
```
Expected: OK line (or only intentional, documented hits).

- [ ] **Step 4: Typecheck + production build**

`npm run typecheck` → PASS; `npm run build` → PASS.

- [ ] **Step 5: Manual verification (dev server)** — `npm run dev`, then confirm:
  - `/` renders, håndværker messaging, CTAs route to `/kontakt` and `/indkvartering-haandvaerkere`.
  - `/indkvartering-haandvaerkere` renders with hub links + FAQ.
  - Retargeted LPs render: `/overnatning/naer-lejre`, `/overnatning/mandskabsindkvartering-roskilde` (usecase slugs are served under `/overnatning/:slug` only if that route handles the `usecase` category — confirm the dynamic route resolves usecase entries; if usecase pages need their own path, decide at execution: either serve them under `/overnatning/` by relaxing the route's category filter, or add a `/til-projektet/:slug` route. **Recommended: add a `usecase.$slug.tsx` route mirroring `overnatning.$slug.tsx` with `findLandingPage("usecase", …)`, and register `route("til-projektet/:slug", …)`; update `landingPagePath` to map `usecase` → `/til-projektet`.**)
  - 301s: `/fest/bryllup-naer-roskilde` → `/indkvartering-haandvaerkere`; `/overnatning/naer-vikingeskibsmuseet` → pillar; `/tjenester` → pillar; `/hotel` → `/vaerelser`.
  - `/llms.txt`, `/pricing.md`, `/sitemap.xml`, `/robots.txt` all 200 and content correct.

  > **Note on usecase routing:** `landingPagePath` currently returns `/${category}/${slug}`, so `usecase` entries would resolve to `/usecase/...`. Decide the usecase URL prefix in Step 5 and make `landingPagePath`, the route, and `relatedSlugs` links consistent. This affects Task 2's `relatedSlugs` (they are slug-only, so they stay valid) and the pillar hub links.

- [ ] **Step 6: Commit cleanup**

```bash
git add app/routes/sitemap\[.\]xml.tsx app/lib/site.ts
git commit -m "chore(seo): sitemap + constants cleanup after event removal"
```

- [ ] **Step 7: Finish the branch** — invoke `superpowers:finishing-a-development-branch` to choose merge/PR. Before that, surface the still-open §9 items to the user (facility facts, driving times, whole-house price) so the hedged copy can be upgraded to concrete claims once confirmed.

---

## Open decisions to confirm at execution (from spec §9)
1. Usecase URL prefix (`/til-projektet/:slug` recommended) — Task 12 Step 5.
2. `/tjenester` and `/inspiration`: redirect vs. repurpose — Tasks 10/11 default to redirect.
3. Unverified facility facts (parkering, vaskemaskine, wifi), driving times, whole-house price — kept out of copy until the user confirms; then upgrade the hedged lines.
4. OG/gallery image selection — Task 3/8/11 default to `gaardsplads.jpg`; swap if a better facilities photo exists.
