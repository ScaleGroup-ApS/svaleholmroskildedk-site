import { Link, useLocation } from "react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useT, useLang } from "~/lib/i18n";

type IconName = "home" | "rooms" | "events" | "prices" | "about" | "contact" | "gallery";

interface NavItem {
  href: string;
  label: string;
  en: string;
  icon: IconName;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/tjenester", label: "Events", en: "Events", icon: "events" },
  { href: "/vaerelser", label: "Ophold", en: "Stay", icon: "rooms" },
  { href: "/galleri", label: "Galleri", en: "Gallery", icon: "gallery" },
  { href: "/kontakt", label: "Kontakt", en: "Contact", icon: "contact" },
];

interface HeaderProps {
  siteName?: string;
  menuItems?: Array<{ title: string; url: string; children?: Array<{ title: string; url: string }> }>;
}

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function iconFor(icon: IconName) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, viewBox: "0 0 24 24" };

  switch (icon) {
    case "home":
      return (
        <svg className="w-4 h-4" {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 11.5l9-7 9 7M5 10.5V20h14v-9.5" />
        </svg>
      );
    case "rooms":
      return (
        <svg className="w-4 h-4" {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h18v8H3V8zm0 8v3m18-3v3M7 8V6h4v2m2-2h4v2" />
        </svg>
      );
    case "events":
      return (
        <svg className="w-4 h-4" {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v4m10-4v4M4 9h16M5 6h14a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1z" />
        </svg>
      );
    case "prices":
      return (
        <svg className="w-4 h-4" {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m5-14H9.75a2.75 2.75 0 100 5.5h4.5a2.75 2.75 0 110 5.5H7" />
        </svg>
      );
    case "about":
      return (
        <svg className="w-4 h-4" {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h.01M10.5 11h1.5v5h1.5M4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z" />
        </svg>
      );
    case "contact":
      return (
        <svg className="w-4 h-4" {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5l8.25 5.25 8.25-5.25M4.5 6h15A1.5 1.5 0 0121 7.5v9A1.5 1.5 0 0119.5 18h-15A1.5 1.5 0 013 16.5v-9A1.5 1.5 0 014.5 6z" />
        </svg>
      );
    case "gallery":
      return (
        <svg className="w-4 h-4" {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zm0 11l5-5 4 4 3-3 4 4M9.5 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
      );
    default:
      return null;
  }
}

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center rounded-full overflow-hidden flex-shrink-0" style={{ border: "1px solid rgba(242,239,231,0.22)" }}>
      {(["da", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          aria-label={l === "da" ? "Skift til dansk" : "Switch to English"}
          style={{
            padding: "0.32rem 0.62rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.64rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 700,
            background: lang === l ? "#C9A96A" : "transparent",
            color: lang === l ? "#0F1714" : "rgba(242,239,231,0.7)",
            border: "none",
            cursor: "pointer",
            transition: "background 0.3s ease, color 0.3s ease",
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Header({ siteName = "Svaleholm", menuItems = [] }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const closeMobileMenu = () => setMobileOpen(false);
  const t = useT();
  const { lang } = useLang();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const items: NavItem[] =
    menuItems.length > 0
      ? menuItems.map((item) => {
          const href = item.url.startsWith("http") ? new URL(item.url).pathname : item.url;
          const match = NAV_ITEMS.find((candidate) => candidate.href === href);
          return {
            href,
            label: item.title,
            en: match?.en ?? item.title,
            icon: match?.icon ?? "events",
          };
        })
      : NAV_ITEMS;

  const opaque = scrolled || mobileOpen;
  const labelOf = (item: NavItem) => (lang === "en" ? item.en : item.label);

  return (
    <>
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: opaque ? "rgba(15,23,20,0.86)" : "transparent",
        backdropFilter: opaque ? "blur(14px)" : "none",
        WebkitBackdropFilter: opaque ? "blur(14px)" : "none",
        borderBottom: `1px solid ${opaque ? "rgba(242,239,231,0.1)" : "transparent"}`,
        boxShadow: scrolled ? "0 12px 34px rgba(0,0,0,0.38)" : "none",
      }}
    >
      {/* Scroll-progress (rød tråd på alle sider) */}
      <motion.div
        className="absolute top-0 left-0 right-0 origin-left"
        style={{
          height: 2,
          scaleX: progress,
          background: "linear-gradient(90deg, #7EA57C, #C9A96A)",
          zIndex: 2,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 h-[88px] flex items-center justify-between gap-4">
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="group flex flex-col justify-center leading-none select-none"
          aria-label={`${siteName} – til forsiden`}
        >
          <motion.div
            className="flex flex-col"
            style={{ filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.45))" }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.7rem, 2.4vw, 2.1rem)",
                fontWeight: 500,
                lineHeight: 1,
                letterSpacing: "0.015em",
                background: "linear-gradient(172deg, #FBF9F3 0%, #EDE5D2 50%, #C9A96A 122%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              Svale
              <span style={{ fontStyle: "italic", fontWeight: 500, color: "#C9A96A", WebkitTextFillColor: "#C9A96A" }}>
                holm
              </span>
            </span>
            <span
              className="flex items-center gap-2 mt-[0.4rem]"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.52rem",
                fontWeight: 600,
                letterSpacing: "0.34em",
                textTransform: "uppercase",
                color: "rgba(201,169,106,0.92)",
                paddingLeft: "0.12em",
              }}
            >
              <span
                aria-hidden
                className="inline-block h-px w-4 group-hover:w-9 transition-all duration-500"
                style={{ background: "linear-gradient(90deg, transparent, #C9A96A)" }}
              />
              Roskilde · Est. 1868
            </span>
          </motion.div>
        </Link>

        <nav className="hidden lg:flex items-center gap-[clamp(1rem,2.2vw,2.1rem)]">
          {items.map((item) => {
            const active = isActivePath(location.pathname, item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className="transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.74rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  color: active ? "#F2EFE7" : "rgba(242,239,231,0.6)",
                  paddingBottom: "0.35rem",
                  borderBottom: `1px solid ${active ? "#C9A96A" : "transparent"}`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F2EFE7")}
                onMouseLeave={(e) => (e.currentTarget.style.color = active ? "#F2EFE7" : "rgba(242,239,231,0.6)")}
              >
                {labelOf(item)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <LangToggle />
        </div>

        <div className="lg:hidden flex items-center gap-3">
          <LangToggle />
          <button
            onClick={() => setMobileOpen((open) => !open)}
            className="p-2 rounded-lg transition-colors"
            style={{ color: "#F2EFE7" }}
            aria-label={t("Åbn menu", "Open menu")}
            aria-expanded={mobileOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="lg:hidden animate-fade-in-up"
          style={{ background: "#0F1714", borderTop: "1px solid rgba(242,239,231,0.1)" }}
        >
          <nav className="max-w-7xl mx-auto px-6 py-5 space-y-1.5">
            {items.map((item) => {
              const active = isActivePath(location.pathname, item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-lg transition-colors"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: active ? "#F2EFE7" : "rgba(242,239,231,0.7)",
                    background: active ? "rgba(242,239,231,0.06)" : "transparent",
                  }}
                >
                  <span
                    className="w-8 h-8 rounded-md flex items-center justify-center"
                    style={{ background: "rgba(201,169,106,0.14)", color: "#C9A96A" }}
                  >
                    {iconFor(item.icon)}
                  </span>
                  {labelOf(item)}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>

    {/* Mobil: fast bund-CTA (skjules når menuen er åben) */}
    {!mobileOpen && (
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40"
        style={{
          background: "rgba(15,23,20,0.92)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderTop: "1px solid rgba(242,239,231,0.12)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="flex items-stretch gap-3 px-4 py-3">
          <a
            href="tel:+4571531379"
            className="flex items-center justify-center gap-2 flex-1 rounded-full"
            style={{
              padding: "0.85rem 1rem", border: "1px solid #C9A96A", color: "#C9A96A",
              fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.16em",
              textTransform: "uppercase", fontWeight: 600, textDecoration: "none",
            }}
            aria-label={t("Ring til Svaleholm", "Call Svaleholm")}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            {t("Ring", "Call")}
          </a>
        </div>
      </div>
    )}
    </>
  );
}
