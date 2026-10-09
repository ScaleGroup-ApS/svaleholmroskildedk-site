import { Link } from "react-router";
import { motion } from "framer-motion";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { SvaleFlock } from "~/components/Svale";
import { JsonLd } from "~/components/JsonLd";
import { FaqSection } from "~/components/Faq";
import { useT } from "~/lib/i18n";
import {
  graph,
  breadcrumb,
  webPageNode,
  lodgingNode,
  eventServiceNodes,
  faqNode,
} from "~/lib/schema";
import {
  type LandingPage,
  landingPagePath,
  findLandingPage,
} from "~/lib/landingPages";

/**
 * Shared renderer for every local SEO/GEO landing page. Mirrors the composition
 * and design-system classes of routes/tjenester.tsx and routes/vaerelser.tsx so
 * the pages are visually identical to the rest of the site. All copy is data-
 * driven from app/lib/landingPages.ts.
 *
 * JSON-LD is built from the entry's Danish fields (independent of the language
 * toggle) so the server-rendered markup matches hydration — the same convention
 * used across the site. Identity nodes (Organization/LocalBusiness/WebSite) are
 * injected once in root.tsx, so here we only add page-specific nodes referencing
 * them by @id.
 */

function buildJsonLd(page: LandingPage) {
  const path = landingPagePath(page);
  const nodes = [
    webPageNode({
      path,
      name: page.jsonLdName,
      description: page.jsonLdDescription,
      primaryImage: page.image,
    }),
    breadcrumb([
      { name: "Forside", path: "" },
      page.category === "overnatning"
        ? { name: "Ophold", path: "/vaerelser" }
        : { name: "Fest & events", path: "/tjenester" },
      { name: page.breadcrumbLabel, path },
    ]),
  ];

  if (page.category === "overnatning") {
    nodes.push(lodgingNode({ description: page.jsonLdDescription }));
  } else if (page.serviceName && page.serviceDescription) {
    nodes.push(
      ...eventServiceNodes([
        { name: page.serviceName, description: page.serviceDescription },
      ]),
    );
  }

  nodes.push(faqNode(page.faqs.map((f) => ({ q: f.qDa, a: f.aDa }))));

  return graph(...nodes);
}

export function LandingPageView({ page }: { page: LandingPage }) {
  const t = useT();

  const pillarHref = page.category === "overnatning" ? "/vaerelser" : "/tjenester";
  const pillarLabel =
    page.category === "overnatning"
      ? t("Se alle ophold", "See all stays")
      : t("Se fest & events", "See celebrations & events");

  // Resolve related (sibling) pages for the hub-and-spoke internal-link block.
  const related = page.relatedSlugs
    .map((slug) => findLandingPage(page.category, slug))
    .filter((p): p is LandingPage => Boolean(p));

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#0F1714" }}>
      <JsonLd data={buildJsonLd(page)} />
      <Header siteName="Svaleholm" />
      <main className="flex-1">

        {/* Page Hero */}
        <section className="relative flex items-end overflow-hidden" style={{ height: "56vh", minHeight: "420px" }}>
          <div className="absolute inset-0" style={{ inset: "-8% 0" }}>
            <img src={page.image} alt={page.imageAlt} className="w-full h-full object-cover ken-burns" />
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
            <p className="eyebrow mb-4">{t(page.heroEyebrowDa, page.heroEyebrowEn)}</p>
            <h1 className="heading-hero" style={{ color: "#F2EFE7", fontSize: "clamp(2.6rem, 7vw, 6rem)" }}>
              {t(page.h1Da, page.h1En)}
            </h1>
            <p style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,231,0.75)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "54ch", marginTop: "1.5rem" }}>
              {t(page.heroSubDa, page.heroSubEn)}
            </p>
          </motion.div>
        </section>

        {/* Intro content + highlights */}
        <section className="section-padding" style={{ background: "#14201B", borderTop: "1px solid rgba(242,239,231,0.08)" }}>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              {page.intro.map((sec, i) => (
                <div key={sec.headingDa} className={i > 0 ? "mt-10" : ""}>
                  <h2 className="heading-section mb-5" style={{ color: "#F2EFE7" }}>
                    {t(sec.headingDa, sec.headingEn)}
                  </h2>
                  <p style={{ color: "rgba(242,239,231,0.72)", lineHeight: 1.9, maxWidth: "54ch" }}>
                    {t(sec.bodyDa, sec.bodyEn)}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className="overflow-hidden group mb-8" style={{ borderRadius: "2px" }}>
                <img
                  src={page.image}
                  alt={page.imageAlt}
                  className="w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                  style={{ height: "clamp(260px, 42vh, 440px)", filter: "saturate(0.92)" }}
                  loading="lazy"
                />
              </div>

              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "1.4rem", color: "#F2EFE7", marginBottom: "1rem" }}>
                {t("Kort om stedet", "At a glance")}
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {page.highlightsDa.map((item, i) => (
                  <li key={item} className="flex items-baseline gap-3" style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,231,0.78)", fontSize: "0.95rem" }}>
                    <span style={{ color: "#7EA57C", fontSize: "0.7rem" }}>✦</span>
                    {t(item, page.highlightsEn[i] ?? item)}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                <Link to="/kontakt" className="btn-primary">
                  {page.category === "overnatning"
                    ? t("Forespørg på ophold", "Enquire about a stay")
                    : t("Få et uforpligtende tilbud", "Get a no-obligation quote")}
                </Link>
                <Link to={pillarHref} className="btn-ghost">{pillarLabel}</Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Hub-and-spoke: related landing pages */}
        {related.length > 0 && (
          <section className="section-padding" style={{ background: "#0F1714", borderTop: "1px solid rgba(242,239,231,0.08)" }}>
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                className="mb-11"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <p className="eyebrow mb-4">{t("Se også", "See also")}</p>
                <h2 className="heading-section" style={{ color: "#F2EFE7" }}>
                  {page.category === "overnatning"
                    ? <>{t("Mere ", "More ")}<span className="accent-italic">{t("overnatning i nærområdet", "stays nearby")}</span></>
                    : <>{t("Andre ", "Other ")}<span className="accent-italic">{t("fester & mærkedage", "celebrations & occasions")}</span></>}
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {related.map((r, index) => (
                  <motion.div
                    key={r.slug}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: (index % 3) * 0.06 }}
                    viewport={{ once: true, margin: "-60px" }}
                  >
                    <Link
                      to={landingPagePath(r)}
                      className="glass overflow-hidden card-shadow card-shadow-hover group block"
                      style={{ borderRadius: "2px" }}
                    >
                      <div className="overflow-hidden" style={{ height: "180px" }}>
                        <img
                          src={r.image}
                          alt={r.imageAlt}
                          className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                          style={{ filter: "saturate(0.92)" }}
                          loading="lazy"
                        />
                      </div>
                      <div className="p-7">
                        <h3 className="heading-card mb-2" style={{ color: "#F2EFE7", fontSize: "1.25rem" }}>
                          {t(r.h1Da, r.h1En)}
                        </h3>
                        <p style={{ color: "rgba(242,239,231,0.68)", lineHeight: 1.7, fontSize: "0.9rem" }}>
                          {t(r.heroSubDa, r.heroSubEn)}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <FaqSection
          items={page.faqs}
          eyebrowDa={page.category === "overnatning" ? "Ophold & overnatning" : "Fest & events"}
          eyebrowEn={page.category === "overnatning" ? "Stay & overnight" : "Celebrations & events"}
        />

        {/* CTA */}
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
            <p className="eyebrow mb-5">{t("Klar til at opleve Svaleholm?", "Ready to experience Svaleholm?")}</p>
            <h2 className="heading-section mb-6" style={{ color: "#F2EFE7" }}>
              {t("Lad os fejre ", "Let's celebrate ")}<span className="accent-italic">{t("sammen", "together")}</span>
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,231,0.72)", lineHeight: 1.85, maxWidth: "46ch", margin: "0 auto 2.6rem", fontSize: "1rem" }}>
              {t(
                "Tag det første skridt. Vi ser frem til at byde jer velkommen til Svaleholm Gaard.",
                "Take the first step. We look forward to welcoming you to Svaleholm Gaard."
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontakt" className="btn-primary">{t("Kontakt os", "Contact us")}</Link>
              <Link to={pillarHref} className="btn-ghost">{pillarLabel}</Link>
            </div>
            <p className="mt-8" style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(242,239,231,0.7)" }}>
              {t("Eller ring", "Or call")}{" "}
              <a href="tel:+4571531379" style={{ color: "#C9A96A", textDecoration: "none", fontWeight: 600, letterSpacing: "0.02em" }}>
                +45 71 53 13 79
              </a>
            </p>
          </motion.div>
        </section>
      </main>
      <Footer siteName="Svaleholm Roskilde" />
    </div>
  );
}
