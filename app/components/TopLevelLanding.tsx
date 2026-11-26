import { Link } from "react-router";
import { motion } from "framer-motion";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { SvaleFlock } from "~/components/Svale";
import { JsonLd } from "~/components/JsonLd";
import { useLang } from "~/lib/i18n";
import { graph, breadcrumb, webPageNode } from "~/lib/schema";
import type { TopLanding } from "~/lib/topLandingPages";

// ─────────────────────────────────────────────────────────────────────────────
// Renderer for the top-level, search-intent landing pages (#231 G12):
// /haandvaerkere, /hele-gaarden, /risoe, /roskilde-festival.
//
// STRUKTUR ejes af Theo (teknik: routing, meta, canonical, JSON-LD, layout).
// COPY (body/fakta) er et første udkast — Maja (SEO) udbygger til 300-600 ord
// pr. side + keyword-/FAQ-optimering. Alt er data-drevet fra topLandingPages.ts.
// ─────────────────────────────────────────────────────────────────────────────

export function topLandingJsonLd(page: TopLanding) {
  return graph(
    webPageNode({
      path: page.path,
      name: page.jsonLdName,
      description: page.jsonLdDescription,
      primaryImage: page.image,
    }),
    breadcrumb([
      { name: "Forside", path: "" },
      { name: page.breadcrumbLabel, path: page.path },
    ]),
  );
}

export function TopLevelLanding({ page }: { page: TopLanding }) {
  const { lang } = useLang();
  const body = lang === "en" ? page.bodyEn : page.bodyDa;
  const facts = lang === "en" ? page.factsEn : page.factsDa;

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#0F1714" }}>
      <JsonLd data={topLandingJsonLd(page)} />
      <Header siteName="Svaleholm" />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative flex items-end overflow-hidden" style={{ height: "56vh", minHeight: "440px" }}>
          <div className="absolute inset-0" style={{ inset: "-8% 0" }}>
            <img src={page.image.replace(/\.(jpg|png)$/i, ".webp")} alt={page.imageAlt} className="w-full h-full object-cover ken-burns" fetchPriority="high" width={1600} height={900} />
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,23,20,0.58) 0%, rgba(15,23,20,0.38) 42%, #0F1714 100%)" }} />
          <SvaleFlock count={3} />
          <motion.div
            className="relative z-10 max-w-5xl mx-auto px-6 w-full"
            style={{ paddingBottom: "clamp(2.5rem, 6vh, 4rem)" }}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow mb-4">{lang === "en" ? page.eyebrowEn : page.eyebrowDa}</p>
            <h1 className="heading-hero" style={{ color: "#F2EFE7", fontSize: "clamp(2.6rem, 6.5vw, 5.2rem)" }}>
              {lang === "en" ? page.h1aEn : page.h1aDa}
              <span className="accent-italic">{lang === "en" ? page.h1bEn : page.h1bDa}</span>
            </h1>
            <p style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,231,0.78)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "54ch", marginTop: "1.4rem" }}>
              {lang === "en" ? page.subEn : page.subDa}
            </p>
          </motion.div>
        </section>

        {/* Indhold */}
        <section className="section-padding" style={{ background: "#0F1714" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-7">
                {body.map((para, i) => (
                  <p key={i} style={{ color: "rgba(242,239,231,0.72)", lineHeight: 1.9, marginBottom: "1.5rem", fontSize: "1.02rem", maxWidth: "60ch" }}>
                    {para}
                  </p>
                ))}
              </div>
              <div className="lg:col-span-5">
                <div className="glass card-shadow" style={{ borderRadius: "2px", padding: "2rem 2.25rem" }}>
                  <p className="eyebrow mb-5">{lang === "en" ? "Good to know" : "Godt at vide"}</p>
                  <ul className="space-y-3.5">
                    {facts.map((f) => (
                      <li key={f} className="flex items-start gap-3" style={{ color: "rgba(242,239,231,0.82)", fontSize: "0.95rem", lineHeight: 1.55 }}>
                        <svg className="w-4 h-4 flex-shrink-0 mt-1" fill="none" stroke="#C9A96A" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.5l5 5 10-11" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-3 mt-7">
                    <Link to="/kontakt" className="btn-primary w-full">{lang === "en" ? "Get a quote" : "Få et tilbud"}</Link>
                    <Link to="/priser" className="btn-ghost w-full">{lang === "en" ? "See prices" : "Se priser"}</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer siteName="Svaleholm Roskilde" />
    </div>
  );
}
