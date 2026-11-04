// app/routes/indkvartering-haandvaerkere.tsx
// The håndværker pillar page — the hub every retired URL (301) and every
// usecase/overnatning landing page links back to as its parent category.
// Mirrors the composition and design-system classes of index.tsx and
// LandingPageView.tsx so it's visually consistent with the rest of the site.

import { Link } from "react-router";
import { motion } from "framer-motion";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { SvaleFlock } from "~/components/Svale";
import { JsonLd } from "~/components/JsonLd";
import { FaqSection, type FaqItem } from "~/components/Faq";
import { useT } from "~/lib/i18n";
import { pageMeta } from "~/lib/seo";
import {
  graph,
  webPageNode,
  breadcrumb,
  lodgingNode,
  haandvaerkerServiceNodes,
  faqNode,
} from "~/lib/schema";
import { landingPagesByCategory, landingPagePath } from "~/lib/landingPages";

// ── Meta ─────────────────────────────────────────────────────────────────────

export function meta() {
  return pageMeta({
    path: "/indkvartering-haandvaerkere",
    title: "Håndværkerindkvartering nær Roskilde | Svaleholm Gaard",
    description:
      "Indkvartering af håndværkere på projekt nær Roskilde – enkeltværelser eller hele huset til sjakket, fælles køkken, fakturabetaling mod CVR. 650 kr/nat, min. 4 nætter, skræddersyet aftale.",
    image: "/images/gaardsplads.jpg",
    imageAlt: "Svaleholm Gaards facade og gårdsplads",
  });
}

// ── Content data ─────────────────────────────────────────────────────────────

const USECASE_PAGES = landingPagesByCategory("usecase");
const OVERNATNING_PAGES = landingPagesByCategory("overnatning");

const PILLAR_DESCRIPTION =
  "Svaleholm Gaard udlejer indkvartering til håndværkere på projekt nær Roskilde – enkeltværelser eller hele huset til sjakket, fælles køkken, fakturabetaling mod CVR. 650 kr pr. nat, min. 4 nætter, skræddersyet aftale ved leje af hele huset.";

const FAQS: FaqItem[] = [
  {
    qDa: "Hvor ligger Svaleholm Gaard?",
    qEn: "Where is Svaleholm Gaard located?",
    aDa: "Svaleholm Gaard ligger på Frederiksborgvej 388, 4000 Roskilde – i landlige, naturskønne omgivelser tæt på pladsen, uanset hvor i området projektet ligger.",
    aEn: "Svaleholm Gaard is at Frederiksborgvej 388, 4000 Roskilde – in rural, scenic surroundings close to the site, wherever in the area the project is.",
  },
  {
    qDa: "Hvor mange håndværkere kan bo her, og hvad koster det?",
    qEn: "How many tradespeople can stay here, and what does it cost?",
    aDa: "Der er op til 8 enkle værelser med fælles køkken, fire fælles bad og toiletter samt et fælles opholdsrum – plads til et helt sjak. Overnatning koster 650 kr pr. nat inkl. moms, minimum 4 nætter.",
    aEn: "There are up to 8 simple rooms with a shared kitchen, four shared baths and toilets, and a shared lounge – room for a whole crew. A stay costs DKK 650 per night incl. VAT, minimum 4 nights.",
  },
  {
    qDa: "Kan vi leje hele huset til sjakket?",
    qEn: "Can we rent the whole house for the crew?",
    aDa: "Ja. Hele huset kan lejes eksklusivt, så sjakket bor samlet uden at dele med andre gæster. Vi laver en skræddersyet aftale ud fra antal mand og periode.",
    aEn: "Yes. The whole house can be rented exclusively so the crew stays together without sharing with other guests. We tailor the agreement to crew size and period.",
  },
  {
    qDa: "Kan I fakturere firmaet mod CVR?",
    qEn: "Can you invoice the company against its CVR number?",
    aDa: "Ja. Vi laver en fast aftale og fakturerer virksomheden direkte mod CVR, så administrationen er enkel for byggelederen – uanset om det er enkeltværelser eller hele huset.",
    aEn: "Yes. We set up a fixed agreement and invoice the company directly against its CVR number, so administration is simple for the site manager – whether it's single rooms or the whole house.",
  },
  {
    qDa: "Hvordan foregår check-in?",
    qEn: "How does check-in work?",
    aDa: "Der er nem digital selvcheck-in via dørkode, så sjakket kan ankomme og rejse fleksibelt, uden at skulle koordinere med en vært.",
    aEn: "There is easy digital self check-in via a door code, so the crew can arrive and leave flexibly, without coordinating with a host.",
  },
  {
    qDa: "Er der wifi, vaskemaskine og parkering til varevogne?",
    qEn: "Is there wifi, a washing machine and parking for vans?",
    aDa: "Ja. Der er wifi, en fælles vaskemaskine og parkering til varevogne på pladsen ved gården.",
    aEn: "Yes. There is wifi, a shared washing machine and parking for vans at the farm.",
  },
];

const VALUE_POINTS: Array<{ titleDa: string; titleEn: string; bodyDa: string; bodyEn: string }> = [
  {
    titleDa: "Tæt på pladsen",
    titleEn: "Close to the site",
    bodyDa: "En praktisk base for sjakket, uanset hvor i Roskilde-området projektet ligger.",
    bodyEn: "A practical base for the crew, wherever in the Roskilde area the project is.",
  },
  {
    titleDa: "Fuldt fælles køkken",
    titleEn: "A full shared kitchen",
    bodyDa: "I kan selv lave mad efter arbejdsdagen i stedet for kogeplade i en skurvogn.",
    bodyEn: "You can cook your own food after the working day, instead of a hot plate in a site cabin.",
  },
  {
    titleDa: "Fakturabetaling mod CVR",
    titleEn: "Company invoicing against CVR",
    bodyDa: "Vi fakturerer virksomheden direkte mod CVR, så administrationen er enkel for byggelederen.",
    bodyEn: "We invoice the company directly against its CVR number, keeping administration simple for the site manager.",
  },
  {
    titleDa: "Fast pris året rundt",
    titleEn: "A fixed price all year",
    bodyDa: "650 kr pr. nat inkl. moms – samme pris, uanset sæson.",
    bodyEn: "DKK 650 per night incl. VAT – the same price, regardless of season.",
  },
  {
    titleDa: "Hele huset til sjakket",
    titleEn: "The whole house for the crew",
    bodyDa: "Hele gården kan lejes eksklusivt, så hele sjakket bor samlet under ét tag.",
    bodyEn: "The whole farm can be rented exclusively, so the whole crew stays together under one roof.",
  },
  {
    titleDa: "Fleksibel, skræddersyet aftale",
    titleEn: "A flexible, tailored agreement",
    bodyDa: "Minimum 4 nætter – vi laver en aftale, der passer til antal mand og periode.",
    bodyEn: "Minimum 4 nights – we tailor an agreement to crew size and period.",
  },
  {
    titleDa: "Wifi, vaskemaskine og parkering til varevogne",
    titleEn: "Wifi, washing machine and parking for vans",
    bodyDa: "Wifi, fælles vaskemaskine til arbejdstøjet og parkering til varevogne ved gården.",
    bodyEn: "Wifi, a shared washing machine for work clothes, and parking for vans at the farm.",
  },
];

function buildJsonLd() {
  const nodes = [
    webPageNode({
      path: "/indkvartering-haandvaerkere",
      name: "Håndværkerindkvartering nær Roskilde",
      description: PILLAR_DESCRIPTION,
      type: "CollectionPage",
      primaryImage: "/images/gaardsplads.jpg",
    }),
    breadcrumb([
      { name: "Forside", path: "" },
      { name: "Håndværkerindkvartering", path: "/indkvartering-haandvaerkere" },
    ]),
    lodgingNode({ description: PILLAR_DESCRIPTION }),
    ...haandvaerkerServiceNodes(
      USECASE_PAGES.filter((p) => p.serviceName && p.serviceDescription).map((p) => ({
        name: p.serviceName as string,
        description: p.serviceDescription as string,
      })),
    ),
    faqNode(FAQS.map((f) => ({ q: f.qDa, a: f.aDa }))),
  ];
  return graph(...nodes);
}

// ── Component ────────────────────────────────────────────────────────────────

export default function IndkvarteringHaandvaerkere() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#0F1714" }}>
      <JsonLd data={buildJsonLd()} />
      <Header siteName="Svaleholm" />
      <main className="flex-1">
        <HeroSection />
        <AnswerBlockSection />
        <ValueSection />
        <PricingSection />
        <HubLinksSection title="usecase" pages={USECASE_PAGES} />
        <HubLinksSection title="overnatning" pages={OVERNATNING_PAGES} />
        <FaqSection
          items={FAQS}
          eyebrowDa="Godt at vide"
          eyebrowEn="Good to know"
        />
        <CtaBanner />
      </main>
      <Footer siteName="Svaleholm Roskilde" />
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  const t = useT();
  return (
    <section className="relative flex items-end overflow-hidden" style={{ height: "62vh", minHeight: "460px" }}>
      <div className="absolute inset-0" style={{ inset: "-8% 0" }}>
        <img
          src="/images/gaardsplads.jpg"
          alt="Svaleholm Gaards facade og gårdsplads"
          className="w-full h-full object-cover ken-burns"
        />
      </div>
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(15,23,20,0.6) 0%, rgba(15,23,20,0.35) 40%, #0F1714 100%)" }}
      />
      <SvaleFlock count={2} />
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 w-full"
        style={{ paddingBottom: "clamp(2.5rem, 6vh, 4rem)" }}
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="eyebrow mb-4">{t("Håndværkerindkvartering", "Tradesperson lodging")}</p>
        <h1 className="heading-hero" style={{ color: "#F2EFE7", fontSize: "clamp(2.6rem, 7vw, 6rem)" }}>
          {t("Indkvartering til håndværkere", "Accommodation for tradespeople")}
          <span className="block accent-italic">{t("nær Roskilde", "near Roskilde")}</span>
        </h1>
        <p style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,231,0.75)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "54ch", marginTop: "1.5rem" }}>
          {t(
            "Et roligt, praktisk sted for sjak på projekt – enkeltværelser eller hele huset, fælles køkken og fakturabetaling til firmaet mod CVR.",
            "A quiet, practical base for crews on a project – single rooms or the whole house, a shared kitchen and company invoicing against CVR."
          )}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-9">
          <Link to="/kontakt" className="btn-primary">
            {t("Få et tilbud til sjakket", "Get a quote for your crew")}
          </Link>
          <a href="tel:+4571531379" className="btn-ghost">
            {t("Ring +45 71 53 13 79", "Call +45 71 53 13 79")}
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// ── Answer block (GEO) ───────────────────────────────────────────────────────

function AnswerBlockSection() {
  const t = useT();
  return (
    <section className="section-padding" style={{ background: "#14201B", borderTop: "1px solid rgba(242,239,231,0.08)" }}>
      <div className="max-w-3xl mx-auto px-6">
        <motion.p
          style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "1.3rem", color: "#F2EFE7", lineHeight: 1.7 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
        >
          {t(
            "Svaleholm Gaard tilbyder indkvartering til håndværkere på projekt nær Roskilde: op til 8 værelser med fælles køkken, fire fælles bad og toiletter samt opholdsrum, eller hele huset eksklusivt til sjakket. Der er wifi, fælles vaskemaskine og parkering til varevogne. Prisen er 650 kr pr. nat inkl. moms, minimum 4 nætter, med fakturabetaling til firmaet mod CVR og skræddersyet aftale ved leje af hele huset.",
            "Svaleholm Gaard offers accommodation for tradespeople on a project near Roskilde: up to 8 rooms with a shared kitchen, four shared baths and toilets, and a lounge, or the whole house rented exclusively for the crew. There is wifi, a shared washing machine and parking for vans. The price is DKK 650 per night incl. VAT, minimum 4 nights, with company invoicing against CVR and a tailored agreement when renting the whole house."
          )}
        </motion.p>
      </div>
    </section>
  );
}

// ── Value section (6 driftsargumenter) ───────────────────────────────────────

function ValueSection() {
  const t = useT();
  return (
    <section className="section-padding" style={{ background: "#0F1714" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="eyebrow mb-5">{t("Hvorfor Svaleholm", "Why Svaleholm")}</p>
          <h2 className="heading-section" style={{ color: "#F2EFE7" }}>
            {t("Praktisk ", "A practical ")}
            <span className="accent-italic">{t("base", "base")}</span>
            {t(" for sjakket", " for the crew")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {VALUE_POINTS.map((v, i) => (
            <motion.div
              key={v.titleDa}
              className="glass card-shadow"
              style={{ borderRadius: "2px", padding: "2rem" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "1.25rem", color: "#F2EFE7", marginBottom: "0.75rem" }}>
                {t(v.titleDa, v.titleEn)}
              </h3>
              <p style={{ color: "rgba(242,239,231,0.68)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                {t(v.bodyDa, v.bodyEn)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing line ──────────────────────────────────────────────────────────────

function PricingSection() {
  const t = useT();
  return (
    <section className="section-padding" style={{ background: "#14201B", borderTop: "1px solid rgba(242,239,231,0.08)" }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="eyebrow mb-5">{t("Pris", "Price")}</p>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(1.6rem, 3.5vw, 2.3rem)", color: "#F2EFE7", lineHeight: 1.5 }}>
            {t(
              "650 kr pr. nat inkl. moms · min. 4 nætter",
              "DKK 650 per night incl. VAT · min. 4 nights"
            )}
          </p>
          <p className="mt-4" style={{ color: "rgba(242,239,231,0.68)", lineHeight: 1.85, maxWidth: "48ch", margin: "1rem auto 0" }}>
            {t(
              "Skal hele sjakket bo samlet, kan hele huset lejes eksklusivt efter en skræddersyet aftale ud fra antal mand og periode.",
              "If the whole crew needs to stay together, the whole house can be rented exclusively under a tailored agreement based on crew size and period."
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ── Hub links (usecase + overnatning) ────────────────────────────────────────

function HubLinksSection({
  title,
  pages,
}: {
  title: "usecase" | "overnatning";
  pages: ReturnType<typeof landingPagesByCategory>;
}) {
  const t = useT();
  if (pages.length === 0) return null;

  const eyebrowDa = title === "usecase" ? "Efter formål" : "Efter område";
  const eyebrowEn = title === "usecase" ? "By use case" : "By area";
  const headingDa = title === "usecase" ? "Indkvartering efter formål" : "Indkvartering nær jeres projekt";
  const headingEn = title === "usecase" ? "Lodging by use case" : "Lodging near your project";

  return (
    <section className="section-padding" style={{ background: "#0F1714", borderTop: "1px solid rgba(242,239,231,0.08)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-11"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="eyebrow mb-4">{t(eyebrowDa, eyebrowEn)}</p>
          <h2 className="heading-section" style={{ color: "#F2EFE7" }}>
            {t(headingDa, headingEn)}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {pages.map((p, index) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.06 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <Link
                to={landingPagePath(p)}
                className="glass overflow-hidden card-shadow card-shadow-hover group block"
                style={{ borderRadius: "2px" }}
              >
                <div className="overflow-hidden" style={{ height: "180px" }}>
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                    style={{ filter: "saturate(0.92)" }}
                    loading="lazy"
                  />
                </div>
                <div className="p-7">
                  <h3 className="heading-card mb-2" style={{ color: "#F2EFE7", fontSize: "1.25rem" }}>
                    {t(p.h1Da, p.h1En)}
                  </h3>
                  <p style={{ color: "rgba(242,239,231,0.68)", lineHeight: 1.7, fontSize: "0.9rem" }}>
                    {t(p.heroSubDa, p.heroSubEn)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────

function CtaBanner() {
  const t = useT();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" style={{ inset: "-8% 0" }}>
        <img src="/images/ankomst-velkommen.png" alt="" aria-hidden className="w-full h-full object-cover" />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, #0B110E 0%, rgba(15,23,20,0.86) 40%, rgba(15,23,20,0.92) 100%)" }}
      />
      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center px-6"
        style={{ padding: "clamp(5rem, 14vh, 9rem) 1.5rem" }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <p className="eyebrow mb-5">{t("Klar til at booke til sjakket?", "Ready to book for the crew?")}</p>
        <h2 className="heading-section mb-6" style={{ color: "#F2EFE7" }}>
          {t("Lad os finde en ", "Let's find an ")}<span className="accent-italic">{t("aftale", "agreement")}</span>
        </h2>
        <p style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,231,0.72)", lineHeight: 1.85, maxWidth: "46ch", margin: "0 auto 2.6rem", fontSize: "1rem" }}>
          {t(
            "Fortæl os om antal mand og periode, og vi laver et tilbud og en skræddersyet aftale – med fakturabetaling til firmaet mod CVR.",
            "Tell us the crew size and period, and we'll put together a quote and a tailored agreement – with invoicing to the company against CVR."
          )}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/kontakt" className="btn-primary">{t("Kontakt os", "Contact us")}</Link>
        </div>
        <p className="mt-8" style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(242,239,231,0.7)" }}>
          {t("Eller ring", "Or call")}{" "}
          <a href="tel:+4571531379" style={{ color: "#C9A96A", textDecoration: "none", fontWeight: 600, letterSpacing: "0.02em" }}>
            +45 71 53 13 79
          </a>
        </p>
      </motion.div>
    </section>
  );
}
