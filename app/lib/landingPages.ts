// ─────────────────────────────────────────────────────────────────────────────
// Local SEO/GEO landing pages — single source of truth.
//
// Each entry is a genuinely unique, useful local landing page (NOT a thin
// variable-swap): real local context for the area/landmark/occasion plus why
// Svaleholm fits. Rendered by `app/components/LandingPageView.tsx` and served
// under /overnatning/:slug (lodging intent) or /fest/:slug (event intent).
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

export type LandingCategory = "overnatning" | "fest";

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
  /** For category "fest" → an eventServiceNodes() entry. */
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
// facts (shared bath, self check-in, capacity, catering) are identical across
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
  qDa: "Hvor mange kan overnatte?",
  qEn: "How many can stay overnight?",
  aDa: "Der er op til 8 enkle værelser med fælles køkken, bad og opholdsrum – ideelt for familier og grupper. Overnatning koster fra 650 kr pr. værelse pr. nat inkl. moms.",
  aEn: "There are up to 8 simple rooms with a shared kitchen, bath and lounge – ideal for families and groups. An overnight stay is from DKK 650 per room per night incl. VAT.",
};

export const LANDING_PAGES: LandingPage[] = [
  // ─── Overnatning · nærliggende byer/områder ───────────────────────────────
  {
    category: "overnatning",
    slug: "naer-lejre",
    metaTitle: "Overnatning nær Lejre | Svaleholm Gaard ved Roskilde",
    metaDescription:
      "Skal I besøge Lejre og Sagnlandet? Overnat på Svaleholm Gaard i landlige omgivelser tæt på Roskilde – op til 8 enkle værelser fra 650 kr pr. nat med selvcheck-in.",
    heroEyebrowDa: "Overnatning nær Lejre",
    heroEyebrowEn: "Stay near Lejre",
    h1Da: "Overnatning nær Lejre",
    h1En: "Stay near Lejre",
    heroSubDa:
      "Et roligt landligt udgangspunkt for besøg i Lejre, Sagnlandet og det historiske landskab vest for Roskilde – med enkle, hyggelige værelser og nem selvcheck-in.",
    heroSubEn:
      "A quiet rural base for visiting Lejre, the Land of Legends and the historic landscape west of Roskilde – with simple, cosy rooms and easy self check-in.",
    image: "/images/natur-eng.jpg",
    imageAlt: "Grønne enge og natur nær Svaleholm Gaard ved Lejre",
    jsonLdName: "Overnatning nær Lejre",
    jsonLdDescription:
      "Enkle værelser til overnatning på Svaleholm Gaard i landlige omgivelser tæt på Lejre og Roskilde på Sjælland.",
    breadcrumbLabel: "Overnatning nær Lejre",
    intro: [
      {
        headingDa: "Et naturnært ophold tæt på Lejre",
        headingEn: "A nature-close stay near Lejre",
        bodyDa:
          "Lejre-egnen er et af Sjællands smukkeste historiske landskaber – med Sagnlandet Lejre, de gamle kongehaller og bløde bakker, enge og skove. Svaleholm Gaard ligger i de samme landlige omgivelser lige uden for Roskilde og er et oplagt, roligt sted at overnatte, når I udforsker området. Her bor I i enkle, hyggelige værelser med naturen lige uden for døren.",
        bodyEn:
          "The Lejre area is one of Zealand's most beautiful historic landscapes – with the Land of Legends, the ancient royal halls and gentle hills, meadows and woods. Svaleholm Gaard sits in the same rural surroundings just outside Roskilde and makes a calm, natural place to stay while you explore. Here you stay in simple, cosy rooms with nature right outside the door.",
      },
      {
        headingDa: "Enkelt, fleksibelt og til gode priser",
        headingEn: "Simple, flexible and good value",
        bodyDa:
          "Værelserne er uden eget bad – i stedet deles fire fælles bad og toiletter, et fælles køkken, hvor I selv kan lave mad, og et fælles opholdsrum til hygge. Det gør opholdet både billigt og ukompliceret, uanset om I er en familie på udflugt eller en gruppe, der skal til arrangement i nærområdet. Check-in er digitalt, så I ankommer, når det passer jer.",
        bodyEn:
          "The rooms have no private bath – instead there are four shared baths and toilets, a shared kitchen where you can cook your own meals, and a shared lounge to relax in. That keeps the stay both affordable and uncomplicated, whether you're a family on an outing or a group heading to an event nearby. Check-in is digital, so you arrive whenever it suits you.",
      },
    ],
    highlightsDa: [
      "Landligt udgangspunkt for Lejre, Sagnlandet og naturen",
      "Op til 8 enkle værelser – fra 650 kr pr. nat inkl. moms",
      "Fælles køkken, bad og opholdsrum",
      "Nem digital selvcheck-in via dørkode",
      "Rolige omgivelser tæt på Roskilde",
    ],
    highlightsEn: [
      "Rural base for Lejre, the Land of Legends and nature",
      "Up to 8 simple rooms – from DKK 650 per night incl. VAT",
      "Shared kitchen, bath and lounge",
      "Easy digital self check-in via door code",
      "Peaceful surroundings close to Roskilde",
    ],
    faqs: [FAQ_LOCATION, FAQ_ROOMS, FAQ_CHECKIN],
    relatedSlugs: ["naer-hvalsoe", "naer-roskilde-domkirke", "naer-holbaek"],
  },
  {
    category: "overnatning",
    slug: "naer-holbaek",
    metaTitle: "Overnatning nær Holbæk | Svaleholm Gaard ved Roskilde",
    metaDescription:
      "Overnat landligt mellem Roskilde og Holbæk. Svaleholm Gaard tilbyder op til 8 enkle værelser fra 650 kr pr. nat med fælles køkken, bad og nem selvcheck-in.",
    heroEyebrowDa: "Overnatning nær Holbæk",
    heroEyebrowEn: "Stay near Holbæk",
    h1Da: "Overnatning nær Holbæk",
    h1En: "Stay near Holbæk",
    heroSubDa:
      "Enkle, hyggelige værelser i landlige omgivelser på strækningen mellem Roskilde og Holbæk – et roligt sted at overnatte på Sjælland.",
    heroSubEn:
      "Simple, cosy rooms in rural surroundings on the stretch between Roskilde and Holbæk – a quiet place to stay on Zealand.",
    image: "/images/natur-mark.jpg",
    imageAlt: "Åbne marker og landskab nær Svaleholm Gaard mod Holbæk",
    jsonLdName: "Overnatning nær Holbæk",
    jsonLdDescription:
      "Enkle værelser til overnatning på Svaleholm Gaard i landlige omgivelser mellem Roskilde og Holbæk på Sjælland.",
    breadcrumbLabel: "Overnatning nær Holbæk",
    intro: [
      {
        headingDa: "Landligt og centralt på Vestsjælland",
        headingEn: "Rural and central on West Zealand",
        bodyDa:
          "Svaleholm Gaard ligger i rolige, landlige omgivelser lige uden for Roskilde – et godt udgangspunkt, når turen går mod Holbæk, Isefjorden og det vestsjællandske. I bor tæt på naturen, men stadig med nem adgang til hovedvejene, så I hurtigt kan komme videre til oplevelser i hele området.",
        bodyEn:
          "Svaleholm Gaard lies in calm, rural surroundings just outside Roskilde – a good base when you're heading towards Holbæk, the Isefjord and West Zealand. You stay close to nature, yet with easy access to the main roads, so you can quickly move on to experiences across the area.",
      },
      {
        headingDa: "Plads til familien eller gruppen",
        headingEn: "Room for the family or group",
        bodyDa:
          "Med op til 8 værelser er der plads til, at hele familien eller gruppen kan bo samlet. Faciliteterne er fælles – køkken, bad og opholdsrum – hvilket holder prisen nede og gør det nemt at være sammen. Værelserne er enkle og rene, og den digitale selvcheck-in betyder, at I ankommer helt fleksibelt.",
        bodyEn:
          "With up to 8 rooms there's space for the whole family or group to stay together. The facilities are shared – kitchen, bath and lounge – which keeps the price down and makes it easy to be together. The rooms are simple and clean, and digital self check-in means you arrive completely flexibly.",
      },
    ],
    highlightsDa: [
      "Godt udgangspunkt mod Holbæk og Isefjorden",
      "Op til 8 enkle værelser – fra 650 kr pr. nat inkl. moms",
      "Fælles køkken, bad og opholdsrum",
      "Nem digital selvcheck-in via dørkode",
      "Landlige, rolige omgivelser tæt på Roskilde",
    ],
    highlightsEn: [
      "Good base towards Holbæk and the Isefjord",
      "Up to 8 simple rooms – from DKK 650 per night incl. VAT",
      "Shared kitchen, bath and lounge",
      "Easy digital self check-in via door code",
      "Rural, peaceful surroundings close to Roskilde",
    ],
    faqs: [FAQ_LOCATION, FAQ_ROOMS, FAQ_CHECKIN],
    relatedSlugs: ["naer-lejre", "naer-hvalsoe", "naer-vikingeskibsmuseet"],
  },
  {
    category: "overnatning",
    slug: "naer-koege",
    metaTitle: "Overnatning nær Køge | Svaleholm Gaard ved Roskilde",
    metaDescription:
      "Landlig overnatning på Sjælland mellem Roskilde og Køge. Op til 8 enkle værelser på Svaleholm Gaard fra 650 kr pr. nat med fælles faciliteter og selvcheck-in.",
    heroEyebrowDa: "Overnatning nær Køge",
    heroEyebrowEn: "Stay near Køge",
    h1Da: "Overnatning nær Køge",
    h1En: "Stay near Køge",
    heroSubDa:
      "Et roligt landligt alternativ til hotel, når I skal besøge Køge-egnen – enkle værelser tæt på Roskilde med fælles køkken og nem selvcheck-in.",
    heroSubEn:
      "A quiet rural alternative to a hotel when visiting the Køge area – simple rooms close to Roskilde with a shared kitchen and easy self check-in.",
    image: "/images/have-sti.jpg",
    imageAlt: "Havesti og grønne omgivelser ved Svaleholm Gaard nær Køge",
    jsonLdName: "Overnatning nær Køge",
    jsonLdDescription:
      "Enkle værelser til overnatning på Svaleholm Gaard i landlige omgivelser tæt på Roskilde – et roligt udgangspunkt mod Køge på Sjælland.",
    breadcrumbLabel: "Overnatning nær Køge",
    intro: [
      {
        headingDa: "Ro på landet i stedet for byhotel",
        headingEn: "Countryside calm instead of a city hotel",
        bodyDa:
          "Hvor et byhotel giver trafik og larm, giver Svaleholm Gaard ro, natur og plads. Gården ligger landligt lige uden for Roskilde og er et behageligt sted at overnatte, når ærindet er på Køge-egnen – uanset om det er familiebesøg, arbejde eller en weekend på Sjælland. Her vågner I til fuglesang i stedet for bytrafik.",
        bodyEn:
          "Where a city hotel brings traffic and noise, Svaleholm Gaard offers calm, nature and space. The farm lies in the countryside just outside Roskilde and is a pleasant place to stay when your errand is in the Køge area – be it a family visit, work or a weekend on Zealand. Here you wake to birdsong instead of city traffic.",
      },
      {
        headingDa: "Enkelt ophold med alt det nødvendige",
        headingEn: "A simple stay with all the essentials",
        bodyDa:
          "Værelserne er enkle og uden eget bad, men I deles om fire fælles bad og toiletter, et fælles køkken og et hyggeligt opholdsrum. Med op til 8 værelser er der god plads til flere rejsende, og den faste pris fra 650 kr pr. nat gør det nemt at overskue. Selvcheck-in med dørkode betyder, at ankomsttidspunktet er helt op til jer.",
        bodyEn:
          "The rooms are simple and without a private bath, but you share four baths and toilets, a shared kitchen and a cosy lounge. With up to 8 rooms there's plenty of space for several travellers, and the fixed price from DKK 650 per night keeps things easy to plan. Self check-in with a door code means your arrival time is entirely up to you.",
      },
    ],
    highlightsDa: [
      "Roligt landligt alternativ til byhotel",
      "Op til 8 enkle værelser – fra 650 kr pr. nat inkl. moms",
      "Fælles køkken, bad og opholdsrum",
      "Nem digital selvcheck-in via dørkode",
      "Tæt på Roskilde med nem parkering",
    ],
    highlightsEn: [
      "Quiet rural alternative to a city hotel",
      "Up to 8 simple rooms – from DKK 650 per night incl. VAT",
      "Shared kitchen, bath and lounge",
      "Easy digital self check-in via door code",
      "Close to Roskilde with easy parking",
    ],
    faqs: [FAQ_LOCATION, FAQ_ROOMS, FAQ_CHECKIN],
    relatedSlugs: ["naer-roskilde-domkirke", "naer-dyrskuepladsen", "naer-lejre"],
  },
  {
    category: "overnatning",
    slug: "naer-hvalsoe",
    metaTitle: "Overnatning nær Hvalsø | Svaleholm Gaard ved Roskilde",
    metaDescription:
      "Overnat landligt nær Hvalsø og Lejre. Svaleholm Gaard har op til 8 enkle værelser fra 650 kr pr. nat med fælles køkken, bad og nem selvcheck-in tæt på Roskilde.",
    heroEyebrowDa: "Overnatning nær Hvalsø",
    heroEyebrowEn: "Stay near Hvalsø",
    h1Da: "Overnatning nær Hvalsø",
    h1En: "Stay near Hvalsø",
    heroSubDa:
      "Enkle, naturnære værelser i de rolige landskaber omkring Hvalsø og Lejre – et billigt og fleksibelt sted at overnatte tæt på Roskilde.",
    heroSubEn:
      "Simple, nature-close rooms in the calm landscapes around Hvalsø and Lejre – an affordable, flexible place to stay close to Roskilde.",
    image: "/images/natur-1.jpg",
    imageAlt: "Skov og natur nær Svaleholm Gaard ved Hvalsø",
    jsonLdName: "Overnatning nær Hvalsø",
    jsonLdDescription:
      "Enkle værelser til overnatning på Svaleholm Gaard i landlige omgivelser tæt på Hvalsø, Lejre og Roskilde på Sjælland.",
    breadcrumbLabel: "Overnatning nær Hvalsø",
    intro: [
      {
        headingDa: "Midt i det grønne Midtsjælland",
        headingEn: "In the heart of green mid-Zealand",
        bodyDa:
          "Omkring Hvalsø og Lejre finder I nogle af Sjællands fineste skove, søer og vandreruter. Svaleholm Gaard ligger i de samme grønne omgivelser lige uden for Roskilde og er et naturligt sted at slå lejr, når I vil ud i naturen, på vandretur eller besøge egnens seværdigheder. I bor enkelt, roligt og tæt på det hele.",
        bodyEn:
          "Around Hvalsø and Lejre you'll find some of Zealand's finest woods, lakes and walking routes. Svaleholm Gaard sits in the same green surroundings just outside Roskilde and is a natural base when you want to get out into nature, go hiking or visit the area's sights. You stay simply, calmly and close to it all.",
      },
      {
        headingDa: "Ukompliceret og til en god pris",
        headingEn: "Uncomplicated and good value",
        bodyDa:
          "Opholdet er bevidst enkelt: rene værelser uden eget bad, fælles badefaciliteter, fælles køkken og et opholdsrum til afslapning. Det holder prisen nede og gør det nemt at være en gruppe eller familie samlet. Med digital selvcheck-in ankommer I fleksibelt, og der er nem parkering ved gården.",
        bodyEn:
          "The stay is deliberately simple: clean rooms without a private bath, shared bathing facilities, a shared kitchen and a lounge to relax in. That keeps the price down and makes it easy to stay together as a group or family. With digital self check-in you arrive flexibly, and there's easy parking at the farm.",
      },
    ],
    highlightsDa: [
      "Udgangspunkt for skove, søer og vandreruter",
      "Op til 8 enkle værelser – fra 650 kr pr. nat inkl. moms",
      "Fælles køkken, bad og opholdsrum",
      "Nem digital selvcheck-in via dørkode",
      "Grønne, rolige omgivelser tæt på Roskilde",
    ],
    highlightsEn: [
      "Base for woods, lakes and walking routes",
      "Up to 8 simple rooms – from DKK 650 per night incl. VAT",
      "Shared kitchen, bath and lounge",
      "Easy digital self check-in via door code",
      "Green, peaceful surroundings close to Roskilde",
    ],
    faqs: [FAQ_LOCATION, FAQ_ROOMS, FAQ_CHECKIN],
    relatedSlugs: ["naer-lejre", "naer-holbaek", "naer-roskilde-domkirke"],
  },

  // ─── Overnatning · seværdigheder/landemærker ──────────────────────────────
  {
    category: "overnatning",
    slug: "naer-roskilde-domkirke",
    metaTitle: "Overnatning nær Roskilde Domkirke | Svaleholm Gaard",
    metaDescription:
      "Skal I besøge Roskilde Domkirke (UNESCO)? Overnat landligt og roligt på Svaleholm Gaard – op til 8 enkle værelser fra 650 kr pr. nat med nem selvcheck-in.",
    heroEyebrowDa: "Overnatning nær Roskilde Domkirke",
    heroEyebrowEn: "Stay near Roskilde Cathedral",
    h1Da: "Overnatning nær Roskilde Domkirke",
    h1En: "Stay near Roskilde Cathedral",
    heroSubDa:
      "Et roligt, landligt sted at overnatte, når I skal opleve Roskilde Domkirke og den historiske by – enkle værelser med nem selvcheck-in lige uden for Roskilde.",
    heroSubEn:
      "A calm, rural place to stay when you're visiting Roskilde Cathedral and the historic town – simple rooms with easy self check-in just outside Roskilde.",
    image: "/images/bygning-have.jpg",
    imageAlt: "Svaleholms historiske bygning og have nær Roskilde Domkirke",
    jsonLdName: "Overnatning nær Roskilde Domkirke",
    jsonLdDescription:
      "Enkle værelser til overnatning på Svaleholm Gaard tæt på Roskilde Domkirke og Roskilde centrum på Sjælland.",
    breadcrumbLabel: "Overnatning nær Roskilde Domkirke",
    intro: [
      {
        headingDa: "Historisk ophold nær et UNESCO-vartegn",
        headingEn: "A historic stay near a UNESCO landmark",
        bodyDa:
          "Roskilde Domkirke er optaget på UNESCO's verdensarvsliste og de danske kongers gravkirke – et af Danmarks vigtigste historiske vartegn. Svaleholm Gaard er selv en historisk gård og ligger kort kørsel fra domkirken og Roskilde centrum. Det gør gården til et stemningsfuldt sted at bo, når I vil opleve byens historie og stadig sove roligt på landet.",
        bodyEn:
          "Roskilde Cathedral is a UNESCO World Heritage Site and the burial church of the Danish kings – one of Denmark's most important historic landmarks. Svaleholm Gaard is itself a historic farm and lies a short drive from the cathedral and Roskilde town centre. That makes it an atmospheric place to stay when you want to experience the town's history while still sleeping peacefully in the countryside.",
      },
      {
        headingDa: "Enkel komfort tæt på byen",
        headingEn: "Simple comfort close to town",
        bodyDa:
          "I bor i enkle værelser uden eget bad, men med fælles køkken, fire fælles bad og toiletter samt et hyggeligt opholdsrum. Op til 8 værelser gør det nemt at samle familien eller gruppen, og med selvcheck-in via dørkode kan I komme og gå, som det passer med museer, koncerter eller domkirkebesøg. Nem parkering ved gården.",
        bodyEn:
          "You stay in simple rooms without a private bath, but with a shared kitchen, four shared baths and toilets and a cosy lounge. Up to 8 rooms make it easy to gather the family or group, and with self check-in via a door code you can come and go as it suits visits to museums, concerts or the cathedral. Easy parking at the farm.",
      },
    ],
    highlightsDa: [
      "Kort kørsel fra Roskilde Domkirke og centrum",
      "Historisk gård i landlige omgivelser",
      "Op til 8 enkle værelser – fra 650 kr pr. nat inkl. moms",
      "Fælles køkken, bad og opholdsrum",
      "Nem digital selvcheck-in via dørkode",
    ],
    highlightsEn: [
      "A short drive from Roskilde Cathedral and the centre",
      "Historic farm in rural surroundings",
      "Up to 8 simple rooms – from DKK 650 per night incl. VAT",
      "Shared kitchen, bath and lounge",
      "Easy digital self check-in via door code",
    ],
    faqs: [
      FAQ_LOCATION,
      {
        qDa: "Hvor tæt på Roskilde Domkirke ligger gården?",
        qEn: "How close to Roskilde Cathedral is the farm?",
        aDa: "Svaleholm Gaard ligger på landet lige uden for Roskilde, en kort kørsel fra domkirken og bymidten. I bor roligt og naturnært, men med nem adgang til byens seværdigheder.",
        aEn: "Svaleholm Gaard is in the countryside just outside Roskilde, a short drive from the cathedral and town centre. You stay quietly and close to nature, yet with easy access to the town's sights.",
      },
      FAQ_ROOMS,
      FAQ_CHECKIN,
    ],
    relatedSlugs: ["naer-vikingeskibsmuseet", "naer-dyrskuepladsen", "naer-lejre"],
  },
  {
    category: "overnatning",
    slug: "naer-vikingeskibsmuseet",
    metaTitle: "Overnatning nær Vikingeskibsmuseet | Svaleholm Gaard",
    metaDescription:
      "Besøg Vikingeskibsmuseet i Roskilde og overnat landligt på Svaleholm Gaard – op til 8 enkle værelser fra 650 kr pr. nat med fælles køkken og nem selvcheck-in.",
    heroEyebrowDa: "Overnatning nær Vikingeskibsmuseet",
    heroEyebrowEn: "Stay near the Viking Ship Museum",
    h1Da: "Overnatning nær Vikingeskibsmuseet",
    h1En: "Stay near the Viking Ship Museum",
    heroSubDa:
      "Enkle, naturnære værelser tæt på Roskilde Fjord og Vikingeskibsmuseet – et roligt sted at overnatte, når I udforsker vikingernes Roskilde.",
    heroSubEn:
      "Simple, nature-close rooms near Roskilde Fjord and the Viking Ship Museum – a quiet place to stay while you explore Viking-age Roskilde.",
    image: "/images/natur-2.jpg",
    imageAlt: "Natur og fjordlandskab nær Svaleholm Gaard og Vikingeskibsmuseet",
    jsonLdName: "Overnatning nær Vikingeskibsmuseet",
    jsonLdDescription:
      "Enkle værelser til overnatning på Svaleholm Gaard tæt på Vikingeskibsmuseet og Roskilde Fjord på Sjælland.",
    breadcrumbLabel: "Overnatning nær Vikingeskibsmuseet",
    intro: [
      {
        headingDa: "Vikingehistorie ved fjorden",
        headingEn: "Viking history by the fjord",
        bodyDa:
          "Vikingeskibsmuseet ved Roskilde Fjord fortæller historien om de originale vikingeskibe og det maritime håndværk – en af Sjællands mest besøgte oplevelser. Svaleholm Gaard ligger i landlige omgivelser lige uden for Roskilde og er et oplagt, roligt udgangspunkt, når I vil kombinere museet med natur og fjordlandskab.",
        bodyEn:
          "The Viking Ship Museum by Roskilde Fjord tells the story of the original Viking ships and maritime craftsmanship – one of Zealand's most visited experiences. Svaleholm Gaard lies in rural surroundings just outside Roskilde and makes an ideal, calm base when you want to combine the museum with nature and the fjord landscape.",
      },
      {
        headingDa: "Et enkelt ophold for hele familien",
        headingEn: "A simple stay for the whole family",
        bodyDa:
          "Med op til 8 enkle værelser, fælles køkken, fælles bad og et hyggeligt opholdsrum er gården god til familier og grupper. Prisen starter ved 650 kr pr. nat, og den digitale selvcheck-in gør ankomsten fleksibel – perfekt, når en museumsdag trækker ud. Der er god plads og nem parkering ved gården.",
        bodyEn:
          "With up to 8 simple rooms, a shared kitchen, shared baths and a cosy lounge, the farm suits families and groups well. Prices start at DKK 650 per night, and digital self check-in keeps arrival flexible – perfect when a day at the museum runs long. There's plenty of space and easy parking at the farm.",
      },
    ],
    highlightsDa: [
      "Roligt udgangspunkt for Vikingeskibsmuseet og fjorden",
      "Op til 8 enkle værelser – fra 650 kr pr. nat inkl. moms",
      "Fælles køkken, bad og opholdsrum",
      "Nem digital selvcheck-in via dørkode",
      "Naturnære, landlige omgivelser tæt på Roskilde",
    ],
    highlightsEn: [
      "Quiet base for the Viking Ship Museum and the fjord",
      "Up to 8 simple rooms – from DKK 650 per night incl. VAT",
      "Shared kitchen, bath and lounge",
      "Easy digital self check-in via door code",
      "Nature-close, rural surroundings near Roskilde",
    ],
    faqs: [FAQ_LOCATION, FAQ_ROOMS, FAQ_CHECKIN],
    relatedSlugs: ["naer-roskilde-domkirke", "naer-roskilde-festival", "naer-holbaek"],
  },
  {
    category: "overnatning",
    slug: "naer-roskilde-festival",
    metaTitle: "Overnatning nær Roskilde Festival | Svaleholm Gaard",
    metaDescription:
      "Overnat roligt væk fra campingstøjen under Roskilde Festival. Svaleholm Gaard har op til 8 enkle værelser fra 650 kr pr. nat med fælles køkken og selvcheck-in.",
    heroEyebrowDa: "Overnatning nær Roskilde Festival",
    heroEyebrowEn: "Stay near Roskilde Festival",
    h1Da: "Overnatning nær Roskilde Festival",
    h1En: "Stay near Roskilde Festival",
    heroSubDa:
      "Et roligt sted at sove, lade op og få et bad under festivalen – enkle værelser i landlige omgivelser tæt på Roskilde med fleksibel selvcheck-in.",
    heroSubEn:
      "A calm place to sleep, recharge and shower during the festival – simple rooms in rural surroundings near Roskilde with flexible self check-in.",
    image: "/images/gaardsplads.jpg",
    imageAlt: "Svaleholm Gaards gårdsplads – rolig overnatning nær Roskilde Festival",
    jsonLdName: "Overnatning nær Roskilde Festival",
    jsonLdDescription:
      "Enkle værelser til overnatning på Svaleholm Gaard i landlige omgivelser tæt på Roskilde – et roligt alternativ til camping under Roskilde Festival.",
    breadcrumbLabel: "Overnatning nær Roskilde Festival",
    intro: [
      {
        headingDa: "Ro og et rigtigt bad under festivalen",
        headingEn: "Calm and a real shower during the festival",
        bodyDa:
          "Roskilde Festival er en af Nordeuropas største musikfestivaler og fylder byen hver sommer. Ikke alle vil sove i telt hele ugen – og her er Svaleholm Gaard et roligt alternativ. Gården ligger landligt lige uden for Roskilde, så I kan tage til koncerter om dagen og vende tilbage til en seng, et varmt bad og en god nats søvn.",
        bodyEn:
          "Roskilde Festival is one of Northern Europe's largest music festivals and fills the town every summer. Not everyone wants to sleep in a tent all week – and here Svaleholm Gaard is a calm alternative. The farm lies in the countryside just outside Roskilde, so you can head to concerts during the day and return to a bed, a warm shower and a good night's sleep.",
      },
      {
        headingDa: "Fleksibelt for en gruppe",
        headingEn: "Flexible for a group",
        bodyDa:
          "Med op til 8 værelser kan hele vennegruppen bo samlet. Faciliteterne er fælles – køkken, bad og opholdsrum – og selvcheck-in med dørkode betyder, at I kan komme sent hjem fra festivalpladsen uden at skulle vække nogen. Overnatning starter ved 650 kr pr. nat, og der er nem parkering ved gården. Book i god tid, da festivalugen er populær.",
        bodyEn:
          "With up to 8 rooms the whole group of friends can stay together. The facilities are shared – kitchen, bath and lounge – and self check-in with a door code means you can return late from the festival site without waking anyone. Overnight stays start at DKK 650 per night, and there's easy parking at the farm. Book well ahead, as the festival week is popular.",
      },
    ],
    highlightsDa: [
      "Roligt alternativ til camping under festivalen",
      "Op til 8 enkle værelser – fra 650 kr pr. nat inkl. moms",
      "Varmt bad, fælles køkken og opholdsrum",
      "Sen ankomst mulig med selvcheck-in via dørkode",
      "Landlige omgivelser tæt på Roskilde",
    ],
    highlightsEn: [
      "Calm alternative to camping during the festival",
      "Up to 8 simple rooms – from DKK 650 per night incl. VAT",
      "Warm shower, shared kitchen and lounge",
      "Late arrival possible with self check-in via door code",
      "Rural surroundings close to Roskilde",
    ],
    faqs: [
      FAQ_LOCATION,
      FAQ_ROOMS,
      {
        qDa: "Kan vi komme sent tilbage fra festivalpladsen?",
        qEn: "Can we return late from the festival site?",
        aDa: "Ja. Der er digital selvcheck-in via dørkode, så I kan komme og gå, som det passer – også sent om natten efter koncerterne.",
        aEn: "Yes. There is digital self check-in via a door code, so you can come and go as you please – including late at night after the concerts.",
      },
      FAQ_CHECKIN,
    ],
    relatedSlugs: ["naer-dyrskuepladsen", "naer-roskilde-domkirke", "naer-vikingeskibsmuseet"],
  },
  {
    category: "overnatning",
    slug: "naer-dyrskuepladsen",
    metaTitle: "Overnatning nær Dyrskuepladsen i Roskilde | Svaleholm Gaard",
    metaDescription:
      "Skal I til arrangement på Dyrskuepladsen i Roskilde? Overnat landligt på Svaleholm Gaard – op til 8 enkle værelser fra 650 kr pr. nat med nem selvcheck-in.",
    heroEyebrowDa: "Overnatning nær Dyrskuepladsen",
    heroEyebrowEn: "Stay near the Dyrskueplads",
    h1Da: "Overnatning nær Dyrskuepladsen",
    h1En: "Stay near the Dyrskueplads",
    heroSubDa:
      "Enkle værelser tæt på Roskilde Dyrskueplads – praktisk, når I skal til dyrskue, festival, messe eller andet arrangement, og vil sove roligt på landet.",
    heroSubEn:
      "Simple rooms near the Roskilde Dyrskueplads – handy when you're attending the agricultural show, a festival, a fair or another event and want to sleep quietly in the countryside.",
    image: "/images/natur-mark-2.jpg",
    imageAlt: "Marklandskab nær Svaleholm Gaard og Dyrskuepladsen i Roskilde",
    jsonLdName: "Overnatning nær Dyrskuepladsen",
    jsonLdDescription:
      "Enkle værelser til overnatning på Svaleholm Gaard i landlige omgivelser tæt på Dyrskuepladsen og Roskilde på Sjælland.",
    breadcrumbLabel: "Overnatning nær Dyrskuepladsen",
    intro: [
      {
        headingDa: "Praktisk ved de store arrangementer",
        headingEn: "Handy for the big events",
        bodyDa:
          "Dyrskuepladsen i Roskilde lægger plads til alt fra Roskilde Dyrskue og festival til messer og store arrangementer året rundt. Svaleholm Gaard ligger landligt lige uden for Roskilde og er et roligt, praktisk sted at overnatte, når I deltager – så I undgår at skulle køre langt efter en lang dag på pladsen.",
        bodyEn:
          "The Dyrskueplads in Roskilde hosts everything from the Roskilde agricultural show and festival to fairs and large events throughout the year. Svaleholm Gaard lies in the countryside just outside Roskilde and is a calm, practical place to stay when you attend – so you avoid a long drive after a long day at the grounds.",
      },
      {
        headingDa: "Enkelt, fleksibelt og rummeligt",
        headingEn: "Simple, flexible and spacious",
        bodyDa:
          "Der er op til 8 enkle værelser med fælles køkken, bad og opholdsrum – god plads til en gruppe eller familie. Den digitale selvcheck-in gør det nemt at ankomme uanset tidspunkt, og prisen fra 650 kr pr. nat holder det overskueligt. Nem parkering ved gården gør det praktisk at komme til og fra pladsen.",
        bodyEn:
          "There are up to 8 simple rooms with a shared kitchen, bath and lounge – plenty of space for a group or family. Digital self check-in makes it easy to arrive at any time, and the price from DKK 650 per night keeps things manageable. Easy parking at the farm makes getting to and from the grounds practical.",
      },
    ],
    highlightsDa: [
      "Praktisk ved arrangementer på Dyrskuepladsen",
      "Op til 8 enkle værelser – fra 650 kr pr. nat inkl. moms",
      "Fælles køkken, bad og opholdsrum",
      "Nem digital selvcheck-in via dørkode",
      "Landlige omgivelser og nem parkering nær Roskilde",
    ],
    highlightsEn: [
      "Handy for events at the Dyrskueplads",
      "Up to 8 simple rooms – from DKK 650 per night incl. VAT",
      "Shared kitchen, bath and lounge",
      "Easy digital self check-in via door code",
      "Rural surroundings and easy parking near Roskilde",
    ],
    faqs: [FAQ_LOCATION, FAQ_ROOMS, FAQ_CHECKIN],
    relatedSlugs: ["naer-roskilde-festival", "naer-roskilde-domkirke", "naer-koege"],
  },

  // ─── Fest · anledninger (event use-case) ──────────────────────────────────
  {
    category: "fest",
    slug: "bryllup-naer-roskilde",
    metaTitle: "Bryllup nær Roskilde | Festsal på Svaleholm Gaard",
    metaDescription:
      "Hold bryllup i festsalen på Svaleholm Gaard nær Roskilde – plads til op til 150 gæster, egen catering tilladt og mulighed for overnatning. Få et uforpligtende tilbud.",
    heroEyebrowDa: "Bryllup nær Roskilde",
    heroEyebrowEn: "Weddings near Roskilde",
    h1Da: "Bryllup nær Roskilde",
    h1En: "Weddings near Roskilde",
    heroSubDa:
      "En smuk, naturnær ramme om jeres store dag – festsal til op til 150 gæster, grønne omgivelser og mulighed for at gæsterne overnatter.",
    heroSubEn:
      "A beautiful, nature-close setting for your big day – a hall for up to 150 guests, green surroundings and the option for guests to stay overnight.",
    image: "/images/festsal-hvid-1.png",
    imageAlt: "Festsal pyntet til bryllup på Svaleholm Gaard nær Roskilde",
    jsonLdName: "Bryllup nær Roskilde",
    jsonLdDescription:
      "Bryllup i festsalen på Svaleholm Gaard ved Roskilde – plads til op til 150 gæster med have, grønne omgivelser og mulighed for overnatning.",
    breadcrumbLabel: "Bryllup nær Roskilde",
    serviceName: "Bryllup",
    serviceDescription:
      "Bryllup i festsalen på Svaleholm Gaard nær Roskilde – plads til op til 150 gæster, egen catering tilladt og mulighed for overnatning.",
    intro: [
      {
        headingDa: "Fejr jeres bryllup på landet",
        headingEn: "Celebrate your wedding in the countryside",
        bodyDa:
          "Svaleholm Gaard er en historisk gård i landlige omgivelser lige uden for Roskilde – en smuk ramme om et bryllup med plads, natur og ro. Festsalen rummer op til 150 gæster og er et blankt lærred, I kan pynte og indrette præcis, som I drømmer om. Haven og de grønne omgivelser giver mulighed for vielse udendørs, velkomstdrinks og billeder i naturen.",
        bodyEn:
          "Svaleholm Gaard is a historic farm in rural surroundings just outside Roskilde – a beautiful setting for a wedding with space, nature and calm. The hall holds up to 150 guests and is a blank canvas you can decorate and arrange exactly as you dream. The garden and green surroundings allow for an outdoor ceremony, welcome drinks and photos in nature.",
      },
      {
        headingDa: "Egen catering og overnatning til gæsterne",
        headingEn: "Your own catering and overnight stays for guests",
        bodyDa:
          "I bestemmer selv over mad og drikke: der er køkkenfaciliteter til catering, så I kan vælge kok, cateringleverandør eller selv stå for det. Op til 8 værelser kan tilkøbes, så gæsterne kan overnatte og blive til morgenmaden – særligt praktisk, når I har gæster langvejsfra. Kontakt os for et uforpligtende tilbud på netop jeres dag.",
        bodyEn:
          "You're in charge of the food and drink: there are kitchen facilities for catering, so you can choose a chef, a caterer or do it yourselves. Up to 8 rooms can be added, so guests can stay over and remain for breakfast – especially handy when you have guests travelling from afar. Contact us for a no-obligation quote for your particular day.",
      },
    ],
    highlightsDa: [
      "Festsal til op til 150 gæster",
      "Have og grønne omgivelser til vielse og billeder",
      "Egen catering tilladt – køkkenfaciliteter til rådighed",
      "Overnatning kan tilkøbes til gæsterne (fra 650 kr pr. nat)",
      "Historisk gård i rolige omgivelser nær Roskilde",
    ],
    highlightsEn: [
      "A hall for up to 150 guests",
      "Garden and green surroundings for the ceremony and photos",
      "Your own catering allowed – kitchen facilities available",
      "Overnight stays can be added for guests (from DKK 650 per night)",
      "Historic farm in peaceful surroundings near Roskilde",
    ],
    faqs: [
      {
        qDa: "Hvor mange gæster er der plads til ved et bryllup?",
        qEn: "How many guests is there room for at a wedding?",
        aDa: "Festsalen har plads til op til 150 gæster. Ved leje af salen er der et minimum på 30 gæster.",
        aEn: "The hall holds up to 150 guests. When renting the hall there is a minimum of 30 guests.",
      },
      {
        qDa: "Må vi selv vælge cateringleverandør?",
        qEn: "Can we choose our own caterer?",
        aDa: "Ja. Der er køkkenfaciliteter til catering, og I bestemmer selv, om I bruger en kok, en cateringleverandør eller selv laver maden.",
        aEn: "Yes. There are kitchen facilities for catering, and you decide whether to use a chef, a caterer or cook the food yourselves.",
      },
      {
        qDa: "Kan gæsterne overnatte efter brylluppet?",
        qEn: "Can guests stay overnight after the wedding?",
        aDa: "Ja. Op til 8 enkle værelser kan tilkøbes, så gæsterne kan overnatte og blive til morgenmaden – fra 650 kr pr. værelse pr. nat.",
        aEn: "Yes. Up to 8 simple rooms can be added, so guests can stay over and remain for breakfast – from DKK 650 per room per night.",
      },
      FAQ_LOCATION,
    ],
    relatedSlugs: ["rund-foedselsdag-naer-roskilde", "konfirmation-naer-roskilde", "firmafest-naer-roskilde"],
  },
  {
    category: "fest",
    slug: "konfirmation-naer-roskilde",
    metaTitle: "Konfirmation nær Roskilde | Festsal på Svaleholm Gaard",
    metaDescription:
      "Hold konfirmation i festsalen på Svaleholm Gaard nær Roskilde – lys, rummelig sal, egen catering tilladt og mulighed for overnatning. Få et uforpligtende tilbud.",
    heroEyebrowDa: "Konfirmation nær Roskilde",
    heroEyebrowEn: "Confirmations near Roskilde",
    h1Da: "Konfirmation nær Roskilde",
    h1En: "Confirmations near Roskilde",
    heroSubDa:
      "En lys og rummelig festsal til konfirmationen – med plads til familie og venner, egen catering og rolige, grønne omgivelser nær Roskilde.",
    heroSubEn:
      "A bright, spacious hall for the confirmation – with room for family and friends, your own catering and calm, green surroundings near Roskilde.",
    image: "/images/festsal-fest-2.png",
    imageAlt: "Festsal dækket op til konfirmation på Svaleholm Gaard nær Roskilde",
    jsonLdName: "Konfirmation nær Roskilde",
    jsonLdDescription:
      "Konfirmation i festsalen på Svaleholm Gaard ved Roskilde – lys, rummelig sal med egen catering tilladt og mulighed for overnatning.",
    breadcrumbLabel: "Konfirmation nær Roskilde",
    serviceName: "Konfirmation",
    serviceDescription:
      "Konfirmation i festsalen på Svaleholm Gaard nær Roskilde – lys, rummelig sal, egen catering tilladt og mulighed for overnatning.",
    intro: [
      {
        headingDa: "En festlig dag for konfirmanden",
        headingEn: "A festive day for the young guest of honour",
        bodyDa:
          "Konfirmationen er en stor dag, der fortjener gode rammer. Festsalen på Svaleholm Gaard er lys, rummelig og lige til at gøre til jeres egen – med god plads til både den nærmeste familie og den store flok. Gården ligger landligt tæt på Roskilde, så der er ro, natur og plads til, at både børn og voksne kan hygge sig.",
        bodyEn:
          "A confirmation is a big day that deserves a good setting. The hall at Svaleholm Gaard is bright, spacious and ready to make your own – with plenty of room for both the closest family and the larger crowd. The farm lies in the countryside near Roskilde, so there's calm, nature and space for both children and grown-ups to enjoy themselves.",
      },
      {
        headingDa: "Enkelt at planlægge – fleksibelt at holde",
        headingEn: "Simple to plan – flexible to host",
        bodyDa:
          "I står selv for mad og drikke, og der er køkkenfaciliteter til catering. Borde og stole kan stilles frit op efter jeres ønske, og de grønne udearealer giver plads til leg og luft. Skal familie langvejsfra blive natten over, kan op til 8 værelser tilkøbes. Kontakt os for et uforpligtende tilbud.",
        bodyEn:
          "You handle the food and drink yourselves, and there are kitchen facilities for catering. Tables and chairs can be arranged freely to your wishes, and the green outdoor areas offer room for play and fresh air. If family from afar needs to stay the night, up to 8 rooms can be added. Contact us for a no-obligation quote.",
      },
    ],
    highlightsDa: [
      "Lys, rummelig festsal til op til 150 gæster",
      "Fri opstilling af borde og stole",
      "Egen catering tilladt – køkkenfaciliteter til rådighed",
      "Grønne udearealer til leg og luft",
      "Overnatning kan tilkøbes (fra 650 kr pr. nat)",
    ],
    highlightsEn: [
      "A bright, spacious hall for up to 150 guests",
      "Free arrangement of tables and chairs",
      "Your own catering allowed – kitchen facilities available",
      "Green outdoor areas for play and fresh air",
      "Overnight stays can be added (from DKK 650 per night)",
    ],
    faqs: [
      {
        qDa: "Hvor mange gæster kan deltage i konfirmationen?",
        qEn: "How many guests can attend the confirmation?",
        aDa: "Festsalen har plads til op til 150 gæster, med et minimum på 30 gæster ved leje af salen.",
        aEn: "The hall holds up to 150 guests, with a minimum of 30 guests when renting the hall.",
      },
      {
        qDa: "Må vi selv stå for mad og kage?",
        qEn: "Can we handle the food and cake ourselves?",
        aDa: "Ja. Der er køkkenfaciliteter til catering, og I bestemmer selv, om I laver maden, bruger en leverandør eller kombinerer.",
        aEn: "Yes. There are kitchen facilities for catering, and you decide whether you cook, use a supplier or combine the two.",
      },
      FAQ_ROOMS,
      FAQ_LOCATION,
    ],
    relatedSlugs: ["bryllup-naer-roskilde", "rund-foedselsdag-naer-roskilde", "firmafest-naer-roskilde"],
  },
  {
    category: "fest",
    slug: "rund-foedselsdag-naer-roskilde",
    metaTitle: "Rund fødselsdag nær Roskilde | Festsal på Svaleholm Gaard",
    metaDescription:
      "Fejr en rund fødselsdag i festsalen på Svaleholm Gaard nær Roskilde – plads til op til 150 gæster, egen catering og mulighed for overnatning. Få et tilbud.",
    heroEyebrowDa: "Rund fødselsdag nær Roskilde",
    heroEyebrowEn: "Milestone birthdays near Roskilde",
    h1Da: "Rund fødselsdag nær Roskilde",
    h1En: "Milestone birthdays near Roskilde",
    heroSubDa:
      "Saml familie og venner til en mærkedag i rammer, der matcher anledningen – festsal til op til 150 gæster med egen catering og mulighed for overnatning.",
    heroSubEn:
      "Gather family and friends for a milestone in a setting that matches the occasion – a hall for up to 150 guests with your own catering and overnight stays available.",
    image: "/images/festsal-fest-1.png",
    imageAlt: "Festsal dækket op til rund fødselsdag på Svaleholm Gaard nær Roskilde",
    jsonLdName: "Rund fødselsdag nær Roskilde",
    jsonLdDescription:
      "Rund fødselsdag i festsalen på Svaleholm Gaard ved Roskilde – plads til op til 150 gæster, egen catering tilladt og mulighed for overnatning.",
    breadcrumbLabel: "Rund fødselsdag nær Roskilde",
    serviceName: "Rund fødselsdag",
    serviceDescription:
      "Rund fødselsdag og mærkedage i festsalen på Svaleholm Gaard nær Roskilde – plads til op til 150 gæster, egen catering tilladt og mulighed for overnatning.",
    intro: [
      {
        headingDa: "Mærkedage fortjener gode rammer",
        headingEn: "Milestones deserve a good setting",
        bodyDa:
          "En rund fødselsdag – 40, 50, 60 eller 70 år – er en anledning til at samle dem, man holder af. Festsalen på Svaleholm Gaard er lys og rummelig med plads til op til 150 gæster, og den landlige beliggenhed tæt på Roskilde giver ro og plads, som en restaurant sjældent kan. I gør salen til jeres egen med borde, pynt og stemning, præcis som I vil.",
        bodyEn:
          "A milestone birthday – 40, 50, 60 or 70 – is an occasion to gather those you love. The hall at Svaleholm Gaard is bright and spacious with room for up to 150 guests, and the rural location near Roskilde offers calm and space a restaurant rarely can. You make the hall your own with tables, decorations and atmosphere, exactly as you wish.",
      },
      {
        headingDa: "Jeres fest – på jeres måde",
        headingEn: "Your party – your way",
        bodyDa:
          "I står selv for mad og drikke med adgang til køkkenfaciliteter, og I vælger selv opstilling og forløb. Festen kan fortsætte ud på aftenen, og gæster, der har langt hjem, kan overnatte i op til 8 enkle værelser. Vælg mellem time-, aften-, heldags- eller weekendpakke – kontakt os for et uforpligtende tilbud.",
        bodyEn:
          "You handle the food and drink yourselves with access to kitchen facilities, and you choose the layout and the flow of the day. The party can continue into the evening, and guests with a long way home can stay in up to 8 simple rooms. Choose between an hourly, evening, full-day or weekend package – contact us for a no-obligation quote.",
      },
    ],
    highlightsDa: [
      "Festsal til op til 150 gæster",
      "Fri opstilling og fleksibelt forløb",
      "Egen catering tilladt – køkkenfaciliteter til rådighed",
      "Time-, aften-, heldags- og weekendpakker",
      "Overnatning kan tilkøbes (fra 650 kr pr. nat)",
    ],
    highlightsEn: [
      "A hall for up to 150 guests",
      "Free layout and a flexible flow",
      "Your own catering allowed – kitchen facilities available",
      "Hourly, evening, full-day and weekend packages",
      "Overnight stays can be added (from DKK 650 per night)",
    ],
    faqs: [
      {
        qDa: "Hvilke pakker kan vi vælge til en fødselsdag?",
        qEn: "What packages can we choose for a birthday?",
        aDa: "I kan leje festsalen pr. time (fra 1.800 kr), som aftenpakke (kl. 17–24), heldagspakke (kl. 9–24) eller weekendpakke (fre–søn). Se priser og beregn jeres fest på prissiden.",
        aEn: "You can rent the hall by the hour (from DKK 1,800), as an evening package (5 pm–midnight), a full-day package (9 am–midnight) or a weekend package (Fri–Sun). See prices and calculate your event on the pricing page.",
      },
      {
        qDa: "Må vi selv stå for mad og drikke?",
        qEn: "Can we handle the food and drink ourselves?",
        aDa: "Ja. Der er køkkenfaciliteter til catering, og I bestemmer selv, om I laver maden, bruger en leverandør eller kombinerer.",
        aEn: "Yes. There are kitchen facilities for catering, and you decide whether you cook, use a supplier or combine the two.",
      },
      FAQ_ROOMS,
      FAQ_LOCATION,
    ],
    relatedSlugs: ["bryllup-naer-roskilde", "konfirmation-naer-roskilde", "firmafest-naer-roskilde"],
  },
  {
    category: "fest",
    slug: "firmafest-naer-roskilde",
    metaTitle: "Firmafest & firmaevent nær Roskilde | Svaleholm Gaard",
    metaDescription:
      "Hold firmafest, firmaevent eller julefrokost i festsalen på Svaleholm Gaard nær Roskilde – op til 150 gæster, egen catering og overnatning. Få et tilbud.",
    heroEyebrowDa: "Firmafest nær Roskilde",
    heroEyebrowEn: "Company events near Roskilde",
    h1Da: "Firmafest & firmaevent nær Roskilde",
    h1En: "Company events near Roskilde",
    heroSubDa:
      "Rammer til firmafest, teamdag, firmaevent og julefrokost – festsal til op til 150 gæster i rolige, grønne omgivelser tæt på Roskilde.",
    heroSubEn:
      "A setting for company parties, team days, corporate events and Christmas lunches – a hall for up to 150 guests in calm, green surroundings near Roskilde.",
    image: "/images/festsal-lounge.jpg",
    imageAlt: "Festsal og lounge til firmaevent på Svaleholm Gaard nær Roskilde",
    jsonLdName: "Firmafest & firmaevent nær Roskilde",
    jsonLdDescription:
      "Firmafest, firmaevent og julefrokost i festsalen på Svaleholm Gaard ved Roskilde – op til 150 gæster, egen catering tilladt og mulighed for overnatning.",
    breadcrumbLabel: "Firmafest nær Roskilde",
    serviceName: "Firmaevent",
    serviceDescription:
      "Firmafester, firmadage, firmaevents og julefrokoster i festsalen på landet nær Roskilde – op til 150 gæster med egen catering og mulighed for overnatning.",
    intro: [
      {
        headingDa: "Et anderledes sted til firmaarrangementet",
        headingEn: "A different venue for the company event",
        bodyDa:
          "Skift kontoret og den sædvanlige restaurant ud med en historisk gård på landet. Festsalen på Svaleholm Gaard rummer op til 150 gæster og egner sig til alt fra firmafest og teamdag til kundearrangement og julefrokost. De grønne omgivelser tæt på Roskilde giver plads til både fagligt indhold og hygge – og luft til pauser udendørs.",
        bodyEn:
          "Swap the office and the usual restaurant for a historic farm in the countryside. The hall at Svaleholm Gaard holds up to 150 guests and suits everything from company parties and team days to client events and Christmas lunches. The green surroundings near Roskilde leave room for both the professional content and socialising – and fresh air for breaks outdoors.",
      },
      {
        headingDa: "Fleksibelt, med overnatning til medarbejderne",
        headingEn: "Flexible, with overnight stays for staff",
        bodyDa:
          "Salen stilles op efter jeres program – borde til middag, stolerækker til oplæg eller stående reception. I vælger selv catering via køkkenfaciliteterne, og skal medarbejdere eller gæster blive natten over, kan op til 8 værelser tilkøbes. Vælg time-, aften-, heldags- eller weekendpakke, og kontakt os for et uforpligtende tilbud til virksomheden.",
        bodyEn:
          "The hall is arranged to fit your programme – tables for dinner, rows of chairs for a presentation or a standing reception. You choose catering via the kitchen facilities, and if staff or guests need to stay the night, up to 8 rooms can be added. Choose an hourly, evening, full-day or weekend package, and contact us for a no-obligation quote for your company.",
      },
    ],
    highlightsDa: [
      "Festsal til op til 150 gæster",
      "Egnet til firmafest, teamdag, kundeevent og julefrokost",
      "Fleksibel opstilling efter jeres program",
      "Egen catering tilladt – køkkenfaciliteter til rådighed",
      "Overnatning kan tilkøbes til medarbejdere (fra 650 kr pr. nat)",
    ],
    highlightsEn: [
      "A hall for up to 150 guests",
      "Suited to company parties, team days, client events and Christmas lunches",
      "Flexible layout to fit your programme",
      "Your own catering allowed – kitchen facilities available",
      "Overnight stays can be added for staff (from DKK 650 per night)",
    ],
    faqs: [
      {
        qDa: "Kan I rumme et større firmaarrangement?",
        qEn: "Can you host a larger company event?",
        aDa: "Ja. Festsalen har plads til op til 150 gæster og kan stilles op til middag, oplæg eller reception efter behov.",
        aEn: "Yes. The hall holds up to 150 guests and can be arranged for a dinner, a presentation or a reception as needed.",
      },
      {
        qDa: "Kan medarbejderne overnatte efter festen?",
        qEn: "Can staff stay overnight after the party?",
        aDa: "Ja. Op til 8 enkle værelser kan tilkøbes, så gæster og medarbejdere kan overnatte – fra 650 kr pr. værelse pr. nat.",
        aEn: "Yes. Up to 8 simple rooms can be added, so guests and staff can stay over – from DKK 650 per room per night.",
      },
      {
        qDa: "Må vi bruge vores egen cateringleverandør?",
        qEn: "Can we use our own caterer?",
        aDa: "Ja. Der er køkkenfaciliteter til catering, og I vælger selv kok, leverandør eller egen forplejning.",
        aEn: "Yes. There are kitchen facilities for catering, and you choose your own chef, supplier or self-catering.",
      },
      FAQ_LOCATION,
    ],
    relatedSlugs: ["bryllup-naer-roskilde", "rund-foedselsdag-naer-roskilde", "konfirmation-naer-roskilde"],
  },

  // ─── Batch 2 · fest (anledninger) ─────────────────────────────────────────
  {
    category: "fest",
    slug: "barnedaab-naer-roskilde",
    metaTitle: "Barnedåb nær Roskilde | Festsal på Svaleholm Gaard",
    metaDescription:
      "Hold barnedåb eller navngivning i festsalen på Svaleholm Gaard nær Roskilde – hyggelige rammer, egen catering tilladt og mulighed for overnatning. Få et tilbud.",
    heroEyebrowDa: "Barnedåb nær Roskilde",
    heroEyebrowEn: "Christenings near Roskilde",
    h1Da: "Barnedåb nær Roskilde",
    h1En: "Christenings near Roskilde",
    heroSubDa:
      "Fejr den lille i rolige, naturnære rammer – en lys festsal til familie og venner, egen catering og mulighed for, at gæsterne overnatter.",
    heroSubEn:
      "Celebrate the little one in calm, nature-close surroundings – a bright hall for family and friends, your own catering and the option for guests to stay over.",
    image: "/images/gaard-familie.png",
    imageAlt: "Familie samlet til barnedåb på Svaleholm Gaard nær Roskilde",
    jsonLdName: "Barnedåb nær Roskilde",
    jsonLdDescription:
      "Barnedåb og navngivningsfest i festsalen på Svaleholm Gaard ved Roskilde – hyggelige rammer med egen catering tilladt og mulighed for overnatning.",
    breadcrumbLabel: "Barnedåb nær Roskilde",
    serviceName: "Barnedåb",
    serviceDescription:
      "Barnedåb og navngivningsfest i festsalen på Svaleholm Gaard nær Roskilde – plads til familie og venner, egen catering tilladt og mulighed for overnatning.",
    intro: [
      {
        headingDa: "En rolig dag for hele familien",
        headingEn: "A calm day for the whole family",
        bodyDa:
          "En barnedåb eller navngivning er en blid, familiær fejring – og festsalen på Svaleholm Gaard giver netop de rolige, lyse rammer, dagen fortjener. Gården ligger landligt lige uden for Roskilde med have og grønne omgivelser, så der er god plads til både den nærmeste familie og en større flok, og luft til, at børnene kan røre sig.",
        bodyEn:
          "A christening or naming celebration is a gentle, family affair – and the hall at Svaleholm Gaard offers exactly the calm, bright setting the day deserves. The farm lies in the countryside just outside Roskilde with a garden and green surroundings, so there's plenty of room for both close family and a larger crowd, and space for the children to move about.",
      },
      {
        headingDa: "Jeres mad, jeres opstilling",
        headingEn: "Your food, your layout",
        bodyDa:
          "I står selv for forplejningen med adgang til køkkenfaciliteter, så dåbsfrokosten kan være præcis, som I ønsker – hjemmelavet, fra en leverandør eller en kombination. Borde og stole stilles frit op, og skal gudfar, mormor eller gæster langvejsfra blive natten over, kan op til 8 enkle værelser tilkøbes. Kontakt os for et uforpligtende tilbud.",
        bodyEn:
          "You handle the catering yourselves with access to kitchen facilities, so the christening lunch can be exactly as you wish – homemade, from a supplier or a combination. Tables and chairs are arranged freely, and if godparents, grandparents or guests from afar need to stay the night, up to 8 simple rooms can be added. Contact us for a no-obligation quote.",
      },
    ],
    highlightsDa: [
      "Lys, rolig festsal til familie og venner",
      "Have og grønne omgivelser med plads til børnene",
      "Egen catering tilladt – køkkenfaciliteter til rådighed",
      "Fri opstilling af borde og stole",
      "Overnatning kan tilkøbes (fra 650 kr pr. nat)",
    ],
    highlightsEn: [
      "A bright, calm hall for family and friends",
      "Garden and green surroundings with room for the children",
      "Your own catering allowed – kitchen facilities available",
      "Free arrangement of tables and chairs",
      "Overnight stays can be added (from DKK 650 per night)",
    ],
    faqs: [
      {
        qDa: "Er festsalen god til en mindre barnedåb?",
        qEn: "Is the hall suitable for a smaller christening?",
        aDa: "Ja. Salen kan rumme op til 150 gæster, men egner sig også fint til en mindre, hyggelig dåbsfrokost. Ved leje af salen er der et minimum på 30 gæster.",
        aEn: "Yes. The hall holds up to 150 guests but also works well for a smaller, cosy christening lunch. When renting the hall there is a minimum of 30 guests.",
      },
      {
        qDa: "Må vi selv stå for dåbsfrokosten?",
        qEn: "Can we handle the christening lunch ourselves?",
        aDa: "Ja. Der er køkkenfaciliteter til catering, og I bestemmer selv, om I laver maden, bruger en leverandør eller kombinerer.",
        aEn: "Yes. There are kitchen facilities for catering, and you decide whether you cook, use a supplier or combine the two.",
      },
      FAQ_ROOMS,
      FAQ_LOCATION,
    ],
    relatedSlugs: ["konfirmation-naer-roskilde", "rund-foedselsdag-naer-roskilde", "reception-naer-roskilde"],
  },
  {
    category: "fest",
    slug: "mindesammenkomst-naer-roskilde",
    metaTitle: "Mindesammenkomst nær Roskilde | Svaleholm Gaard",
    metaDescription:
      "Rolige rammer til mindesammenkomst og begravelseskaffe nær Roskilde. Festsal på Svaleholm Gaard med egen catering og mulighed for overnatning. Kontakt os.",
    heroEyebrowDa: "Mindesammenkomst nær Roskilde",
    heroEyebrowEn: "Memorial gatherings near Roskilde",
    h1Da: "Mindesammenkomst nær Roskilde",
    h1En: "Memorial gatherings near Roskilde",
    heroSubDa:
      "Et stille, værdigt sted at samles efter en bisættelse eller begravelse – rolige rammer på landet tæt på Roskilde, hvor I selv bestemmer forplejning og forløb.",
    heroSubEn:
      "A quiet, dignified place to gather after a funeral – calm surroundings in the countryside near Roskilde, where you decide the catering and the pace.",
    image: "/images/festsal-drapes.jpg",
    imageAlt: "Rolig, stemningsfuld festsal til mindesammenkomst på Svaleholm Gaard",
    jsonLdName: "Mindesammenkomst nær Roskilde",
    jsonLdDescription:
      "Mindesammenkomst og begravelseskaffe i rolige rammer på Svaleholm Gaard ved Roskilde – egen catering tilladt og mulighed for overnatning.",
    breadcrumbLabel: "Mindesammenkomst nær Roskilde",
    serviceName: "Mindesammenkomst",
    serviceDescription:
      "Mindesammenkomst og begravelseskaffe i festsalen på Svaleholm Gaard nær Roskilde – rolige, værdige rammer med egen catering og mulighed for overnatning.",
    intro: [
      {
        headingDa: "Rolige rammer til at mindes",
        headingEn: "Calm surroundings to remember",
        bodyDa:
          "Når familien samles efter en bisættelse eller begravelse, er der brug for ro, plads og værdighed. Festsalen på Svaleholm Gaard ligger i stille, landlige omgivelser lige uden for Roskilde – væk fra trafik og travlhed. Her kan I mødes til mindesammenkomst eller begravelseskaffe i rammer, der giver plads til både eftertanke og de gode minder.",
        bodyEn:
          "When the family gathers after a funeral, there's a need for calm, space and dignity. The hall at Svaleholm Gaard lies in quiet, rural surroundings just outside Roskilde – away from traffic and bustle. Here you can meet for a memorial gathering or coffee in a setting that leaves room for both reflection and fond memories.",
      },
      {
        headingDa: "Enkelt at arrangere i en svær tid",
        headingEn: "Simple to arrange at a difficult time",
        bodyDa:
          "I bestemmer selv over forplejningen: der er køkkenfaciliteter, så kaffe, kage og mad kan ordnes af jer, en leverandør eller et traktørsted. Salen stilles op efter antal og ønsker, og skal gæster langvejsfra blive natten over, kan op til 8 enkle værelser tilkøbes. Kontakt os, så hjælper vi jer trygt videre.",
        bodyEn:
          "You decide on the catering: there are kitchen facilities, so coffee, cake and food can be handled by you, a supplier or a caterer. The hall is arranged to fit the number and your wishes, and if guests from afar need to stay the night, up to 8 simple rooms can be added. Contact us and we'll help you gently from there.",
      },
    ],
    highlightsDa: [
      "Stille, værdige rammer væk fra trafik",
      "Fleksibel opstilling efter antal gæster",
      "Egen catering/traktør tilladt – køkkenfaciliteter til rådighed",
      "Overnatning kan tilkøbes til gæster langvejsfra",
      "Landlige omgivelser tæt på Roskilde med nem parkering",
    ],
    highlightsEn: [
      "Quiet, dignified surroundings away from traffic",
      "Flexible layout for the number of guests",
      "Your own catering allowed – kitchen facilities available",
      "Overnight stays can be added for guests from afar",
      "Rural surroundings near Roskilde with easy parking",
    ],
    faqs: [
      {
        qDa: "Kan I rumme en mindesammenkomst med både få og mange gæster?",
        qEn: "Can you host a memorial gathering for both few and many guests?",
        aDa: "Ja. Salen kan tilpasses alt fra en mindre, intim sammenkomst til op til 150 gæster. Ved leje af salen er der et minimum på 30 gæster.",
        aEn: "Yes. The hall can be adapted to anything from a smaller, intimate gathering to up to 150 guests. When renting the hall there is a minimum of 30 guests.",
      },
      {
        qDa: "Må vi selv eller en leverandør stå for kaffe og mad?",
        qEn: "Can we or a supplier handle the coffee and food?",
        aDa: "Ja. Der er køkkenfaciliteter, og I vælger selv, om I ordner forplejningen, bruger en leverandør eller et traktørsted.",
        aEn: "Yes. There are kitchen facilities, and you choose whether you handle the catering, use a supplier or a caterer.",
      },
      FAQ_LOCATION,
      FAQ_ROOMS,
    ],
    relatedSlugs: ["reception-naer-roskilde", "rund-foedselsdag-naer-roskilde", "konfirmation-naer-roskilde"],
  },
  {
    category: "fest",
    slug: "julefrokost-naer-roskilde",
    metaTitle: "Julefrokost med overnatning nær Roskilde | Svaleholm Gaard",
    metaDescription:
      "Hold julefrokost i festsalen på Svaleholm Gaard nær Roskilde – egen catering, plads til op til 150 og op til 8 værelser, så ingen skal hjem i nattekulden. Få et tilbud.",
    heroEyebrowDa: "Julefrokost nær Roskilde",
    heroEyebrowEn: "Christmas lunches near Roskilde",
    h1Da: "Julefrokost med overnatning nær Roskilde",
    h1En: "Christmas lunches with a stay near Roskilde",
    heroSubDa:
      "Hold årets julefrokost i festsalen på landet – plads til op til 150, egen catering og op til 8 værelser, så I kan feste trygt og blive til morgenmaden.",
    heroSubEn:
      "Hold this year's Christmas lunch in the country hall – room for up to 150, your own catering and up to 8 rooms, so you can celebrate and stay for breakfast.",
    image: "/images/skaal-toast.png",
    imageAlt: "Skål og julefrokost i festsalen på Svaleholm Gaard nær Roskilde",
    jsonLdName: "Julefrokost med overnatning nær Roskilde",
    jsonLdDescription:
      "Julefrokost i festsalen på Svaleholm Gaard ved Roskilde – plads til op til 150 gæster, egen catering tilladt og op til 8 værelser til overnatning.",
    breadcrumbLabel: "Julefrokost nær Roskilde",
    serviceName: "Julefrokost",
    serviceDescription:
      "Julefrokost for firma, venner eller familie i festsalen på Svaleholm Gaard nær Roskilde – egen catering tilladt og mulighed for overnatning i op til 8 værelser.",
    intro: [
      {
        headingDa: "Julefrokost på landet – uden hjemtransporten",
        headingEn: "A Christmas lunch in the country – without the trip home",
        bodyDa:
          "Den bedste julefrokost slutter ikke, fordi nogen skal nå sidste tog. På Svaleholm Gaard kan I holde festen i salen og overnatte bagefter i op til 8 enkle værelser – så ingen behøver at bekymre sig om hjemtransport i nattekulden. Gården ligger landligt tæt på Roskilde med plads til op til 150 gæster, uanset om det er firmaet, vennerne eller familien.",
        bodyEn:
          "The best Christmas lunch doesn't end because someone has to catch the last train. At Svaleholm Gaard you can hold the party in the hall and stay afterwards in up to 8 simple rooms – so no one has to worry about getting home in the cold. The farm lies in the countryside near Roskilde with room for up to 150 guests, whether it's the company, friends or family.",
      },
      {
        headingDa: "Egen menu og fri opstilling",
        headingEn: "Your own menu and a free layout",
        bodyDa:
          "I vælger selv julemenuen via køkkenfaciliteterne – det klassiske kolde bord, en cateringleverandør eller jeres egen løsning. Salen stilles op til langborde, buffet eller fest, og I kan vælge time-, aften-, heldags- eller weekendpakke. Kontakt os for et uforpligtende tilbud med eller uden overnatning.",
        bodyEn:
          "You choose the Christmas menu via the kitchen facilities – the classic cold table, a caterer or your own solution. The hall is arranged for long tables, a buffet or a party, and you can choose an hourly, evening, full-day or weekend package. Contact us for a no-obligation quote with or without an overnight stay.",
      },
    ],
    highlightsDa: [
      "Festsal til op til 150 gæster",
      "Op til 8 værelser – fest uden bekymring om hjemtransport",
      "Egen julemenu/catering tilladt – køkkenfaciliteter til rådighed",
      "Time-, aften-, heldags- og weekendpakker",
      "Landlige rammer tæt på Roskilde med nem parkering",
    ],
    highlightsEn: [
      "A hall for up to 150 guests",
      "Up to 8 rooms – party without worrying about the trip home",
      "Your own Christmas menu/catering allowed – kitchen facilities available",
      "Hourly, evening, full-day and weekend packages",
      "Country setting near Roskilde with easy parking",
    ],
    faqs: [
      {
        qDa: "Kan gæsterne overnatte efter julefrokosten?",
        qEn: "Can guests stay overnight after the Christmas lunch?",
        aDa: "Ja. Op til 8 enkle værelser kan tilkøbes, så I kan feste og blive til morgenmaden – fra 650 kr pr. værelse pr. nat.",
        aEn: "Yes. Up to 8 simple rooms can be added, so you can celebrate and stay for breakfast – from DKK 650 per room per night.",
      },
      {
        qDa: "Må vi selv bestemme julemenuen?",
        qEn: "Can we decide the Christmas menu ourselves?",
        aDa: "Ja. Der er køkkenfaciliteter til catering, og I vælger selv kok, cateringleverandør eller egen løsning.",
        aEn: "Yes. There are kitchen facilities for catering, and you choose your own chef, caterer or solution.",
      },
      FAQ_LOCATION,
      FAQ_ROOMS,
    ],
    relatedSlugs: ["firmafest-naer-roskilde", "firmatur-naer-roskilde", "reception-naer-roskilde"],
  },
  {
    category: "fest",
    slug: "polterabend-naer-roskilde",
    metaTitle: "Polterabend med overnatning nær Roskilde | Svaleholm Gaard",
    metaDescription:
      "Saml holdet til polterabend nær Roskilde – privat festsal og op til 8 værelser på Svaleholm Gaard, så I kan feste og sove på samme sted. Få et uforpligtende tilbud.",
    heroEyebrowDa: "Polterabend nær Roskilde",
    heroEyebrowEn: "Hen & stag parties near Roskilde",
    h1Da: "Polterabend med overnatning nær Roskilde",
    h1En: "Hen & stag parties with a stay near Roskilde",
    heroSubDa:
      "Et privat sted, hvor holdet både kan feste og sove – festsal og op til 8 værelser i rolige, landlige rammer tæt på Roskilde.",
    heroSubEn:
      "A private place where the group can both party and sleep – a hall and up to 8 rooms in calm, rural surroundings near Roskilde.",
    image: "/images/bar.jpg",
    imageAlt: "Bar og festområde til polterabend på Svaleholm Gaard nær Roskilde",
    jsonLdName: "Polterabend med overnatning nær Roskilde",
    jsonLdDescription:
      "Polterabend med egen festsal og overnatning på Svaleholm Gaard ved Roskilde – privat hold-sted med op til 8 værelser og egen catering.",
    breadcrumbLabel: "Polterabend nær Roskilde",
    serviceName: "Polterabend",
    serviceDescription:
      "Polterabend med privat festsal og overnatning på Svaleholm Gaard nær Roskilde – plads til holdet, egen catering og op til 8 værelser.",
    intro: [
      {
        headingDa: "Fest og overnatning samme sted",
        headingEn: "Party and sleep in one place",
        bodyDa:
          "De fleste polterabends ender med spørgsmålet: hvor skal vi sove? På Svaleholm Gaard slipper I for det. Her har holdet en privat festsal og op til 8 enkle værelser på samme adresse, i rolige landlige omgivelser tæt på Roskilde. I kan holde jeres eget program – middag, lege og fest – uden at skulle videre til et andet sted bagefter.",
        bodyEn:
          "Most hen and stag parties end with the question: where do we sleep? At Svaleholm Gaard you avoid that. Here the group has a private hall and up to 8 simple rooms at the same address, in calm rural surroundings near Roskilde. You can run your own programme – dinner, games and party – without having to move on somewhere else afterwards.",
      },
      {
        headingDa: "Jeres eget rum til dagen",
        headingEn: "Your own space for the day",
        bodyDa:
          "I står selv for mad og drikke med adgang til køkkenfaciliteter, og salen er jeres at indrette. Det er et roligt, privat alternativ til byens barer – god plads, natur og ingen naboer tæt på. Overnatning starter ved 650 kr pr. værelse pr. nat, og der er nem parkering. Kontakt os for et uforpligtende tilbud til holdet.",
        bodyEn:
          "You handle the food and drink yourselves with access to kitchen facilities, and the hall is yours to arrange. It's a calm, private alternative to the city's bars – plenty of space, nature and no close neighbours. Overnight stays start at DKK 650 per room per night, and there's easy parking. Contact us for a no-obligation quote for the group.",
      },
    ],
    highlightsDa: [
      "Privat festsal – holdet for sig selv",
      "Op til 8 værelser: fest og sov samme sted",
      "Egen catering/drikkevarer tilladt – køkkenfaciliteter til rådighed",
      "Rolige, private omgivelser uden naboer tæt på",
      "Tæt på Roskilde med nem parkering",
    ],
    highlightsEn: [
      "A private hall – the group to yourselves",
      "Up to 8 rooms: party and sleep in one place",
      "Your own catering/drinks allowed – kitchen facilities available",
      "Calm, private surroundings with no close neighbours",
      "Close to Roskilde with easy parking",
    ],
    faqs: [
      {
        qDa: "Kan holdet overnatte efter polterabenden?",
        qEn: "Can the group stay overnight after the party?",
        aDa: "Ja. Der er op til 8 enkle værelser med fælles køkken, bad og opholdsrum, så hele holdet kan blive på stedet – fra 650 kr pr. værelse pr. nat.",
        aEn: "Yes. There are up to 8 simple rooms with a shared kitchen, bath and lounge, so the whole group can stay on site – from DKK 650 per room per night.",
      },
      {
        qDa: "Tilbyder I aktiviteter til polterabenden?",
        qEn: "Do you offer activities for the party?",
        aDa: "Vi tilbyder stedet – en privat festsal, overnatning og rolige omgivelser. Aktiviteter og underholdning arrangerer I selv, så dagen bliver jeres egen.",
        aEn: "We offer the venue – a private hall, overnight stays and calm surroundings. You arrange activities and entertainment yourselves, so the day is your own.",
      },
      FAQ_LOCATION,
      FAQ_CHECKIN,
    ],
    relatedSlugs: ["bryllup-naer-roskilde", "firmatur-naer-roskilde", "rund-foedselsdag-naer-roskilde"],
  },
  {
    category: "fest",
    slug: "reception-naer-roskilde",
    metaTitle: "Reception & jubilæum nær Roskilde | Svaleholm Gaard",
    metaDescription:
      "Hold reception eller jubilæum i festsalen på Svaleholm Gaard nær Roskilde – fleksibel sal til op til 150, egen catering og mulighed for overnatning. Få et tilbud.",
    heroEyebrowDa: "Reception & jubilæum nær Roskilde",
    heroEyebrowEn: "Receptions & anniversaries near Roskilde",
    h1Da: "Reception & jubilæum nær Roskilde",
    h1En: "Receptions & anniversaries near Roskilde",
    heroSubDa:
      "Rammer til reception, jubilæum og mærkedage – en fleksibel festsal til både stående reception og siddende fejring, i rolige omgivelser nær Roskilde.",
    heroSubEn:
      "A setting for receptions, anniversaries and milestones – a flexible hall for both a standing reception and a seated celebration, in calm surroundings near Roskilde.",
    image: "/images/festsal-terrasse.jpg",
    imageAlt: "Festsal med terrasse til reception på Svaleholm Gaard nær Roskilde",
    jsonLdName: "Reception & jubilæum nær Roskilde",
    jsonLdDescription:
      "Reception og jubilæum i festsalen på Svaleholm Gaard ved Roskilde – fleksibel sal til op til 150 gæster, egen catering tilladt og mulighed for overnatning.",
    breadcrumbLabel: "Reception & jubilæum nær Roskilde",
    serviceName: "Reception & jubilæum",
    serviceDescription:
      "Reception og jubilæum i festsalen på Svaleholm Gaard nær Roskilde – fleksibel sal til stående reception eller siddende fejring, egen catering og mulighed for overnatning.",
    intro: [
      {
        headingDa: "Fleksible rammer til receptionen",
        headingEn: "A flexible setting for the reception",
        bodyDa:
          "En reception eller et jubilæum – personligt eller for virksomheden – kræver en sal, der kan tilpasses. Festsalen på Svaleholm Gaard kan stilles op til alt fra stående reception med drinks og snacks til siddende fejring med tale og middag. Gården ligger landligt tæt på Roskilde med have og grønne omgivelser til velkomst og billeder.",
        bodyEn:
          "A reception or anniversary – personal or for the company – calls for a hall that can adapt. The hall at Svaleholm Gaard can be arranged for anything from a standing reception with drinks and snacks to a seated celebration with speeches and dinner. The farm lies in the countryside near Roskilde with a garden and green surroundings for the welcome and photos.",
      },
      {
        headingDa: "Jeres program, jeres forplejning",
        headingEn: "Your programme, your catering",
        bodyDa:
          "I bestemmer selv forløbet og forplejningen via køkkenfaciliteterne, og salen rummer op til 150 gæster. Skal gæster langvejsfra blive natten over, kan op til 8 værelser tilkøbes. Vælg time-, aften-, heldags- eller weekendpakke, og kontakt os for et uforpligtende tilbud til jeres reception eller jubilæum.",
        bodyEn:
          "You decide the flow and the catering via the kitchen facilities, and the hall holds up to 150 guests. If guests from afar need to stay the night, up to 8 rooms can be added. Choose an hourly, evening, full-day or weekend package, and contact us for a no-obligation quote for your reception or anniversary.",
      },
    ],
    highlightsDa: [
      "Fleksibel sal: stående reception eller siddende fejring",
      "Plads til op til 150 gæster",
      "Have og grønne omgivelser til velkomst og billeder",
      "Egen catering tilladt – køkkenfaciliteter til rådighed",
      "Overnatning kan tilkøbes (fra 650 kr pr. nat)",
    ],
    highlightsEn: [
      "A flexible hall: standing reception or seated celebration",
      "Room for up to 150 guests",
      "Garden and green surroundings for the welcome and photos",
      "Your own catering allowed – kitchen facilities available",
      "Overnight stays can be added (from DKK 650 per night)",
    ],
    faqs: [
      {
        qDa: "Kan salen bruges til en stående reception?",
        qEn: "Can the hall be used for a standing reception?",
        aDa: "Ja. Salen stilles op efter jeres program – stående reception, buffet eller siddende middag – med plads til op til 150 gæster.",
        aEn: "Yes. The hall is arranged to fit your programme – a standing reception, a buffet or a seated dinner – with room for up to 150 guests.",
      },
      {
        qDa: "Hvilke pakker kan vi vælge?",
        qEn: "What packages can we choose?",
        aDa: "I kan leje salen pr. time, som aften-, heldags- eller weekendpakke. Se priser og beregn jeres arrangement på prissiden.",
        aEn: "You can rent the hall by the hour, or as an evening, full-day or weekend package. See prices and calculate your event on the pricing page.",
      },
      FAQ_LOCATION,
      FAQ_ROOMS,
    ],
    relatedSlugs: ["bryllup-naer-roskilde", "rund-foedselsdag-naer-roskilde", "firmafest-naer-roskilde"],
  },
  {
    category: "fest",
    slug: "firmatur-naer-roskilde",
    metaTitle: "Firmatur & firmaarrangement med overnatning nær Roskilde",
    metaDescription:
      "Hold firmatur eller firmaarrangement med overnatning nær Roskilde. Svaleholm Gaard har festsal til op til 150 og op til 8 værelser i rolige, landlige rammer. Få et tilbud.",
    heroEyebrowDa: "Firmatur nær Roskilde",
    heroEyebrowEn: "Company retreats near Roskilde",
    h1Da: "Firmatur & firmaarrangement med overnatning nær Roskilde",
    h1En: "Company retreats with a stay near Roskilde",
    heroSubDa:
      "En rolig base til firmaturen – festsal til samling og op til 8 værelser til overnatning, i naturnære rammer tæt på Roskilde.",
    heroSubEn:
      "A calm base for the company trip – a hall to gather in and up to 8 rooms to stay in, in nature-close surroundings near Roskilde.",
    image: "/images/lounge.jpg",
    imageAlt: "Lounge og mødeområde til firmatur på Svaleholm Gaard nær Roskilde",
    jsonLdName: "Firmatur & firmaarrangement med overnatning nær Roskilde",
    jsonLdDescription:
      "Firmatur og firmaarrangement med overnatning på Svaleholm Gaard ved Roskilde – festsal til op til 150 gæster og op til 8 værelser i landlige rammer.",
    breadcrumbLabel: "Firmatur nær Roskilde",
    serviceName: "Firmatur",
    serviceDescription:
      "Firmatur og firmaarrangement med overnatning på Svaleholm Gaard nær Roskilde – festsal til samling og op til 8 værelser, i rolige landlige rammer.",
    intro: [
      {
        headingDa: "En rolig base for firmaturen",
        headingEn: "A calm base for the company trip",
        bodyDa:
          "Skal virksomheden samles over flere dage, er Svaleholm Gaard en rolig base tæt på Roskilde. I har festsalen til fælles samling, middag og hygge, og op til 8 enkle værelser til overnatning – alt sammen på samme landlige adresse. De grønne omgivelser giver luft til pauser og uformelt samvær uden for mødet.",
        bodyEn:
          "If the company is gathering over several days, Svaleholm Gaard is a calm base near Roskilde. You have the hall for gathering together, dinner and socialising, and up to 8 simple rooms for the overnight stay – all at the same rural address. The green surroundings offer space for breaks and informal time together outside the meeting.",
      },
      {
        headingDa: "Enkelt, fleksibelt – stedet, ikke pakken",
        headingEn: "Simple, flexible – the venue, not the package",
        bodyDa:
          "Svaleholm leverer stedet: en fleksibel sal, overnatning og ro. I står selv for forplejning via køkkenfaciliteterne og for program og eventuelle aktiviteter, så turen bliver præcis jeres. Det gør det til et enkelt, prisvenligt alternativ til de store kursuscentre. Kontakt os for et uforpligtende tilbud til virksomheden.",
        bodyEn:
          "Svaleholm provides the venue: a flexible hall, overnight stays and calm. You handle the catering via the kitchen facilities and the programme and any activities yourselves, so the trip is exactly yours. That makes it a simple, affordable alternative to the big conference centres. Contact us for a no-obligation quote for your company.",
      },
    ],
    highlightsDa: [
      "Festsal til fælles samling og middag (op til 150)",
      "Op til 8 værelser til overnatning på stedet",
      "Grønne omgivelser til pauser og uformelt samvær",
      "Egen catering tilladt – køkkenfaciliteter til rådighed",
      "Prisvenligt alternativ til store kursuscentre nær Roskilde",
    ],
    highlightsEn: [
      "A hall for gathering and dinner (up to 150)",
      "Up to 8 rooms for staying on site",
      "Green surroundings for breaks and informal time together",
      "Your own catering allowed – kitchen facilities available",
      "An affordable alternative to large conference centres near Roskilde",
    ],
    faqs: [
      {
        qDa: "Kan medarbejderne overnatte under firmaturen?",
        qEn: "Can staff stay overnight during the company trip?",
        aDa: "Ja. Der er op til 8 enkle værelser med fælles køkken, bad og opholdsrum – fra 650 kr pr. værelse pr. nat, så I kan samles og overnatte samme sted.",
        aEn: "Yes. There are up to 8 simple rooms with a shared kitchen, bath and lounge – from DKK 650 per room per night, so you can gather and stay in one place.",
      },
      {
        qDa: "Tilbyder I AV-udstyr og teambuilding-aktiviteter?",
        qEn: "Do you offer AV equipment and team-building activities?",
        aDa: "Svaleholm leverer stedet – festsal, overnatning og rolige omgivelser. Program, aktiviteter og eventuelt AV-udstyr arrangerer I selv, så turen bliver fleksibel og jeres egen.",
        aEn: "Svaleholm provides the venue – a hall, overnight stays and calm surroundings. You arrange the programme, activities and any AV equipment yourselves, so the trip stays flexible and your own.",
      },
      FAQ_LOCATION,
      FAQ_ROOMS,
    ],
    relatedSlugs: ["firmafest-naer-roskilde", "julefrokost-naer-roskilde", "polterabend-naer-roskilde"],
  },

  // ─── Batch 2 · overnatning (byer & seværdigheder) ─────────────────────────
  {
    category: "overnatning",
    slug: "naer-sagnlandet-lejre",
    metaTitle: "Overnatning nær Sagnlandet Lejre | Svaleholm Gaard",
    metaDescription:
      "Besøg Sagnlandet Lejre med familien og overnat landligt på Svaleholm Gaard – op til 8 enkle værelser fra 650 kr pr. nat med fælles køkken og nem selvcheck-in.",
    heroEyebrowDa: "Overnatning nær Sagnlandet Lejre",
    heroEyebrowEn: "Stay near the Land of Legends",
    h1Da: "Overnatning nær Sagnlandet Lejre",
    h1En: "Stay near the Land of Legends (Sagnlandet Lejre)",
    heroSubDa:
      "Et børnevenligt, naturnært udgangspunkt for en dag i Sagnlandet Lejre – enkle værelser med fælles køkken tæt på Roskilde og fleksibel selvcheck-in.",
    heroSubEn:
      "A family-friendly, nature-close base for a day at the Land of Legends – simple rooms with a shared kitchen near Roskilde and flexible self check-in.",
    image: "/images/natur-3.jpg",
    imageAlt: "Natur og skov nær Svaleholm Gaard og Sagnlandet Lejre",
    jsonLdName: "Overnatning nær Sagnlandet Lejre",
    jsonLdDescription:
      "Enkle værelser til overnatning på Svaleholm Gaard i landlige omgivelser tæt på Sagnlandet Lejre og Roskilde på Sjælland.",
    breadcrumbLabel: "Overnatning nær Sagnlandet Lejre",
    intro: [
      {
        headingDa: "Perfekt til familiens oplevelsesdag",
        headingEn: "Perfect for a family day out",
        bodyDa:
          "Sagnlandet Lejre er et stort oplevelses- og historieland, hvor familier går på opdagelse i jernalder, vikingetid og stenalder. En dag dér trækker ofte ud, og så er det rart ikke at skulle køre langt bagefter. Svaleholm Gaard ligger i de samme grønne omgivelser tæt på Roskilde og er et børnevenligt, naturnært sted at overnatte før eller efter besøget.",
        bodyEn:
          "The Land of Legends in Lejre is a large open-air history park where families explore the Iron Age, the Viking Age and the Stone Age. A day there often runs long, and then it's nice not to have to drive far afterwards. Svaleholm Gaard lies in the same green surroundings near Roskilde and is a family-friendly, nature-close place to stay before or after the visit.",
      },
      {
        headingDa: "Enkelt og billigt for familien",
        headingEn: "Simple and affordable for the family",
        bodyDa:
          "Med op til 8 enkle værelser, fælles køkken, fælles bad og et opholdsrum er der god plads til familien eller flere familier sammen. Det fælles køkken gør det nemt at ordne aftensmad og madpakker, og prisen fra 650 kr pr. nat holder budgettet nede. Selvcheck-in med dørkode betyder, at I ankommer, når dagen tillader det.",
        bodyEn:
          "With up to 8 simple rooms, a shared kitchen, shared baths and a lounge, there's plenty of room for the family or several families together. The shared kitchen makes it easy to sort out dinner and packed lunches, and the price from DKK 650 per night keeps the budget down. Self check-in with a door code means you arrive whenever the day allows.",
      },
    ],
    highlightsDa: [
      "Børnevenligt udgangspunkt for Sagnlandet Lejre",
      "Op til 8 enkle værelser – fra 650 kr pr. nat inkl. moms",
      "Fælles køkken til aftensmad og madpakker",
      "Nem digital selvcheck-in via dørkode",
      "Grønne, rolige omgivelser tæt på Roskilde",
    ],
    highlightsEn: [
      "Family-friendly base for the Land of Legends",
      "Up to 8 simple rooms – from DKK 650 per night incl. VAT",
      "Shared kitchen for dinner and packed lunches",
      "Easy digital self check-in via door code",
      "Green, peaceful surroundings close to Roskilde",
    ],
    faqs: [FAQ_LOCATION, FAQ_ROOMS, FAQ_CHECKIN],
    relatedSlugs: ["naer-lejre", "naer-vikingeskibsmuseet", "naer-roskilde-domkirke"],
  },
  {
    category: "overnatning",
    slug: "naer-frederikssund",
    metaTitle: "Overnatning nær Frederikssund | Svaleholm Gaard ved Roskilde",
    metaDescription:
      "Landlig overnatning mellem Roskilde og Frederikssund. Svaleholm Gaard har op til 8 enkle værelser fra 650 kr pr. nat med fælles køkken, bad og nem selvcheck-in.",
    heroEyebrowDa: "Overnatning nær Frederikssund",
    heroEyebrowEn: "Stay near Frederikssund",
    h1Da: "Overnatning nær Frederikssund",
    h1En: "Stay near Frederikssund",
    heroSubDa:
      "Enkle, hyggelige værelser i landlige omgivelser på vejen mellem Roskilde og Frederikssund – et roligt, billigt sted at overnatte på Sjælland.",
    heroSubEn:
      "Simple, cosy rooms in rural surroundings on the road between Roskilde and Frederikssund – a quiet, affordable place to stay on Zealand.",
    image: "/images/natur-4.jpg",
    imageAlt: "Landskab og natur nær Svaleholm Gaard mod Frederikssund",
    jsonLdName: "Overnatning nær Frederikssund",
    jsonLdDescription:
      "Enkle værelser til overnatning på Svaleholm Gaard i landlige omgivelser mellem Roskilde og Frederikssund på Sjælland.",
    breadcrumbLabel: "Overnatning nær Frederikssund",
    intro: [
      {
        headingDa: "På vejen mod Frederikssund og fjorden",
        headingEn: "On the road towards Frederikssund and the fjord",
        bodyDa:
          "Svaleholm Gaard ligger på Frederiksborgvej lige uden for Roskilde – på korridoren nordpå mod Frederikssund, Hornsherred og fjordlandet. Det gør gården til et praktisk, landligt sted at overnatte, uanset om ærindet er familiebesøg, arbejde eller en tur i det nordsjællandske fjordlandskab. I bor roligt og naturnært, men med nem adgang til vejen.",
        bodyEn:
          "Svaleholm Gaard sits on Frederiksborgvej just outside Roskilde – on the corridor north towards Frederikssund, Hornsherred and the fjord country. That makes it a practical, rural place to stay, whether your errand is a family visit, work or a trip into the North Zealand fjord landscape. You stay calmly and close to nature, yet with easy road access.",
      },
      {
        headingDa: "Enkelt ophold med plads til flere",
        headingEn: "A simple stay with room for several",
        bodyDa:
          "Der er op til 8 enkle værelser uden eget bad, med fire fælles bad og toiletter, et fælles køkken og et opholdsrum. Det holder prisen nede fra 650 kr pr. nat og gør det nemt at være familie eller gruppe samlet. Digital selvcheck-in giver fleksibel ankomst, og der er nem parkering ved gården.",
        bodyEn:
          "There are up to 8 simple rooms without a private bath, with four shared baths and toilets, a shared kitchen and a lounge. That keeps the price down from DKK 650 per night and makes it easy to stay together as a family or group. Digital self check-in allows a flexible arrival, and there's easy parking at the farm.",
      },
    ],
    highlightsDa: [
      "På korridoren mod Frederikssund og fjordlandet",
      "Op til 8 enkle værelser – fra 650 kr pr. nat inkl. moms",
      "Fælles køkken, bad og opholdsrum",
      "Nem digital selvcheck-in via dørkode",
      "Landlige, rolige omgivelser tæt på Roskilde",
    ],
    highlightsEn: [
      "On the corridor towards Frederikssund and the fjord country",
      "Up to 8 simple rooms – from DKK 650 per night incl. VAT",
      "Shared kitchen, bath and lounge",
      "Easy digital self check-in via door code",
      "Rural, peaceful surroundings close to Roskilde",
    ],
    faqs: [FAQ_LOCATION, FAQ_ROOMS, FAQ_CHECKIN],
    relatedSlugs: ["naer-holbaek", "naer-lejre", "naer-roskilde-domkirke"],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** The site-relative path for a landing page, e.g. "/overnatning/naer-lejre". */
export function landingPagePath(p: Pick<LandingPage, "category" | "slug">): string {
  return `/${p.category}/${p.slug}`;
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
