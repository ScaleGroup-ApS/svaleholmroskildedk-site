import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";

type IconName = "home" | "rooms" | "events" | "prices" | "about" | "contact";

interface NavItem {
  href: string;
  label: string;
  icon: IconName;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Forside", icon: "home" },
  { href: "/vaerelser", label: "Værelser", icon: "rooms" },
  { href: "/tjenester", label: "Events", icon: "events" },
  { href: "/priser", label: "Priser", icon: "prices" },
  { href: "/om-os", label: "Om Os", icon: "about" },
  { href: "/kontakt", label: "Kontakt", icon: "contact" },
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
    default:
      return null;
  }
}

export function Header({ siteName = "Svaleholm", menuItems = [] }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
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
            icon: match?.icon ?? "events",
          };
        })
      : NAV_ITEMS;

  const headerBg = scrolled
    ? "bg-[#F8F7F4]/96 border-b border-[#E2E8F0]/80 backdrop-blur-xl shadow-[0_6px_24px_rgba(15,23,42,0.08)]"
    : "bg-[#F8F7F4]/88 border-b border-[#E2E8F0]/65 backdrop-blur-lg";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        <Link to="/" className="text-[#1E293B] transition-colors duration-300">
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.5rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            {siteName}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2 rounded-full p-1.5" style={{ background: "rgba(255,255,255,0.72)" }}>
          {items.map((item) => {
            const active = isActivePath(location.pathname, item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`nav-link rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "text-[#1E293B] bg-white shadow-[0_2px_10px_rgba(15,23,42,0.08)]"
                    : "text-[#475569] hover:text-[#1E293B] hover:bg-white/90"
                }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link to="/kontakt" className="btn-primary" style={{ padding: "0.6rem 1.4rem", fontSize: "0.875rem" }}>
            Book Ophold
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen((open) => !open)}
          className="md:hidden p-2 rounded-lg text-[#1E293B] hover:bg-white/80 transition-colors"
          aria-label="Åbn menu"
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

      {mobileOpen && (
        <div className="md:hidden bg-[#F8F7F4] border-t border-[#E2E8F0] animate-fade-in-up shadow-xl">
          <nav className="max-w-7xl mx-auto px-6 py-5 space-y-1.5">
            {items.map((item) => {
              const active = isActivePath(location.pathname, item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-lg transition-colors font-medium ${
                    active ? "bg-white text-[#1E293B]" : "text-[#334155] hover:bg-[#F1F0EC]"
                  }`}
                  style={{ fontFamily: "var(--font-body)", fontSize: "1rem" }}
                >
                  <span
                    className="w-8 h-8 rounded-md flex items-center justify-center"
                    style={{ background: active ? "#EFEAE2" : "#F1F0EC", color: "#7C644A" }}
                  >
                    {iconFor(item.icon)}
                  </span>
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-[#E2E8F0]">
              <Link to="/kontakt" className="btn-primary w-full text-center" style={{ padding: "0.875rem 1.5rem" }}>
                Book Ophold
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
