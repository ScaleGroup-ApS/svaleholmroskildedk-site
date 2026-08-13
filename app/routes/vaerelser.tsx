import { motion } from "framer-motion";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { SvaleFlock } from "~/components/Svale";
import { PrisberegnerHotelSection } from "~/components/Prisberegner";
import { useT } from "~/lib/i18n";

export function meta() {
  return [
    { title: "Ophold & overnatning nær Roskilde – Svaleholm" },
    {
      name: "description",
      content:
        "Overnat på Svaleholm tæt på Roskilde på Sjælland. Op til 8 enkle værelser uden eget bad – med 4 fælles bad og toiletter, fælles køkken og fælles opholdsrum. Fra DKK 650 pr. nat med nem selvcheck-in.",
    },
    {
      name: "keywords",
      content:
        "ophold Roskilde, overnatning Roskilde, billig overnatning Roskilde, værelser Sjælland, overnatning ved bryllup Roskilde, fælles køkken, selvcheck-in, Svaleholm",
    },
    { property: "og:title", content: "Ophold & overnatning nær Roskilde – Svaleholm" },
    { property: "og:description", content: "Op til 8 enkle værelser med fælles bad, køkken og opholdsrum – tæt på Roskilde. Beregn dit ophold og book online." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/images/bygning-have.jpg" },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        name: "Svaleholm Roskilde",
        description:
          "Ophold og overnatning på Svaleholm i landlige omgivelser tæt på Roskilde på Sjælland. Op til 8 enkle værelser uden eget bad, med fælles badefaciliteter, fælles køkken og fælles opholdsrum.",
        url: "https://svaleholmroskilde.dk/vaerelser",
        image: "https://svaleholmroskilde.dk/images/bygning-have.jpg",
        telephone: "+45 71 53 13 79",
        priceRange: "DKK 650",
        numberOfRooms: 8,
        petsAllowed: false,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Roskilde",
          addressRegion: "Region Sjælland",
          addressCountry: "DK",
        },
        areaServed: ["Roskilde", "Sjælland", "Danmark"],
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "Fælles bad og toilet (4 stk.)", value: true },
          { "@type": "LocationFeatureSpecification", name: "Fælles køkken", value: true },
          { "@type": "LocationFeatureSpecification", name: "Fælles opholdsrum", value: true },
          { "@type": "LocationFeatureSpecification", name: "Selvcheck-in", value: true },
          { "@type": "LocationFeatureSpecification", name: "Have og naturområde", value: true },
        ],
      },
    },
  ];
}

// Fælles faciliteter til alle gæster
const FACILITIES = [
  {
    title: "Fælles opholdsrum",
    titleEn: "Shared lounge",
    desc: "Et hyggeligt fælles rum til afslapning og samvær.",
    descEn: "A cosy shared room for relaxing and spending time together.",
    icon: "M3 10.5V19a1 1 0 001 1h16a1 1 0 001-1v-8.5M5 10.5V8a2 2 0 012-2h10a2 2 0 012 2v2.5M4 14h16",
  },
  {
    title: "4 fælles bad & toiletter",
    titleEn: "4 shared baths & toilets",
    desc: "Fire fælles bad og toiletter deles mellem værelserne.",
    descEn: "Four shared baths and toilets serve all the rooms.",
    icon: "M4 12h16M6 12V7a2 2 0 012-2h1a2 2 0 012 2M4 16v2m16-6v4a2 2 0 01-2 2H6a2 2 0 01-2-2",
  },
  {
    title: "Fælles køkken",
    titleEn: "Shared kitchen",
    desc: "Et fuldt fælles køkken, hvor I selv kan lave mad.",
    descEn: "A fully shared kitchen where you can cook your own meals.",
    icon: "M6 3v7a2 2 0 002 2h0V3m2 0v18M17 3c-1.5 1-2 3-2 5s.5 3 2 4v9",
  },
  {
    title: "Nem selvcheck-in",
    titleEn: "Easy self check-in",
    desc: "Digital check-in med dørkode – ankom, når det passer jer.",
    descEn: "Digital check-in with a door code – arrive whenever it suits you.",
    icon: "M15 7a2 2 0 012 2m4-2a6 6 0 01-7.743 5.743L11 14H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
  },
];

// Atmosfærebilleder af Svaleholm og fællesarealerne
const HIGHLIGHT_IMAGES = [
  { src: "/images/lounge.jpg", alt: "Fælles opholdsrum på Svaleholm nær Roskilde" },
  { src: "/images/bygning-have.jpg", alt: "Svaleholms historiske bygning og have på Sjælland" },
];

export default function Vaerelser() {
  const t = useT();
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#0F1714" }}>
      <Header siteName="Svaleholm" />
      <main className="flex-1">

        {/* Page Hero */}
        <section className="relative flex items-end overflow-hidden" style={{ height: "52vh", minHeight: "380px" }}>
          <div className="absolute inset-0" style={{ inset: "-8% 0" }}>
            <img src="/images/bygning-have.jpg" alt="Svaleholms bygning og have – ophold nær Roskilde" className="w-full h-full object-cover ken-burns" />
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,23,20,0.6) 0%, rgba(15,23,20,0.35) 40%, #0F1714 100%)" }} />
          <SvaleFlock count={2} />
          <motion.div
            className="relative z-10 max-w-7xl mx-auto px-6 w-full"
            style={{ paddingBottom: "clamp(2.5rem, 6vh, 4rem)" }}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow mb-4">{t("Overnatning nær Roskilde", "Stay near Roskilde")}</p>
            <h1 className="heading-hero" style={{ color: "#F2EFE7", fontSize: "clamp(3rem, 8vw, 7rem)" }}>
              {t("Vores ", "Our ")}<span className="accent-italic">{t("ophold", "stay")}</span>
            </h1>
            <p style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,231,0.75)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "54ch", marginTop: "1.5rem" }}>
              {t(
                "Enkle, hyggelige værelser med fælles køkken, bad og opholdsrum – i naturskønne omgivelser tæt på Roskilde. Beregn dit ophold herunder.",
                "Simple, cosy rooms with shared kitchen, bath and lounge – in scenic surroundings close to Roskilde. Calculate your stay below."
              )}
            </p>
          </motion.div>
        </section>

        {/* Prisberegner – ophold */}
        <PrisberegnerHotelSection />

        {/* SEO / GEO tekstblok */}
        <section className="section-padding" style={{ background: "#14201B", borderTop: "1px solid rgba(242,239,231,0.08)" }}>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="eyebrow mb-4">{t("Overnatning på Sjælland", "Stay on Zealand")}</p>
              <h2 className="heading-section mb-6" style={{ color: "#F2EFE7" }}>
                {t("Enkelt ophold ", "A simple stay ")}<span className="accent-italic">{t("tæt på Roskilde", "close to Roskilde")}</span>
              </h2>
              <p style={{ color: "rgba(242,239,231,0.72)", lineHeight: 1.9, marginBottom: "1.4rem", maxWidth: "54ch" }}>
                {t(
                  "Svaleholm ligger i fredfyldte, landlige omgivelser på Sjælland – kun kort afstand fra Roskilde. Vi har op til 8 enkle værelser, der er ideelle, når I holder bryllup eller fest i festsalen, er på weekendophold eller blot ønsker en rolig overnatning i naturen.",
                  "Svaleholm sits in peaceful, rural surroundings on Zealand – just a short distance from Roskilde. We have up to 8 simple rooms, ideal when you're holding a wedding or party in the hall, on a weekend break or simply want a quiet overnight stay in nature."
                )}
              </p>
              <p style={{ color: "rgba(242,239,231,0.72)", lineHeight: 1.9, marginBottom: "2rem", maxWidth: "54ch" }}>
                {t(
                  "Værelserne er uden eget bad og toilet. I stedet deles fire fælles bad og toiletter mellem værelserne, og der er et fælles køkken, hvor I selv kan lave mad, samt et fælles opholdsrum til hygge. Check-in foregår nemt og digitalt, så I kan ankomme, når det passer jer.",
                  "The rooms have no private bath or toilet. Instead, four shared baths and toilets serve the rooms, and there is a shared kitchen where you can cook your own meals, plus a shared lounge to relax in. Check-in is easy and digital, so you can arrive whenever it suits you."
                )}
              </p>

              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "1.4rem", color: "#F2EFE7", marginBottom: "1rem" }}>
                {t("Kort om opholdet", "The stay at a glance")}
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {[
                  t("Op til 8 enkle værelser – hyggelige og rolige", "Up to 8 simple rooms – cosy and quiet"),
                  t("Værelserne er uden eget bad og toilet", "The rooms have no private bath or toilet"),
                  t("4 fælles bad og toiletter deles mellem værelserne", "4 shared baths and toilets serve the rooms"),
                  t("Fælles køkken, hvor I selv kan lave mad", "Shared kitchen where you can cook your own meals"),
                  t("Fælles opholdsrum til fælles hygge", "Shared lounge for spending time together"),
                  t("Kort afstand til Roskilde – fra DKK 650 pr. nat inkl. moms", "A short distance to Roskilde – from DKK 650 per night incl. VAT"),
                ].map((item) => (
                  <li key={item} className="flex items-baseline gap-3" style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,231,0.78)", fontSize: "0.95rem" }}>
                    <span style={{ color: "#7EA57C", fontSize: "0.7rem" }}>✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              {HIGHLIGHT_IMAGES.map((img, i) => (
                <div key={img.src} className={`overflow-hidden group ${i === 0 ? "mt-8" : ""}`} style={{ borderRadius: "2px" }}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                    style={{ height: "clamp(240px, 42vh, 420px)", filter: "saturate(0.92)" }}
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Fælles faciliteter */}
        <section className="section-padding" style={{ background: "#0F1714", borderTop: "1px solid rgba(242,239,231,0.08)" }}>
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="text-center mb-11"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="eyebrow mb-4">{t("Alt er fælles", "Everything shared")}</p>
              <h2 className="heading-section" style={{ color: "#F2EFE7" }}>{t("Fælles ", "Shared ")}<span className="accent-italic">{t("faciliteter", "facilities")}</span></h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {FACILITIES.map((f, index) => (
                <motion.div
                  key={f.title}
                  className="rounded-2xl p-7"
                  style={{ background: "rgba(242,239,231,0.04)", border: "1px solid rgba(242,239,231,0.12)" }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: (index % 4) * 0.06 }}
                  viewport={{ once: true, margin: "-60px" }}
                >
                  <div className="flex items-center justify-center rounded-xl mb-5" style={{ width: "3rem", height: "3rem", background: "rgba(201,169,106,0.14)" }}>
                    <svg className="w-6 h-6" fill="none" stroke="#C9A96A" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={f.icon} /></svg>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "1rem", color: "#F2EFE7", marginBottom: "0.5rem" }}>{t(f.title, f.titleEn)}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(242,239,231,0.66)", lineHeight: 1.65 }}>{t(f.desc, f.descEn)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer siteName="Svaleholm Roskilde" />
    </div>
  );
}
