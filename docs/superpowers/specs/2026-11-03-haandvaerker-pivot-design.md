# Svaleholm Gaard → Hjem til håndværkere — strategi & SEO/GEO-spec

**Dato:** 2026-11-03
**Status:** Godkendt retning (tilgang A). Afventer review før implementeringsplan.

---

## 1. Formål

Svaleholm Gaard skifter forretningsfokus. I dag sælger sitet **to ting**: festsal (bryllup,
konfirmation, firmafest m.m.) og overnatning rettet mod turister/gæster. Fremover sælger
sitet **ét produkt**: indkvartering til håndværkere på bygge- og renoveringsprojekter i
Roskilde-området.

Forretningsmålet er at få **byggefirmaer og entreprenører** til at booke indkvartering til
deres sjak i takt med byggeprojekter i omegnen.

### Beslutninger (bekræftet med kunden)
- **Primær kunde:** B2B — firmaet/byggelederen booker for sjakket. B2C (den enkelte
  håndværker) er sekundær, men mulig.
- **Udlejningsmodel:** Fleksibel — både enkeltværelser pr. person og hele huset (eksklusivt
  til ét sjak).
- **Geografi:** Stramt lokalt — Roskilde + omegn (Lejre, Køge, Holbæk, Frederikssund, Hvalsø).
- **Pris:** 650 kr pr. overnatning, **min. 4 nætter**, skræddersyede aftaler ved hele huset /
  længere ophold.
- **Brand:** "Svaleholm Gaard Roskilde" bevares (beskytter eksisterende entitet/ranking),
  med nyt tagline mod håndværkere.
- **Tilgang:** A — lean re-positionering oven på eksisterende React Router-arkitektur.

---

## 2. Positionering & målgruppe

**Køber:** projektleder / entrepriseleder / byggeleder i entreprenør- eller håndværksfirma,
der skal huse 2–8 mand i uger/måneder nær en plads i Roskilde-området.

**Kernebudskab:** *"Få dit sjak til at bo tæt på pladsen — uden bøvl, til fast pris."*

**Driftsargumenter (de seks der sælger B2B):**
1. Tæt på pladsen = mindre køretid = mere produktiv crew.
2. Fuldt køkken (sparer diæter), vaskemaskine, hurtigt wifi.
3. Parkering til varevogne/trailer + plads til værktøj/materiel.
4. Fakturabetaling, CVR, nem administration — ikke turist-booking.
5. Fast pris året rundt, ingen sæsonudsving.
6. Hele huset = sjakket bor samlet; eller enkeltværelser efter behov.

**Konkrete vilkår:** min. 4 nætter · 650 kr/overnatning · skræddersyede aftaler.

> **Faktaafhængighed:** argument 2 og 3 (vaskemaskine, wifi-hastighed, parkering til
> varevogne, plads til værktøj) skal verificeres med kunden før de skrives som fakta.
> Intet opdigtes. Åbne punkter samlet i §9.

---

## 3. SEO/GEO-strategi

### 3.1 Keyword-klynger (dansk, B2B-first)

| Intention | Head terms |
|---|---|
| Kategori | håndværkerindkvartering, mandskabsindkvartering, indkvartering af medarbejdere, indkvartering af håndværkere |
| Lokal | overnatning til håndværkere Roskilde, bolig til håndværkere Roskilde, indkvartering byggeprojekt Sjælland |
| Pain/alternativ | alternativ til skurvogn, skurby alternativ, langtidsleje værelse arbejde |
| Firma | firmaovernatning Roskilde, værelse til montør/entreprenør, arbejdsbolig Roskilde |

### 3.2 Side-arkitektur efter pivot

**Beholdes & omskrives:**
- **Forside** (`/`) — B2B hero + 6 driftsargumenter + "book til dit sjak".
- **/vaerelser** — faciliteter/drift (ikke "ophold i naturen").
- **/priser** — gennemsigtig pris: 650 kr/nat, min. 4 nætter, skræddersyet ved hele huset.
- **/kontakt** — "få et tilbud til dit sjak" + firma/CVR-felt.
- **/galleri** — behold, men kuratér mod rum/køkken/parkering/faciliteter.

**Ny pillar-side:**
- **/indkvartering-haandvaerkere** — kategori-siden alt internt linker til. Target head term
  "håndværkerindkvartering / indkvartering af håndværkere". Hub i hub-and-spoke.

**Lokale sider (`/overnatning/:slug`) — omskrives fra turist → projekt/pendler-intention:**
- Beholdes & omskrives: `naer-lejre`, `naer-holbaek`, `naer-koege`, `naer-hvalsoe`,
  `naer-frederikssund` → "indkvartering til håndværkere nær [by] — X min. fra Svaleholm".
- Turist-only (`naer-roskilde-domkirke`, `naer-vikingeskibsmuseet`, `naer-roskilde-festival`,
  `naer-dyrskuepladsen`, `naer-sagnlandet-lejre`): **301-redirect til pillar-siden** frem for
  kunstig håndværker-vinkel.

**Use-case sider (erstatter `/fest/:slug`-benet):** ny kategori under `/overnatning/` eller
egne slugs:
- `skurby-alternativ` (alternativ til skurvogn)
- `hele-huset-til-sjak` (eksklusiv leje)
- `langtidsleje-haandvaerkere` (uger/måneder)
- `mandskabsindkvartering-roskilde`

### 3.3 Lokal SEO
- **Google Business Profile:** omkategorisér væk fra "event venue" → fx "Pensionat / Lodging /
  Extended-stay". Opdatér beskrivelse. NAP uændret (allerede konsistent i `site.ts`).
- NAP konsistent i footer / schema / GBP.
- Omegns-sider med reel køreafstand/-tid til pladsnære byer (verificeres — ingen opdigtede tal).

### 3.4 GEO / AI-søgning (fra `ai-seo`-skillen)
- **Svar-blokke 40–60 ord** der står alene, fx: *"Svaleholm Gaard udlejer indkvartering til
  håndværkere nær Roskilde fra 650 kr/nat, min. 4 nætter. Fakturabetaling, fuldt køkken og
  parkering til varevogne. Hele huset kan lejes eksklusivt til ét sjak."*
- **FAQPage-schema** på byggeleder-spørgsmål (se §5).
- **llms.txt** skrives helt om til B2B-indkvartering (ingen festsal).
- **/pricing.md** (ny) — struktureret pris som AI-agenter/ChatGPT/Perplexity kan parse.
- **Schema:** fra event → `LodgingBusiness`/`Accommodation` + `Offer` med pris (se §4).
- Skriv for mennesker først; strukturen er et lag ovenpå (undgå "scaled content abuse").

---

## 4. Konkrete kodeændringer

### 4.1 Ruter (`app/routes.ts`)
- **Fjern:** `route("fest/:slug", …)`.
- **Tilføj:** `route("indkvartering-haandvaerkere", …)` (pillar).
- **301-redirects** (ny eller via `$.tsx`-logik): alle gamle `/fest/*`-slugs → `/` eller
  pillar; turist-only `/overnatning/*`-slugs → pillar. Behold `/hotel` → `/vaerelser`.
- `/tjenester` omdefineres fra "events" til "sådan fungerer det / faciliteter" **eller**
  301-redirectes til pillar-siden (besluttes i planen).

### 4.2 `app/lib/site.ts`
- `PRICE_RANGE` → fx `"650 kr/nat"` (fjern event-interval 650–26.000).
- `DEFAULT_OG_IMAGE` → væk fra `festsal-hvid-1.png` → rum/gård/faciliteter-billede.
- `MAX_GUESTS` — fjernes eller re-fortolkes (ikke længere "festsal-kapacitet").
- Tilføj evt. `MIN_NIGHTS = 4`, `NIGHTLY_PRICE = 650`.
- `AREA_SERVED` strammes til Roskilde-omegn hvis ønsket.

### 4.3 `app/lib/schema.ts`
- `localBusinessNode`: fjern `EventVenue` fra `@type` (kun `LodgingBusiness`/`LocalBusiness`),
  fjern `maximumAttendeeCapacity`, skift default `image`.
- **Fjern** `eventOfferCatalogNode` og `eventServiceNodes` (eller behold som død kode til de
  ikke længere refereres — foretrækker fjernelse).
- `lodgingNode`: opdatér `description`, `makesOffer` → tilføj `minNights`/eligibleQuantity for
  min. 4 nætter, amenities → tilføj faciliteter relevante for håndværkere (parkering,
  vaskemaskine, wifi) **efter faktaverifikation**.
- Nye `Service`-noder for håndværkerindkvartering i stedet for event-services.

### 4.4 `app/lib/landingPages.ts`
- `LandingCategory`: "fest" fjernes; evt. ny "usecase".
- Fjern alle `category: "fest"`-entries (bryllup, konfirmation, firmafest, …).
- Omskriv de 5 beholdte overnatnings-entries til håndværker-intention (hero, intro,
  highlights, FAQ, meta).
- Fjern turist-only entries (de 301-redirectes).
- Tilføj use-case entries (§3.2).
- `FAQ_ROOMS` m.fl. opdateres: "familier og grupper" → "sjak og firmaer", tilføj min. 4 nætter.

### 4.5 `app/routes/index.tsx`
- `meta()` og `webPageNode`: ny titel/beskrivelse mod håndværkere.
- Hero: nyt tagline + CTA ("Få tilbud til dit sjak" / "Se faciliteter").
- `ServicesSection`: erstat fest-kortet; to kort → enkeltværelser vs. hele huset, eller
  faciliteter vs. sådan-fungerer-det.
- CTA-banner: "Lad os fejre sammen" → B2B-CTA.
- Reviews: behold (ægte Google-anmeldelser), men framing neutraliseres.

### 4.6 `app/routes/llms[.]txt.tsx`
- Fjern festsal-sektion, event-priser, event-landingssider.
- Ny business-beskrivelse (indkvartering til håndværkere), priser (650/nat, min. 4),
  faciliteter, B2B-FAQ.

### 4.7 Ny fil: `public/pricing.md` (eller route)
Struktureret pris for AI-agenter (B2B + enkeltværelse).

### 4.8 Øvrigt
- `vaerelser.tsx`, `tjenester.tsx`, `priser.tsx`, `kontakt.tsx`: copy-pivot.
- `sitemap.xml`: opdateres automatisk via landingPages-helpers (verificér).
- Billeder: vælg/omdøb assets mod faciliteter (ikke festsal).

---

## 5. FAQ til byggeledere (GEO-indhold)

Disse bruges i FAQPage-schema + synligt på pillar/forside:
1. **Kan I fakturere firmaet?** — Ja, vi fakturerer virksomheden mod CVR; …
2. **Er der plads til varevogne og trailer?** — *(verificér parkering)*
3. **Kan vi leje hele huset til sjakket?** — Ja, hele gården kan lejes eksklusivt …
4. **Er der køkken, så mændene selv kan lave mad?** — Ja, fuldt fælles køkken …
5. **Hvad er minimum lejeperiode?** — Min. 4 nætter; skræddersyet ved længere ophold.
6. **Hvad koster det?** — 650 kr pr. overnatning; samlet tilbud ved hele huset/længere ophold.
7. **Hvor tæt er I på [by/plads]?** — *(verificér køretider)*
8. **Er der vaskemaskine og wifi?** — *(verificér)*

---

## 6. Konvertering & booking
- Primær CTA: **telefon + "få tilbud til dit sjak"-formular** (B2B sælger via dialog, ikke
  selvbetjent kalender).
- Formular udvides med firma/CVR, antal mand, periode, projekt-adresse.
- Sekundær: direkte telefonnummer synligt (byggeledere ringer).

---

## 7. Måling (fra `ai-seo`)
- **Google:** Search Console (standard — ingen AI-specifik rapport), ranking på head terms.
- **Lokal:** GBP-visninger, opkald, rutesøgninger.
- **GEO:** manuel månedlig tjek af 10–20 prompts i ChatGPT/Perplexity/AI Overviews, 3–5 kørsler
  pr. prompt, log citat-rate. Prompts: "indkvartering håndværkere Roskilde", "alternativ til
  skurvogn Sjælland", "hvor kan mit sjak bo nær Roskilde".
- **Konvertering:** antal tilbudsforespørgsler (formular + opkald).

---

## 8. Ikke med i scope (YAGNI)
- Online booking-kalender/betaling (B2B sælges via dialog).
- Engelsk som primærsprog (DA er canonical; EN-toggle beholdes hvor den findes).
- Ny visuel identitet / fuld rebuild.
- Bredere geografi end Roskilde-omegn.

---

## 9. Åbne punkter (skal afklares før/under implementering)
1. Faciliteter at verificere: vaskemaskine, wifi-hastighed, parkering til varevogne/trailer,
   plads til værktøj/materiel.
2. Reelle køretider/afstande til pladsnære byer (til lokale sider — ingen opdigtede tal).
3. Skal `/tjenester` omskrives eller 301-redirectes?
4. Hele-huset-pris / prismodel ved længere ophold (til priser + pricing.md).
5. Nye/omdøbte billed-assets mod faciliteter.
6. GBP-adgang til omkategorisering (kunden gør dette; vi leverer tekst).
