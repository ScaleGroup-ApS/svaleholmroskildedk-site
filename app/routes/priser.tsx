import { motion } from "framer-motion";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { FaqSection, type FaqItem } from "~/components/Faq";
import { PrisberegnerHotelSection, PrisberegnerEventSection } from "~/components/Prisberegner";
import { SvaleFlock } from "~/components/Svale";
import { useT } from "~/lib/i18n";
import { pageMeta } from "~/lib/seo";
import { graph, breadcrumb, webPageNode, eventOfferCatalogNode, faqNode } from "~/lib/schema";

const PRISER_FAQ: FaqItem[] = [
  {
    qDa: "Hvad koster det at leje festsalen?",
    qEn: "What does it cost to rent the hall?",
    aDa: "Festsalen kan lejes fra 1.800 kr pr. time. En aften (kl. 17–24) koster 9.000 kr, en heldag (kl. 9–24) 15.000 kr og en hel weekend (fre–søn) 26.000 kr. Alle priser er inkl. moms.",
    aEn: "The hall can be rented from DKK 1,800 per hour. An evening (5–12 pm) is DKK 9,000, a full day (9 am–12 pm) DKK 15,000 and a whole weekend (Fri–Sun) DKK 26,000. All prices include VAT.",
  },
  {
    qDa: "Hvad koster overnatning?",
    qEn: "What does an overnight stay cost?",
    aDa: "Et værelse koster 650 kr pr. nat. Der er op til 8 enkle værelser med fælles bad, køkken og opholdsrum – ideelt til gæster, der overnatter i forbindelse med en fest.",
    aEn: "A room costs DKK 650 per night. There are up to 8 simple rooms with shared bath, kitchen and lounge – ideal for guests staying over in connection with a celebration.",
  },
  {
    qDa: "Er priserne inkl. moms?",
    qEn: "Do the prices include VAT?",
    aDa: "Ja. Alle priser på siden er inkl. moms. Priserne i prisberegneren er vejledende, indtil vi har bekræftet din booking skriftligt.",
    aEn: "Yes. All prices on the site include VAT. The prices in the calculator are guideline figures until we confirm your booking in writing.",
  },
  {
    qDa: "Kan jeg få et samlet tilbud?",
    qEn: "Can I get a full quote?",
    aDa: "Ja. Brug prisberegneren og send en forespørgsel, så vender vi tilbage med et uforpligtende tilbud inden for 24 timer på hverdage.",
    aEn: "Yes. Use the price calculator and send an enquiry, and we'll get back to you with a no-obligation quote within 24 hours on weekdays.",
  },
];

export function meta() {
  return pageMeta({
    path: "/priser",
    title: "Priser & booking – festsal og overnatning | Svaleholm Roskilde",
    description:
      "Se priser på festsal (fra 15.000 kr) og overnatning (fra 650 kr pr. nat) ved Roskilde. Beregn dit ophold eller din fest og få et uforpligtende tilbud. Inkl. moms.",
    image: "/images/festsal-terrasse.jpg",
    imageAlt: "Festsalens terrasse ved Svaleholm",
  });
}

const PRISER_JSONLD = graph(
  webPageNode({
    path: "/priser",
    name: "Priser & booking – festsal og overnatning",
    description:
      "Priser på festsal og overnatning på Svaleholm Gaard ved Roskilde. Alle priser er vejledende og inkl. moms.",
    primaryImage: "/images/festsal-terrasse.jpg",
  }),
  breadcrumb([
    { name: "Forside", path: "" },
    { name: "Priser & booking", path: "/priser" },
  ]),
  eventOfferCatalogNode(),
  faqNode(PRISER_FAQ.map((f) => ({ q: f.qDa, a: f.aDa }))),
);

export default function Priser() {
  const t = useT();
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#0F1714" }}>
      <JsonLd data={PRISER_JSONLD} />
      <Header siteName="Svaleholm" />
      <main className="flex-1">

        {/* Page Hero */}
        <section className="relative flex items-end overflow-hidden" style={{ height: "48vh", minHeight: "380px" }}>
          <div className="absolute inset-0" style={{ inset: "-8% 0" }}>
            <img src="/images/festsal-terrasse.jpg" alt="Festsalens terrasse ved Svaleholm" className="w-full h-full object-cover ken-burns" />
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,23,20,0.6) 0%, rgba(15,23,20,0.4) 40%, #0F1714 100%)" }} />
          <SvaleFlock count={2} />
          <motion.div
            className="relative z-10 max-w-5xl mx-auto px-6 w-full"
            style={{ paddingBottom: "clamp(2.5rem, 6vh, 4rem)" }}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow mb-4">{t("Gennemsigtige priser", "Transparent prices")}</p>
            <h1 className="heading-hero" style={{ color: "#F2EFE7", fontSize: "clamp(2.8rem, 7vw, 6rem)" }}>
              {t("Priser ", "Prices ")}<span className="accent-italic">{t("& booking", "& booking")}</span>
            </h1>
            <p style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,231,0.75)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "52ch", marginTop: "1.5rem" }}>
              {t(
                "Sammensæt din booking herunder, og få et vejledende overslag med det samme. Kontakt os, så laver vi et tilbud på præcis jeres ophold eller fest.",
                "Build your booking below and get a guideline estimate right away. Contact us and we'll make an offer for exactly your stay or celebration."
              )}
            </p>
          </motion.div>
        </section>

        <PrisberegnerHotelSection />
        <PrisberegnerEventSection />
        <FaqSection items={PRISER_FAQ} eyebrowDa="Priser & booking" eyebrowEn="Prices & booking" />
      </main>
      <Footer siteName="Svaleholm Roskilde" />
    </div>
  );
}
