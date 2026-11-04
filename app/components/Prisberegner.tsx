import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { useT, useLang } from "~/lib/i18n";

// ── Prisberegner (ophold) ──────────────────────────────────────────────────────

// Priser (nemme at justere ét sted)
// Eksporteret, så fx inspirationssiden kan skrive de samme tal i teksten
// uden at de to steder kan nå at komme ud af trit.
export const ROOM_PRICE_PER_NIGHT = 650;   // pr. værelse pr. nat
export const MAX_ROOMS = 8;                // hotellet har 8 værelser
export const MIN_NIGHTS = 4;               // minimum antal nætter pr. booking
const SHARED_BATHS = 4;                    // 4 fælles bad/brusere til alle værelser

const daDK = new Intl.NumberFormat("da-DK");
const kr = (n: number) => `${daDK.format(n)} kr`;
const daDate = new Intl.DateTimeFormat("da-DK", { day: "numeric", month: "short", year: "numeric" });
const fmtDate = (d: Date) => daDate.format(d);
function addDays(iso: string, n: number): Date {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + n);
  return d;
}

// Farve-tokens (mørkt tema)
const INK = "#F2EFE7";
const INK_DIM = "rgba(242,239,231,0.7)";
const INK_MUTE = "rgba(242,239,231,0.45)";
const LINE = "rgba(242,239,231,0.12)";
const LEAF = "#7EA57C";
const HAY = "#C9A96A";
const INFO_BG = "rgba(126,165,124,0.10)";
const INFO_BORDER = "rgba(126,165,124,0.32)";
const WARN_BG = "rgba(201,169,106,0.10)";
const WARN_BORDER = "rgba(201,169,106,0.34)";
const WARN_TEXT = "#E4CFA0";

// ── Genbrugsdele ──────────────────────────────────────────────────────────────

function Stepper({ label, value, setValue, min, max, hint }: {
  label: string; value: number; setValue: (n: number) => void; min: number; max?: number; hint?: string;
}) {
  const t = useT();
  const clamp = (n: number) => {
    if (Number.isNaN(n)) return min;
    if (n < min) return min;
    if (max !== undefined && n > max) return max;
    return n;
  };
  const step = (delta: number) => setValue(clamp(value + delta));
  return (
    <div>
      <label className="block mb-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 500, color: INK, letterSpacing: "0.02em" }}>
        {label}
        {hint && <span style={{ color: INK_MUTE, fontWeight: 400 }}> · {hint}</span>}
      </label>
      <div className="flex items-center rounded-lg overflow-hidden" style={{ border: `1px solid ${LINE}`, background: "rgba(242,239,231,0.04)" }}>
        <button type="button" onClick={() => step(-1)} aria-label={`${t("Færre", "Fewer")} ${label.toLowerCase()}`} disabled={value <= min}
          className="flex items-center justify-center transition-colors"
          style={{ width: "3rem", height: "3rem", flexShrink: 0, border: "none", cursor: value <= min ? "not-allowed" : "pointer", background: "transparent", color: value <= min ? "rgba(242,239,231,0.3)" : INK, fontSize: "1.4rem", lineHeight: 1 }}>
          −
        </button>
        <input type="number" inputMode="numeric" value={value} min={min} max={max}
          onChange={(e) => setValue(clamp(parseInt(e.target.value, 10)))}
          className="flex-1 text-center"
          style={{ width: "100%", minWidth: 0, border: "none", outline: "none", background: "transparent", fontFamily: "var(--font-body)", fontSize: "1.05rem", fontWeight: 600, color: INK, MozAppearance: "textfield", appearance: "textfield" }} />
        <button type="button" onClick={() => step(1)} aria-label={`${t("Flere", "More")} ${label.toLowerCase()}`} disabled={max !== undefined && value >= max}
          className="flex items-center justify-center transition-colors"
          style={{ width: "3rem", height: "3rem", flexShrink: 0, border: "none", cursor: max !== undefined && value >= max ? "not-allowed" : "pointer", background: "transparent", color: max !== undefined && value >= max ? "rgba(242,239,231,0.3)" : INK, fontSize: "1.4rem", lineHeight: 1 }}>
          +
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, active }: { label: ReactNode; value: number; active: boolean }) {
  return (
    <div className="flex items-center justify-between" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: active ? "rgba(242,239,231,0.9)" : "rgba(242,239,231,0.4)" }}>
      <span>{label}</span>
      <span>{value > 0 ? kr(value) : "—"}</span>
    </div>
  );
}

// Skal på pengebeløbet – blød animation når totalen skifter
function AnimatedTotal({ total }: { total: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span key={total} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}
        style={{ fontFamily: "var(--font-heading)", fontSize: "2.4rem", fontWeight: 400, color: HAY, lineHeight: 1 }}>{kr(total)}</motion.span>
    </AnimatePresence>
  );
}

// Fælles ramme om en beregner (baggrund, glød, overskrift)
function CalculatorShell({ eyebrow, title, titleAccent, intro, children }: {
  eyebrow: string; title: string; titleAccent: string; intro: string; children: ReactNode;
}) {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "#0F1714" }}>
      <div className="absolute -top-20 -left-20 rounded-full pointer-events-none" style={{ width: 340, height: 340, background: "radial-gradient(circle, rgba(201,169,106,0.14) 0%, transparent 70%)", filter: "blur(24px)" }} />
      <div className="absolute -bottom-24 -right-16 rounded-full pointer-events-none" style={{ width: 420, height: 420, background: "radial-gradient(circle, rgba(126,165,124,0.16) 0%, transparent 70%)", filter: "blur(28px)" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div className="text-center mb-9" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} viewport={{ once: true, margin: "-80px" }}>
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h2 className="heading-section" style={{ color: INK }}>{title} <span className="accent-italic">{titleAccent}</span></h2>
          <p style={{ fontFamily: "var(--font-body)", color: INK_DIM, fontSize: "1.0625rem", lineHeight: 1.75, maxWidth: "560px", margin: "1.25rem auto 0" }}>
            {intro}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {children}
        </div>
      </div>
    </section>
  );
}

// ── Beregner 1: Ophold (hotel – ingen tilvalg) ────────────────────────────────

function Toggle({ on, setOn, ariaLabel }: { on: boolean; setOn: (v: boolean) => void; ariaLabel: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={ariaLabel} onClick={() => setOn(!on)}
      className="relative rounded-full transition-colors flex-shrink-0"
      style={{ width: "3.25rem", height: "1.85rem", background: on ? LEAF : "rgba(242,239,231,0.2)", border: "none", cursor: "pointer" }}>
      <span className="absolute rounded-full transition-all"
        style={{ top: "0.235rem", left: on ? "1.65rem" : "0.235rem", width: "1.38rem", height: "1.38rem", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.4)" }} />
    </button>
  );
}

// Alle ophold-felter (værelser, nætter, ankomst + fælles faciliteter) – genbruges
// i både ophold-beregneren og event-beregneren, så funktionaliteten er identisk.
function AccommodationFields({ idPrefix, rooms, setRooms, nights, setNights, arrival, setArrival, todayIso, invalidDate, minNights = 1 }: {
  idPrefix: string; rooms: number; setRooms: (n: number) => void; nights: number; setNights: (n: number) => void;
  arrival: string; setArrival: (s: string) => void; todayIso: string; invalidDate: boolean; minNights?: number;
}) {
  const t = useT();
  const arrivalDate = arrival ? new Date(`${arrival}T00:00:00`) : null;
  const departureDate = arrival ? addDays(arrival, nights) : null;
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Stepper label={t("Værelser", "Rooms")} value={rooms} setValue={setRooms} min={1} max={MAX_ROOMS} hint={`${t("maks.", "max.")} ${MAX_ROOMS}`} />
        <Stepper label={t("Nætter", "Nights")} value={nights} setValue={setNights} min={minNights}
          hint={minNights > 1 ? `${t("min.", "min.")} ${minNights} ${t("nætter", "nights")}` : undefined} />
      </div>
      <div className="mt-5">
        <label htmlFor={`${idPrefix}-arrival`} className="block mb-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 500, color: INK, letterSpacing: "0.02em" }}>{t("Ankomstdato", "Arrival date")} *</label>
        <input id={`${idPrefix}-arrival`} type="date" value={arrival} min={todayIso || undefined} onChange={(e) => setArrival(e.target.value)}
          onClick={(e) => { try { e.currentTarget.showPicker?.(); } catch { /* not supported */ } }} className="w-full rounded-lg"
          style={{ padding: "0.8rem 1rem", border: `1px solid ${invalidDate ? WARN_BORDER : LINE}`, background: "rgba(242,239,231,0.04)", color: INK, fontFamily: "var(--font-body)", fontSize: "1rem", outline: "none", colorScheme: "dark", cursor: "pointer" }} />
        {arrivalDate && departureDate && (
          <p className="mt-2 flex items-center gap-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: INK_DIM }}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={LEAF} strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            {t("Ankomst", "Arrival")} {fmtDate(arrivalDate)} · {t("afrejse", "departure")} {fmtDate(departureDate)}
          </p>
        )}
      </div>
      <p className="mt-5 flex items-center gap-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: INK_DIM }}>
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={LEAF} strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M6 12V7a2 2 0 012-2h1a2 2 0 012 2M4 16v2m16-6v4a2 2 0 01-2 2H6a2 2 0 01-2-2" /></svg>
        {SHARED_BATHS} {t("fælles bad/brusere til alle", "shared baths/showers for all")} {MAX_ROOMS} {t("værelser", "rooms")}
      </p>
      <p className="mt-2 flex items-center gap-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: INK_DIM }}>
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={LEAF} strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 3v7a2 2 0 002 2h0V3m2 0v18M17 3c-1.5 1-2 3-2 5s.5 3 2 4v9" /></svg>
        {t("Fælles køkken og opholdsrum til alle gæster", "Shared kitchen and lounge for all guests")}
      </p>
      <div className="mt-4 flex items-start gap-2.5 rounded-lg px-3.5 py-3" style={{ background: INFO_BG, border: `1px solid ${INFO_BORDER}` }}>
        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke={LEAF} strokeWidth="1.7" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4-2a6 6 0 01-7.743 5.743L11 14H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: INK_DIM, lineHeight: 1.5 }}>
          <strong style={{ color: INK }}>{t("Selvcheck-in ved ankomst.", "Self check-in on arrival.")}</strong> {t("Alt foregår digitalt – du modtager dørkode og praktisk info direkte på mail/sms inden ankomst.", "Everything is digital – you receive a door code and practical info by email/SMS before arrival.")}
        </p>
      </div>
    </>
  );
}

export function PrisberegnerHotelSection() {
  const t = useT();

  const [rooms, setRooms] = useState(1);
  const [nights, setNights] = useState(MIN_NIGHTS);
  const [arrival, setArrival] = useState("");
  const [todayIso, setTodayIso] = useState("");
  useEffect(() => setTodayIso(new Date().toISOString().slice(0, 10)), []);

  const total = rooms * nights * ROOM_PRICE_PER_NIGHT;

  const arrivalDate = arrival ? new Date(`${arrival}T00:00:00`) : null;
  const departureDate = arrival ? addDays(arrival, nights) : null;

  const dateMissing = !arrival;
  const canSend = !dateMissing;

  const params = new URLSearchParams();
  params.set("ophold", "ja");
  params.set("vaerelser", String(rooms));
  params.set("naetter", String(nights));
  if (arrival) params.set("ankomst", arrival);
  params.set("total", String(total));
  const ctaTo = `/kontakt?${params.toString()}`;

  return (
    <CalculatorShell
      eyebrow={t("Prisberegner · Ophold", "Price calculator · Stay")}
      title={t("Beregn dit", "Calculate your")}
      titleAccent={t("ophold", "stay")}
      intro={t("Vælg antal værelser, nætter og ankomst – så får du et vejledende overslag med det samme.", "Choose the number of rooms, nights and arrival – and get a guideline estimate right away.")}
    >
      {/* Form */}
      <div className="lg:col-span-3 rounded-2xl p-7 md:p-9 flex flex-col" style={{ background: "#14201B", border: `1px solid ${LINE}`, boxShadow: "0 24px 60px rgba(0,0,0,0.35)" }}>
        <div className="flex items-center justify-between gap-4 pb-5 mb-6" style={{ borderBottom: `1px solid ${LINE}` }}>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: INK, fontSize: "1.05rem" }}>{t("Overnatning", "Accommodation")}</p>
            <p style={{ fontFamily: "var(--font-body)", color: INK_DIM, fontSize: "0.8125rem" }}>{kr(ROOM_PRICE_PER_NIGHT)} {t("pr. værelse pr. nat", "per room per night")} · {t("maks.", "max.")} {MAX_ROOMS} {t("værelser", "rooms")} · {t("min.", "min.")} {MIN_NIGHTS} {t("nætter", "nights")}</p>
          </div>
        </div>

        <AccommodationFields idPrefix="hotel" rooms={rooms} setRooms={setRooms} nights={nights} setNights={setNights} arrival={arrival} setArrival={setArrival} todayIso={todayIso} invalidDate={dateMissing} minNights={MIN_NIGHTS} />
      </div>

      {/* Overslag */}
      <div className="lg:col-span-2 rounded-2xl p-7 md:p-8 flex flex-col" style={{ background: "rgba(242,239,231,0.04)", border: `1px solid ${LINE}`, backdropFilter: "blur(6px)" }}>
        <p className="eyebrow mb-5">{t("Dit overslag", "Your estimate")}</p>

        <div className="space-y-3 flex-1">
          <SummaryRow label={<>{t("Overnatning", "Accommodation")}<span style={{ color: INK_MUTE }}> · {rooms} × {nights} {nights === 1 ? t("nat", "night") : t("nætter", "nights")}</span></>} value={total} active />
          {arrivalDate && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: INK_MUTE }}>{t("Ankomst", "Arrival")} {fmtDate(arrivalDate)}</p>
          )}
        </div>

        <div className="mt-6 pt-5" style={{ borderTop: `1px solid ${LINE}` }}>
          <div className="flex items-baseline justify-between">
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", letterSpacing: "0.14em", textTransform: "uppercase", color: LEAF }}>{t("I alt", "Total")} <span style={{ textTransform: "none", letterSpacing: "0.02em", color: INK_MUTE }}>· {t("inkl. moms", "incl. VAT")}</span></span>
            <AnimatedTotal total={total} />
          </div>
          <p className="mt-3" style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: INK_MUTE, lineHeight: 1.6 }}>
            {t("Vejledende pris inkl. moms. Kontakt os for et endeligt tilbud.", "Guideline price incl. VAT. Contact us for a final quote.")}
          </p>
          {canSend ? (
            <Link to={ctaTo} className="btn-primary w-full mt-5" style={{ padding: "0.8rem 1.5rem" }}>{t("Send forespørgsel", "Send enquiry")}</Link>
          ) : (
            <>
              <button type="button" disabled aria-disabled="true" className="btn-primary w-full mt-5" style={{ padding: "0.8rem 1.5rem", opacity: 0.4, cursor: "not-allowed", boxShadow: "none" }}>{t("Send forespørgsel", "Send enquiry")}</button>
              <p className="mt-2.5 text-center" style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: INK_DIM }}>{t("Vælg ankomstdato for at fortsætte", "Choose an arrival date to continue")}</p>
            </>
          )}
        </div>
      </div>
    </CalculatorShell>
  );
}

