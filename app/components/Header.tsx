import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { href: "/",          label: "Forside" },
  { href: "/om-os",     label: "Om Os" },
  { href: "/tjenester", label: "Tjenester" },
  { href: "/priser",    label: "Priser" },
  { href: "/kontakt",   label: "Kontakt" },
];

interface HeaderProps {
  siteName?: string;
  menuItems?: Array<{ title: string; url: string; children?: Array<{ title: string; url: string }> }>;
}

export function Header({ siteName = "Svaleholm", menuItems = [] }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerBg = isHome
    ? scrolled
      ? "bg-[#1E293B]/95 backdrop-blur-xl border-b border-white/8"
      : "bg-transparent border-b border-transparent"
    : "bg-[#F8F7F4]/92 backdrop-blur-xl border-b border-[#E2E8F0]/60";

  const logoColor = isHome && !scrolled ? "text-white" : "text-[#1E293B]";
  const navColor  = isHome && !scrolled ? "text-white/80 hover:text-white" : "text-[#1E293B]/70 hover:text-[#1E293B]";

  const items = menuItems.length > 0
    ? menuItems.map(m => ({ href: m.url.startsWith("http") ? new URL(m.url).pathname : m.url, label: m.title }))
    : NAV_ITEMS;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className={`transition-colors duration-300 ${logoColor}`}>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 400, letterSpacing: "-0.02em" }}>
            {siteName}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {items.map(item => (
            <Link
              key={item.href}
              to={item.href}
              className={`nav-link text-sm font-medium transition-colors duration-200 ${navColor}`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link to="/kontakt" className="btn-primary" style={{ padding: "0.6rem 1.5rem", fontSize: "0.875rem" }}>
            Book Ophold
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${isHome && !scrolled ? "text-white hover:bg-white/10" : "text-[#1E293B] hover:bg-[#F1F0EC]"}`}
          aria-label="Åbn menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#F8F7F4] border-t border-[#E2E8F0] animate-fade-in-up shadow-xl">
          <nav className="max-w-7xl mx-auto px-6 py-5 space-y-1">
            {items.map(item => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3.5 text-[#1E293B] hover:bg-[#F1F0EC] rounded-lg transition-colors font-medium"
                style={{ fontFamily: "var(--font-body)", fontSize: "1rem" }}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-[#E2E8F0]">
              <Link
                to="/kontakt"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full text-center"
                style={{ padding: "0.875rem 1.5rem" }}
              >
                Book Ophold
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
