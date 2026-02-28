import type { Route } from "./+types/index";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

// ── Meta ─────────────────────────────────────────────────────────────────────

export function meta() {
  return [
    { title: "Svaleholm Roskilde – Eksklusivt Ophold & Fejring" },
    { name: "description", content: "Oplev Svaleholm Roskilde – et unikt sted for ophold og livets store begivenheder. Historiske omgivelser, moderne luksus og personlig service." },
    { property: "og:title", content: "Svaleholm Roskilde – Eksklusivt Ophold & Fejring" },
    { property: "og:type", content: "website" },
  ];
}

// ── Component ────────────────────────────────────────────────────────────────

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "linear-gradient(to bottom, #F8F7F4, #F1F0EC)" }}>
      <Header siteName="Svaleholm" />
      <main className="flex-1">
        <HeroSection />
        <IntroSection />
        <ServicesSection />
        <TestimonialsSection />
        <CtaBanner />
      </main>
      <Footer siteName="Svaleholm Roskilde" />
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden">
      {/* Dark background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #0F1823 0%, #1E293B 55%, #162030 100%)" }} />

      {/* Animated mesh blobs */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 700, height: 700, top: "-10%", left: "-5%", background: "radial-gradient(circle, rgba(212,193,169,0.14) 0%, transparent 65%)", filter: "blur(60px)" }}
        animate={{ x: [0, 40, 0], y: [0, -25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 500, height: 500, bottom: "5%", right: "-5%", background: "radial-gradient(circle, rgba(184,159,128,0.12) 0%, transparent 60%)", filter: "blur(50px)" }}
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Roskilde · Danmark · Est. 1847
        </motion.p>

        <motion.h1
          className="heading-hero text-white mb-7"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        >
          Svaleholm Roskilde.
        </motion.h1>

        <motion.p
          style={{ fontFamily: "var(--font-body)", fontSize: "1.125rem", color: "rgba(248,247,244,0.7)", maxWidth: "580px", margin: "0 auto 3rem", lineHeight: 1.75 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.28 }}
        >
          Hvor historien møder nuet, og tiden står stille.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.44 }}
        >
          <Link to="/tjenester" className="btn-primary">
            Oplev Vores Værelser
          </Link>
          <Link to="/tjenester" className="btn-ghost">
            Planlæg Din Fejring
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 animate-pulse-slow">
        <svg width="24" height="36" viewBox="0 0 24 36" fill="none" style={{ color: "rgba(255,255,255,0.45)" }}>
          <rect x="1" y="1" width="22" height="34" rx="11" stroke="currentColor" strokeWidth="1.2"/>
          <motion.circle cx="12" cy="10" r="3" fill="currentColor"
            animate={{ cy: [10, 18, 10] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </section>
  );
}

// ── Intro ─────────────────────────────────────────────────────────────────────

function IntroSection() {
  return (
    <section className="section-padding overflow-hidden" style={{ background: "#F8F7F4" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">

          {/* Image col (40%) */}
          <motion.div
            className="lg:col-span-2 relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "3/4", boxShadow: "0 24px 60px rgba(30,41,59,0.12)" }}>
              <img
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop"
                alt="Svaleholm fasaden"
                className="w-full h-full object-cover"
                style={{ transition: "transform 8s ease" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              />
              {/* Decorative brass border element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-60" style={{ background: "radial-gradient(circle, #D4C1A9 0%, transparent 70%)", filter: "blur(20px)" }} />
            </div>
            {/* Floating quote */}
            <div className="absolute -top-5 -right-5 md:right-[-2rem] glass rounded-xl px-5 py-4 card-shadow" style={{ maxWidth: "200px" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", color: "#1E293B", lineHeight: 1.3 }}>
                "Et sted der tager vejret fra en"
              </p>
              <p className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "#B89F80", letterSpacing: "0.1em" }}>— Vores gæster</p>
            </div>
          </motion.div>

          {/* Text col (60%) */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="eyebrow mb-5">Vores Sjæl</p>
            <h2 className="heading-section gradient-text mb-8">
              En Oase af Ro.
            </h2>
            <div style={{ borderLeft: "2px solid #B89F80", paddingLeft: "1.5rem", marginBottom: "2rem" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", color: "#1E293B", lineHeight: 1.6, fontStyle: "italic" }}>
                "Vi troede på, at historien ikke blot skal bevares – den skal leves og deles."
              </p>
            </div>
            <p style={{ color: "#6B7280", lineHeight: 1.85, marginBottom: "1.5rem", maxWidth: "540px" }}>
              Svaleholm Roskilde er et sted, hvor det 19. århundredes arkitektur og det 21. århundredes komfort smelter sammen i en perfekt harmoni. Omgivet af den smukke nordsjællandske natur inviterer vi dig til at sænke skuldrene og lade øjeblikket sætte sit præg.
            </p>
            <p style={{ color: "#6B7280", lineHeight: 1.85, marginBottom: "2.5rem", maxWidth: "540px" }}>
              Hvert af vores otte unikke værelser er indrettet med henblik på at skabe en sanselig og autentisk oplevelse, der ærer stedets sjæl uden at gå på kompromis med moderne luksus.
            </p>
            <Link to="/om-os" className="btn-dark">
              Læs Vores Historie
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Services Teaser ───────────────────────────────────────────────────────────

function ServicesSection() {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "#1E293B" }}>
      {/* Decorative background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6d5de31d?w=1920&q=60&auto=format&fit=crop"
          alt=""
          aria-hidden
          className="w-full h-full object-cover"
          style={{ opacity: 0.12, filter: "blur(2px)" }}
        />
      </div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(30,41,59,0.96) 0%, rgba(30,41,59,0.80) 100%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="eyebrow mb-5">Hvad Vi Tilbyder</p>
          <h2 className="heading-section text-white">
            Ophold & Fejring
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <ServiceCard
            tag="Opholdet"
            title="Otte Unikke Værelser"
            description="Hvert værelse er en fortælling i sig selv. Fra det intime og hyggelige til det storslåede og overdådige – alle indrettet med håndplukkede møbler og lokale kunstneres arbejde."
            href="/tjenester"
            cta="Udforsk Ophold"
            imgSrc="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80&auto=format&fit=crop"
            delay={0}
          />
          <ServiceCard
            tag="Fejringen"
            title="Livets Store Begivenheder"
            description="Fra intime bryllupper til eksklusive firmaevents – Svaleholm danner den perfekte ramme for de øjeblikke, der fortjener at huskes for evigt."
            href="/tjenester"
            cta="Se Muligheder"
            imgSrc="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80&auto=format&fit=crop"
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
      initial={{ opacity: 0, scale: 0.97, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      viewport={{ once: true, margin: "-60px" }}
      className="glass rounded-xl overflow-hidden card-shadow group"
    >
      <div className="overflow-hidden" style={{ height: "240px" }}>
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-8">
        <p className="eyebrow mb-3">{tag}</p>
        <h3 className="heading-card mb-4" style={{ color: "#1E293B" }}>{title}</h3>
        <p style={{ color: "#6B7280", lineHeight: 1.75, marginBottom: "1.75rem", fontSize: "0.9375rem" }}>{description}</p>
        <Link to={href} className="btn-dark" style={{ fontSize: "0.875rem", padding: "0.7rem 1.5rem" }}>
          {cta}
        </Link>
      </div>
    </motion.div>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote: "Svaleholm er ikke bare et sted – det er en oplevelse. Vi fejrede vores bryllup her, og det overgik alle vores drømme. Personalet er enestående, og naturen er betagende.",
    name: "Sofie & Mikkel Andersen",
    event: "Bryllup, Juni 2024",
    initials: "SA",
  },
  {
    quote: "Vores firma-retreat på Svaleholm var transformerende. Den historiske atmosfære, kombineret med moderne faciliteter, skabte præcis den ro og inspiration, vores team havde brug for.",
    name: "Lars Vestergaard",
    event: "Firma-retreat, Marts 2024",
    initials: "LV",
  },
  {
    quote: "Vi fejrede vores 30-års jubilæum her, og det var magisk. Maden, servicen og de smukke omgivelser – alt var perfekt afstemt. Vi kommer absolut tilbage.",
    name: "Hanne & Jørgen Nielsen",
    event: "Jubilæum, September 2023",
    initials: "HN",
  },
];

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

  return (
    <section className="section-padding" style={{ background: "#F8F7F4" }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="eyebrow mb-4">Vores Gæster Fortæller</p>
          <h2 className="heading-section gradient-text">Ord fra Hjertet</h2>
        </motion.div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative glass rounded-2xl p-10 md:p-14 card-shadow text-center"
        >
          {/* Large quote mark */}
          <div className="absolute top-8 left-10" style={{ fontFamily: "var(--font-heading)", fontSize: "8rem", lineHeight: 1, color: "#E2E8F0", userSelect: "none" }}>"</div>

          <p style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)", color: "#1E293B", lineHeight: 1.65, fontStyle: "italic", position: "relative", zIndex: 1, maxWidth: "700px", margin: "0 auto 2rem" }}>
            {t.quote}
          </p>

          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold" style={{ background: "linear-gradient(135deg, #D4C1A9, #B89F80)", color: "#1E293B", fontFamily: "var(--font-body)" }}>
              {t.initials}
            </div>
            <div className="text-left">
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.9rem", color: "#1E293B" }}>{t.name}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#B89F80" }}>{t.event}</p>
            </div>
          </div>
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center gap-2.5 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? "2rem" : "0.625rem",
                height: "0.625rem",
                background: i === active ? "linear-gradient(135deg, #D4C1A9, #B89F80)" : "#E2E8F0",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA Banner ────────────────────────────────────────────────────────────────

function CtaBanner() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#1E293B", padding: "6rem 1.5rem" }}>
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(184,159,128,0.1) 0%, transparent 65%)"
      }} />
      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <p className="eyebrow mb-5">Klar til at Opleve Svaleholm?</p>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 400, color: "#F8F7F4", lineHeight: 1.2, marginBottom: "1.5rem" }}>
          Reserver Dit Ophold I Dag
        </h2>
        <p style={{ fontFamily: "var(--font-body)", color: "rgba(248,247,244,0.65)", lineHeight: 1.75, maxWidth: "480px", margin: "0 auto 2.5rem", fontSize: "1rem" }}>
          Tag det første skridt mod en uforglemmelig oplevelse. Vi ser frem til at byde dig velkommen.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/kontakt" className="btn-primary">Book Dit Ophold</Link>
          <Link to="/priser" className="btn-ghost">Se Priser</Link>
        </div>
      </motion.div>
    </section>
  );
}
