import { Link } from "react-router";
import { motion } from "framer-motion";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { SvaleFlock } from "~/components/Svale";
import { JsonLd } from "~/components/JsonLd";
import {
  MAX_GUESTS_FESTSAL,
  MIN_GUESTS_FESTSAL,
  MAX_ROOMS,
  ROOM_PRICE_PER_NIGHT,
  TIME_PACKAGES,
} from "~/components/Prisberegner";
import { useT, useLang } from "~/lib/i18n";

// ─────────────────────────────────────────────────────────────────────────────
// Inspirationssiden
//
// Formålet er dobbelt: give kommende gæster konkrete idéer til, hvordan gården
// kan bruges – og samtidig give siden den brødtekst, søgemaskinerne har brug
// for. Derfor er hvert afsnit skrevet med rigtige søgeord (bryllup, fest,
// firmaarrangement, overnatning, Roskilde) og linker videre til de sider, hvor
// gæsten kan booke: /tjenester, /vaerelser, /priser og /kontakt.
// ─────────────────────────────────────────────────────────────────────────────

const TITLE = "Inspiration – sådan kan I bruge Svaleholm Gaard | Roskilde";
const DESCRIPTION =
  "Bliv inspireret: bryllup, rund fødselsdag, konfirmation, firmadag, sommerfest, julefrokost og weekender med overnatning på Svaleholm Gaard ved Roskilde. Festsal til 150 gæster og 8 værelser.";
const HERO_IMAGE = "/images/festsal-hvid-1.png";

const daDK = new Intl.NumberFormat("da-DK");
const kr = (n: number) => `${daDK.format(n)} kr`;

export function meta() {
  return [
    { title: TITLE },
    { name: "description", content: DESCRIPTION },
    { property: "og:title", content: TITLE },
    { property: "og:description", content: DESCRIPTION },
    { property: "og:type", content: "website" },
    { property: "og:image", content: HERO_IMAGE },
    { property: "og:locale", content: "da_DK" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: TITLE },
    { name: "twitter:description", content: DESCRIPTION },
    { name: "twitter:image", content: HERO_IMAGE },
  ];
}

// ── Indhold ──────────────────────────────────────────────────────────────────

type Idea = {
  id: string;
  da: string; en: string;
  eyebrowDa: string; eyebrowEn: string;
  bodyDa: string; bodyEn: string;
  tipsDa: string[]; tipsEn: string[];
  img: string;
  altDa: string; altEn: string;
  to: string;
  ctaDa: string; ctaEn: string;
};

const IDEAS: Idea[] = [
  {
    id: "bryllup",
    da: "Bryllup med ceremoni under åben himmel",
    en: "A wedding with the ceremony under open sky",
    eyebrowDa: "Op til 150 gæster",
    eyebrowEn: "Up to 150 guests",
    bodyDa:
      "Hold vielsen i haven mellem de gamle træer, byd på velkomstdrink på gårdspladsen og ryk ind i festsalen, når mørket falder på. Salen kan stilles op med langborde til den intime middag eller runde borde, når hele familien er med, og haven fungerer som en naturlig pause mellem retterne. Fordi I har stedet for jer selv, bestemmer I selv rytmen fra morgenkaffe til natmad.",
    bodyEn:
      "Hold the ceremony in the garden among the old trees, serve a welcome drink in the courtyard and move into the hall as darkness falls. The hall can be set with long tables for an intimate dinner or round tables when the whole family joins, and the garden becomes a natural break between courses. Because you have the place to yourselves, you set the rhythm from morning coffee to late-night snack.",
    tipsDa: [
      "Vielse i haven, middag i salen og dans til langt ud på natten",
      "Tyl, bryllupsbue og stemningsbelysning kan vælges til",
      "Overnatning til nærmeste familie – I slipper for taxaer",
    ],
    tipsEn: [
      "Ceremony in the garden, dinner in the hall and dancing well into the night",
      "Tulle, a wedding arch and ambient lighting can be added",
      "Rooms for the closest family – no need for taxis",
    ],
    img: "/images/festsal-fest-1.png",
    altDa: "Bryllupsmiddag ved langbord i festsalen på Svaleholm",
    altEn: "Wedding dinner at a long table in the hall at Svaleholm",
    to: "/tjenester",
    ctaDa: "Se rammerne til bryllup",
    ctaEn: "See the wedding setting",
  },
  {
    id: "rund-foedselsdag",
    da: "Den runde fødselsdag og det store jubilæum",
    en: "The milestone birthday and the big anniversary",
    eyebrowDa: "50, 60, 70 år – eller 25 år sammen",
    eyebrowEn: "50, 60, 70 – or 25 years together",
    bodyDa:
      "Når familien og vennerne endelig skal samles, er det rart at have plads nok til, at ingen sidder klemt. Festsalen giver luft omkring bordene, og køkkenet gør det nemt at få maden ind, uanset om I selv står for den eller bruger en cateringleverandør. Bar og lounge giver et sted at trække sig hen for dem, der hellere vil snakke end danse.",
    bodyEn:
      "When family and friends are finally gathering, it helps to have room enough that nobody feels squeezed. The hall gives air around the tables, and the kitchen makes it easy to bring the food in – whether you cook yourselves or use a caterer. The bar and lounge give somewhere to retreat for those who would rather talk than dance.",
    tipsDa: [
      "Aftenpakke fra kl. 17–24, hvis festen holdes på én aften",
      "Borddækning med tallerkener, glas og bestik kan tilkøbes pr. person",
      "Vores eget lydanlæg med mikrofon til talerne",
    ],
    tipsEn: [
      "Evening package 5 pm–midnight if the party is a single evening",
      "Table settings with plates, glasses and cutlery can be added per person",
      "Our own PA with a microphone for the speeches",
    ],
    img: "/images/festsal-fest-2.png",
    altDa: "Fest i festsalen med band og lyskæder",
    altEn: "Celebration in the hall with a band and string lights",
    to: "/priser",
    ctaDa: "Beregn prisen på festen",
    ctaEn: "Calculate the price of the party",
  },
  {
    id: "konfirmation",
    da: "Konfirmation, barnedåb og familiedage",
    en: "Confirmations, christenings and family days",
    eyebrowDa: "Plads til leg og lange borde",
    eyebrowEn: "Room for play and long tables",
    bodyDa:
      "De familiefester, hvor børnene skal have plads til at løbe, og de voksne skal have plads til at sidde længe, fungerer godt på en gård. Udearealerne omkring gårdspladsen betyder, at de mindste kan lege, mens kaffen bliver drukket færdig indenfor. Det er den type dag, hvor det er rart, at parkeringen er lige uden for døren.",
    bodyEn:
      "The family celebrations where children need room to run and the grown-ups need room to linger work well on a farm. The outdoor areas around the courtyard mean the little ones can play while the coffee is finished indoors. It is the kind of day where it helps that parking is right outside the door.",
    tipsDa: [
      "Langborde i salen og leg på gårdspladsen",
      "Køkken til kagebord og forplejning",
      "Rolige omgivelser tæt på Roskilde – nem parkering ved gården",
    ],
    tipsEn: [
      "Long tables in the hall and play in the courtyard",
      "A kitchen for the cake table and refreshments",
      "Peaceful surroundings close to Roskilde – easy parking at the farm",
    ],
    img: "/images/gaard-familie.png",
    altDa: "Familier spiser ved langborde under egetræet på gårdspladsen",
    altEn: "Families dining at long tables under the oak tree in the courtyard",
    to: "/tjenester",
    ctaDa: "Se mulighederne for familiefester",
    ctaEn: "See the options for family celebrations",
  },
  {
    id: "firma",
    da: "Firmadag, kickoff og strategiworkshop",
    en: "Company days, kickoffs and strategy workshops",
    eyebrowDa: "Væk fra mødelokalet",
    eyebrowEn: "Away from the meeting room",
    bodyDa:
      "En dag væk fra kontoret giver ofte de samtaler, der ikke nåede at blive taget hjemme. Salen kan sættes op til oplæg om formiddagen og til middag om aftenen, loungen fungerer som grupperum, og markerne omkring gården er en oplagt gåtur, når energien falder efter frokost. Vores projektor, lærred og lydudstyr står klar, så I ikke skal slæbe teknik med.",
    bodyEn:
      "A day away from the office often produces the conversations that never happened back home. The hall can be set up for presentations in the morning and dinner in the evening, the lounge works as a breakout room, and the fields around the farm make an obvious walk when energy dips after lunch. Our projector, screen and sound equipment are ready, so you don't have to haul kit along.",
    tipsDa: [
      "Heldagspakke kl. 9–24 til seminar med efterfølgende middag",
      "AV-pakke med projektor, 3 m lærred, mikrofon og højttalere",
      "Overnatning på gården, hvis dagen fortsætter i morgen",
    ],
    tipsEn: [
      "Full-day package 9 am–midnight for a seminar followed by dinner",
      "AV package with projector, 3 m screen, microphone and speakers",
      "Rooms on the farm if the day continues tomorrow",
    ],
    img: "/images/festsal-lounge.jpg",
    altDa: "Loungeområde ved festsalen på Svaleholm",
    altEn: "Lounge area next to the hall at Svaleholm",
    to: "/tjenester",
    ctaDa: "Planlæg firmaarrangementet",
    ctaEn: "Plan the company event",
  },
  {
    id: "sommerfest",
    da: "Sommerfest og høstfest på gårdspladsen",
    en: "Summer parties and harvest feasts in the courtyard",
    eyebrowDa: "Ude og inde i ét",
    eyebrowEn: "Outdoors and indoors at once",
    bodyDa:
      "Om sommeren flytter festen af sig selv udenfor. Grill og langborde på gårdspladsen, lyskæder mellem bygningerne og salen som ly, hvis vejret skifter – det er den kombination, der gør en gård til et trygt valg for udendørs fester i Danmark. Terrassen ved salen er samlingspunktet, når solen står lavt.",
    bodyEn:
      "In summer the party moves outside by itself. A barbecue and long tables in the courtyard, string lights between the buildings and the hall as shelter if the weather turns – that combination is what makes a farm a safe choice for outdoor parties in Denmark. The terrace by the hall is the gathering point when the sun sits low.",
    tipsDa: [
      "Gårdsplads og terrasse til velkomst, grill og leg",
      "Salen som plan B, hvis regnen kommer",
      "Stemningsbelysning i sal og have kan vælges til",
    ],
    tipsEn: [
      "Courtyard and terrace for the welcome, barbecue and games",
      "The hall as plan B if the rain arrives",
      "Ambient lighting in the hall and garden can be added",
    ],
    img: "/images/gaardsplads.jpg",
    altDa: "Gårdspladsen med rødmalede porte og stort egetræ",
    altEn: "The courtyard with red gates and a large oak tree",
    to: "/galleri",
    ctaDa: "Se billeder fra gården",
    ctaEn: "See photos from the farm",
  },
  {
    id: "julefrokost",
    da: "Julefrokost og vinterfest",
    en: "Christmas lunches and winter parties",
    eyebrowDa: "November til februar",
    eyebrowEn: "November to February",
    bodyDa:
      "Vinteren klæder gården. Når det er mørkt tidligt, gør levende lys, draperier og lyskæder salen til et varmt rum, og gæsterne behøver ikke tænke på hjemtransporten, hvis værelserne er booket med. Det er en oplagt ramme for både firmajulefrokosten og den store familiejul mellem jul og nytår.",
    bodyEn:
      "Winter suits the farm. When it gets dark early, candles, drapes and string lights turn the hall into a warm room, and guests don't have to think about getting home if the rooms are booked too. It is an obvious setting for both the company Christmas lunch and the big family gathering between Christmas and New Year.",
    tipsDa: [
      "Aften- eller heldagspakke til julefrokosten",
      "Tyl og stemningsbelysning gør salen varm og lukket om selskabet",
      "Værelser til dem, der har længst hjem",
    ],
    tipsEn: [
      "Evening or full-day package for the Christmas lunch",
      "Tulle and ambient lighting make the hall warm and intimate",
      "Rooms for those with the longest journey home",
    ],
    img: "/images/festsal-drapes.jpg",
    altDa: "Festsalen med draperier og levende lys",
    altEn: "The hall with drapes and candlelight",
    to: "/priser",
    ctaDa: "Se priser og pakker",
    ctaEn: "See prices and packages",
  },
  {
    id: "weekend",
    da: "Weekend med vennerne eller hele familien",
    en: "A weekend with friends or the whole family",
    eyebrowDa: `${MAX_ROOMS} værelser · fra ${kr(ROOM_PRICE_PER_NIGHT)} pr. nat`,
    eyebrowEn: `${MAX_ROOMS} rooms · from ${kr(ROOM_PRICE_PER_NIGHT)} per night`,
    bodyDa:
      "Nogle gange er festen ikke pointen – samværet er. Book værelserne, lav mad i fælleskøkkenet, brug opholdsrummet til aftenkaffen og gå en tur i markerne om morgenen. Med selvcheck-in og dørkode på mail er der ingen reception at nå frem til, og I kan ankomme, når det passer jer.",
    bodyEn:
      "Sometimes the party isn't the point – being together is. Book the rooms, cook in the shared kitchen, use the lounge for evening coffee and walk the fields in the morning. With self check-in and a door code by email there is no reception to reach, and you can arrive whenever it suits you.",
    tipsDa: [
      `Op til ${MAX_ROOMS} værelser – hele huset kan bookes`,
      "Fælleskøkken og opholdsrum til alle gæster",
      "Selvcheck-in med dørkode på mail/sms inden ankomst",
    ],
    tipsEn: [
      `Up to ${MAX_ROOMS} rooms – the whole house can be booked`,
      "Shared kitchen and lounge for all guests",
      "Self check-in with a door code by email/SMS before arrival",
    ],
    img: "/images/vaerelse-seng.jpg",
    altDa: "Værelse med opredt seng på Svaleholm",
    altEn: "A room with a made-up bed at Svaleholm",
    to: "/vaerelser",
    ctaDa: "Se værelserne",
    ctaEn: "See the rooms",
  },
  {
    id: "retreat",
    da: "Retreat, kursusweekend og kreative dage",
    en: "Retreats, course weekends and creative days",
    eyebrowDa: "Ro, natur og plads til fordybelse",
    eyebrowEn: "Quiet, nature and room to focus",
    bodyDa:
      "Yogaweekender, skriveophold, kor- og musikweekender, foreningsarrangementer og generalforsamlinger fungerer godt her, fordi salen kan tømmes og stilles op forfra, og fordi naturen ligger lige uden for døren. Kombinationen af sal om dagen, fællesspisning om aftenen og værelser om natten gør det muligt at holde en hel weekend samme sted.",
    bodyEn:
      "Yoga weekends, writing retreats, choir and music weekends, association events and general meetings work well here, because the hall can be cleared and set up from scratch, and because nature is right outside the door. The combination of the hall by day, shared meals in the evening and rooms at night makes it possible to hold an entire weekend in one place.",
    tipsDa: [
      "Weekendpakke fre–søn med salen til rådighed",
      "Fri opstilling af borde og stole efter programmet",
      "Marker, enge og stier til pauser og gåture",
    ],
    tipsEn: [
      "Weekend package Fri–Sun with the hall at your disposal",
      "Free arrangement of tables and chairs to fit your programme",
      "Fields, meadows and paths for breaks and walks",
    ],
    img: "/images/natur-eng.jpg",
    altDa: "Eng og natur omkring Svaleholm ved Roskilde",
    altEn: "Meadow and nature around Svaleholm near Roskilde",
    to: "/kontakt",
    ctaDa: "Spørg om jeres weekend",
    ctaEn: "Ask about your weekend",
  },
];

type Season = { da: string; en: string; textDa: string; textEn: string };
const SEASONS: Season[] = [
  {
    da: "Forår",
    en: "Spring",
    textDa:
      "Konfirmationer, barnedåb og de første fester med åbne døre. Haven springer ud, og gårdspladsen bliver igen et sted, man samles udenfor mellem retterne.",
    textEn:
      "Confirmations, christenings and the first celebrations with the doors open. The garden comes into leaf and the courtyard becomes a place to gather outside between courses again.",
  },
  {
    da: "Sommer",
    en: "Summer",
    textDa:
      "Højsæson for bryllupper og sommerfester. Lyse aftener, vielse under åben himmel, grill på gårdspladsen – og salen som ly, hvis vejret skifter.",
    textEn:
      "High season for weddings and summer parties. Light evenings, ceremonies under open sky, a barbecue in the courtyard – and the hall as shelter if the weather turns.",
  },
  {
    da: "Efterår",
    en: "Autumn",
    textDa:
      "Høstfester, runde fødselsdage og firmadage. Markerne skifter farve, og de lange aftener indenfor med levende lys får deres egen stemning.",
    textEn:
      "Harvest feasts, milestone birthdays and company days. The fields change colour, and the long evenings indoors by candlelight take on their own mood.",
  },
  {
    da: "Vinter",
    en: "Winter",
    textDa:
      "Julefrokoster, nytår og vinterbryllupper. Salen bliver varm og lukket om selskabet, og værelserne betyder, at ingen skal ud i mørket bagefter.",
    textEn:
      "Christmas lunches, New Year and winter weddings. The hall grows warm and intimate, and the rooms mean nobody has to head out into the dark afterwards.",
  },
];

type Faq = { qDa: string; qEn: string; aDa: string; aEn: string };
const FAQS: Faq[] = [
  {
    qDa: "Hvor mange gæster er der plads til på Svaleholm?",
    qEn: "How many guests is there room for at Svaleholm?",
    aDa: `Festsalen har plads til op til ${MAX_GUESTS_FESTSAL} gæster, og til fest i salen regner vi med minimum ${MIN_GUESTS_FESTSAL} gæster. Til mindre selskaber kan salen stilles op, så rummet virker mindre.`,
    aEn: `The hall seats up to ${MAX_GUESTS_FESTSAL} guests, and for a celebration in the hall we work with a minimum of ${MIN_GUESTS_FESTSAL} guests. For smaller parties the hall can be arranged so the room feels smaller.`,
  },
  {
    qDa: "Kan gæsterne overnatte på gården?",
    qEn: "Can guests stay overnight at the farm?",
    aDa: `Ja. Vi har ${MAX_ROOMS} værelser til ${kr(ROOM_PRICE_PER_NIGHT)} pr. værelse pr. nat med fælles bad, køkken og opholdsrum. Der er selvcheck-in, og dørkoden kommer på mail eller sms inden ankomst.`,
    aEn: `Yes. We have ${MAX_ROOMS} rooms at ${kr(ROOM_PRICE_PER_NIGHT)} per room per night with shared bathrooms, kitchen and lounge. Check-in is self-service and the door code arrives by email or SMS before you get here.`,
  },
  {
    qDa: "Hvad koster det at leje festsalen?",
    qEn: "What does it cost to rent the hall?",
    aDa: TIME_PACKAGES.map((p) => `${p.label}: ${kr(p.price)} pr. ${p.unit} (${p.note.toLowerCase()})`).join(". ") +
      ". Alle priser er vejledende og inkl. moms – brug prisberegneren for et overslag på præcis jeres arrangement.",
    aEn: TIME_PACKAGES.map((p) => `${p.labelEn}: ${kr(p.price)} per ${p.unitEn} (${p.noteEn.toLowerCase()})`).join(". ") +
      ". All prices are guideline prices incl. VAT – use the price calculator for an estimate on exactly your event.",
  },
  {
    qDa: "Må vi selv stå for mad og drikke?",
    qEn: "Can we handle food and drink ourselves?",
    aDa: "Ja. Der er køkkenfaciliteter til catering, og I bestemmer selv, om I laver maden, bruger en cateringleverandør eller kombinerer.",
    aEn: "Yes. There are kitchen facilities for catering, and you decide whether you cook, use a caterer or combine the two.",
  },
  {
    qDa: "Kan vi pynte salen, som vi vil?",
    qEn: "Can we decorate the hall as we like?",
    aDa: "Ja – salen er et blankt lærred, og I må gerne tage jeres egen pynt med. Vil I have hjælp, kan tyl, bryllupsbue og stemningsbelysning vælges til i prisberegneren, ligesom vores eget lyd- og AV-udstyr.",
    aEn: "Yes – the hall is a blank canvas and you are welcome to bring your own decorations. If you would like help, tulle, a wedding arch and ambient lighting can be added in the price calculator, along with our own sound and AV equipment.",
  },
  {
    qDa: "Hvor ligger Svaleholm Gaard?",
    qEn: "Where is Svaleholm Gaard?",
    aDa: "På Frederiksborgvej 388, 4000 Roskilde – på landet lige uden for byen, med marker og enge omkring gården og nem parkering ved indkørslen.",
    aEn: "At Frederiksborgvej 388, 4000 Roskilde – in the countryside just outside town, with fields and meadows around the farm and easy parking by the drive.",
  },
];

// JSON-LD holdes bevidst på dansk og uafhængigt af sprogvalget, så markup'en er
// den samme ved server-render og hydrering.
const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.qDa,
    acceptedAnswer: { "@type": "Answer", text: f.aDa },
  })),
};

const PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: TITLE,
  description: DESCRIPTION,
  inLanguage: "da-DK",
  about: {
    "@type": "EventVenue",
    name: "Svaleholm Gaard",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Frederiksborgvej 388",
      postalCode: "4000",
      addressLocality: "Roskilde",
      addressCountry: "DK",
    },
    maximumAttendeeCapacity: MAX_GUESTS_FESTSAL,
    telephone: "+4571531379",
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: IDEAS.map((idea, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: idea.da,
      description: idea.bodyDa,
    })),
  },
};

// ── Side ─────────────────────────────────────────────────────────────────────

export default function Inspiration() {
  const t = useT();
  const { lang } = useLang();
  const pick = (da: string, en: string) => (lang === "en" ? en : da);

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#0F1714" }}>
      <JsonLd data={PAGE_JSONLD} />
      <JsonLd data={FAQ_JSONLD} />
      <Header siteName="Svaleholm" />
      <main className="flex-1">

        {/* Page Hero */}
        <section className="relative flex items-end overflow-hidden" style={{ height: "58vh", minHeight: "420px" }}>
          <div className="absolute inset-0" style={{ inset: "-8% 0" }}>
            <img
              src={HERO_IMAGE}
              alt={t("Festsalen pyntet i hvidt med eukalyptus og guldtallerkener", "The hall dressed in white with eucalyptus and gold plates")}
              className="w-full h-full object-cover ken-burns"
            />
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,23,20,0.62) 0%, rgba(15,23,20,0.4) 40%, #0F1714 100%)" }} />
          <SvaleFlock count={2} />
          <motion.div
            className="relative z-10 max-w-7xl mx-auto px-6 w-full"
            style={{ paddingBottom: "clamp(2.5rem, 6vh, 4rem)" }}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow mb-4">{t("Idéer til jeres dag", "Ideas for your day")}</p>
            <h1 className="heading-hero" style={{ color: "#F2EFE7", fontSize: "clamp(2.8rem, 7.5vw, 6.4rem)" }}>
              {t("Inspiration", "Inspiration")} <span className="accent-italic">{t("til gården", "for the farm")}</span>
            </h1>
            <p style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,231,0.75)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "56ch", marginTop: "1.5rem" }}>
              {t(
                "Otte måder at bruge Svaleholm Gaard på – fra bryllup og rund fødselsdag til firmadag, julefrokost og en hel weekend med overnatning.",
                "Eight ways to use Svaleholm Gaard – from weddings and milestone birthdays to company days, Christmas lunches and a whole weekend with rooms."
              )}
            </p>
          </motion.div>
        </section>

        {/* Intro / SEO-brødtekst */}
        <section className="section-padding-sm" style={{ background: "#0F1714" }}>
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="eyebrow mb-5">{t("Et sted – mange anledninger", "One place – many occasions")}</p>
              <h2 className="heading-section mb-6" style={{ color: "#F2EFE7" }}>
                {t("Hvad kan man bruge en ", "What can you use a ")}
                <span className="accent-italic">{t("gård til?", "farm for?")}</span>
              </h2>
              <div style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,231,0.72)", fontSize: "1.02rem", lineHeight: 1.95, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <p>
                  {t(
                    `Svaleholm Gaard ligger på landet ved Roskilde med festsal til op til ${MAX_GUESTS_FESTSAL} gæster, ${MAX_ROOMS} værelser og marker hele vejen rundt. Det gør stedet brugbart til mere end den klassiske fest: en dag kan begynde med et oplæg i salen, fortsætte med middag ved langborde og slutte med, at gæsterne går i seng på samme adresse.`,
                    `Svaleholm Gaard sits in the countryside near Roskilde with a hall for up to ${MAX_GUESTS_FESTSAL} guests, ${MAX_ROOMS} rooms and fields all the way around. That makes the place useful for more than the classic party: a day can begin with a presentation in the hall, continue with dinner at long tables and end with guests going to bed at the same address.`
                  )}
                </p>
                <p>
                  {t(
                    "Herunder har vi samlet de anledninger, vi oftest får forespørgsler på – med de praktiske detaljer, der plejer at være afgørende, når man skal vælge sted. Brug dem som udgangspunkt, og ring endelig, hvis I har en idé, der ikke står på listen.",
                    "Below we have gathered the occasions we are asked about most often – with the practical details that usually decide which venue people choose. Use them as a starting point, and do call if you have an idea that isn't on the list."
                  )}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Idéerne */}
        <section className="section-padding-sm" style={{ background: "#0F1714" }}>
          <div className="max-w-7xl mx-auto px-6 flex flex-col gap-[clamp(4rem,10vh,8rem)]">
            {IDEAS.map((idea, i) => (
              <motion.article
                key={idea.id}
                id={idea.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <div className={`lg:col-span-7 overflow-hidden group ${i % 2 !== 0 ? "lg:order-2" : ""}`} style={{ borderRadius: "2px" }}>
                  <img
                    src={idea.img}
                    alt={pick(idea.altDa, idea.altEn)}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-[1600ms] group-hover:scale-105"
                    style={{ height: "clamp(280px, 44vh, 500px)", filter: "saturate(0.92)" }}
                  />
                </div>
                <div className={`lg:col-span-5 ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                  <p className="eyebrow mb-4">{pick(idea.eyebrowDa, idea.eyebrowEn)}</p>
                  <h2 className="heading-section mb-6" style={{ color: "#F2EFE7" }}>{pick(idea.da, idea.en)}</h2>
                  <p style={{ color: "rgba(242,239,231,0.7)", lineHeight: 1.9, marginBottom: "2rem", maxWidth: "50ch" }}>
                    {pick(idea.bodyDa, idea.bodyEn)}
                  </p>
                  <ul className="mb-9" style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                    {(lang === "en" ? idea.tipsEn : idea.tipsDa).map((tip) => (
                      <li key={tip} className="flex items-baseline gap-3" style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,231,0.78)", fontSize: "0.95rem" }}>
                        <span style={{ color: "#7EA57C", fontSize: "0.7rem" }}>✦</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                  <Link to={idea.to} className="btn-dark">{pick(idea.ctaDa, idea.ctaEn)}</Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Året rundt */}
        <section className="section-padding" style={{ background: "#0B110E" }}>
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="eyebrow mb-5">{t("Året rundt", "Year round")}</p>
              <h2 className="heading-section" style={{ color: "#F2EFE7" }}>
                {t("Gården skifter med ", "The farm changes with the ")}
                <span className="accent-italic">{t("årstiderne", "seasons")}</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SEASONS.map((s, i) => (
                <motion.div
                  key={s.da}
                  className="rounded-2xl p-7 h-full"
                  style={{ background: "rgba(242,239,231,0.04)", border: "1px solid rgba(242,239,231,0.12)" }}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-60px" }}
                >
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 400, color: "#C9A96A", marginBottom: "0.85rem" }}>
                    {pick(s.da, s.en)}
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.94rem", lineHeight: 1.8, color: "rgba(242,239,231,0.7)" }}>
                    {pick(s.textDa, s.textEn)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gør det til jeres eget – pynt, lyd, borddækning og overnatning */}
        <section className="section-padding" style={{ background: "#0F1714" }}>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="eyebrow mb-5">{t("De sidste detaljer", "The finishing touches")}</p>
              <h2 className="heading-section mb-6" style={{ color: "#F2EFE7" }}>
                {t("Gør salen til ", "Make the hall ")}<span className="accent-italic">{t("jeres egen", "your own")}</span>
              </h2>
              <p style={{ color: "rgba(242,239,231,0.72)", lineHeight: 1.9, marginBottom: "1.75rem", maxWidth: "52ch" }}>
                {t(
                  "Salen er bevidst holdt enkel, så den kan blive til det, I har brug for. Har I selv pynt med, er der frit slag – og skal vi hjælpe, kan I vælge tyl, bryllupsbue og stemningsbelysning til direkte i prisberegneren sammen med vores eget lyd- og AV-udstyr.",
                  "The hall is deliberately kept simple so it can become what you need. Bring your own decorations if you like – and if you want our help, you can add tulle, a wedding arch and ambient lighting directly in the price calculator, along with our own sound and AV equipment."
                )}
              </p>
              <ul className="mb-9" style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {[
                  t("Pynt: tyl, bryllupsbue og stemningsbelysning", "Decor: tulle, wedding arch and ambient lighting"),
                  t("Lyd & AV: mikrofon, højttalere, projektor og lærred", "Sound & AV: microphone, speakers, projector and screen"),
                  t("Borddækning: tallerkener, glas og bestik pr. person", "Table settings: plates, glasses and cutlery per person"),
                  t(`Overnatning: op til ${MAX_ROOMS} værelser fra ${kr(ROOM_PRICE_PER_NIGHT)} pr. nat`, `Rooms: up to ${MAX_ROOMS} rooms from ${kr(ROOM_PRICE_PER_NIGHT)} per night`),
                ].map((item) => (
                  <li key={item} className="flex items-baseline gap-3" style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,231,0.78)", fontSize: "0.95rem" }}>
                    <span style={{ color: "#7EA57C", fontSize: "0.7rem" }}>✦</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link to="/priser" className="btn-primary" style={{ padding: "0.85rem 1.8rem" }}>{t("Åbn prisberegneren", "Open the price calculator")}</Link>
                <Link to="/vaerelser" className="btn-dark">{t("Se værelserne", "See the rooms")}</Link>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-6 overflow-hidden"
              style={{ borderRadius: "2px" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <img
                src="/images/festsal-hvid-2.png"
                alt={t("Hvide draperier, lyskæder og blomster i festsalen", "White drapes, string lights and flowers in the hall")}
                loading="lazy"
                className="w-full object-cover"
                style={{ height: "clamp(300px, 52vh, 560px)", filter: "saturate(0.92)" }}
              />
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding" style={{ background: "#0B110E" }}>
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="eyebrow mb-5">{t("Godt at vide", "Good to know")}</p>
              <h2 className="heading-section" style={{ color: "#F2EFE7" }}>
                {t("Ofte stillede ", "Frequently asked ")}<span className="accent-italic">{t("spørgsmål", "questions")}</span>
              </h2>
            </motion.div>

            <div className="flex flex-col gap-3">
              {FAQS.map((f, i) => (
                <motion.details
                  key={f.qDa}
                  className="rounded-xl"
                  style={{ background: "rgba(242,239,231,0.04)", border: "1px solid rgba(242,239,231,0.12)", padding: "1.15rem 1.4rem" }}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-40px" }}
                >
                  <summary style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, color: "#F2EFE7", cursor: "pointer", listStyle: "none" }}>
                    {pick(f.qDa, f.qEn)}
                  </summary>
                  <p className="mt-3" style={{ fontFamily: "var(--font-body)", fontSize: "0.94rem", lineHeight: 1.85, color: "rgba(242,239,231,0.7)" }}>
                    {pick(f.aDa, f.aEn)}
                  </p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding-sm" style={{ background: "#0F1714" }}>
          <motion.div
            className="max-w-3xl mx-auto px-6 text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="heading-section mb-5" style={{ color: "#F2EFE7" }}>
              {t("Har I fået en ", "Got an ")}<span className="accent-italic">{t("idé?", "idea?")}</span>
            </h2>
            <p style={{ color: "rgba(242,239,231,0.72)", lineHeight: 1.9, marginBottom: "2rem" }}>
              {t(
                "Fortæl os, hvad I drømmer om, så finder vi ud af, om datoen er ledig, og hvad det koster. Det er helt uforpligtende.",
                "Tell us what you have in mind and we'll find out whether the date is free and what it costs. Entirely without obligation."
              )}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/kontakt" className="btn-primary" style={{ padding: "0.9rem 2rem" }}>{t("Kontakt os", "Contact us")}</Link>
              <Link to="/tjenester" className="btn-dark">{t("Se events", "See events")}</Link>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer siteName="Svaleholm Roskilde" />
    </div>
  );
}
