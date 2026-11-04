import { Link } from "react-router";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { SvaleFlock } from "~/components/Svale";
import { JsonLd } from "~/components/JsonLd";
import { useT, useLang } from "~/lib/i18n";
import { pageMeta } from "~/lib/seo";
import { graph, breadcrumb, reviewNodes, webPageNode } from "~/lib/schema";

// ── Meta ─────────────────────────────────────────────────────────────────────

export function meta() {
  return pageMeta({
    path: "",
    title: "Indkvartering til håndværkere nær Roskilde | Svaleholm Gaard",
    description:
      "Få dit sjak til at bo tæt på pladsen. Svaleholm Gaard udlejer enkle værelser eller hele huset til håndværkere nær Roskilde – fælles køkken, fakturabetaling. 650 kr/nat, min. 4 nætter.",
    image: "/images/gaardsplads.jpg",
    imageAlt: "Svaleholm Gaards gårdsplads",
  });
}

// ── Component ────────────────────────────────────────────────────────────────

export default function Index() {
  // Built here (not at module scope) because REVIEWS is declared below.
  const homeJsonLd = graph(
    webPageNode({
      path: "",
      name: "Svaleholm Gaard Roskilde – Indkvartering til håndværkere",
      description:
        "Svaleholm Gaard udlejer enkle værelser eller hele huset til håndværkere nær Roskilde – fælles køkken, fakturabetaling. 650 kr/nat, min. 4 nætter.",
      primaryImage: "/images/gaardsplads.jpg",
    }),
    breadcrumb([{ name: "Forside", path: "" }]),
    // Real guest reviews from Google (individual star ratings not published, so
    // none are fabricated; the aggregate rating lives on the business node once
    // real numbers are configured in site.ts).
    reviewNodes(REVIEWS.map((r) => ({ author: r.name, body: r.text }))),
  );

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#0F1714" }}>
      <JsonLd data={homeJsonLd} />
      <Header siteName="Svaleholm" />
      <main className="flex-1">
        <HeroSection />
        <IntroSection />
        <ServicesSection />
        <ReviewsSection />
        <CtaBanner />
      </main>
      <Footer siteName="Svaleholm Roskilde" />
    </div>
  );
}

// ── Hero (enkel, centreret) ───────────────────────────────────────────────────

function HeroSection() {
  const t = useT();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ minHeight: "720px" }}>
      <div className="absolute inset-0" style={{ inset: "-6% 0" }}>
        <img
          className="w-full h-full object-cover"
          src="/images/hero-mark.jpg"
          alt=""
          aria-hidden
          fetchPriority="high"
        />
      </div>
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(15,23,20,0.42) 0%, rgba(15,23,20,0.20) 34%, rgba(15,23,20,0.74) 76%, #0F1714 100%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 80% at 50% 112%, rgba(126,165,124,0.20) 0%, transparent 60%)" }}
      />

      <SvaleFlock count={4} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {t("Svaleholm Gaard · Roskilde", "Svaleholm Gaard · Roskilde")}
        </motion.p>

        <h1 className="heading-hero" style={{ color: "#F2EFE7", fontSize: "clamp(2.6rem, 6.5vw, 5rem)" }}>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 38 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            {t("Indkvartering til", "Lodging for")}
          </motion.span>
          <motion.span
            className="block accent-italic"
            initial={{ opacity: 0, y: 38 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            {t("håndværkere", "tradespeople")}
          </motion.span>
        </h1>

        <motion.p
          className="mx-auto"
          style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,231,0.78)", fontSize: "1.075rem", lineHeight: 1.8, maxWidth: "48ch", marginTop: "1.75rem" }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.32 }}
        >
          {t(
            "Et praktisk hjem til sjakket tæt på pladsen – enkle værelser eller hele huset, fælles køkken og fakturabetaling. 650 kr pr. nat, min. 4 nætter.",
            "A practical base for the crew close to the site – simple rooms or the whole house, a shared kitchen and company invoicing. DKK 650 per night, minimum 4 nights."
          )}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-[clamp(2rem,5vh,3rem)]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.44 }}
        >
          <Link to="/kontakt" className="btn-primary">
            {t("Få tilbud til dit sjak", "Get a quote for your crew")}
          </Link>
          <Link to="/indkvartering-haandvaerkere" className="btn-ghost">
            {t("Se faciliteter", "See the facilities")}
          </Link>
        </motion.div>
      </div>

      <div
        className="absolute z-10 animate-cue"
        style={{ bottom: "1.4rem", left: "50%", transform: "translateX(-50%)", width: "1px", height: "46px", background: "linear-gradient(#C9A96A, transparent)" }}
      />
    </section>
  );
}

// ── Intro (kort) ──────────────────────────────────────────────────────────────

function IntroSection() {
  const t = useT();
  return (
    <section className="section-padding overflow-hidden" style={{ background: "#0F1714" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="overflow-hidden group" style={{ borderRadius: "2px" }}>
              <img
                src="/images/gaardsplads.jpg"
                alt="Svaleholm Gaards facade og gårdsplads"
                className="w-full object-cover transition-transform duration-[1600ms] group-hover:scale-105"
                style={{ height: "clamp(340px, 50vh, 560px)", filter: "saturate(0.92)" }}
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="eyebrow mb-5">{t("Til håndværkere", "For tradespeople")}</p>
            <h2 className="heading-section mb-8" style={{ color: "#F2EFE7" }}>
              {t("En praktisk ", "A practical ")}<span className="accent-italic">{t("base", "base")}</span>{t(" nær Roskilde.", " near Roskilde.")}
            </h2>
            <div style={{ borderLeft: "1px solid #C9A96A", paddingLeft: "1.5rem", marginBottom: "2rem" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "#F2EFE7", lineHeight: 1.5, fontStyle: "italic" }}>
                {t(
                  "\"Hele sjakket bor samlet – og vi sender regningen til firmaet.\"",
                  "\"The whole crew stays together – and we invoice the company.\""
                )}
              </p>
            </div>
            <p style={{ color: "rgba(242,239,231,0.7)", lineHeight: 1.9, marginBottom: "2.5rem", maxWidth: "48ch" }}>
              {t(
                "Svaleholm Gaard ligger i rolige, landlige omgivelser tæt på Roskilde. Sjakket bor samlet under samme tag med fælles køkken, bad og opholdsrum, wifi og vaskemaskine, og selv kan I checke ind med egen kode, når arbejdsdagen er slut. Der er også parkering til varevogne på pladsen. Vi fakturerer firmaet mod CVR, så I slipper for bilag.",
                "Svaleholm Gaard lies in calm, rural surroundings close to Roskilde. The crew stays together under one roof with a shared kitchen, bathrooms, lounge, wifi and a washing machine, and you check in yourselves with your own door code once the workday is done. There is also parking for vans at the farm. We invoice the company against a CVR number, so there's no paperwork for individuals."
              )}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Services (to kort) ────────────────────────────────────────────────────────

function ServicesSection() {
  const t = useT();
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "#14201B", borderTop: "1px solid rgba(242,239,231,0.08)" }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="eyebrow mb-5">{t("Hvad vi tilbyder", "What we offer")}</p>
          <h2 className="heading-section" style={{ color: "#F2EFE7" }}>
            {t("Værelser ", "Rooms ")}<span className="accent-italic">&</span>{t(" hele huset", " or the whole house")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <ServiceCard
            tag={t("Til sjakket", "For the crew")}
            title={t("Enkeltværelser til sjakket", "Single rooms for the crew")}
            description={t(
              "Op til otte enkle værelser med fælles køkken, bad og opholdsrum – tæt på pladsen og klar til sjakket, mand for mand. 650 kr/nat, min. 4 nætter, faktureres til firmaet.",
              "Up to eight simple rooms with a shared kitchen, bathrooms and lounge – close to the site and ready for the crew, one man at a time. DKK 650/night, minimum 4 nights, invoiced to the company."
            )}
            href="/vaerelser"
            cta={t("Se værelser", "See the rooms")}
            imgSrc="/images/vaerelse-seng.jpg"
            delay={0}
          />
          <ServiceCard
            tag={t("Til firmaet", "For the company")}
            title={t("Hele huset til ét firma", "The whole house for one company")}
            description={t(
              "Book hele huset eksklusivt til jeres firma – en skræddersyet aftale for sjakket, med fælles køkken og opholdsrum under samme tag.",
              "Book the whole house exclusively for your company – a tailored agreement for the crew, with a shared kitchen and lounge under one roof."
            )}
            href="/indkvartering-haandvaerkere"
            cta={t("Se faciliteter", "See the facilities")}
            imgSrc="/images/gaardsplads.jpg"
            delay={0.12}
          />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ tag, title, description, href, cta, imgSrc, delay }: {
  tag: string; title: string; description: string;
  href: string; cta: string; imgSrc: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      viewport={{ once: true, margin: "-60px" }}
      className="glass overflow-hidden card-shadow card-shadow-hover group"
      style={{ borderRadius: "2px" }}
    >
      <div className="overflow-hidden" style={{ height: "280px" }}>
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
          style={{ filter: "saturate(0.92)" }}
          loading="lazy"
        />
      </div>
      <div className="p-8 md:p-10">
        <p className="eyebrow mb-3">{tag}</p>
        <h3 className="heading-card mb-4" style={{ color: "#F2EFE7" }}>{title}</h3>
        <p style={{ color: "rgba(242,239,231,0.68)", lineHeight: 1.85, marginBottom: "1.9rem", fontSize: "0.95rem" }}>{description}</p>
        <Link to={href} className="btn-dark">
          {cta}
        </Link>
      </div>
    </motion.div>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────

const REVIEWS = [
  {
    name: "Johanne Jepsen",
    when: "for ét år siden",
    whenEn: "a year ago",
    initials: "JJ",
    text: "Super hyggeligt sted, og personalet har været så søde og hjælpsomme! Vil varmt anbefale dette sted.",
    textEn: "A really cosy place, and the staff have been so kind and helpful! I warmly recommend it.",
  },
  {
    name: "Vinni Jensen Poulsen",
    when: "for én måned siden",
    whenEn: "a month ago",
    initials: "VP",
    text: "Hyggeligt sted og autentiske omgivelser. Meget venlig og hjælpsom værtinde. Rimelig pris – især for jyder. 😊",
    textEn: "Lovely place with authentic surroundings. Very friendly and helpful host. Reasonable price – especially for Jutlanders. 😊",
  },
  {
    name: "vaidotas zemlickas",
    when: "for 2 år siden",
    whenEn: "2 years ago",
    initials: "VZ",
    text: "Personalet var utroligt venligt og hjælpsomt, stedet var meget imødekommende, og terrassen var dejlig. Vi spurgte, om vi kunne blive lidt senere end udtjekningstidspunktet, og de var glade for at imødekomme os. Jeg ville helt sikkert vende tilbage og kan varmt anbefale det, især da det kun ligger omkring en halv time fra hovedstaden.",
    textEn: "The staff were incredibly friendly and helpful, the place was very welcoming, and the terrace was lovely. We asked if we could stay a little past checkout, and they were happy to accommodate us. I would definitely return and warmly recommend it, especially as it's only about half an hour from the capital.",
    note: "Oversat fra spansk",
    noteEn: "Translated from Spanish",
  },
];

function ReviewsSection() {
  const t = useT();
  const { lang } = useLang();
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByCards = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.9, 380);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="section-padding" style={{ background: "#0F1714" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="eyebrow mb-4">{t("Vores gæster fortæller", "Our guests say")}</p>
          <h2 className="heading-section" style={{ color: "#F2EFE7" }}>{t("Anmeldelser fra Google", "Reviews from Google")}</h2>
        </motion.div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            aria-label={t("Forrige anmeldelser", "Previous reviews")}
            className="hidden md:flex items-center justify-center absolute -left-4 top-1/2 -translate-y-1/2 z-10 rounded-full transition-colors"
            style={{ width: "3rem", height: "3rem", background: "#14201B", color: "#C9A96A", border: "1px solid rgba(242,239,231,0.14)", cursor: "pointer", fontSize: "1.5rem", lineHeight: 1 }}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            aria-label={t("Næste anmeldelser", "Next reviews")}
            className="hidden md:flex items-center justify-center absolute -right-4 top-1/2 -translate-y-1/2 z-10 rounded-full transition-colors"
            style={{ width: "3rem", height: "3rem", background: "#14201B", color: "#C9A96A", border: "1px solid rgba(242,239,231,0.14)", cursor: "pointer", fontSize: "1.5rem", lineHeight: 1 }}
          >
            ›
          </button>

          <div
            ref={trackRef}
            className="no-scrollbar flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
          >
            {REVIEWS.map((r) => (
              <article
                key={r.name}
                className="snap-start flex-shrink-0 glass card-shadow flex flex-col"
                style={{ width: "min(86vw, 360px)", borderRadius: "2px", padding: "2rem" }}
              >
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "3.5rem", lineHeight: 0.8, color: "rgba(201,169,106,0.35)", userSelect: "none" }}>"</div>

                <p className="flex-1" style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(242,239,231,0.82)", lineHeight: 1.75, margin: "0.75rem 0 1.5rem" }}>
                  {lang === "en" ? r.textEn : r.text}
                </p>

                {r.note && (
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(242,239,231,0.4)", marginBottom: "1rem" }}>
                    {lang === "en" ? r.noteEn : r.note}
                  </p>
                )}

                <div className="flex items-center gap-3" style={{ borderTop: "1px solid rgba(242,239,231,0.12)", paddingTop: "1rem" }}>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold flex-shrink-0" style={{ background: "linear-gradient(135deg, #C9A96A, #7EA57C)", color: "#0F1714", fontFamily: "var(--font-body)" }}>
                    {r.initials}
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9rem", color: "#F2EFE7" }}>{r.name}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#7EA57C" }}>{lang === "en" ? r.whenEn : r.when}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CTA Banner ────────────────────────────────────────────────────────────────

function CtaBanner() {
  const t = useT();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" style={{ inset: "-8% 0" }}>
        <img
          src="/images/ankomst-velkommen.png"
          alt=""
          aria-hidden
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, #0F1714 0%, rgba(15,23,20,0.86) 40%, rgba(15,23,20,0.92) 100%)" }}
      />
      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center px-6"
        style={{ padding: "clamp(6rem, 16vh, 11rem) 1.5rem" }}
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
            "Fortæl os, hvor mange mand og hvor længe, og vi sender et tilbud – fakturaen går til firmaet mod CVR. Vi ser frem til at byde jer velkommen til Svaleholm Gaard.",
            "Tell us how many people and for how long, and we'll send a quote – the invoice goes to the company against a CVR number. We look forward to welcoming you to Svaleholm Gaard."
          )}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/kontakt" className="btn-primary">{t("Kontakt os", "Contact us")}</Link>
          <Link to="/indkvartering-haandvaerkere" className="btn-ghost">{t("Se faciliteter", "See the facilities")}</Link>
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
