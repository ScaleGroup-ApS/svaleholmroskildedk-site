import { Link } from "react-router";

interface FooterProps {
  siteName?: string;
  siteDescription?: string;
}

export function Footer({
  siteName = "Svaleholm Roskilde",
  siteDescription = "Et sted, hvor historien møder nuet. Eksklusivt ophold og fejring ved Roskilde.",
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#1E293B", color: "#F8F7F4" }}>
      {/* Thin brass accent line */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #B89F80 30%, #D4C1A9 50%, #B89F80 70%, transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 400, color: "#F8F7F4", letterSpacing: "-0.02em", textDecoration: "none" }}>
              {siteName}
            </Link>
            <p className="mt-5 leading-relaxed" style={{ color: "rgba(248,247,244,0.6)", maxWidth: "360px", fontSize: "0.9375rem" }}>
              {siteDescription}
            </p>
            <div className="mt-6 flex items-center gap-2" style={{ color: "#B89F80", fontSize: "0.8125rem", letterSpacing: "0.1em" }}>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Svaleholm Allé 1, 4000 Roskilde
            </div>
            <div className="mt-2 flex items-center gap-2" style={{ color: "#B89F80", fontSize: "0.8125rem", letterSpacing: "0.05em" }}>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              hej@svaleholm.dk
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="mb-5" style={{ fontFamily: "var(--font-body)", fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B89F80" }}>
              Navigation
            </h4>
            <ul className="space-y-3">
              <FooterLink to="/"          label="Forside" />
              <FooterLink to="/vaerelser" label="Værelser" />
              <FooterLink to="/om-os"     label="Om Os" />
              <FooterLink to="/tjenester" label="Tjenester" />
              <FooterLink to="/priser"    label="Priser" />
              <FooterLink to="/kontakt"   label="Kontakt" />
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-3 md:col-start-10">
            <h4 className="mb-5" style={{ fontFamily: "var(--font-body)", fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B89F80" }}>
              Praktisk
            </h4>
            <ul className="space-y-3">
              <FooterLink to="/privatlivspolitik"  label="Privatlivspolitik" />
              <FooterLink to="/handelsbetingelser" label="Vilkår & Betingelser" />
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ fontSize: "0.8125rem", color: "rgba(248,247,244,0.4)" }}>
            © {year} {siteName}. Alle rettigheder forbeholdes.
          </p>
          <p style={{ fontSize: "0.75rem", color: "rgba(248,247,244,0.25)" }}>
            Drevet af{" "}
            <a href="https://scaleweb.dk" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(248,247,244,0.4)", textDecoration: "none", transition: "color 0.2s" }}>
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
        style={{ color: "rgba(248,247,244,0.55)", fontSize: "0.9375rem", textDecoration: "none", transition: "color 0.2s ease" }}
        onMouseEnter={e => (e.currentTarget.style.color = "#F8F7F4")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(248,247,244,0.55)")}
      >
        {label}
      </Link>
    </li>
  );
}
