// ─────────────────────────────────────────────────────────────────────────────
// Local SEO/GEO landing pages — single source of truth.
//
// Each entry is a genuinely unique, useful local landing page (NOT a thin
// variable-swap): real local context for the area/project-type plus why
// Svaleholm fits. Rendered by `app/components/LandingPageView.tsx` and served
// under /overnatning/:slug (lodging intent near a town) or /til-projektet/:slug
// (håndværker use-case intent).
//
// Adding a page = add an entry here. Routing, sitemap and llms.txt pick entries
// up automatically via the helpers at the bottom. Keep copy honest: no invented
// distances/driving times and no fabricated ratings (see site.ts RATING).
//
// Canonical SEO language is Danish (the site is lang="da"). `meta*`, `jsonLd*`
// and `breadcrumbLabel` are Danish only; body copy carries DA + EN for the
// client-side language toggle.
// ─────────────────────────────────────────────────────────────────────────────

import type { FaqItem } from "~/components/Faq";

export type LandingCategory = "overnatning" | "usecase";

export type LpSection = {
  headingDa: string;
  headingEn: string;
  bodyDa: string;
  bodyEn: string;
};

export type LandingPage = {
  category: LandingCategory;
  slug: string;

  // Meta (Danish — canonical)
  metaTitle: string;
  metaDescription: string;

  // Hero
  heroEyebrowDa: string;
  heroEyebrowEn: string;
  h1Da: string;
  h1En: string;
  heroSubDa: string;
  heroSubEn: string;
  image: string;
  imageAlt: string;

  // JSON-LD (Danish)
  jsonLdName: string;
  jsonLdDescription: string;
  breadcrumbLabel: string;
  /** For category "usecase" → an håndværkerService node. */
  serviceName?: string;
  serviceDescription?: string;

  // Body
  intro: LpSection[];
  highlightsDa: string[];
  highlightsEn: string[];
  faqs: FaqItem[];

  /** Slugs of 2–3 sibling landing pages for hub-and-spoke internal links. */
  relatedSlugs: string[];
};

// Shared FAQ building blocks reused (and tailored) across entries. The practical
// facts (shared bath, self check-in, capacity, invoicing) are identical across
// the site, so the answers stay consistent with /vaerelser and /tjenester.
const FAQ_LOCATION: FaqItem = {
  qDa: "Hvor ligger Svaleholm Gaard?",
  qEn: "Where is Svaleholm Gaard located?",
  aDa: "Svaleholm Gaard ligger på Frederiksborgvej 388, 4000 Roskilde – i landlige, naturskønne omgivelser lige uden for Roskilde på Sjælland, med nem parkering ved indkørslen.",
  aEn: "Svaleholm Gaard is at Frederiksborgvej 388, 4000 Roskilde – in rural, scenic surroundings just outside Roskilde on Zealand, with easy parking by the drive.",
};
const FAQ_CHECKIN: FaqItem = {
  qDa: "Hvordan foregår check-in ved overnatning?",
  qEn: "How does check-in work for an overnight stay?",
  aDa: "Der er nem digital selvcheck-in via dørkode, så I kan ankomme fleksibelt – også sent om aftenen – uden at skulle mødes med en vært.",
  aEn: "There is easy digital self check-in via a door code, so you can arrive flexibly – even late in the evening – without having to meet a host.",
};
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

const AREA_FAQS: FaqItem[] = [FAQ_LOCATION, FAQ_ROOMS, FAQ_INVOICE, FAQ_WHOLE_HOUSE, FAQ_CHECKIN];
const USECASE_FAQS: FaqItem[] = [FAQ_ROOMS, FAQ_INVOICE, FAQ_WHOLE_HOUSE, FAQ_CHECKIN, FAQ_LOCATION];

export const LANDING_PAGES: LandingPage[] = [
  // ─── Overnatning · nærliggende byer/områder (håndværkerindkvartering) ─────
  {
    category: "overnatning",
    slug: "naer-lejre",
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
    image: "/images/natur-eng.jpg",
    imageAlt: "Grønne enge og natur nær Svaleholm Gaard ved Lejre",
    jsonLdName: "Indkvartering til håndværkere nær Lejre",
    jsonLdDescription:
      "Svaleholm Gaard udlejer enkle værelser til håndværkere på projekt nær Lejre og Roskilde. Fælles køkken, fakturabetaling, 650 kr pr. nat, min. 4 nætter.",
    breadcrumbLabel: "Håndværkere nær Lejre",
    intro: [
      {
        headingDa: "Sjak på projekt nær Lejre",
        headingEn: "Crews on a project near Lejre",
        bodyDa:
          "Sjak med projekt i Lejre-området har brug for et sted at bo, der giver overskud til arbejdsdagen. I stedet for en skurvogn på byggepladsen bor I på Svaleholm Gaard i enkle værelser med et fælles køkken, hvor I selv kan lave mad efter en lang dag, og et fælles opholdsrum til at slappe af i. Her er ro til at hvile ordentligt, inden næste arbejdsdag starter – en rigtig seng, et rigtigt bad og plads til at trække sig tilbage, så sjakket står friskere op hver morgen.",
        bodyEn:
          "Crews working on a project in the Lejre area need somewhere to stay that leaves them with energy for the workday. Instead of a site cabin, you stay at Svaleholm Gaard in simple rooms with a shared kitchen where you can cook after a long day, and a shared lounge to unwind in. There's calm here to rest properly before the next working day starts – a real bed, a real bath, and space to retreat, so the crew wakes up fresher every morning.",
      },
      {
        headingDa: "Enkelt, fleksibelt og fakturérbart",
        headingEn: "Simple, flexible and invoiced",
        bodyDa:
          "Opholdet er enkelt og fleksibelt: op til 8 værelser med fælles bad og toilet, og digital selvcheck-in via dørkode, så sjakket kan ankomme og rejse, når arbejdet kræver det. Prisen er 650 kr pr. nat inkl. moms, med minimum 4 nætter. Vi fakturerer firmaet direkte mod CVR, så administrationen er enkel for byggelederen. Skal sjakket bo samlet, kan hele huset lejes eksklusivt – vi laver en skræddersyet aftale ud fra antal mand og periode.",
        bodyEn:
          "The stay is simple and flexible: up to 8 rooms with shared bath and toilet, and digital self check-in via a door code, so the crew can arrive and leave whenever the work demands. The price is DKK 650 per night incl. VAT, minimum 4 nights. We invoice the company directly against its CVR number, so administration is simple for the site manager. If the crew needs to stay together, the whole house can be rented exclusively – we tailor the agreement to crew size and period.",
      },
    ],
    highlightsDa: [
      "Landligt, praktisk udgangspunkt for projekter nær Lejre",
      "Op til 8 værelser fra 650 kr/nat inkl. moms, min. 4 nætter",
      "Fælles køkken, bad og opholdsrum",
      "Nem digital selvcheck-in via dørkode",
      "Fakturabetaling til firmaet mod CVR",
    ],
    highlightsEn: [
      "Rural, practical base for projects near Lejre",
      "Up to 8 rooms from DKK 650/night incl. VAT, min. 4 nights",
      "Shared kitchen, bath and lounge",
      "Easy digital self check-in via door code",
      "Invoicing to the company against CVR",
    ],
    faqs: AREA_FAQS,
    relatedSlugs: ["naer-holbaek", "mandskabsindkvartering-roskilde", "hele-huset-til-sjak"],
  },
  {
    category: "overnatning",
    slug: "naer-holbaek",
    metaTitle: "Indkvartering til håndværkere nær Holbæk | Svaleholm Gaard",
    metaDescription:
      "Bygge- eller renoveringsprojekt i Holbæk-området? Svaleholm Gaard udlejer indkvartering til håndværkere ved Roskilde – op til 8 værelser, fælles køkken, fakturabetaling. 650 kr/nat, min. 4 nætter.",
    heroEyebrowDa: "Håndværkerindkvartering nær Holbæk",
    heroEyebrowEn: "Tradesperson lodging near Holbæk",
    h1Da: "Indkvartering til håndværkere nær Holbæk",
    h1En: "Accommodation for tradespeople near Holbæk",
    heroSubDa:
      "Et roligt, praktisk sted for sjak på projekter langs Holbæk/Roskilde-korridoren – enkle værelser med fælles køkken, nem selvcheck-in og fakturabetaling til firmaet.",
    heroSubEn:
      "A quiet, practical base for crews on projects along the Holbæk–Roskilde corridor – simple rooms with a shared kitchen, easy self check-in and company invoicing.",
    image: "/images/natur-mark.jpg",
    imageAlt: "Åbne marker og landskab nær Svaleholm Gaard mod Holbæk",
    jsonLdName: "Indkvartering til håndværkere nær Holbæk",
    jsonLdDescription:
      "Svaleholm Gaard udlejer enkle værelser til håndværkere på projekt nær Holbæk og Roskilde. Fælles køkken, fakturabetaling, 650 kr pr. nat, min. 4 nætter.",
    breadcrumbLabel: "Håndværkere nær Holbæk",
    intro: [
      {
        headingDa: "Sjak på projekt langs Holbæk-korridoren",
        headingEn: "Crews on a project along the Holbæk corridor",
        bodyDa:
          "Projekter langs korridoren mellem Roskilde og Holbæk kræver et sted at bo, der giver overskud til arbejdsdagen. I stedet for en skurvogn bor sjakket på Svaleholm Gaard i enkle værelser med et fælles køkken, hvor I selv kan lave mad efter en lang dag, og et fælles opholdsrum til at slappe af i. Her er ro til at hvile ordentligt, inden næste arbejdsdag starter – en rigtig seng, et rigtigt bad og plads til at trække sig tilbage, så sjakket står friskere op hver morgen.",
        bodyEn:
          "Projects along the corridor between Roskilde and Holbæk need somewhere to stay that leaves the crew with energy for the workday. Instead of a site cabin, you stay at Svaleholm Gaard in simple rooms with a shared kitchen where you can cook after a long day, and a shared lounge to unwind in. There's calm here to rest properly before the next working day starts – a real bed, a real bath, and space to retreat, so the crew wakes up fresher every morning.",
      },
      {
        headingDa: "Enkelt, fleksibelt og fakturérbart",
        headingEn: "Simple, flexible and invoiced",
        bodyDa:
          "Opholdet er enkelt: op til 8 værelser med fælles bad og toilet, og digital selvcheck-in via dørkode, så sjakket kan komme og gå, som arbejdet kræver. Prisen er 650 kr pr. nat inkl. moms, minimum 4 nætter, og firmaet faktureres direkte mod CVR, så administrationen er enkel for byggelederen. Skal sjakket bo samlet, kan hele huset lejes eksklusivt efter en skræddersyet aftale ud fra antal mand og periode.",
        bodyEn:
          "The stay is simple: up to 8 rooms with shared bath and toilet, and digital self check-in via a door code, so the crew can come and go as the work demands. The price is DKK 650 per night incl. VAT, minimum 4 nights, and the company is invoiced directly against its CVR number, keeping administration simple for the site manager. If the crew needs to stay together, the whole house can be rented exclusively under a tailored agreement based on crew size and period.",
      },
    ],
    highlightsDa: [
      "Landligt, praktisk udgangspunkt for projekter nær Holbæk",
      "Op til 8 værelser fra 650 kr/nat inkl. moms, min. 4 nætter",
      "Fælles køkken, bad og opholdsrum",
      "Nem digital selvcheck-in via dørkode",
      "Fakturabetaling til firmaet mod CVR",
    ],
    highlightsEn: [
      "Rural, practical base for projects near Holbæk",
      "Up to 8 rooms from DKK 650/night incl. VAT, min. 4 nights",
      "Shared kitchen, bath and lounge",
      "Easy digital self check-in via door code",
      "Invoicing to the company against CVR",
    ],
    faqs: AREA_FAQS,
    relatedSlugs: ["naer-lejre", "naer-koege", "langtidsleje-haandvaerkere"],
  },
  {
    category: "overnatning",
    slug: "naer-koege",
    metaTitle: "Indkvartering til håndværkere nær Køge | Svaleholm Gaard",
    metaDescription:
      "Anlægs- eller boligprojekt i Køge-området? Svaleholm Gaard udlejer indkvartering til håndværkere ved Roskilde – op til 8 værelser, fælles køkken, fakturabetaling. 650 kr/nat, min. 4 nætter.",
    heroEyebrowDa: "Håndværkerindkvartering nær Køge",
    heroEyebrowEn: "Tradesperson lodging near Køge",
    h1Da: "Indkvartering til håndværkere nær Køge",
    h1En: "Accommodation for tradespeople near Køge",
    heroSubDa:
      "Et roligt, praktisk sted for sjak på store anlægs- og boligprojekter i Køge-området – enkle værelser med fælles køkken, nem selvcheck-in og fakturabetaling til firmaet.",
    heroSubEn:
      "A quiet, practical base for crews on large civil and housing projects in the Køge area – simple rooms with a shared kitchen, easy self check-in and company invoicing.",
    image: "/images/have-sti.jpg",
    imageAlt: "Havesti og grønne omgivelser ved Svaleholm Gaard nær Køge",
    jsonLdName: "Indkvartering til håndværkere nær Køge",
    jsonLdDescription:
      "Svaleholm Gaard udlejer enkle værelser til håndværkere på projekt nær Køge og Roskilde. Fælles køkken, fakturabetaling, 650 kr pr. nat, min. 4 nætter.",
    breadcrumbLabel: "Håndværkere nær Køge",
    intro: [
      {
        headingDa: "Sjak på anlægs- og boligprojekter i Køge-området",
        headingEn: "Crews on civil and housing projects in the Køge area",
        bodyDa:
          "Køge-området har løbende store anlægs- og boligprojekter, der trækker håndværkere og entreprenører til i længere perioder. I stedet for en skurvogn på pladsen bor sjakket på Svaleholm Gaard i enkle værelser med et fælles køkken, hvor I selv kan lave mad efter en lang dag, og et fælles opholdsrum til at slappe af i. Her er ro til at hvile ordentligt, inden næste arbejdsdag starter – en rigtig seng, et rigtigt bad og plads til at trække sig tilbage.",
        bodyEn:
          "The Køge area regularly sees large civil and housing projects that bring in tradespeople and contractors for extended periods. Instead of a site cabin, the crew stays at Svaleholm Gaard in simple rooms with a shared kitchen where you can cook after a long day, and a shared lounge to unwind in. There's calm here to rest properly before the next working day starts – a real bed, a real bath, and space to retreat.",
      },
      {
        headingDa: "Enkelt, fleksibelt og fakturérbart",
        headingEn: "Simple, flexible and invoiced",
        bodyDa:
          "Der er op til 8 enkle værelser med fælles bad og toilet, og digital selvcheck-in via dørkode betyder, at sjakket kan ankomme og rejse, når projektet kræver det. Prisen er 650 kr pr. nat inkl. moms, minimum 4 nætter, og vi fakturerer firmaet direkte mod CVR. Skal hele sjakket bo samlet gennem et længere projekt, kan hele huset lejes eksklusivt efter en skræddersyet aftale.",
        bodyEn:
          "There are up to 8 simple rooms with shared bath and toilet, and digital self check-in via a door code means the crew can arrive and leave whenever the project demands. The price is DKK 650 per night incl. VAT, minimum 4 nights, and we invoice the company directly against its CVR number. If the whole crew needs to stay together for a longer project, the whole house can be rented exclusively under a tailored agreement.",
      },
    ],
    highlightsDa: [
      "Landligt, praktisk udgangspunkt for projekter nær Køge",
      "Op til 8 værelser fra 650 kr/nat inkl. moms, min. 4 nætter",
      "Fælles køkken, bad og opholdsrum",
      "Nem digital selvcheck-in via dørkode",
      "Fakturabetaling til firmaet mod CVR",
    ],
    highlightsEn: [
      "Rural, practical base for projects near Køge",
      "Up to 8 rooms from DKK 650/night incl. VAT, min. 4 nights",
      "Shared kitchen, bath and lounge",
      "Easy digital self check-in via door code",
      "Invoicing to the company against CVR",
    ],
    faqs: AREA_FAQS,
    relatedSlugs: ["mandskabsindkvartering-roskilde", "naer-hvalsoe", "hele-huset-til-sjak"],
  },
  {
    category: "overnatning",
    slug: "naer-hvalsoe",
    metaTitle: "Indkvartering til håndværkere nær Hvalsø | Svaleholm Gaard",
    metaDescription:
      "Bygge- eller renoveringsprojekt i Hvalsø/Lejre kommune? Svaleholm Gaard udlejer indkvartering til håndværkere ved Roskilde – op til 8 værelser, fælles køkken, fakturabetaling. 650 kr/nat, min. 4 nætter.",
    heroEyebrowDa: "Håndværkerindkvartering nær Hvalsø",
    heroEyebrowEn: "Tradesperson lodging near Hvalsø",
    h1Da: "Indkvartering til håndværkere nær Hvalsø",
    h1En: "Accommodation for tradespeople near Hvalsø",
    heroSubDa:
      "Et roligt, praktisk sted for sjak på projekter i Hvalsø og Lejre kommune – enkle værelser med fælles køkken, nem selvcheck-in og fakturabetaling til firmaet.",
    heroSubEn:
      "A quiet, practical base for crews on projects in Hvalsø and Lejre municipality – simple rooms with a shared kitchen, easy self check-in and company invoicing.",
    image: "/images/natur-1.jpg",
    imageAlt: "Skov og natur nær Svaleholm Gaard ved Hvalsø",
    jsonLdName: "Indkvartering til håndværkere nær Hvalsø",
    jsonLdDescription:
      "Svaleholm Gaard udlejer enkle værelser til håndværkere på projekt nær Hvalsø, Lejre kommune og Roskilde. Fælles køkken, fakturabetaling, 650 kr pr. nat, min. 4 nætter.",
    breadcrumbLabel: "Håndværkere nær Hvalsø",
    intro: [
      {
        headingDa: "Sjak på projekt i Hvalsø og Lejre kommune",
        headingEn: "Crews on a project in Hvalsø and Lejre municipality",
        bodyDa:
          "Projekter i Hvalsø og den øvrige del af Lejre kommune kræver et sted at bo, der giver overskud til arbejdsdagen. I stedet for en skurvogn bor sjakket på Svaleholm Gaard i enkle værelser med et fælles køkken, hvor I selv kan lave mad efter en lang dag, og et fælles opholdsrum til at slappe af i. Her er ro til at hvile ordentligt, inden næste arbejdsdag starter – en rigtig seng, et rigtigt bad og plads til at trække sig tilbage, så sjakket står friskere op hver morgen.",
        bodyEn:
          "Projects in Hvalsø and the rest of Lejre municipality need somewhere to stay that leaves the crew with energy for the workday. Instead of a site cabin, you stay at Svaleholm Gaard in simple rooms with a shared kitchen where you can cook after a long day, and a shared lounge to unwind in. There's calm here to rest properly before the next working day starts – a real bed, a real bath, and space to retreat, so the crew wakes up fresher every morning.",
      },
      {
        headingDa: "Enkelt, fleksibelt og fakturérbart",
        headingEn: "Simple, flexible and invoiced",
        bodyDa:
          "Opholdet er enkelt: op til 8 værelser med fælles bad og toilet, og digital selvcheck-in via dørkode, så sjakket kan komme og gå, som arbejdet kræver. Prisen er 650 kr pr. nat inkl. moms, minimum 4 nætter, og firmaet faktureres direkte mod CVR. Skal sjakket bo samlet, kan hele huset lejes eksklusivt efter en skræddersyet aftale ud fra antal mand og periode.",
        bodyEn:
          "The stay is simple: up to 8 rooms with shared bath and toilet, and digital self check-in via a door code, so the crew can come and go as the work demands. The price is DKK 650 per night incl. VAT, minimum 4 nights, and the company is invoiced directly against its CVR number. If the crew needs to stay together, the whole house can be rented exclusively under a tailored agreement based on crew size and period.",
      },
    ],
    highlightsDa: [
      "Landligt, praktisk udgangspunkt for projekter nær Hvalsø",
      "Op til 8 værelser fra 650 kr/nat inkl. moms, min. 4 nætter",
      "Fælles køkken, bad og opholdsrum",
      "Nem digital selvcheck-in via dørkode",
      "Fakturabetaling til firmaet mod CVR",
    ],
    highlightsEn: [
      "Rural, practical base for projects near Hvalsø",
      "Up to 8 rooms from DKK 650/night incl. VAT, min. 4 nights",
      "Shared kitchen, bath and lounge",
      "Easy digital self check-in via door code",
      "Invoicing to the company against CVR",
    ],
    faqs: AREA_FAQS,
    relatedSlugs: ["naer-lejre", "naer-koege", "skurby-alternativ"],
  },
  {
    category: "overnatning",
    slug: "naer-frederikssund",
    metaTitle: "Indkvartering til håndværkere nær Frederikssund | Svaleholm Gaard",
    metaDescription:
      "Byggeprojekt omkring Frederikssund? Svaleholm Gaard udlejer indkvartering til håndværkere ved Roskilde – op til 8 værelser, fælles køkken, fakturabetaling. 650 kr/nat, min. 4 nætter.",
    heroEyebrowDa: "Håndværkerindkvartering nær Frederikssund",
    heroEyebrowEn: "Tradesperson lodging near Frederikssund",
    h1Da: "Indkvartering til håndværkere nær Frederikssund",
    h1En: "Accommodation for tradespeople near Frederikssund",
    heroSubDa:
      "Et roligt, praktisk sted for sjak på byggeprojekter og byudvikling omkring Frederikssund – enkle værelser med fælles køkken, nem selvcheck-in og fakturabetaling til firmaet.",
    heroSubEn:
      "A quiet, practical base for crews on construction and development projects around Frederikssund – simple rooms with a shared kitchen, easy self check-in and company invoicing.",
    image: "/images/natur-4.jpg",
    imageAlt: "Landskab og natur nær Svaleholm Gaard mod Frederikssund",
    jsonLdName: "Indkvartering til håndværkere nær Frederikssund",
    jsonLdDescription:
      "Svaleholm Gaard udlejer enkle værelser til håndværkere på projekt nær Frederikssund og Roskilde. Fælles køkken, fakturabetaling, 650 kr pr. nat, min. 4 nætter.",
    breadcrumbLabel: "Håndværkere nær Frederikssund",
    intro: [
      {
        headingDa: "Sjak på byggeri og byudvikling omkring Frederikssund",
        headingEn: "Crews on construction and development around Frederikssund",
        bodyDa:
          "Byudvikling og byggeri omkring Frederikssund trækker håndværkere til i perioder, hvor det er praktisk at bo samlet tæt på projektet. I stedet for en skurvogn bor sjakket på Svaleholm Gaard i enkle værelser med et fælles køkken, hvor I selv kan lave mad efter en lang dag, og et fælles opholdsrum til at slappe af i. Her er ro til at hvile ordentligt, inden næste arbejdsdag starter – en rigtig seng, et rigtigt bad og plads til at trække sig tilbage.",
        bodyEn:
          "Development and construction around Frederikssund bring in tradespeople for periods where it's practical to stay together near the project. Instead of a site cabin, the crew stays at Svaleholm Gaard in simple rooms with a shared kitchen where you can cook after a long day, and a shared lounge to unwind in. There's calm here to rest properly before the next working day starts – a real bed, a real bath, and space to retreat.",
      },
      {
        headingDa: "Enkelt, fleksibelt og fakturérbart",
        headingEn: "Simple, flexible and invoiced",
        bodyDa:
          "Der er op til 8 enkle værelser med fælles bad og toilet, og digital selvcheck-in via dørkode betyder fleksibel ankomst og afgang. Prisen er 650 kr pr. nat inkl. moms, minimum 4 nætter, og firmaet faktureres direkte mod CVR, så administrationen er enkel. Skal sjakket bo samlet gennem projektet, kan hele huset lejes eksklusivt efter en skræddersyet aftale.",
        bodyEn:
          "There are up to 8 simple rooms with shared bath and toilet, and digital self check-in via a door code means flexible arrival and departure. The price is DKK 650 per night incl. VAT, minimum 4 nights, and the company is invoiced directly against its CVR number, keeping administration simple. If the crew needs to stay together for the project, the whole house can be rented exclusively under a tailored agreement.",
      },
    ],
    highlightsDa: [
      "Landligt, praktisk udgangspunkt for projekter nær Frederikssund",
      "Op til 8 værelser fra 650 kr/nat inkl. moms, min. 4 nætter",
      "Fælles køkken, bad og opholdsrum",
      "Nem digital selvcheck-in via dørkode",
      "Fakturabetaling til firmaet mod CVR",
    ],
    highlightsEn: [
      "Rural, practical base for projects near Frederikssund",
      "Up to 8 rooms from DKK 650/night incl. VAT, min. 4 nights",
      "Shared kitchen, bath and lounge",
      "Easy digital self check-in via door code",
      "Invoicing to the company against CVR",
    ],
    faqs: AREA_FAQS,
    relatedSlugs: ["naer-holbaek", "mandskabsindkvartering-roskilde", "langtidsleje-haandvaerkere"],
  },

  // ─── Usecase · håndværker-formål ───────────────────────────────────────────
  {
    category: "usecase",
    slug: "mandskabsindkvartering-roskilde",
    metaTitle: "Mandskabsindkvartering i Roskilde | Svaleholm Gaard",
    metaDescription:
      "Indkvartering af mandskab og håndværkere i Roskilde-området. Op til 8 værelser eller hele huset til sjakket, fælles køkken, fakturabetaling. 650 kr/nat, min. 4 nætter.",
    heroEyebrowDa: "Mandskabsindkvartering",
    heroEyebrowEn: "Crew accommodation",
    h1Da: "Mandskabsindkvartering i Roskilde-området",
    h1En: "Crew accommodation in the Roskilde area",
    heroSubDa:
      "Indkvartering til håndværkere og mandskab på projekt i Roskilde-området – enkeltværelser eller hele huset, fakturabetaling og nem selvcheck-in.",
    heroSubEn:
      "Accommodation for tradespeople and crews on a project in the Roskilde area – single rooms or the whole house, company invoicing and easy self check-in.",
    image: "/images/vaerelse-seng.jpg",
    imageAlt: "Enkelt værelse til mandskabsindkvartering på Svaleholm Gaard nær Roskilde",
    jsonLdName: "Mandskabsindkvartering i Roskilde-området",
    jsonLdDescription:
      "Svaleholm Gaard udlejer enkeltværelser eller hele gården til mandskab og håndværkere på projekt i Roskilde-området. Fælles køkken, fakturabetaling, 650 kr pr. nat, min. 4 nætter.",
    breadcrumbLabel: "Mandskabsindkvartering Roskilde",
    serviceName: "Mandskabsindkvartering",
    serviceDescription:
      "Indkvartering af håndværkere og mandskab på projekt i Roskilde-området – enkeltværelser eller hele huset, fakturabetaling.",
    intro: [
      {
        headingDa: "Til entreprenøren og byggelederen",
        headingEn: "For the contractor and site manager",
        bodyDa:
          "Har I et sjak på 2-8 mand, der skal bo tæt på et projekt i Roskilde-området, er Svaleholm Gaard et praktisk valg for byggelederen. Gården ligger på Frederiksborgvej 388, 4000 Roskilde, med op til 8 enkle værelser, fælles køkken, fire fælles bad og toiletter samt et fælles opholdsrum. Det gør det enkelt at samle hele sjakket på én adresse, uanset om projektet varer få uger eller flere måneder.",
        bodyEn:
          "If you have a crew of 2-8 people who need to stay close to a project in the Roskilde area, Svaleholm Gaard is a practical choice for the site manager. The farm is at Frederiksborgvej 388, 4000 Roskilde, with up to 8 simple rooms, a shared kitchen, four shared baths and toilets, and a shared lounge. That makes it simple to keep the whole crew at one address, whether the project runs for a few weeks or several months.",
      },
      {
        headingDa: "Enkeltværelser eller hele huset",
        headingEn: "Single rooms or the whole house",
        bodyDa:
          "I kan booke enkeltværelser pr. mand eller leje hele huset eksklusivt til sjakket. Prisen er 650 kr pr. nat inkl. moms, minimum 4 nætter, og vi fakturerer virksomheden direkte mod CVR, så administrationen er enkel. Digital selvcheck-in via dørkode betyder, at sjakket kan ankomme og rejse fleksibelt, uden at skulle koordinere med en vært.",
        bodyEn:
          "You can book single rooms per person or rent the whole house exclusively for the crew. The price is DKK 650 per night incl. VAT, minimum 4 nights, and we invoice the company directly against its CVR number, keeping administration simple. Digital self check-in via a door code means the crew can arrive and leave flexibly, without coordinating with a host.",
      },
    ],
    highlightsDa: [
      "Enkeltværelser eller hele huset til sjakket",
      "Op til 8 værelser fra 650 kr/nat inkl. moms, min. 4 nætter",
      "Fælles køkken, bad og opholdsrum",
      "Nem digital selvcheck-in via dørkode",
      "Fakturabetaling til firmaet mod CVR",
    ],
    highlightsEn: [
      "Single rooms or the whole house for the crew",
      "Up to 8 rooms from DKK 650/night incl. VAT, min. 4 nights",
      "Shared kitchen, bath and lounge",
      "Easy digital self check-in via door code",
      "Invoicing to the company against CVR",
    ],
    faqs: USECASE_FAQS,
    relatedSlugs: ["hele-huset-til-sjak", "langtidsleje-haandvaerkere", "naer-koege"],
  },
  {
    category: "usecase",
    slug: "skurby-alternativ",
    metaTitle: "Alternativ til skurvogn og skurby | Svaleholm Gaard Roskilde",
    metaDescription:
      "Et bedre alternativ til skurvogn: rigtige værelser med køkken, bad og opholdsrum til håndværkere nær Roskilde. 650 kr/nat, min. 4 nætter, fakturabetaling.",
    heroEyebrowDa: "Alternativ til skurvogn",
    heroEyebrowEn: "Alternative to site cabins",
    h1Da: "Et alternativ til skurvogn og skurby",
    h1En: "An alternative to site cabins",
    heroSubDa:
      "Et rigtigt hus med køkken, bad og opholdsrum i stedet for skurvogn – til håndværkere på længerevarende projekt nær Roskilde.",
    heroSubEn:
      "A real house with a kitchen, bath and lounge instead of a site cabin – for tradespeople on a longer project near Roskilde.",
    image: "/images/bygning-have.jpg",
    imageAlt: "Svaleholm Gaards bygning som alternativ til skurvogn for håndværkere",
    jsonLdName: "Alternativ til skurvogn og skurby nær Roskilde",
    jsonLdDescription:
      "Svaleholm Gaard udlejer rigtige værelser med køkken, bad og opholdsrum som alternativ til skurvogn/skurby for håndværkere nær Roskilde. 650 kr pr. nat, min. 4 nætter, fakturabetaling.",
    breadcrumbLabel: "Alternativ til skurvogn",
    serviceName: "Alternativ til skurvogn",
    serviceDescription:
      "Fast indkvartering med køkken, bad og opholdsrum som alternativ til skurvogn/skurby for håndværkere nær Roskilde.",
    intro: [
      {
        headingDa: "Mere end fire vægge og en køjeseng",
        headingEn: "More than four walls and a bunk bed",
        bodyDa:
          "På et længerevarende projekt betyder det noget, hvor sjakket bor om natten. En skurvogn giver et sted at sove, men sjældent plads til at lave mad ordentligt eller falde ned efter en lang dag. Svaleholm Gaard er et rigtigt hus med et fælles køkken, hvor I selv kan tilberede mad, fire fælles bad og toiletter samt et opholdsrum til at slappe af i – fordele, der gør en forskel, når projektet varer uger eller måneder.",
        bodyEn:
          "On a longer project, it matters where the crew sleeps at night. A site cabin gives you somewhere to sleep, but rarely room to cook properly or wind down after a long day. Svaleholm Gaard is a real house with a shared kitchen where you can cook your own food, four shared baths and toilets, and a lounge to relax in – benefits that matter when a project runs for weeks or months.",
      },
      {
        headingDa: "Samme pris-logik, bedre forhold",
        headingEn: "Same price logic, better conditions",
        bodyDa:
          "Overnatning koster 650 kr pr. nat inkl. moms, minimum 4 nætter, og vi fakturerer firmaet direkte mod CVR – lige så enkelt som en skurvognsaftale. Digital selvcheck-in via dørkode betyder, at sjakket selv styrer ankomst og afgang. Er der brug for plads til et helt sjak, kan hele huset lejes eksklusivt efter en skræddersyet aftale.",
        bodyEn:
          "A stay costs DKK 650 per night incl. VAT, minimum 4 nights, and we invoice the company directly against its CVR number – just as simple as a site-cabin agreement. Digital self check-in via a door code means the crew controls its own arrival and departure. If there's room needed for a whole crew, the whole house can be rented exclusively under a tailored agreement.",
      },
    ],
    highlightsDa: [
      "Rigtigt køkken i stedet for kogeplade i skurvognen",
      "Fire fælles bad og toilet samt opholdsrum",
      "Op til 8 værelser fra 650 kr/nat inkl. moms, min. 4 nætter",
      "Nem digital selvcheck-in via dørkode",
      "Fakturabetaling til firmaet mod CVR",
    ],
    highlightsEn: [
      "A real kitchen instead of a hot plate in the cabin",
      "Four shared baths and toilets plus a lounge",
      "Up to 8 rooms from DKK 650/night incl. VAT, min. 4 nights",
      "Easy digital self check-in via door code",
      "Invoicing to the company against CVR",
    ],
    faqs: USECASE_FAQS,
    relatedSlugs: ["mandskabsindkvartering-roskilde", "hele-huset-til-sjak", "naer-hvalsoe"],
  },
  {
    category: "usecase",
    slug: "hele-huset-til-sjak",
    metaTitle: "Lej hele huset til sjakket | Svaleholm Gaard Roskilde",
    metaDescription:
      "Lej hele gården eksklusivt til dit sjak nær Roskilde – op til 8 værelser, fælles køkken og opholdsrum. Skræddersyet aftale, fakturabetaling, min. 4 nætter.",
    heroEyebrowDa: "Hele huset til ét sjak",
    heroEyebrowEn: "The whole house for one crew",
    h1Da: "Lej hele huset til sjakket",
    h1En: "Rent the whole house for your crew",
    heroSubDa:
      "Lej hele Svaleholm Gaard eksklusivt til sjakket – op til 8 værelser, fælles køkken og opholdsrum, skræddersyet aftale efter antal mand og periode.",
    heroSubEn:
      "Rent the whole of Svaleholm Gaard exclusively for your crew – up to 8 rooms, a shared kitchen and lounge, tailored to crew size and period.",
    image: "/images/gaardsplads.jpg",
    imageAlt: "Svaleholm Gaards gårdsplads ved eksklusiv udlejning til ét sjak",
    jsonLdName: "Hele huset til ét sjak nær Roskilde",
    jsonLdDescription:
      "Eksklusiv leje af hele Svaleholm Gaard til ét firmas sjak nær Roskilde – op til 8 værelser, fælles køkken og opholdsrum, skræddersyet aftale.",
    breadcrumbLabel: "Hele huset til sjakket",
    serviceName: "Hele huset til ét sjak",
    serviceDescription:
      "Eksklusiv leje af hele gården til ét firmas sjak nær Roskilde, skræddersyet aftale efter antal mand og periode.",
    intro: [
      {
        headingDa: "Hele sjakket under ét tag",
        headingEn: "The whole crew under one roof",
        bodyDa:
          "Når et sjak skal bo sammen i en periode, er det en fordel at have hele huset for sig selv. Svaleholm Gaard kan lejes eksklusivt til ét firma, så I har op til 8 værelser, et fælles køkken og et fælles opholdsrum for jer selv – uden at dele med andre gæster. Det gør det nemt at holde sammen på sjakket, både i arbejdstiden og om aftenen.",
        bodyEn:
          "When a crew needs to stay together for a period, it's an advantage to have the whole house to yourselves. Svaleholm Gaard can be rented exclusively to one company, so you have up to 8 rooms, a shared kitchen and a shared lounge entirely to yourselves – without sharing with other guests. That makes it easy to keep the crew together, both during work hours and in the evening.",
      },
      {
        headingDa: "En aftale, der passer til jeres projekt",
        headingEn: "An agreement that fits your project",
        bodyDa:
          "Vi laver en skræddersyet aftale ud fra antal mand og periode, og fakturerer firmaet direkte mod CVR. Udgangspunktet er 650 kr pr. nat pr. værelse inkl. moms, minimum 4 nætter. Digital selvcheck-in via dørkode betyder, at sjakket selv styrer ankomst og afgang, uden at skulle koordinere med en vært.",
        bodyEn:
          "We tailor the agreement to crew size and period, and invoice the company directly against its CVR number. The baseline is DKK 650 per night per room incl. VAT, minimum 4 nights. Digital self check-in via a door code means the crew controls its own arrival and departure, without coordinating with a host.",
      },
    ],
    highlightsDa: [
      "Hele gården lejes eksklusivt til ét sjak",
      "Op til 8 værelser, fælles køkken og opholdsrum",
      "Skræddersyet aftale efter antal mand og periode",
      "Fra 650 kr/nat pr. værelse inkl. moms, min. 4 nætter",
      "Fakturabetaling til firmaet mod CVR",
    ],
    highlightsEn: [
      "The whole house rented exclusively for one crew",
      "Up to 8 rooms, shared kitchen and lounge",
      "Tailored agreement based on crew size and period",
      "From DKK 650/night per room incl. VAT, min. 4 nights",
      "Invoicing to the company against CVR",
    ],
    faqs: USECASE_FAQS,
    relatedSlugs: ["mandskabsindkvartering-roskilde", "langtidsleje-haandvaerkere", "naer-lejre"],
  },
  {
    category: "usecase",
    slug: "langtidsleje-haandvaerkere",
    metaTitle: "Langtidsleje til håndværkere nær Roskilde | Svaleholm Gaard",
    metaDescription:
      "Langvarigt bygge- eller renoveringsprojekt? Langtidsindkvartering til håndværkere nær Roskilde med fælles køkken og fakturabetaling. Fra 650 kr/nat, skræddersyet aftale.",
    heroEyebrowDa: "Langtidsleje til håndværkere",
    heroEyebrowEn: "Long-stay lodging for tradespeople",
    h1Da: "Langtidsleje til håndværkere på projekt",
    h1En: "Long-stay lodging for tradespeople",
    heroSubDa:
      "En stabil base nær projektet, når arbejdet varer uger eller måneder – skræddersyet langtidsaftale med fakturabetaling og nem selvcheck-in.",
    heroSubEn:
      "A stable base near the project when the work runs for weeks or months – a tailored long-stay agreement with company invoicing and easy self check-in.",
    image: "/images/have-sti.jpg",
    imageAlt: "Have og sti ved Svaleholm Gaard til langtidsleje for håndværkere",
    jsonLdName: "Langtidsleje til håndværkere nær Roskilde",
    jsonLdDescription:
      "Svaleholm Gaard udlejer langtidsindkvartering til håndværkere på længerevarende projekter nær Roskilde – skræddersyet aftale og fakturabetaling.",
    breadcrumbLabel: "Langtidsleje til håndværkere",
    serviceName: "Langtidsleje til håndværkere",
    serviceDescription:
      "Langtidsindkvartering til håndværkere på længerevarende projekter nær Roskilde, skræddersyet aftale og fakturabetaling.",
    intro: [
      {
        headingDa: "Til projekter, der varer uger eller måneder",
        headingEn: "For projects running weeks or months",
        bodyDa:
          "Nogle projekter varer langt mere end et par dage, og så er det en fordel at have en stabil base nær pladsen. Svaleholm Gaard tilbyder langtidsindkvartering til håndværkere, der skal bo i området over en længere periode – med op til 8 enkle værelser, fælles køkken og et opholdsrum, hvor sjakket kan falde ned efter arbejdsdagen.",
        bodyEn:
          "Some projects run for far more than a few days, and then it's an advantage to have a stable base near the site. Svaleholm Gaard offers long-stay lodging for tradespeople who need to stay in the area over a longer period – with up to 8 simple rooms, a shared kitchen and a lounge where the crew can unwind after the working day.",
      },
      {
        headingDa: "Skræddersyet aftale, enkel administration",
        headingEn: "A tailored agreement, simple administration",
        bodyDa:
          "Vi laver en skræddersyet langtidsaftale ud fra projektets varighed og antal mand, med en udgangspris på 650 kr pr. nat inkl. moms og minimum 4 nætter. Firmaet faktureres direkte mod CVR, og digital selvcheck-in via dørkode gør det nemt for sjakket at komme og gå, som arbejdet kræver.",
        bodyEn:
          "We tailor a long-stay agreement to the project's duration and crew size, with a baseline price of DKK 650 per night incl. VAT and a minimum of 4 nights. The company is invoiced directly against its CVR number, and digital self check-in via a door code makes it easy for the crew to come and go as the work requires.",
      },
    ],
    highlightsDa: [
      "Stabil base til projekter, der varer uger eller måneder",
      "Skræddersyet langtidsaftale efter varighed og antal mand",
      "Fra 650 kr/nat inkl. moms, min. 4 nætter",
      "Fælles køkken, bad og opholdsrum",
      "Fakturabetaling til firmaet mod CVR",
    ],
    highlightsEn: [
      "A stable base for projects running weeks or months",
      "Tailored long-stay agreement based on duration and crew size",
      "From DKK 650/night incl. VAT, min. 4 nights",
      "Shared kitchen, bath and lounge",
      "Invoicing to the company against CVR",
    ],
    faqs: USECASE_FAQS,
    relatedSlugs: ["mandskabsindkvartering-roskilde", "hele-huset-til-sjak", "naer-frederikssund"],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** The site-relative path for a landing page, e.g. "/overnatning/naer-lejre". */
export function landingPagePath(p: Pick<LandingPage, "category" | "slug">): string {
  const prefix = p.category === "usecase" ? "til-projektet" : "overnatning";
  return `/${prefix}/${p.slug}`;
}

/** Find a landing page by category + slug (used by the dynamic routes). */
export function findLandingPage(
  category: LandingCategory,
  slug: string | undefined,
): LandingPage | undefined {
  if (!slug) return undefined;
  return LANDING_PAGES.find((p) => p.category === category && p.slug === slug);
}

/** All landing-page paths (used by the sitemap + llms.txt). */
export function landingPagePaths(): string[] {
  return LANDING_PAGES.map(landingPagePath);
}

/** Landing pages in a category (used for the hub link blocks). */
export function landingPagesByCategory(category: LandingCategory): LandingPage[] {
  return LANDING_PAGES.filter((p) => p.category === category);
}
