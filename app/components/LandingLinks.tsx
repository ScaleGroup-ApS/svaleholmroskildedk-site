import { Link } from "react-router";
import { motion } from "framer-motion";
import { useT } from "~/lib/i18n";
import {
  type LandingCategory,
  landingPagesByCategory,
  landingPagePath,
} from "~/lib/landingPages";

/**
 * Hub section for the pillar pages (/vaerelser, /tjenester). Lists all landing
 * pages in a category as cards so the "spoke" pages are internally linked and
 * crawlable (no orphans) — without adding them to the top navigation. Reuses the
 * site's glass-card design verbatim.
 */
export function LandingLinksSection({
  category,
  eyebrowDa,
  eyebrowEn,
  headingDa,
  headingEn,
  accentDa,
  accentEn,
  background = "#14201B",
}: {
  category: LandingCategory;
  eyebrowDa: string;
  eyebrowEn: string;
  headingDa: string;
  headingEn: string;
  accentDa: string;
  accentEn: string;
  background?: string;
}) {
  const t = useT();
  const pages = landingPagesByCategory(category);
  if (pages.length === 0) return null;

  return (
    <section className="section-padding" style={{ background, borderTop: "1px solid rgba(242,239,231,0.08)" }}>
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
            {t(headingDa, headingEn)}<span className="accent-italic">{t(accentDa, accentEn)}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {pages.map((p, index) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <Link
                to={landingPagePath(p)}
                className="glass overflow-hidden card-shadow card-shadow-hover group block h-full"
                style={{ borderRadius: "2px" }}
              >
                <div className="overflow-hidden" style={{ height: "150px" }}>
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                    style={{ filter: "saturate(0.92)" }}
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "1rem", color: "#F2EFE7", marginBottom: "0.4rem" }}>
                    {t(p.h1Da, p.h1En)}
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(242,239,231,0.62)", lineHeight: 1.6 }}>
                    {t(p.heroEyebrowDa, p.heroEyebrowEn)}
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
