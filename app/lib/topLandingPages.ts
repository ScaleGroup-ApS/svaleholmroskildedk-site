// ─────────────────────────────────────────────────────────────────────────────
// Top-level, search-intent landing pages (#231 G12).
//
// STRUKTUR (Theo/teknik): slug=top-level path, meta, canonical, JSON-LD, routing.
// COPY (Maja/SEO): body/facts her er et ÆRLIGT FØRSTE UDKAST (~150-200 ord).
// Maja udbygger hver side til 300-600 ord unik tekst + keyword/FAQ-optimering.
//
// Reglen om ærlig copy gælder: ingen opfundne afstande/køretider og ingen
// opdigtede tal. Priser matcher Prisberegner.tsx (650/nat, hele gården 5.200/nat).
// ─────────────────────────────────────────────────────────────────────────────

export type TopLanding = {
  path: string;
  image: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
  eyebrowDa: string; eyebrowEn: string;
  h1aDa: string; h1aEn: string;
  h1bDa: string; h1bEn: string;
  subDa: string; subEn: string;
  bodyDa: string[]; bodyEn: string[];
  factsDa: string[]; factsEn: string[];
  jsonLdName: string;
  jsonLdDescription: string;
  breadcrumbLabel: string;
};

const SHARED_FACTS_DA = [
  "Op til 8 enkle værelser med fælles køkken, bad og opholdsrum",
  "Selv-check-in med dørkode – ankom fleksibelt, også sent",
  "Check-ind fra kl. 15 · check-ud senest kl. 12",
  "Rengøring og linned inkluderet",
  "Betaling forud via betalingslink; kvittering med CVR",
];
const SHARED_FACTS_EN = [
  "Up to 8 simple rooms with a shared kitchen, bath and lounge",
  "Self check-in with a door code – arrive flexibly, even late",
  "Check-in from 3 pm · check-out by 12 noon",
  "Cleaning and linen included",
  "Payment in advance by link; receipt with CVR",
];

export const TOP_LANDING_PAGES: TopLanding[] = [
  {
    path: "/haandvaerkere",
    image: "/images/gaardsplads.jpg",
    imageAlt: "Svaleholm Gæstegaards gårdsplads nær Roskilde",
    metaTitle: "Indkvartering til håndværkere ved Roskilde | Svaleholm Gæstegaard",
    metaDescription: "Overnatning til håndværkere og sjak nær Roskilde – enkle værelser eller hele huset, fælles køkken og selv-check-in. Fra 650 kr/nat.",
    eyebrowDa: "Til sjak & firmaer", eyebrowEn: "For crews & companies",
    h1aDa: "Indkvartering til ", h1aEn: "Accommodation for ",
    h1bDa: "håndværkere", h1bEn: "tradespeople",
    subDa: "Enkle værelser eller hele huset til sjakket – tæt på pladsen ved Roskilde, med fælles køkken, selv-check-in og betaling via betalingslink.",
    subEn: "Simple rooms or the whole house for the crew – close to the site near Roskilde, with a shared kitchen, self check-in and payment by link.",
    bodyDa: [
      "Svaleholm Gæstegaard er en praktisk base for håndværkere og sjak, der arbejder på et projekt i Roskilde-området. I bor samlet under samme tag med fælles køkken, bad og opholdsrum, så hele sjakket kan slappe af efter arbejdsdagen uden at skulle koordinere med en vært.",
      "Book enkeltværelser mand for mand, eller lej hele huset eksklusivt til firmaet. Der er nem selv-check-in med dørkode, parkering til varevogne, og betalingen sker forud via et sikkert betalingslink – kvittering med CVR sendes automatisk, så administrationen er enkel for byggelederen.",
    ],
    bodyEn: [
      "Svaleholm Gæstegaard is a practical base for tradespeople and crews working a project in the Roskilde area. You stay together under one roof with a shared kitchen, bath and lounge, so the whole crew can unwind after the workday without coordinating with a host.",
      "Book single rooms one by one, or rent the whole house exclusively for the company. There is easy self check-in with a door code, parking for vans, and payment is made in advance via a secure link – a receipt with CVR is sent automatically, keeping administration simple for the site manager.",
    ],
    factsDa: ["Fra 650 kr/nat pr. værelse · min. 4 nætter", ...SHARED_FACTS_DA],
    factsEn: ["From DKK 650/night per room · min. 4 nights", ...SHARED_FACTS_EN],
    jsonLdName: "Indkvartering til håndværkere ved Roskilde – Svaleholm Gæstegaard",
    jsonLdDescription: "Overnatning til håndværkere og sjak nær Roskilde – enkle værelser eller hele huset, fælles køkken og selv-check-in.",
    breadcrumbLabel: "Håndværkere",
  },
  {
    path: "/hele-gaarden",
    image: "/images/bygning-have.jpg",
    imageAlt: "Svaleholm Gæstegaards bygning og have ved Roskilde",
    metaTitle: "Lej hele gården ved Roskilde | Svaleholm Gæstegaard",
    metaDescription: "Lej hele Svaleholm Gæstegaard eksklusivt til firmaet eller gruppen – alle 8 værelser, fælles køkken og opholdsrum. 5.200 kr/nat, min. 2 nætter.",
    eyebrowDa: "Til ét firma eller én gruppe", eyebrowEn: "For one company or group",
    h1aDa: "Lej hele ", h1aEn: "Rent the whole ",
    h1bDa: "gården", h1bEn: "farm",
    subDa: "Hele Svaleholm Gæstegaard eksklusivt til jer – alle 8 værelser, fælles køkken og opholdsrum under samme tag. 5.200 kr/nat, min. 2 nætter.",
    subEn: "All of Svaleholm Gæstegaard exclusively for you – all 8 rooms, a shared kitchen and lounge under one roof. DKK 5,200/night, minimum 2 nights.",
    bodyDa: [
      "Skal hele sjakket eller gruppen bo samlet, kan I leje hele gården eksklusivt. I får alle 8 værelser, det fælles køkken og opholdsrummet for jer selv – ideelt til et længere projekt, et firma på rejse eller en gruppe, der vil være samlet.",
      "Prisen for hele gården er 5.200 kr pr. nat inkl. moms med minimum 2 nætter. Der er selv-check-in med dørkode, så I styrer selv ankomst og afgang, og betalingen sker forud via betalingslink med kvittering og CVR.",
    ],
    bodyEn: [
      "When the whole crew or group needs to stay together, you can rent the whole farm exclusively. You get all 8 rooms, the shared kitchen and the lounge to yourselves – ideal for a longer project, a company travelling together or a group that wants to be in one place.",
      "The price for the whole farm is DKK 5,200 per night incl. VAT with a minimum of 2 nights. There is self check-in with a door code, so you control arrival and departure, and payment is made in advance by link with a receipt and CVR.",
    ],
    factsDa: ["Hele gården 5.200 kr/nat · min. 2 nætter · alle 8 værelser", ...SHARED_FACTS_DA],
    factsEn: ["Whole farm DKK 5,200/night · min. 2 nights · all 8 rooms", ...SHARED_FACTS_EN],
    jsonLdName: "Lej hele gården ved Roskilde – Svaleholm Gæstegaard",
    jsonLdDescription: "Hele Svaleholm Gæstegaard eksklusivt til firmaet eller gruppen – alle 8 værelser, fælles køkken og opholdsrum.",
    breadcrumbLabel: "Hele gården",
  },
  {
    path: "/risoe",
    image: "/images/hero-mark.jpg",
    imageAlt: "Landlige omgivelser ved Svaleholm Gæstegaard nær Risø",
    metaTitle: "Overnatning nær DTU Risø | Svaleholm Gæstegaard Roskilde",
    metaDescription: "Overnatning for håndværkere, konsulenter og projektfolk i nærområdet omkring DTU Risø ved Roskilde. Enkle værelser, fælles køkken, selv-check-in.",
    eyebrowDa: "Nær DTU Risø", eyebrowEn: "Near DTU Risø",
    h1aDa: "Overnatning nær ", h1aEn: "Accommodation near ",
    h1bDa: "DTU Risø", h1bEn: "DTU Risø",
    subDa: "En rolig base i nærområdet for håndværkere, konsulenter og projektfolk med opgaver omkring DTU Risø ved Roskilde.",
    subEn: "A quiet base in the area for tradespeople, consultants and project staff with assignments around DTU Risø near Roskilde.",
    bodyDa: [
      "Har I et projekt eller en opgave omkring DTU Risø, er Svaleholm Gæstegaard en praktisk base i landlige omgivelser i nærområdet ved Roskilde. I bor samlet med fælles køkken, bad og opholdsrum og kan ankomme fleksibelt med selv-check-in.",
      "Enkeltværelser bookes mand for mand, eller lej hele huset til holdet. Betalingen sker forud via betalingslink med kvittering og CVR, så det er enkelt at afregne gennem firmaet.",
    ],
    bodyEn: [
      "If you have a project or assignment around DTU Risø, Svaleholm Gæstegaard is a practical base in rural surroundings in the area near Roskilde. You stay together with a shared kitchen, bath and lounge and can arrive flexibly with self check-in.",
      "Single rooms are booked one by one, or rent the whole house for the team. Payment is made in advance by link with a receipt and CVR, so settling through the company is simple.",
    ],
    factsDa: ["Fra 650 kr/nat pr. værelse · min. 4 nætter", "I nærområdet ved DTU Risø og Roskilde", ...SHARED_FACTS_DA],
    factsEn: ["From DKK 650/night per room · min. 4 nights", "In the area near DTU Risø and Roskilde", ...SHARED_FACTS_EN],
    jsonLdName: "Overnatning nær DTU Risø – Svaleholm Gæstegaard",
    jsonLdDescription: "Overnatning for håndværkere, konsulenter og projektfolk i nærområdet omkring DTU Risø ved Roskilde.",
    breadcrumbLabel: "DTU Risø",
  },
  {
    path: "/roskilde-festival",
    image: "/images/ankomst-velkommen.png",
    imageAlt: "Svaleholm Gæstegaard – rolig base nær Roskilde",
    metaTitle: "Overnatning nær Roskilde Festival | Svaleholm Gæstegaard",
    metaDescription: "En rigtig seng og et bad nær Roskilde Festival – til produktionshold, leverandører og grupper, der vil bo fast frem for i telt. Fælles køkken, selv-check-in.",
    eyebrowDa: "Under Roskilde Festival", eyebrowEn: "During Roskilde Festival",
    h1aDa: "Overnatning nær ", h1aEn: "Accommodation near ",
    h1bDa: "Roskilde Festival", h1bEn: "Roskilde Festival",
    subDa: "En rigtig seng, et bad og ro til at lade op – nær Roskilde for produktionshold, leverandører og grupper, der hellere vil bo fast end i telt.",
    subEn: "A real bed, a shower and quiet to recharge – near Roskilde for production crews, suppliers and groups who would rather stay put than camp.",
    bodyDa: [
      "Under Roskilde Festival er Svaleholm Gæstegaard et roligt alternativ til teltet for jer, der arbejder på eller omkring festivalen – produktionshold, leverandører, teknikere eller en gruppe, der vil sove ordentligt og vågne udhvilet.",
      "I bor samlet med fælles køkken, bad og opholdsrum, og der er selv-check-in med dørkode, så I kan komme og gå i jeres eget tempo. Enkeltværelser eller hele huset – betaling sker forud via betalingslink med kvittering og CVR.",
    ],
    bodyEn: [
      "During Roskilde Festival, Svaleholm Gæstegaard is a calm alternative to the tent for those working on or around the festival – production crews, suppliers, technicians or a group that wants proper sleep and to wake up rested.",
      "You stay together with a shared kitchen, bath and lounge, and there is self check-in with a door code, so you can come and go at your own pace. Single rooms or the whole house – payment is made in advance by link with a receipt and CVR.",
    ],
    factsDa: ["Fra 650 kr/nat pr. værelse · min. 4 nætter", "Rolig base nær Roskilde", ...SHARED_FACTS_DA],
    factsEn: ["From DKK 650/night per room · min. 4 nights", "A quiet base near Roskilde", ...SHARED_FACTS_EN],
    jsonLdName: "Overnatning nær Roskilde Festival – Svaleholm Gæstegaard",
    jsonLdDescription: "En rigtig seng og et bad nær Roskilde Festival – til produktionshold, leverandører og grupper, der vil bo fast frem for i telt.",
    breadcrumbLabel: "Roskilde Festival",
  },
];

export function findTopLanding(path: string): TopLanding | undefined {
  return TOP_LANDING_PAGES.find((p) => p.path === path);
}

export function topLandingPaths(): string[] {
  return TOP_LANDING_PAGES.map((p) => p.path);
}
