import { motion } from "framer-motion";
import { useT, useLang } from "~/lib/i18n";

// Reusable FAQ section — visible accordion (matches the /inspiration styling)
// paired with FAQPage JSON-LD elsewhere on the page. The Danish text is the
// canonical version used in the JSON-LD, so it stays stable across languages.
export type FaqItem = { qDa: string; qEn: string; aDa: string; aEn: string };

export function FaqSection({
  items,
  eyebrowDa = "Godt at vide",
  eyebrowEn = "Good to know",
  background = "#0B110E",
}: {
  items: FaqItem[];
  eyebrowDa?: string;
  eyebrowEn?: string;
  background?: string;
}) {
  const t = useT();
  const { lang } = useLang();
  const pick = (da: string, en: string) => (lang === "en" ? en : da);

  return (
    <section className="section-padding" style={{ background }}>
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="eyebrow mb-5">{t(eyebrowDa, eyebrowEn)}</p>
          <h2 className="heading-section" style={{ color: "#F2EFE7" }}>
            {t("Ofte stillede ", "Frequently asked ")}
            <span className="accent-italic">{t("spørgsmål", "questions")}</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {items.map((f, i) => (
            <motion.details
              key={f.qDa}
              className="rounded-xl"
              style={{ background: "rgba(242,239,231,0.04)", border: "1px solid rgba(242,239,231,0.12)", padding: "1.15rem 1.4rem" }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
              viewport={{ once: true, margin: "-40px" }}
            >
              <summary style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, color: "#F2EFE7", cursor: "pointer", listStyle: "none" }}>
                {pick(f.qDa, f.qEn)}
              </summary>
              <p className="mt-3" style={{ fontFamily: "var(--font-body)", fontSize: "0.94rem", lineHeight: 1.85, color: "rgba(242,239,231,0.7)" }}>
                {pick(f.aDa, f.aEn)}
              </p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
