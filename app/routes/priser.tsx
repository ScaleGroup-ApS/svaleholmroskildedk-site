import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

export function meta() {
  return [
    { title: "Priser – Svaleholm Roskilde" },
    { name: "description", content: "Gennemsigtige priser for ophold og selskaber på Svaleholm Roskilde. Se vores værelsespakker og eventpriser." },
  ];
}

const ROOM_PRICES = [
  { category: "Klassiske Værelser", rooms: "Svalereden, Haven, Marken, Vinterstuen", price: "2.495", per: "pr. nat", includes: ["Kontinental morgenmad", "Fri Wi-Fi", "Adgang til haven", "Velkomstdrink"], note: "" },
  { category: "Deluxe Værelser", rooms: "Søen, Biblioteket", price: "3.295", per: "pr. nat", includes: ["Gourmet morgenmad", "Fri Wi-Fi", "Adgang til haven", "Velkomstchampagne", "Fri minibar (ikke-alkohol)"], note: "" },
  { category: "Tårnet", rooms: "Eksklusivt tårn-suite", price: "4.795", per: "pr. nat", includes: ["Gourmet morgenmad på værelset", "Privat jacuzzi", "Champagneservice", "Sen checkout (kl. 14)", "Fri minibar"], note: "", featured: true },
  { category: "Mestersuiten", rooms: "Vores største suite", price: "6.995", per: "pr. nat", includes: ["Alt inklusiv morgenmad", "Privat butler-service", "Transferservice", "Spa-adgang", "Komplimenterende champagne"], note: "Fra pris. Kontakt os for tilbud.", featured: true },
];

const EVENT_PACKAGES = [
  {
    name: "Bryllupspakke 'Svaleholm'",
    price: "1.295",
    priceNote: "pr. kuvert",
    minGuests: "Min. 30 gæster",
    includes: [
      "Eksklusive lokaler fredag–søndag",
      "Velkomstcocktail & canapes",
      "4-retters bryllupsmenu",
      "Borgelig vielse i rosenhaven",
      "Overnatning for brudepar i Tårnet",
      "Morgenmad for alle overnattende gæster",
      "Dedikeret eventkoordinator",
    ],
    cta: "Book Bryllup",
  },
  {
    name: "Firma-Retreat 'Inspiration'",
    price: "3.495",
    priceNote: "pr. person, hele opholdet",
    minGuests: "Min. 8 deltagere",
    includes: [
      "2 overnatninger inkl. morgenmad",
      "Mødelokale med AV-udstyr",
      "Frokost & kaffepauser",
      "Teambuilding i naturen (valgfrit)",
      "3-retters middag begge aftener",
      "Tilpasset program",
    ],
    cta: "Book Retreat",
  },
  {
    name: "Private Fejringer",
    price: "895",
    priceNote: "pr. kuvert",
    minGuests: "Min. 20 gæster",
    includes: [
      "Eksklusive lokaler",
      "3-retters festmenu",
      "Velkomstdrink",
      "Dekorationer inkl.",
      "Dedikeret vært",
    ],
    cta: "Book Fejring",
  },
];

const FAQS = [
  { q: "Hvornår er check-in og check-out?", a: "Check-in er fra kl. 15:00, og check-out er senest kl. 11:00. Vi tilbyder mulighed for late check-out mod et tillæg, afhængigt af tilgængelighed. For gæster i Mestersuiten er sen checkout til kl. 14:00 inkluderet." },
  { q: "Er morgenmad inkluderet i prisen?", a: "Ja, alle vores rum inkluderer morgenmad. Klassiske og Deluxe-værelser tilbydes buffet-morgenmad i vores spisesal kl. 7:30–10:00. Tårnet og Mestersuiten har morgenmad serveret på værelset." },
  { q: "Hvad er afbestillingspolitikken?", a: "Afbestilling mere end 14 dage før ankomst: Fuld refusion minus et administrationsgebyr på DKK 250. Afbestilling 7–14 dage før: 50% refusion. Afbestilling under 7 dage: ingen refusion. Vi anbefaler rejseforsikring." },
  { q: "Er kæledyr tilladt?", a: "Vi ønsker at byde dine kæledyr velkommen. Kæledyr er tilladt i udvalgte klasssike-værelser mod et ekstra rengøringsgebyr på DKK 300 pr. ophold. Kontakt os, når du booker." },
  { q: "Har I parkeringsplads?", a: "Ja, vi har gratis privat parkering for alle gæster. Ladestationer til elbiler er tilgængelige (første 2 timer gratis)." },
  { q: "Kan I håndtere særlige kostbehov?", a: "Absolut. Vores køkken kan tilpasse menuer til alle kostbehov og allergier. Kontakt os inden ankomst, så sikrer vi, at din oplevelse er fejlfri." },
  { q: "Hvad er minimumsalderen for booking?", a: "Gæster skal være minimum 18 år for at booke et værelse. Børn er velkomne i selskab med voksne. Kontakt os for information om familievenlige arrangementer." },
];

export default function Priser() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName="Svaleholm" />
      <main className="flex-1 pt-20">

        {/* Hero */}
        <section className="section-padding-sm text-center" style={{ background: "#F8F7F4" }}>
          <motion.div
            className="max-w-3xl mx-auto px-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow mb-4">Transparent Prissætning</p>
            <h1 className="heading-section gradient-text mb-6">Priser & Pakker</h1>
            <p style={{ fontFamily: "var(--font-body)", color: "#6B7280", fontSize: "1.0625rem", lineHeight: 1.75, maxWidth: "520px", margin: "0 auto" }}>
              Vi tror på gennemsigtighed. Herunder finder du vores priser. Kontakt os altid for et skræddersyet tilbud.
            </p>
          </motion.div>
        </section>

        {/* Room Prices */}
        <section className="section-padding" style={{ background: "#F8F7F4" }}>
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="eyebrow mb-4">Overnatning</p>
              <h2 className="heading-section gradient-text">Værelsespakker</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ROOM_PRICES.map((pkg, i) => (
                <motion.div
                  key={pkg.category}
                  className={`rounded-xl p-8 card-shadow ${pkg.featured ? "relative overflow-hidden" : "glass"}`}
                  style={pkg.featured ? { background: "#1E293B", border: "1px solid rgba(184,159,128,0.3)" } : {}}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
                  viewport={{ once: true, margin: "-60px" }}
                >
                  {pkg.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium" style={{ background: "linear-gradient(135deg, #D4C1A9, #B89F80)", color: "#1E293B", fontFamily: "var(--font-body)" }}>
                      Premium
                    </div>
                  )}
                  <p className="eyebrow mb-2">{pkg.rooms}</p>
                  <h3 className="heading-card mb-1" style={{ color: pkg.featured ? "#F8F7F4" : "#1E293B" }}>{pkg.category}</h3>
                  <div className="flex items-baseline gap-2 my-5" style={{ borderBottom: `1px solid ${pkg.featured ? "rgba(255,255,255,0.1)" : "#E2E8F0"}`, paddingBottom: "1.5rem", marginBottom: "1.5rem" }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", fontWeight: 400, color: pkg.featured ? "#F8F7F4" : "#1E293B", lineHeight: 1 }}>
                      DKK {pkg.price}
                    </span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: pkg.featured ? "rgba(248,247,244,0.6)" : "#9CA3AF" }}>
                      {pkg.per}
                    </span>
                  </div>
                  <ul className="space-y-2.5 mb-6">
                    {pkg.includes.map(item => (
                      <li key={item} className="flex items-center gap-3" style={{ fontFamily: "var(--font-body)", color: pkg.featured ? "rgba(248,247,244,0.75)" : "#4B5563", fontSize: "0.9rem" }}>
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#B89F80" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {pkg.note && <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: pkg.featured ? "rgba(248,247,244,0.45)" : "#9CA3AF", marginBottom: "1.25rem" }}>{pkg.note}</p>}
                  <Link to="/kontakt" className={pkg.featured ? "btn-primary" : "btn-dark"} style={{ fontSize: "0.875rem", padding: "0.7rem 1.5rem" }}>
                    Book Nu
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Prices */}
        <section className="section-padding" style={{ background: "#1E293B" }}>
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="eyebrow mb-4">Selskaber & Events</p>
              <h2 className="heading-section text-white">Eventpakker</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {EVENT_PACKAGES.map((pkg, i) => (
                <motion.div
                  key={pkg.name}
                  className="glass rounded-xl p-8"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-60px" }}
                >
                  <p className="eyebrow mb-3">{pkg.minGuests}</p>
                  <h3 className="heading-card mb-2" style={{ color: "#1E293B" }}>{pkg.name}</h3>
                  <div className="my-5 pb-5" style={{ borderBottom: "1px solid #E2E8F0" }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 400, color: "#1E293B", lineHeight: 1 }}>
                      Fra DKK {pkg.price}
                    </span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "#9CA3AF", display: "block", marginTop: "0.25rem" }}>
                      {pkg.priceNote}
                    </span>
                  </div>
                  <ul className="space-y-2.5 mb-7">
                    {pkg.includes.map(item => (
                      <li key={item} className="flex items-center gap-3" style={{ fontFamily: "var(--font-body)", color: "#4B5563", fontSize: "0.875rem" }}>
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#B89F80" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to="/kontakt" className="btn-dark w-full text-center" style={{ fontSize: "0.875rem", padding: "0.7rem 1rem" }}>
                    {pkg.cta}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-10 glass rounded-xl p-8 text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", color: "#1E293B", marginBottom: "0.75rem" }}>
                Har du specielle ønsker?
              </p>
              <p style={{ fontFamily: "var(--font-body)", color: "#6B7280", marginBottom: "1.5rem", fontSize: "0.9375rem" }}>
                Alle vores pakker kan tilpasses fuldstændigt til dine behov. Ring eller skriv til os for et skræddersyet tilbud.
              </p>
              <Link to="/kontakt" className="btn-primary" style={{ fontSize: "0.9rem" }}>
                Kontakt Os For Tilbud
              </Link>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding" style={{ background: "#F8F7F4" }}>
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="eyebrow mb-4">Praktisk Information</p>
              <h2 className="heading-section gradient-text">Ofte Stillede Spørgsmål</h2>
            </motion.div>

            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <motion.div
                  key={i}
                  className="glass rounded-xl overflow-hidden card-shadow"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  viewport={{ once: true, margin: "-40px" }}
                >
                  <button
                    className="w-full px-7 py-5 flex items-center justify-between text-left"
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "#1E293B", fontSize: "0.9375rem", paddingRight: "1rem" }}>
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ color: "#B89F80", flexShrink: 0 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-7 pb-5" style={{ borderTop: "1px solid #E2E8F0", paddingTop: "1rem" }}>
                          <p style={{ fontFamily: "var(--font-body)", color: "#6B7280", lineHeight: 1.75, fontSize: "0.9375rem" }}>
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
