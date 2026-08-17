import { Link } from "react-router";
import { useT } from "~/lib/i18n";

interface FooterProps {
  siteName?: string;
  siteDescription?: string;
}

const INSTAGRAM_URL = "https://www.instagram.com/svaleholmroskilde/";
const PHONE_DISPLAY = "+45 71 53 13 79";
const PHONE_HREF = "tel:+4571531379";

function InstagramGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Footer({ siteName = "Svaleholm Roskilde", siteDescription }: FooterProps) {
  const t = useT();
  const year = new Date().getFullYear();
  const description =
    siteDescription ??
    t(
      "Fest og overnatning på landet ved Roskilde. Et sted, hvor historien møder nuet i naturnære rammer.",
      "Celebrations and stays in the countryside near Roskilde. A place where history meets the present in natural surroundings."
    );

  return (
    <footer style={{ background: "#0B110E", color: "#F2EFE7" }}>
      {/* Tynd guld-accent (rød tråd) */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #7EA57C 30%, #C9A96A 50%, #7EA57C 70%, transparent)" }} />

      {/* ── Instagram ─────────────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid rgba(242,239,231,0.08)" }}>
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-14">
          <div className="flex flex-col items-center text-center gap-5">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5"
              style={{ color: "#F2EFE7", textDecoration: "none" }}
            >
              <InstagramGlyph size={22} />
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", fontWeight: 400 }}>
                @svaleholmroskilde
              </span>
            </a>
            <p style={{ color: "rgba(242,239,231,0.5)", fontSize: "0.9rem" }}>
              {t("Følg med i hverdagen på gården", "Follow daily life at the farm")}
            </p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "0.85rem 2rem" }}>
              <InstagramGlyph size={16} />
              {t("Følg os", "Follow us")}
            </a>
          </div>
        </div>
      </section>

      {/* ── Main ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" style={{ display: "inline-flex", alignItems: "baseline", gap: "0.6rem", textDecoration: "none" }} aria-label={`${siteName} – til forsiden`}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 300, color: "#F2EFE7", lineHeight: 1 }}>
                Svaleholm
              </span>
              <span style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#C9A96A", lineHeight: 1 }}>
                Gaard
              </span>
            </Link>
            <p className="mt-5 leading-relaxed" style={{ color: "rgba(242,239,231,0.55)", maxWidth: "34ch", fontSize: "0.94rem" }}>
              {description}
            </p>
            <div className="mt-6 flex items-center gap-2" style={{ color: "rgba(242,239,231,0.5)", fontSize: "0.8125rem", letterSpacing: "0.06em" }}>
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Frederiksborgvej 388, 4000 Roskilde
            </div>
            <a href={PHONE_HREF} className="mt-2 flex items-center gap-2" style={{ color: "rgba(242,239,231,0.5)", fontSize: "0.8125rem", letterSpacing: "0.06em", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#C9A96A")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(242,239,231,0.5)")}
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              {PHONE_DISPLAY}
            </a>
            <div className="mt-2 flex items-center gap-2" style={{ color: "rgba(242,239,231,0.5)", fontSize: "0.8125rem", letterSpacing: "0.03em" }}>
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              kontakt@svaleholmroskilde.dk
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="mb-5" style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: "#7EA57C" }}>
              {t("Sider", "Pages")}
            </h4>
            <ul className="space-y-3">
              <FooterLink to="/tjenester" label={t("Events", "Events")} />
              <FooterLink to="/vaerelser" label={t("Ophold", "Stay")} />
              <FooterLink to="/inspiration" label={t("Inspiration", "Inspiration")} />
              <FooterLink to="/galleri"   label={t("Galleri", "Gallery")} />
              <FooterLink to="/kontakt"   label={t("Kontakt", "Contact")} />
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-3 md:col-start-10">
            <h4 className="mb-5" style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: "#7EA57C" }}>
              {t("Praktisk", "Practical")}
            </h4>
            <ul className="space-y-3">
              <FooterLink to="/privatlivspolitik"  label={t("Privatlivspolitik", "Privacy policy")} />
              <FooterLink to="/handelsbetingelser" label={t("Vilkår & betingelser", "Terms & conditions")} />
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(242,239,231,0.07)" }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ fontSize: "0.8125rem", color: "rgba(242,239,231,0.4)" }}>
            © {year} {siteName}. {t("Alle rettigheder forbeholdes.", "All rights reserved.")}
          </p>
          <p style={{ fontSize: "0.75rem", color: "rgba(242,239,231,0.25)" }}>
            {t("Drevet af", "Powered by")}{" "}
            <a href="https://scaleweb.dk" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(242,239,231,0.4)", textDecoration: "none", transition: "color 0.2s" }}>
              Scaleweb
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <li>
      <Link
        to={to}
        style={{ color: "rgba(242,239,231,0.55)", fontSize: "0.94rem", textDecoration: "none", transition: "color 0.2s ease" }}
        onMouseEnter={e => (e.currentTarget.style.color = "#F2EFE7")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(242,239,231,0.55)")}
      >
        {label}
      </Link>
    </li>
  );
}
