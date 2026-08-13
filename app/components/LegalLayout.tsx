import type { ReactNode } from "react";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

// Fælles layout til juridiske sider (privatlivspolitik, handelsbetingelser)

export function LegalLayout({ eyebrow, title, updated, children }: {
  eyebrow: string; title: string; updated?: string; children: ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#0F1714" }}>
      <Header siteName="Svaleholm" />
      <main className="flex-1">
        <section
          className="relative overflow-hidden"
          style={{ paddingTop: "clamp(9rem, 20vh, 12rem)", paddingBottom: "clamp(2.5rem, 6vh, 4rem)", borderBottom: "1px solid rgba(242,239,231,0.08)" }}
        >
          <div className="absolute -top-16 -right-16 rounded-full pointer-events-none" style={{ width: 360, height: 360, background: "radial-gradient(circle, rgba(201,169,106,0.12) 0%, transparent 70%)", filter: "blur(26px)" }} />
          <div className="relative z-10 max-w-3xl mx-auto px-6">
            <p className="eyebrow mb-4">{eyebrow}</p>
            <h1 className="heading-hero" style={{ color: "#F2EFE7", fontSize: "clamp(2.4rem, 6vw, 4rem)" }}>{title}</h1>
            {updated && (
              <p className="mt-4" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(242,239,231,0.5)" }}>{updated}</p>
            )}
          </div>
        </section>

        <section className="section-padding-sm" style={{ background: "#0F1714" }}>
          <div className="max-w-3xl mx-auto px-6">{children}</div>
        </section>
      </main>
      <Footer siteName="Svaleholm Roskilde" />
    </div>
  );
}

export function LSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="mb-9">
      <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(1.35rem, 3vw, 1.85rem)", color: "#F2EFE7", marginBottom: "0.9rem" }}>{heading}</h2>
      <div style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,231,0.72)", lineHeight: 1.85, fontSize: "0.975rem" }}>{children}</div>
    </section>
  );
}

export function LP({ children }: { children: ReactNode }) {
  return <p style={{ marginBottom: "1rem" }}>{children}</p>;
}

export function LUL({ items }: { items: string[] }) {
  return (
    <ul style={{ display: "flex", flexDirection: "column", gap: "0.55rem", marginBottom: "1rem" }}>
      {items.map((it) => (
        <li key={it} className="flex items-baseline gap-3">
          <span style={{ color: "#7EA57C", fontSize: "0.7rem", flexShrink: 0 }}>✦</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
