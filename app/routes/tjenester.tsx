import { Link } from "react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

export function meta() {
  return [
    { title: "Tjenester – Svaleholm Roskilde" },
    { name: "description", content: "Udforsk Svaleholms otte unikke værelser og vores muligheder for selskaber og events. Bryllup, firma-retreat eller privat fejring – vi har rammen." },
  ];
}

const ROOMS = [
  {
    name: "Svalereden",
    desc: "Vores mest intime værelse med udsigt over gårdspladsens historiske ege. Et fristed for to.",
    size: "28 m²",
    bed: "King",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=80&auto=format&fit=crop",
    features: ["Brændeovn", "Clawfoot badekar", "Fri minibar"],
  },
  {
    name: "Haven",
    desc: "Direkte adgang til den private rosenhave. Vågn op til duften af blomster og fuglekvidder.",
    size: "32 m²",
    bed: "King",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6d5de31d?w=700&q=80&auto=format&fit=crop",
    features: ["Privat terrasse", "Regnbruser", "Haveadgang"],
  },
  {
    name: "Tårnet",
    desc: "Placeret i det renoverede tårn med panoramaudsigt over søen og det omkringliggende gods.",
    size: "45 m²",
    bed: "Super King",
    img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=700&q=80&auto=format&fit=crop",
    features: ["360° udsigt", "Privat jacuzzi", "Champagneservice"],
  },
  {
    name: "Biblioteket",
    desc: "Indrettet i det oprindelige bibliotek med hyldevægge af bøger og et sanseligt læsehjørne.",
    size: "38 m²",
    bed: "King",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80&auto=format&fit=crop",
    features: ["Arbejdsbord", "Sofahjørne", "Gourmet-tekasse"],
  },
  {
    name: "Marken",
    desc: "Rustik elegance med eksponerede bjælker og udsigt over de gyldne marker.",
    size: "30 m²",
    bed: "Queen",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700&q=80&auto=format&fit=crop",
    features: ["Eksponerede bjælker", "Kamin", "Morgenmad inkl."],
  },
  {
    name: "Søen",
    desc: "Med terrasse der vender mod den stille sø er dette stedet for dem, der søger ro i sin reneste form.",
    size: "35 m²",
    bed: "King",
    img: "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=700&q=80&auto=format&fit=crop",
    features: ["Søudsigt", "Privat båd", "Fiskestang"],
  },
  {
    name: "Vinterstuen",
    desc: "Opkald med den smukkeste vinterudsigt. Varme farver, blødt lys og en kæmpe seng.",
    size: "33 m²",
    bed: "Super King",
    img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=700&q=80&auto=format&fit=crop",
    features: ["Gulvvarme", "Badekaret ved vinduet", "Pejs"],
  },
  {
    name: "Mestersuiten",
    desc: "Vores største og mest eksklusive suite. En hel verden for sig selv, med alt hvad hjertet begærer.",
    size: "75 m²",
    bed: "Super King",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&q=80&auto=format&fit=crop",
    features: ["Separat stue", "Walk-in closet", "Privat butler"],
    featured: true,
  },
];

const EVENTS = [
  {
    title: "Bryllupper",
    desc: "Svaleholm er drømmens ramme for det perfekte bryllup. Med plads til op til 80 gæster i vores store sal, og mulighed for civilceremonien i rosenhaven, skabes en dag, familien taler om i generationer.",
    capacity: "Op til 80 gæster",
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80&auto=format&fit=crop",
    includes: ["Eksklusive lokaler hele weekenden", "Personaliseretmenu (2–5 retter)", "Blomsterdekorationer", "Overnatning for brudepar", "Koordinator inkluderet"],
  },
  {
    title: "Firma-retreats",
    desc: "Løsriv jer fra hverdagen og skab virkelige forbindelser og nye idéer i Svaleholms historiske rammer. Vores faciliteter tilbyder alt fra workshoplokaler til teambuilding i naturen.",
    capacity: "4–30 deltagere",
    img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=900&q=80&auto=format&fit=crop",
    includes: ["Mødelokale med AV-udstyr", "Catering hele dagen", "Teambuilding aktiviteter", "Overnatning for alle deltagere", "Afsluttende middag"],
  },
  {
    title: "Private Fejringer",
    desc: "Runde fødselsdage, jubilæer, dimissioner eller familieweekends – alle livets store øjeblikke fortjener omgivelser, der matcher dem.",
    capacity: "Op til 60 gæster",
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&q=80&auto=format&fit=crop",
    includes: ["Eksklusiv brug af lokaler", "Skræddersyet menu", "Dekorationer", "Livemusik kan arrangeres", "Overnatningspakker"],
  },
];

export default function Tjenester() {
  const [activeTab, setActiveTab] = useState<"vaerelser" | "selskaber">("vaerelser");

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName="Svaleholm" />
      <main className="flex-1 pt-20">

        {/* Page Hero */}
        <section className="section-padding-sm text-center" style={{ background: "#F8F7F4" }}>
          <motion.div
            className="max-w-3xl mx-auto px-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow mb-4">Hvad Vi Tilbyder</p>
            <h1 className="heading-section gradient-text mb-6">Ophold & Fejring</h1>
            <p style={{ fontFamily: "var(--font-body)", color: "#6B7280", fontSize: "1.0625rem", lineHeight: 1.75, maxWidth: "520px", margin: "0 auto" }}>
              Uanset om du søger ro for dig selv eller vil samle dine kære til en uforglemmelig fest – Svaleholm har rummet, stedet og holdet til at gøre det muligt.
            </p>
          </motion.div>
        </section>

        {/* Segmented Tabs */}
        <div className="sticky top-20 z-30 py-4" style={{ background: "rgba(248,247,244,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #E2E8F0" }}>
          <div className="max-w-xl mx-auto px-6 flex">
            {([
              { key: "vaerelser", label: "Værelser & Ophold" },
              { key: "selskaber", label: "Selskaber & Events" },
            ] as const).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex-1 py-3 px-4 text-sm font-medium transition-all duration-200 relative"
                style={{
                  fontFamily: "var(--font-body)",
                  color: activeTab === tab.key ? "#1E293B" : "#9CA3AF",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  borderBottom: activeTab === tab.key ? "2px solid #B89F80" : "2px solid transparent",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content: Rooms */}
        {activeTab === "vaerelser" && (
          <section className="section-padding" style={{ background: "#F8F7F4" }}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {ROOMS.map((room, i) => (
                  <motion.div
                    key={room.name}
                    className={`glass rounded-xl overflow-hidden card-shadow card-shadow-hover group ${room.featured ? "md:col-span-2 xl:col-span-1" : ""}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                    viewport={{ once: true, margin: "-60px" }}
                  >
                    <div className="relative overflow-hidden" style={{ height: "220px" }}>
                      <img src={room.img} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      {room.featured && (
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium" style={{ background: "linear-gradient(135deg, #D4C1A9, #B89F80)", color: "#1E293B", fontFamily: "var(--font-body)" }}>
                          Premium Suite
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="heading-card" style={{ color: "#1E293B" }}>{room.name}</h3>
                        <span className="text-xs px-2 py-1 rounded" style={{ background: "#F1F0EC", color: "#B89F80", fontFamily: "var(--font-body)", fontWeight: 500 }}>{room.size}</span>
                      </div>
                      <p style={{ color: "#6B7280", fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>{room.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        <span className="text-xs px-2 py-1 rounded" style={{ background: "#F1F0EC", color: "#6B7280", fontFamily: "var(--font-body)" }}>
                          🛏 {room.bed}
                        </span>
                        {room.features.map(f => (
                          <span key={f} className="text-xs px-2 py-1 rounded" style={{ background: "#F1F0EC", color: "#6B7280", fontFamily: "var(--font-body)" }}>
                            {f}
                          </span>
                        ))}
                      </div>
                      <Link to="/priser" className="btn-dark" style={{ fontSize: "0.875rem", padding: "0.65rem 1.25rem" }}>
                        Læs Mere & Book
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Content: Events */}
        {activeTab === "selskaber" && (
          <section className="section-padding" style={{ background: "#F8F7F4" }}>
            <div className="max-w-7xl mx-auto px-6 space-y-20">
              {EVENTS.map((event, i) => (
                <motion.div
                  key={event.title}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, margin: "-80px" }}
                >
                  <div className={`overflow-hidden rounded-xl ${i % 2 !== 0 ? "lg:order-2" : ""}`} style={{ aspectRatio: "16/10", boxShadow: "0 16px 40px rgba(30,41,59,0.1)" }}>
                    <img src={event.img} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                  </div>
                  <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                    <p className="eyebrow mb-4">{event.capacity}</p>
                    <h2 className="heading-section gradient-text mb-6">{event.title}</h2>
                    <p style={{ color: "#6B7280", lineHeight: 1.85, marginBottom: "1.75rem" }}>{event.desc}</p>
                    <ul className="space-y-2.5 mb-8">
                      {event.includes.map(item => (
                        <li key={item} className="flex items-center gap-3" style={{ fontFamily: "var(--font-body)", color: "#4B5563", fontSize: "0.9375rem" }}>
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#B89F80" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link to="/kontakt" className="btn-primary">Få et Uforpligtende Tilbud</Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

      </main>
      <Footer siteName="Svaleholm Roskilde" />
    </div>
  );
}
