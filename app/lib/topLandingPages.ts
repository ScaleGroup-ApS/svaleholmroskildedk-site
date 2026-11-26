// ─────────────────────────────────────────────────────────────────────────────
// Top-level, search-intent landing pages (#231 G12).
//
// STRUKTUR (Theo/teknik): slug=top-level path, meta, canonical, JSON-LD, routing.
// COPY (Maja/SEO): body/facts her er udbygget til 300-600 ord unik, keyword-
// optimeret tekst pr. søgehensigt, DA+EN.
//
// Reglen om ærlig copy gælder: ingen opfundne afstande/køretider og ingen
// opdigtede tal. Priser matcher Prisberegner.tsx (650/nat, hele gården 5.200/nat).
// Overnatnings-sprog: book/ophold/overnatning — ALDRIG lej/leje/udlej/depositum/
// faktura (overnatningssted, ikke udlejning).
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
    imageAlt: "Svaleholm Gæstegaards gårdsplads med parkering til varevogne nær Roskilde",
    metaTitle: "Indkvartering til håndværkere ved Roskilde | Svaleholm Gæstegaard",
    metaDescription: "Overnatning til håndværkere og sjak nær Roskilde – enkle værelser eller hele huset, fælles køkken, parkering til varevogne og selv-check-in. Fra 650 kr/nat.",
    eyebrowDa: "Til sjak & firmaer", eyebrowEn: "For crews & companies",
    h1aDa: "Indkvartering til ", h1aEn: "Accommodation for ",
    h1bDa: "håndværkere", h1bEn: "tradespeople",
    subDa: "Enkle værelser eller hele huset til sjakket – tæt på pladsen ved Roskilde, med fælles køkken, parkering til varevogne, selv-check-in og betaling via betalingslink.",
    subEn: "Simple rooms or the whole house for the crew – close to the site near Roskilde, with a shared kitchen, parking for vans, self check-in and payment by link.",
    bodyDa: [
      "Svaleholm Gæstegaard er en praktisk base for håndværkere og sjak, der arbejder på et projekt i Roskilde-området. I bor samlet under samme tag med fælles køkken, bad og opholdsrum, så hele sjakket kan spise, slappe af og lade op efter arbejdsdagen uden at skulle koordinere med en vært. Det er indkvartering til håndværkere tænkt som et rigtigt sted at bo – ikke en skurvogn på pladsen.",
      "I vælger selv, hvordan I bor: book enkeltværelser mand for mand, eller book hele huset eksklusivt til firmaet. Der er nem selv-check-in med dørkode, så sjakket kan ankomme fleksibelt – også sent om aftenen – og der er parkering til varevogne direkte på gården. Betalingen sker forud via et sikkert betalingslink, og kvittering med CVR sendes automatisk, så administrationen er enkel for byggelederen.",
      "Hvert værelse er enkelt og praktisk med en rigtig seng, og der er fire fælles bad og toiletter, et fælles køkken, hvor I selv kan lave mad, og et opholdsrum til at samles i om aftenen. Wifi, vaskemaskine, rengøring og linned er inkluderet, så sjakket kan møde udhvilet på pladsen næste morgen. Gården ligger i rolige, landlige omgivelser tæt på Roskilde – og dermed i køreafstand til byggepladser i Lejre, Køge, Holbæk og Frederikssund.",
      "Prisen er fra 650 kr pr. nat pr. værelse inkl. moms med minimum 4 nætter. Skal hele holdet bo samlet gennem et længere projekt, kan I booke hele gården for 5.200 kr pr. nat med minimum 2 nætter – alle 8 værelser for jer selv. Check-ind er fra kl. 15 og check-ud senest kl. 12. Fortæl os antal mand og periode, så laver vi en fast aftale, der passer til projektet.",
    ],
    bodyEn: [
      "Svaleholm Gæstegaard is a practical base for tradespeople and crews working a project in the Roskilde area. You stay together under one roof with a shared kitchen, bath and lounge, so the whole crew can eat, unwind and recharge after the workday without coordinating with a host. It is accommodation for tradespeople designed as a proper place to stay – not a site cabin on the plot.",
      "You choose how you stay: book single rooms one by one, or book the whole house exclusively for the company. There is easy self check-in with a door code, so the crew can arrive flexibly – even late at night – and there is parking for vans right at the farm. Payment is made in advance via a secure link, and a receipt with CVR is sent automatically, keeping administration simple for the site manager.",
      "Each room is simple and practical with a real bed, and there are four shared baths and toilets, a shared kitchen where you can cook, and a lounge to gather in during the evening. Wifi, a washing machine, cleaning and linen are included, so the crew can turn up to the site rested the next morning. The farm sits in calm, rural surroundings close to Roskilde – within driving distance of sites in Lejre, Køge, Holbæk and Frederikssund.",
      "The price is from DKK 650 per night per room incl. VAT with a minimum of 4 nights. If the whole team needs to stay together through a longer project, you can book the whole farm for DKK 5,200 per night with a minimum of 2 nights – all 8 rooms to yourselves. Check-in is from 3 pm and check-out by 12 noon. Tell us the crew size and period, and we'll set up a fixed agreement that fits the project.",
    ],
    factsDa: ["Fra 650 kr/nat pr. værelse · min. 4 nætter", "Parkering til varevogne på gården", ...SHARED_FACTS_DA],
    factsEn: ["From DKK 650/night per room · min. 4 nights", "Parking for vans at the farm", ...SHARED_FACTS_EN],
    jsonLdName: "Indkvartering til håndværkere ved Roskilde – Svaleholm Gæstegaard",
    jsonLdDescription: "Overnatning til håndværkere og sjak nær Roskilde – enkle værelser eller hele huset, fælles køkken, parkering til varevogne og selv-check-in.",
    breadcrumbLabel: "Håndværkere",
  },
  {
    path: "/hele-gaarden",
    image: "/images/bygning-have.jpg",
    imageAlt: "Svaleholm Gæstegaards bygning og have – hele gården til ét firma eller én gruppe ved Roskilde",
    metaTitle: "Book hele gården ved Roskilde | Svaleholm Gæstegaard",
    metaDescription: "Hele Svaleholm Gæstegaard eksklusivt til firmaet eller gruppen – alle 8 værelser, fælles køkken og opholdsrum under samme tag. 5.200 kr/nat, min. 2 nætter.",
    eyebrowDa: "Til ét firma eller én gruppe", eyebrowEn: "For one company or group",
    h1aDa: "Book hele ", h1aEn: "Book the whole ",
    h1bDa: "gården", h1bEn: "farm",
    subDa: "Hele Svaleholm Gæstegaard eksklusivt til jer – alle 8 værelser, fælles køkken og opholdsrum under samme tag. 5.200 kr/nat, min. 2 nætter.",
    subEn: "All of Svaleholm Gæstegaard exclusively for you – all 8 rooms, a shared kitchen and lounge under one roof. DKK 5,200/night, minimum 2 nights.",
    bodyDa: [
      "Skal hele sjakket eller gruppen bo samlet, kan I booke hele gården eksklusivt. I får alle 8 værelser, det fælles køkken og opholdsrummet for jer selv – uden at dele med andre gæster. Det er oplagt til et længere byggeprojekt, et firma på rejse, et kursus- eller teamophold eller en gruppe, der bare gerne vil være samlet ét sted i rolige, landlige omgivelser tæt på Roskilde.",
      "Når I har hele gården for jer selv, kan I holde sammen på holdet både i arbejdstiden og om aftenen. Køkkenet giver plads til at lave mad sammen, opholdsrummet til at samles bagefter, og de 8 værelser betyder, at alle har deres eget sted at trække sig tilbage til. Der er wifi, vaskemaskine, parkering til varevogne og fire fælles bad og toiletter, og rengøring og linned er inkluderet.",
      "Prisen for hele gården er 5.200 kr pr. nat inkl. moms med minimum 2 nætter – en fast pris for alle 8 værelser, uanset om I er et fuldt sjak eller en mindre gruppe. Der er selv-check-in med dørkode, så I selv styrer ankomst og afgang; check-ind er fra kl. 15 og check-ud senest kl. 12. Betalingen sker forud via betalingslink, og kvittering med CVR sendes automatisk.",
      "Skal I bruge gården gennem et længere forløb, laver vi en skræddersyet aftale ud fra periode og antal mand. Fortæl os datoerne og holdets størrelse, så vender vi hurtigt tilbage med et konkret tilbud på hele gården.",
    ],
    bodyEn: [
      "When the whole crew or group needs to stay together, you can book the whole farm exclusively. You get all 8 rooms, the shared kitchen and the lounge to yourselves – without sharing with other guests. It's ideal for a longer construction project, a company travelling together, a course or team stay, or a group that simply wants to be in one place in calm, rural surroundings close to Roskilde.",
      "With the whole farm to yourselves, you can keep the team together both during work hours and in the evening. The kitchen gives room to cook together, the lounge to gather afterwards, and the 8 rooms mean everyone has their own place to retreat to. There is wifi, a washing machine, parking for vans and four shared baths and toilets, and cleaning and linen are included.",
      "The price for the whole farm is DKK 5,200 per night incl. VAT with a minimum of 2 nights – a flat price for all 8 rooms, whether you are a full crew or a smaller group. There is self check-in with a door code, so you control arrival and departure; check-in is from 3 pm and check-out by 12 noon. Payment is made in advance by link, and a receipt with CVR is sent automatically.",
      "If you need the farm across a longer period, we'll put together a tailored agreement based on dates and team size. Tell us the dates and how many people, and we'll come back quickly with a concrete quote for the whole farm.",
    ],
    factsDa: ["Hele gården 5.200 kr/nat · min. 2 nætter · alle 8 værelser", ...SHARED_FACTS_DA],
    factsEn: ["Whole farm DKK 5,200/night · min. 2 nights · all 8 rooms", ...SHARED_FACTS_EN],
    jsonLdName: "Book hele gården ved Roskilde – Svaleholm Gæstegaard",
    jsonLdDescription: "Hele Svaleholm Gæstegaard eksklusivt til firmaet eller gruppen – alle 8 værelser, fælles køkken og opholdsrum.",
    breadcrumbLabel: "Hele gården",
  },
  {
    path: "/risoe",
    image: "/images/hero-mark.jpg",
    imageAlt: "Landlige omgivelser ved Svaleholm Gæstegaard nær DTU Risø og Roskilde",
    metaTitle: "Overnatning nær DTU Risø | Svaleholm Gæstegaard Roskilde",
    metaDescription: "Overnatning for håndværkere, konsulenter og projektfolk i nærområdet omkring DTU Risø ved Roskilde. Enkle værelser, fælles køkken, selv-check-in. Fra 650 kr/nat.",
    eyebrowDa: "Nær DTU Risø", eyebrowEn: "Near DTU Risø",
    h1aDa: "Overnatning nær ", h1aEn: "Accommodation near ",
    h1bDa: "DTU Risø", h1bEn: "DTU Risø",
    subDa: "En rolig base i nærområdet for håndværkere, konsulenter og projektfolk med opgaver omkring DTU Risø ved Roskilde.",
    subEn: "A quiet base in the area for tradespeople, consultants and project staff with assignments around DTU Risø near Roskilde.",
    bodyDa: [
      "Har I et projekt eller en opgave omkring DTU Risø, er Svaleholm Gæstegaard en praktisk base i rolige, landlige omgivelser i nærområdet ved Roskilde. Gården er et oplagt sted at bo for håndværkere, teknikere, konsulenter og projektfolk, der arbejder i området over flere dage og gerne vil bo samlet frem for spredt på hoteller.",
      "I bor samlet med fælles køkken, bad og opholdsrum, og I kan ankomme fleksibelt med selv-check-in via dørkode – praktisk, når opgaver omkring Risø ikke altid følger normal arbejdstid. Der er parkering til varevogne på gården, wifi og vaskemaskine, og rengøring og linned er inkluderet, så I selv kun skal koncentrere jer om opgaven.",
      "Book enkeltværelser mand for mand, eller book hele huset til holdet, hvis I er flere afsted sammen. Prisen er fra 650 kr pr. nat pr. værelse inkl. moms med minimum 4 nætter, og hele gården kan bookes for 5.200 kr pr. nat med minimum 2 nætter. Check-ind er fra kl. 15 og check-ud senest kl. 12.",
      "Betalingen sker forud via et sikkert betalingslink, og kvittering med CVR sendes automatisk, så det er enkelt at afregne opholdet gennem firmaet. Fortæl os periode og antal personer, så finder vi den rigtige løsning til jeres ophold nær DTU Risø.",
    ],
    bodyEn: [
      "If you have a project or assignment around DTU Risø, Svaleholm Gæstegaard is a practical base in calm, rural surroundings in the area near Roskilde. The farm is a natural place to stay for tradespeople, technicians, consultants and project staff working in the area over several days who would rather stay together than spread across hotels.",
      "You stay together with a shared kitchen, bath and lounge, and you can arrive flexibly with self check-in via a door code – handy when assignments around Risø don't always follow normal working hours. There is parking for vans at the farm, wifi and a washing machine, and cleaning and linen are included, so you only have to focus on the job.",
      "Book single rooms one by one, or book the whole house for the team if several of you travel together. The price is from DKK 650 per night per room incl. VAT with a minimum of 4 nights, and the whole farm can be booked for DKK 5,200 per night with a minimum of 2 nights. Check-in is from 3 pm and check-out by 12 noon.",
      "Payment is made in advance via a secure link, and a receipt with CVR is sent automatically, so settling the stay through the company is simple. Tell us the period and the number of people, and we'll find the right option for your stay near DTU Risø.",
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
    imageAlt: "Svaleholm Gæstegaard – rolig base med rigtige senge nær Roskilde Festival",
    metaTitle: "Overnatning nær Roskilde Festival | Svaleholm Gæstegaard",
    metaDescription: "En rigtig seng og et bad nær Roskilde Festival – til produktionshold, leverandører og grupper, der vil bo fast frem for i telt. Fælles køkken, selv-check-in.",
    eyebrowDa: "Under Roskilde Festival", eyebrowEn: "During Roskilde Festival",
    h1aDa: "Overnatning nær ", h1aEn: "Accommodation near ",
    h1bDa: "Roskilde Festival", h1bEn: "Roskilde Festival",
    subDa: "En rigtig seng, et bad og ro til at lade op – nær Roskilde for produktionshold, leverandører og grupper, der hellere vil bo fast end i telt.",
    subEn: "A real bed, a shower and quiet to recharge – near Roskilde for production crews, suppliers and groups who would rather stay put than camp.",
    bodyDa: [
      "Under Roskilde Festival er Svaleholm Gæstegaard et roligt alternativ til teltet for jer, der arbejder på eller omkring festivalen. Produktionshold, leverandører, teknikere, crew og grupper kan bo i rigtige senge, få et varmt bad og sove ordentligt, så I vågner udhvilet til næste dag – i landlige omgivelser lidt væk fra larmen, men stadig nær Roskilde.",
      "I bor samlet under samme tag med fælles køkken, bad og opholdsrum, og der er selv-check-in med dørkode, så I kan komme og gå i jeres eget tempo – også når vagterne ligger skævt. Der er wifi, vaskemaskine og parkering til varevogne på gården, og rengøring og linned er inkluderet.",
      "Book enkeltværelser til holdet, eller book hele gården eksklusivt, hvis I er en større gruppe, der vil være samlet. Prisen er fra 650 kr pr. nat pr. værelse inkl. moms med minimum 4 nætter, og hele gården kan bookes for 5.200 kr pr. nat med minimum 2 nætter. Check-ind er fra kl. 15 og check-ud senest kl. 12.",
      "Betalingen sker forud via betalingslink med kvittering og CVR, så en gruppe- eller firmabooking er nem at afregne. Festivalugen er populær – fortæl os datoer og antal personer i god tid, så vi kan holde plads til jer.",
    ],
    bodyEn: [
      "During Roskilde Festival, Svaleholm Gæstegaard is a calm alternative to the tent for those working on or around the festival. Production crews, suppliers, technicians, crew and groups can sleep in real beds, get a warm shower and rest properly, so you wake up ready for the next day – in rural surroundings a little away from the noise, yet still near Roskilde.",
      "You stay together under one roof with a shared kitchen, bath and lounge, and there is self check-in with a door code, so you can come and go at your own pace – even when shifts run at odd hours. There is wifi, a washing machine and parking for vans at the farm, and cleaning and linen are included.",
      "Book single rooms for the team, or book the whole farm exclusively if you are a larger group that wants to be together. The price is from DKK 650 per night per room incl. VAT with a minimum of 4 nights, and the whole farm can be booked for DKK 5,200 per night with a minimum of 2 nights. Check-in is from 3 pm and check-out by 12 noon.",
      "Payment is made in advance by link with a receipt and CVR, so a group or company booking is easy to settle. The festival week is popular – tell us the dates and number of people in good time so we can hold space for you.",
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
