import { motion } from "framer-motion";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { FaqSection, type FaqItem } from "~/components/Faq";
import { PrisberegnerHotelSection } from "~/components/Prisberegner";
import { SvaleFlock } from "~/components/Svale";
import { useT } from "~/lib/i18n";
import { pageMeta } from "~/lib/seo";
import { graph, breadcrumb, webPageNode, faqNode } from "~/lib/schema";

const PRISER_FAQ: FaqItem[] = [
  {
    qDa: "Hvad koster en overnatning til håndværkere?",
    qEn: "What does a night cost for tradespeople?",
    aDa: "Et værelse koster 650 kr pr. nat inkl. moms. Der er op til 8 enkle værelser med fælles køkken, 4 bad og opholdsrum – ideelt til sjak, der arbejder på et projekt i området.",
    aEn: "A room costs DKK 650 per night incl. VAT. There are up to 8 simple rooms with a shared kitchen, 4 bathrooms and a lounge – ideal for crews working a project in the area.",
  },
  {
    qDa: "Er der minimum antal nætter?",
    qEn: "Is there a minimum number of nights?",
    aDa: "Ja, minimum 4 nætter pr. booking. Ved hele huset eller længere forløb laver vi en skræddersyet aftale – kontakt os for et tilbud.",
    aEn: "Yes, a minimum of 4 nights per booking. For the whole house or a longer stay we put together a tailored agreement – contact us for a quote.",
  },
  {
    qDa: "Kan vi booke hele huset til sjakket?",
    qEn: "Can we book the whole house for the crew?",
    aDa: "Ja. Hele huset kan lejes eksklusivt til jeres sjak – fx ved et længere projekt, hvor flere håndværkere skal bo samlet. Kontakt os for en skræddersyet aftale.",
    aEn: "Yes. The whole house can be rented exclusively for your crew – for example on a longer project where several tradespeople need to stay together. Contact us for a tailored agreement.",
  },
  {
    qDa: "Kan I fakturere firmaet?",
    qEn: "Can you invoice the company?",
    aDa: "Ja. Vi fakturerer mod CVR-nummer, så I kan afregne opholdet gennem virksomheden.",
    aEn: "Yes. We invoice against a CVR (business registration) number, so you can settle the stay through the company.",
  },
];

export function meta() {
  return pageMeta({
    path: "/priser",
    title: "Priser & booking – overnatning til håndværkere | Svaleholm Roskilde",
    description:
      "Se priser på overnatning til håndværkere og sjak nær Roskilde. Fra 650 kr pr. nat inkl. moms, min. 4 nætter. Fakturabetaling mod CVR. Beregn jeres ophold og få et tilbud.",
    image: "/images/bygning-have.jpg",
    imageAlt: "Svaleholms bygning og have ved Roskilde",
  });
}

const PRISER_JSONLD = graph(
  webPageNode({
    path: "/priser",
    name: "Priser & booking – overnatning til håndværkere",
    description:
      "Priser på overnatning til håndværkere og sjak på Svaleholm Gaard ved Roskilde. Alle priser er vejledende og inkl. moms.",
    primaryImage: "/images/bygning-have.jpg",
  }),
  breadcrumb([
    { name: "Forside", path: "" },
    { name: "Priser & booking", path: "/priser" },
  ]),
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
            <img src="/images/bygning-have.jpg" alt="Svaleholms bygning og have ved Roskilde" className="w-full h-full object-cover ken-burns" />
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
                "Sammensæt jeres overnatning herunder, og få et vejledende overslag med det samme. Kontakt os, så laver vi et skræddersyet tilbud til jeres sjak – fx ved hele huset eller et længere projekt.",
                "Build your stay below and get a guideline estimate right away. Contact us and we'll make a tailored offer for your crew – for example the whole house or a longer project."
              )}
            </p>
          </motion.div>
        </section>

        <PrisberegnerHotelSection />
        <FaqSection items={PRISER_FAQ} eyebrowDa="Priser & booking" eyebrowEn="Prices & booking" />
      </main>
      <Footer siteName="Svaleholm Roskilde" />
    </div>
  );
}
