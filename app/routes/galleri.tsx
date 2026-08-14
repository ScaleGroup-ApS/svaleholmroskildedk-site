import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { SvaleFlock } from "~/components/Svale";
import { useT } from "~/lib/i18n";

export function meta() {
  return [
    { title: "Galleri – Svaleholm Roskilde" },
    {
      name: "description",
      content:
        "Se billeder fra Svaleholm Gaard ved Roskilde – festsalen til bryllup og fest, gården, de enkle værelser og den omkringliggende natur på Sjælland.",
    },
    { property: "og:title", content: "Galleri – Svaleholm Roskilde" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/images/festsal-fest-2.png" },
  ];
}

// Hele billedbiblioteket – rigtige fester, festsalen, gården, ophold og natur.
type Shot = { src: string; da: string; en: string };

const GALLERY: Shot[] = [
  // Gæster der nyder festen
  { src: "/images/festsal-fest-1.png", da: "Bryllupsmiddag ved langbord med lys og blomster", en: "Wedding dinner at a long table with candles and flowers" },
  { src: "/images/festsal-fest-2.png", da: "Fest i salen med band og lyskæder", en: "Celebration in the hall with a band and string lights" },
  { src: "/images/festsal-hvid-1.png", da: "Festsalen pyntet i hvidt med eukalyptus og guldtallerkener", en: "The hall dressed in white with eucalyptus and gold plates" },
  { src: "/images/festsal-hvid-2.png", da: "Hvide draperier, lyskæder og blomster i festsalen", en: "White drapes, string lights and flowers in the hall" },
  { src: "/images/skaal-toast.png", da: "Gæster skåler i champagne", en: "Guests toasting with champagne" },
  { src: "/images/gaard-familie.png", da: "Familier spiser ved langborde under egetræet", en: "Families dining at long tables under the oak tree" },
  { src: "/images/ankomst-velkommen.png", da: "Par ankommer til Svaleholm ved skumring", en: "A couple arriving at Svaleholm at dusk" },
  { src: "/images/ankomst-aften.png", da: "Gæster ankommer om aftenen", en: "Guests arriving in the evening" },
  { src: "/images/have-par-hund.png", da: "Par går tur med hunden på stien", en: "A couple walking their dog along the path" },

  // Naturen omkring Svaleholm
  { src: "/images/have-sti.jpg", da: "Havesti gennem haven", en: "A path through the garden" },
  { src: "/images/have-sti-3.jpg", da: "Sti langs haven", en: "A path along the garden" },
  { src: "/images/natur-eng.jpg", da: "Eng set gennem trækronen", en: "A meadow seen through the treetops" },
  { src: "/images/natur-eng-2.jpg", da: "Grøn eng ved Svaleholm", en: "A green meadow by Svaleholm" },
  { src: "/images/natur-mark.jpg", da: "Bølgende mark omkring gården", en: "Rolling fields around the farm" },
  { src: "/images/natur-mark-2.jpg", da: "Marker og åben himmel", en: "Fields and open sky" },
  { src: "/images/natur-1.jpg", da: "Naturen omkring Svaleholm", en: "The nature around Svaleholm" },
  { src: "/images/natur-4.jpg", da: "Naturen tæt på gården", en: "Nature close to the farm" },
  { src: "/images/natur-5.jpg", da: "Landskab ved Svaleholm", en: "Landscape by Svaleholm" },
  { src: "/images/natur-7.jpg", da: "Stille natur på landet", en: "Quiet countryside nature" },
];

export default function Galleri() {
  const t = useT();
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % GALLERY.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length));
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  const altOf = (s: Shot) => t(s.da, s.en);

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#0F1714" }}>
      <Header siteName="Svaleholm" />
      <main className="flex-1">

        {/* Page Hero */}
        <section className="relative flex items-end overflow-hidden" style={{ height: "52vh", minHeight: "380px" }}>
          <div className="absolute inset-0" style={{ inset: "-8% 0" }}>
            <img src="/images/festsal-fest-2.png" alt="Fest i festsalen på Svaleholm nær Roskilde" className="w-full h-full object-cover ken-burns" />
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
            <p className="eyebrow mb-4">{t("Øjeblikke fra gården", "Moments from the farm")}</p>
            <h1 className="heading-hero" style={{ color: "#F2EFE7", fontSize: "clamp(3rem, 8vw, 7rem)" }}>
              {t("Vores ", "Our ")}<span className="accent-italic">{t("galleri", "gallery")}</span>
            </h1>
            <p style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,231,0.75)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "54ch", marginTop: "1.5rem" }}>
              {t(
                "Fester i salen, gården, de enkle værelser og naturen omkring Svaleholm. Klik på et billede for at se det i fuld størrelse.",
                "Celebrations in the hall, the courtyard, the simple rooms and the nature around Svaleholm. Click an image to see it full size."
              )}
            </p>
          </motion.div>
        </section>

        {/* Gallery grid */}
        <section className="section-padding" style={{ background: "#0F1714" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {GALLERY.map((shot, i) => (
                <motion.button
                  key={shot.src}
                  type="button"
                  onClick={() => setActive(i)}
                  className="overflow-hidden group relative"
                  style={{ borderRadius: "2px", cursor: "pointer", padding: 0, border: "none", background: "none" }}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: (i % 3) * 0.06 }}
                  viewport={{ once: true, margin: "-40px" }}
                  aria-label={t("Åbn billede: ", "Open image: ") + altOf(shot)}
                >
                  <img
                    src={shot.src}
                    alt={altOf(shot)}
                    className="w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                    style={{ height: "clamp(180px, 26vh, 300px)", filter: "saturate(0.92)" }}
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(180deg, transparent 55%, rgba(15,23,20,0.7) 100%)" }}
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer siteName="Svaleholm Roskilde" />

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "rgba(11,17,14,0.94)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={altOf(GALLERY[active])}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label={t("Luk", "Close")}
            className="absolute top-5 right-5 flex items-center justify-center rounded-full transition-colors"
            style={{ width: "3rem", height: "3rem", background: "rgba(242,239,231,0.08)", color: "#F2EFE7", border: "1px solid rgba(242,239,231,0.18)", cursor: "pointer" }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setActive((i) => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length)); }}
            aria-label={t("Forrige billede", "Previous image")}
            className="hidden sm:flex items-center justify-center absolute left-5 top-1/2 -translate-y-1/2 rounded-full transition-colors"
            style={{ width: "3rem", height: "3rem", background: "rgba(242,239,231,0.08)", color: "#C9A96A", border: "1px solid rgba(242,239,231,0.18)", cursor: "pointer", fontSize: "1.6rem", lineHeight: 1 }}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setActive((i) => (i === null ? i : (i + 1) % GALLERY.length)); }}
            aria-label={t("Næste billede", "Next image")}
            className="hidden sm:flex items-center justify-center absolute right-5 top-1/2 -translate-y-1/2 rounded-full transition-colors"
            style={{ width: "3rem", height: "3rem", background: "rgba(242,239,231,0.08)", color: "#C9A96A", border: "1px solid rgba(242,239,231,0.18)", cursor: "pointer", fontSize: "1.6rem", lineHeight: 1 }}
          >
            ›
          </button>

          <figure className="max-w-[92vw] max-h-[86vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY[active].src}
              alt={altOf(GALLERY[active])}
              className="object-contain"
              style={{ maxWidth: "92vw", maxHeight: "78vh", borderRadius: "2px", boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}
            />
            <figcaption className="mt-4 text-center" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(242,239,231,0.7)" }}>
              {altOf(GALLERY[active])}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
