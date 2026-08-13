import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { useT, useLang } from "~/lib/i18n";

// ── Prisberegnere (to separate flows: Ophold og Fest) ─────────────────────────

// Priser (nemme at justere ét sted)
const SAL_PRICE = 15000;            // fast pris for festsalen
const ROOM_PRICE_PER_NIGHT = 650;   // pr. værelse pr. nat
const MIN_GUESTS_FESTSAL = 30;      // minimum antal gæster for festsalen
const MAX_GUESTS_FESTSAL = 150;     // festsalen har plads til maks. 150 gæster
const MAX_ROOMS = 8;                // hotellet har 8 værelser
const SHARED_BATHS = 4;             // 4 fælles bad/brusere til alle værelser

// Tilvalg (fx til børnefødselsdage) – hører til fest-beregneren
type Addon = { id: string; label: string; labelEn: string; price: number };
const ADDONS: Addon[] = [
  { id: "hoppeborg",     label: "Hoppeborg",      labelEn: "Bouncy castle", price: 1500 },
  { id: "skattejagt",    label: "Skattejagt",     labelEn: "Treasure hunt", price: 800 },
  { id: "ansigtsmaling", label: "Ansigtsmaling",  labelEn: "Face painting", price: 1200 },
  { id: "ponyridning",   label: "Ponyridning",    labelEn: "Pony rides",    price: 1800 },
  { id: "festtelt",      label: "Festtelt",       labelEn: "Party tent",    price: 2500 },
];

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
function AccommodationFields({ idPrefix, rooms, setRooms, nights, setNights, arrival, setArrival, todayIso, invalidDate }: {
  idPrefix: string; rooms: number; setRooms: (n: number) => void; nights: number; setNights: (n: number) => void;
  arrival: string; setArrival: (s: string) => void; todayIso: string; invalidDate: boolean;
}) {
  const t = useT();
  const arrivalDate = arrival ? new Date(`${arrival}T00:00:00`) : null;
  const departureDate = arrival ? addDays(arrival, nights) : null;
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Stepper label={t("Værelser", "Rooms")} value={rooms} setValue={setRooms} min={1} max={MAX_ROOMS} hint={`${t("maks.", "max.")} ${MAX_ROOMS}`} />
        <Stepper label={t("Nætter", "Nights")} value={nights} setValue={setNights} min={1} />
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
  const [nights, setNights] = useState(1);
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
            <p style={{ fontFamily: "var(--font-body)", color: INK_DIM, fontSize: "0.8125rem" }}>{kr(ROOM_PRICE_PER_NIGHT)} {t("pr. værelse pr. nat", "per room per night")} · {t("maks.", "max.")} {MAX_ROOMS} {t("værelser", "rooms")}</p>
          </div>
        </div>

        <AccommodationFields idPrefix="hotel" rooms={rooms} setRooms={setRooms} nights={nights} setNights={setNights} arrival={arrival} setArrival={setArrival} todayIso={todayIso} invalidDate={dateMissing} />
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

// ── Event-pakker (tidsbaseret) + former ───────────────────────────────────────

type EventType = { id: string; label: string; labelEn: string; icon: string };
const EVENT_TYPES: EventType[] = [
  { id: "bryllup",          label: "Bryllup",          labelEn: "Wedding",             icon: "M12 20l-1.4-1.3C6 14.5 3 11.8 3 8.5 3 6 5 4 7.5 4c1.5 0 2.9.7 3.8 1.9C12.1 4.7 13.5 4 15 4 17.5 4 19.5 6 19.5 8.5c0 3.3-3 6-7.6 10.2L12 20z" },
  { id: "fest",             label: "Fest",             labelEn: "Party",               icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
  { id: "boernefoedselsdag", label: "Børnefødselsdag", labelEn: "Children's birthday",  icon: "M4 20h16M6 20v-6h12v6M6 14a2 2 0 012-2h8a2 2 0 012 2M9 9V7m3 2V7m3 2V7M12 6a1 1 0 100-2 1 1 0 000 2z" },
  { id: "firma",            label: "Firmaevent",       labelEn: "Corporate event",     icon: "M3 8h18v11a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm6 0V6a2 2 0 012-2h2a2 2 0 012 2v2" },
];

type TimePackage = {
  id: string; label: string; labelEn: string; price: number;
  unit: string; unitPlural: string; unitEn: string; unitPluralEn: string;
  min: number; max: number; note: string; noteEn: string;
};
const TIME_PACKAGES: TimePackage[] = [
  { id: "time",    label: "Timepakke",    labelEn: "Hourly package",   price: 1800,  unit: "time",    unitPlural: "timer",     unitEn: "hour",    unitPluralEn: "hours",    min: 3, max: 12, note: "Salen pr. time",   noteEn: "The hall per hour" },
  { id: "aften",   label: "Aftenpakke",   labelEn: "Evening package",  price: 9000,  unit: "aften",   unitPlural: "aftener",   unitEn: "evening", unitPluralEn: "evenings", min: 1, max: 3,  note: "Kl. 17–24",        noteEn: "5 pm–midnight" },
  { id: "heldag",  label: "Heldagspakke", labelEn: "Full-day package", price: 15000, unit: "dag",     unitPlural: "dage",      unitEn: "day",     unitPluralEn: "days",     min: 1, max: 5,  note: "Kl. 9–24",         noteEn: "9 am–midnight" },
  { id: "weekend", label: "Weekendpakke", labelEn: "Weekend package",  price: 26000, unit: "weekend", unitPlural: "weekender", unitEn: "weekend", unitPluralEn: "weekends", min: 1, max: 2,  note: "Fre–søn",          noteEn: "Fri–Sun" },
];

// Tilvalgsprodukter kategoriseret efter event-tema (themes) – med specifikationer
type EventAddon = { id: string; label: string; labelEn: string; price: number; spec: string; specEn: string; themes: string[] };
const EVENT_ADDONS: EventAddon[] = [
  // Bryllup
  { id: "vielsesbue",   label: "Bryllupsbue",         labelEn: "Wedding arch",     price: 3500, spec: "Håndbundet blomsterbue · 2,4 m høj · opsat ved ceremonien",    specEn: "Hand-tied floral arch · 2.4 m tall · set up at the ceremony", themes: ["bryllup"] },
  { id: "champagnetaarn", label: "Champagnetårn",     labelEn: "Champagne tower",  price: 1800, spec: "5 etager · op til 60 glas · inkl. servering",                 specEn: "5 tiers · up to 60 glasses · incl. serving",                  themes: ["bryllup", "fest"] },
  { id: "toastmaster",  label: "Toastmaster-lyd",     labelEn: "Toastmaster sound", price: 2200, spec: "Trådløs mikrofon + headset · lydanlæg til taler",             specEn: "Wireless mic + headset · PA for speeches",                    themes: ["bryllup", "firma"] },
  // Fest
  { id: "festtelt",     label: "Festtelt",            labelEn: "Party tent",       price: 2500, spec: "6×12 m · plads til 80 · sider og gulv inkl.",                specEn: "6×12 m · seats 80 · sides and floor included",                themes: ["fest", "bryllup", "boernefoedselsdag"] },
  { id: "dj",           label: "DJ-pakke",            labelEn: "DJ package",       price: 6500, spec: "Professionel DJ · fuldt lydanlæg · 5 timer",                 specEn: "Professional DJ · full PA · 5 hours",                         themes: ["fest", "bryllup"] },
  { id: "bar",          label: "Bar-pakke",           labelEn: "Bar package",      price: 4500, spec: "Bemandet bar · 3 timer · fadøl, vin & cocktails",           specEn: "Staffed bar · 3 hours · draft beer, wine & cocktails",        themes: ["fest", "bryllup", "firma"] },
  { id: "lys",          label: "Stemningsbelysning",  labelEn: "Ambient lighting", price: 1900, spec: "Lyskæder + spots · opsat i sal og have",                    specEn: "Fairy lights + spots · set up in hall and garden",            themes: ["fest", "bryllup", "firma"] },
  // Børnefødselsdag
  { id: "hoppeborg",    label: "Hoppeborg",           labelEn: "Bouncy castle",    price: 1500, spec: "4×5 m · CE-godkendt · opsætning inkl.",                     specEn: "4×5 m · CE-approved · setup included",                        themes: ["boernefoedselsdag"] },
  { id: "skattejagt",   label: "Skattejagt",          labelEn: "Treasure hunt",    price: 800,  spec: "Tilrettelagt rute i haven · 8–20 børn · ca. 1 time",        specEn: "Planned route in the garden · 8–20 kids · approx. 1 hour",    themes: ["boernefoedselsdag"] },
  { id: "ansigtsmaling", label: "Ansigtsmaling",      labelEn: "Face painting",    price: 1200, spec: "Professionel maler · 2 timer · alle materialer",            specEn: "Professional painter · 2 hours · all materials",              themes: ["boernefoedselsdag"] },
  { id: "ponyridning",  label: "Ponyridning",         labelEn: "Pony rides",       price: 1800, spec: "2 ponyer + hjælper · 2 timer · hjelme inkl.",                specEn: "2 ponies + handler · 2 hours · helmets included",             themes: ["boernefoedselsdag"] },
  // Firmaevent
  { id: "av",           label: "AV-pakke",            labelEn: "AV package",       price: 3000, spec: "Projektor · 3 m lærred · mikrofon & lyd",                   specEn: "Projector · 3 m screen · mic & sound",                        themes: ["firma"] },
  { id: "teambuilding", label: "Teambuilding",        labelEn: "Team building",    price: 5500, spec: "Instruktør-ledet · 2 timer · op til 40 personer",           specEn: "Instructor-led · 2 hours · up to 40 people",                  themes: ["firma"] },
  { id: "forplejning",  label: "Forplejningsstation", labelEn: "Catering station", price: 1500, spec: "Kaffe, te, vand & snacks · hele dagen",                     specEn: "Coffee, tea, water & snacks · all day",                       themes: ["firma", "bryllup"] },
];

// ── Beregner 3: Event-pakker (tidsbaseret) – til Events-siden ──────────────────

export function EventPakkeBeregnerSection() {
  const t = useT();
  const { lang } = useLang();

  const [typeId, setTypeId] = useState(EVENT_TYPES[0].id);
  const [pkgId, setPkgId] = useState("aften");
  const pkg = TIME_PACKAGES.find((p) => p.id === pkgId) ?? TIME_PACKAGES[0];

  const [qty, setQty] = useState(pkg.min);
  const [guests, setGuests] = useState(MIN_GUESTS_FESTSAL);
  const [date, setDate] = useState("");
  const [todayIso, setTodayIso] = useState("");
  useEffect(() => setTodayIso(new Date().toISOString().slice(0, 10)), []);

  // Overnatning kan tilføjes til eventet (oplagt ved heldags- og weekendevents)
  const [hotelOn, setHotelOn] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [nights, setNights] = useState(1);
  const [arrival, setArrival] = useState("");

  const [addonIds, setAddonIds] = useState<string[]>([]);
  const toggleAddon = (id: string) =>
    setAddonIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  // Tilvalg er kategoriseret efter event-tema (typeId)
  const availableAddons = EVENT_ADDONS.filter((a) => a.themes.includes(typeId));
  const selectedAddons = EVENT_ADDONS.filter((a) => addonIds.includes(a.id));

  // Ved skift af tema: behold kun tilvalg, der også findes i det nye tema
  const selectType = (id: string) => {
    setTypeId(id);
    setAddonIds((ids) => ids.filter((aid) => EVENT_ADDONS.find((a) => a.id === aid)?.themes.includes(id)));
  };

  // Ved skift af pakke: sæt antal til pakkens minimum (så det altid er gyldigt)
  const selectPkg = (id: string) => {
    const next = TIME_PACKAGES.find((p) => p.id === id) ?? TIME_PACKAGES[0];
    setPkgId(id);
    setQty(next.min);
    if (id === "weekend") setNights(2);
    else if (id === "heldag") setNights(1);
  };

  const unitLabel = (n: number) =>
    lang === "en" ? (n === 1 ? pkg.unitEn : pkg.unitPluralEn) : (n === 1 ? pkg.unit : pkg.unitPlural);

  const baseTotal = pkg.price * qty;
  const addonsTotal = selectedAddons.reduce((s, a) => s + a.price, 0);
  const roomsTotal = hotelOn ? rooms * nights * ROOM_PRICE_PER_NIGHT : 0;
  const total = baseTotal + addonsTotal + roomsTotal;

  const eventType = EVENT_TYPES.find((e) => e.id === typeId) ?? EVENT_TYPES[0];
  const dateObj = date ? new Date(`${date}T00:00:00`) : null;
  const dateMissing = !date;
  const arrivalMissing = hotelOn && !arrival;
  const canSend = !dateMissing && !arrivalMissing;

  // Overnatning er især relevant ved heldags- og weekendevents
  const overnightRelevant = pkgId === "heldag" || pkgId === "weekend";

  const sendHint = dateMissing
    ? t("Vælg en dato for at fortsætte", "Choose a date to continue")
    : arrivalMissing
      ? t("Vælg ankomstdato for overnatningen", "Choose an arrival date for the stay")
      : "";

  const params = new URLSearchParams();
  params.set("fest", "ja");
  params.set("type", typeId);
  params.set("pakke", pkgId);
  params.set("antal", String(qty));
  params.set("gaester", String(guests));
  if (date) params.set("dato", date);
  if (addonIds.length) params.set("tilvalg", addonIds.join(","));
  if (hotelOn) { params.set("ophold", "ja"); params.set("vaerelser", String(rooms)); params.set("naetter", String(nights)); if (arrival) params.set("ankomst", arrival); }
  params.set("total", String(total));
  const ctaTo = `/kontakt?${params.toString()}`;

  return (
    <CalculatorShell
      eyebrow={t("Prisberegner · Event-pakker", "Price calculator · Event packages")}
      title={t("Byg din", "Build your")}
      titleAccent={t("event", "event")}
      intro={t("Vælg anledning, en tidsbaseret pakke og antal, sæt en dato og tilføj tilvalg – så får du et vejledende overslag med det samme.", "Choose the occasion, a time-based package and quantity, set a date and add extras – and get a guideline estimate right away.")}
    >
      {/* Form */}
      <div className="lg:col-span-3 rounded-2xl p-7 md:p-9 flex flex-col" style={{ background: "#14201B", border: `1px solid ${LINE}`, boxShadow: "0 24px 60px rgba(0,0,0,0.35)" }}>

        {/* Form / anledning */}
        <p className="mb-3" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: INK, fontSize: "0.9rem", letterSpacing: "0.02em" }}>{t("Hvilken slags event?", "What kind of event?")}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {EVENT_TYPES.map((e) => {
            const on = e.id === typeId;
            return (
              <button key={e.id} type="button" onClick={() => selectType(e.id)} aria-pressed={on}
                className="flex flex-col items-center justify-center gap-2 rounded-xl transition-colors"
                style={{ padding: "0.9rem 0.5rem", cursor: "pointer", border: on ? `1px solid ${HAY}` : `1px solid ${LINE}`, background: on ? "rgba(201,169,106,0.12)" : "rgba(242,239,231,0.04)" }}>
                <svg className="w-6 h-6" fill="none" stroke={on ? HAY : INK_DIM} strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={e.icon} /></svg>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, textAlign: "center", lineHeight: 1.25, color: on ? INK : INK_DIM }}>{lang === "en" ? e.labelEn : e.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tidsbaseret pakke */}
        <p className="mt-7 mb-3" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: INK, fontSize: "0.9rem", letterSpacing: "0.02em" }}>{t("Vælg pakke", "Choose package")} <span style={{ color: INK_MUTE, fontWeight: 400 }}>· {t("tidsbaseret", "time-based")}</span></p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {TIME_PACKAGES.map((p) => {
            const on = p.id === pkgId;
            return (
              <button key={p.id} type="button" onClick={() => selectPkg(p.id)} aria-pressed={on}
                className="flex items-center justify-between gap-3 rounded-xl text-left transition-colors"
                style={{ padding: "0.9rem 1rem", cursor: "pointer", border: on ? `1px solid ${HAY}` : `1px solid ${LINE}`, background: on ? "rgba(201,169,106,0.12)" : "rgba(242,239,231,0.04)" }}>
                <span>
                  <span className="block" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 600, color: on ? INK : INK_DIM }}>{lang === "en" ? p.labelEn : p.label}</span>
                  <span className="block" style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: INK_MUTE }}>{lang === "en" ? p.noteEn : p.note}</span>
                </span>
                <span className="whitespace-nowrap" style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 600, color: on ? HAY : INK_DIM }}>{kr(p.price)}<span style={{ color: INK_MUTE, fontWeight: 400 }}>/{lang === "en" ? p.unitEn : p.unit}</span></span>
              </button>
            );
          })}
        </div>

        {/* Antal + gæster */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
          <Stepper label={`${t("Antal", "Quantity")} ${unitLabel(qty)}`} value={qty} setValue={setQty} min={pkg.min} max={pkg.max} hint={`${pkg.min}–${pkg.max}`} />
          <Stepper label={t("Antal gæster", "Number of guests")} value={guests} setValue={setGuests} min={1} max={MAX_GUESTS_FESTSAL} hint={t("maks. 150", "max. 150")} />
        </div>

        {/* Dato */}
        <div className="mt-5">
          <label htmlFor="event-date" className="block mb-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 500, color: INK, letterSpacing: "0.02em" }}>{t("Dato", "Date")} *</label>
          <input id="event-date" type="date" value={date} min={todayIso || undefined} onChange={(e) => setDate(e.target.value)}
            onClick={(e) => { try { e.currentTarget.showPicker?.(); } catch { /* not supported */ } }} className="w-full rounded-lg"
            style={{ padding: "0.8rem 1rem", border: `1px solid ${dateMissing ? WARN_BORDER : LINE}`, background: "rgba(242,239,231,0.04)", color: INK, fontFamily: "var(--font-body)", fontSize: "1rem", outline: "none", colorScheme: "dark", cursor: "pointer" }} />
          {dateObj && (
            <p className="mt-2 flex items-center gap-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: INK_DIM }}>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={LEAF} strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {fmtDate(dateObj)}
            </p>
          )}
        </div>

        {/* Overnatning – kan tilføjes, oplagt ved heldags- og weekendevents */}
        <div className="mt-7 pt-6" style={{ borderTop: `1px solid ${LINE}` }}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: INK, fontSize: "0.9rem" }}>{t("Overnatning", "Accommodation")} <span style={{ color: INK_MUTE, fontWeight: 400 }}>· {kr(ROOM_PRICE_PER_NIGHT)}/{t("nat", "night")}</span></p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: INK_DIM }}>{t("Book værelser til jeres event – oplagt ved heldags- og weekendevents.", "Book rooms for your event – ideal for full-day and weekend events.")}</p>
            </div>
            <Toggle on={hotelOn} setOn={setHotelOn} ariaLabel={t("Tilføj overnatning", "Add accommodation")} />
          </div>

          {overnightRelevant && !hotelOn && (
            <div className="mt-4 flex items-center justify-between gap-3 rounded-lg px-4 py-3" style={{ background: INFO_BG, border: `1px solid ${INFO_BORDER}` }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: INK_DIM }}>{t("Jeres pakke lægger op til overnatning – tilføj op til 8 værelser.", "Your package invites an overnight stay – add up to 8 rooms.")}</p>
              <button type="button" onClick={() => setHotelOn(true)} className="btn-dark" style={{ fontSize: "0.66rem", padding: "0.5rem 0.9rem", whiteSpace: "nowrap" }}>{t("Tilføj", "Add")}</button>
            </div>
          )}

          {hotelOn && (
            <div className="mt-5">
              <AccommodationFields idPrefix="event" rooms={rooms} setRooms={setRooms} nights={nights} setNights={setNights} arrival={arrival} setArrival={setArrival} todayIso={todayIso} invalidDate={arrivalMissing} />
            </div>
          )}
        </div>

        {/* Tilvalgsprodukter – kategoriseret efter valgt tema */}
        <div className="mt-7 pt-6" style={{ borderTop: `1px solid ${LINE}` }}>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: INK, fontSize: "0.9rem" }}>
            {t("Tilvalgsprodukter", "Add-on products")} <span style={{ color: INK_MUTE, fontWeight: 400 }}>· {lang === "en" ? eventType.labelEn : eventType.label}</span>
          </p>
          <p className="mb-4" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: INK_DIM }}>{t("Udvalgt til din anledning – vælg frit til. Specifikationer vises i overslaget.", "Curated for your occasion – add freely. Specifications appear in the estimate.")}</p>
          <div className="flex flex-wrap gap-2.5">
            {availableAddons.map((a) => {
              const on = addonIds.includes(a.id);
              return (
                <button key={a.id} type="button" role="checkbox" aria-checked={on} onClick={() => toggleAddon(a.id)}
                  title={lang === "en" ? a.specEn : a.spec}
                  className="flex items-center gap-2 rounded-full transition-colors"
                  style={{ padding: "0.55rem 1rem", fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 500, cursor: "pointer", border: on ? `1px solid ${LEAF}` : `1px solid ${LINE}`, background: on ? LEAF : "rgba(242,239,231,0.04)", color: on ? "#0F1714" : INK }}>
                  <span aria-hidden style={{ fontSize: "0.9rem", lineHeight: 1, color: on ? "#0F1714" : LEAF }}>{on ? "✓" : "+"}</span>
                  {lang === "en" ? a.labelEn : a.label}
                  <span style={{ color: on ? "rgba(15,23,20,0.7)" : INK_MUTE }}>{kr(a.price)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Overslag */}
      <div className="lg:col-span-2 rounded-2xl p-7 md:p-8 flex flex-col" style={{ background: "rgba(242,239,231,0.04)", border: `1px solid ${LINE}`, backdropFilter: "blur(6px)" }}>
        <p className="eyebrow mb-5">{t("Dit overslag", "Your estimate")}</p>

        <div className="space-y-3 flex-1">
          <div className="flex items-center justify-between" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(242,239,231,0.9)" }}>
            <span>{lang === "en" ? eventType.labelEn : eventType.label}</span>
            <span style={{ color: INK_MUTE }}>{dateObj ? fmtDate(dateObj) : t("vælg dato", "choose date")}</span>
          </div>
          <SummaryRow label={<>{lang === "en" ? pkg.labelEn : pkg.label}<span style={{ color: INK_MUTE }}> · {qty} {unitLabel(qty)}</span></>} value={baseTotal} active />

          {/* Valgte tilvalg med specifikationer */}
          {selectedAddons.length === 0 ? (
            <SummaryRow label={t("Tilvalg", "Add-ons")} value={0} active={false} />
          ) : (
            <div className="pt-1 space-y-3">
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: INK_MUTE }}>{t("Tilvalg", "Add-ons")}</p>
              {selectedAddons.map((a) => (
                <div key={a.id}>
                  <div className="flex items-center justify-between gap-3" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(242,239,231,0.9)" }}>
                    <span>{lang === "en" ? a.labelEn : a.label}</span>
                    <span className="whitespace-nowrap">{kr(a.price)}</span>
                  </div>
                  <p className="flex items-start gap-1.5 mt-1" style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: INK_MUTE, lineHeight: 1.5 }}>
                    <svg className="w-3 h-3 flex-shrink-0" style={{ marginTop: "3px" }} fill="none" stroke={LEAF} strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    {lang === "en" ? a.specEn : a.spec}
                  </p>
                </div>
              ))}
            </div>
          )}
          {hotelOn && (
            <SummaryRow label={<>{t("Overnatning", "Accommodation")}<span style={{ color: INK_MUTE }}> · {rooms} × {nights} {nights === 1 ? t("nat", "night") : t("nætter", "nights")}</span></>} value={roomsTotal} active />
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
              {sendHint && <p className="mt-2.5 text-center" style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: INK_DIM }}>{sendHint}</p>}
            </>
          )}
        </div>
      </div>
    </CalculatorShell>
  );
}

// ── Beregner 2: Fest (festsal + tilvalg) ──────────────────────────────────────

export function PrisberegnerEventSection() {
  const t = useT();
  const { lang } = useLang();

  const [guests, setGuests] = useState(MIN_GUESTS_FESTSAL);
  const [addonIds, setAddonIds] = useState<string[]>([]);
  const toggleAddon = (id: string) =>
    setAddonIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  const festsalOk = guests >= MIN_GUESTS_FESTSAL;
  const salTotal = festsalOk ? SAL_PRICE : 0;
  const addonsTotal = ADDONS.filter((a) => addonIds.includes(a.id)).reduce((s, a) => s + a.price, 0);
  const total = salTotal + addonsTotal;

  const canSend = festsalOk;

  const params = new URLSearchParams();
  params.set("fest", "ja");
  params.set("gaester", String(guests));
  if (addonIds.length) params.set("tilvalg", addonIds.join(","));
  params.set("total", String(total));
  const ctaTo = `/kontakt?${params.toString()}`;

  return (
    <CalculatorShell
      eyebrow={t("Prisberegner · Fest", "Price calculator · Celebration")}
      title={t("Beregn din", "Calculate your")}
      titleAccent={t("fest", "celebration")}
      intro={t("Fast pris på festsalen med plads til op til 150 gæster – tilføj tilvalg og få et vejledende overslag.", "Fixed price for the hall with room for up to 150 guests – add extras and get a guideline estimate.")}
    >
      {/* Form */}
      <div className="lg:col-span-3 rounded-2xl p-7 md:p-9 flex flex-col" style={{ background: "#14201B", border: `1px solid ${LINE}`, boxShadow: "0 24px 60px rgba(0,0,0,0.35)" }}>
        <div className="flex items-center justify-between gap-4 pb-5 mb-6" style={{ borderBottom: `1px solid ${LINE}` }}>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: INK, fontSize: "1.05rem" }}>{t("Fest i festsalen", "Celebration in the hall")}</p>
            <p style={{ fontFamily: "var(--font-body)", color: INK_DIM, fontSize: "0.8125rem" }}>{t("Fast pris", "Fixed price")} {kr(SAL_PRICE)} · {t("min.", "min.")} {MIN_GUESTS_FESTSAL} {t("gæster", "guests")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Stepper label={t("Antal gæster", "Number of guests")} value={guests} setValue={setGuests} min={1} max={MAX_GUESTS_FESTSAL} hint={`${t("min.", "min.")} ${MIN_GUESTS_FESTSAL} · ${t("maks.", "max.")} ${MAX_GUESTS_FESTSAL}`} />
        </div>
        {!festsalOk && (
          <p className="mt-4 rounded-lg px-4 py-3" style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: WARN_TEXT, background: WARN_BG, border: `1px solid ${WARN_BORDER}` }}>
            {t("Festsalen kræver minimum", "The hall requires a minimum of")} {MIN_GUESTS_FESTSAL} {t("gæster.", "guests.")}
          </p>
        )}

        {/* Tilvalg */}
        <div className="mt-7 pt-6" style={{ borderTop: `1px solid ${LINE}` }}>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: INK, fontSize: "1.05rem" }}>{t("Tilvalg", "Add-ons")}</p>
          <p className="mb-4" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: INK_DIM }}>{t("Gør festen større – fx til børnefødselsdage og fester.", "Make the celebration bigger – e.g. for children's birthdays and parties.")}</p>
          <div className="flex flex-wrap gap-2.5">
            {ADDONS.map((a) => {
              const on = addonIds.includes(a.id);
              return (
                <button key={a.id} type="button" role="checkbox" aria-checked={on} onClick={() => toggleAddon(a.id)}
                  className="flex items-center gap-2 rounded-full transition-colors"
                  style={{ padding: "0.55rem 1rem", fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 500, cursor: "pointer", border: on ? `1px solid ${LEAF}` : `1px solid ${LINE}`, background: on ? LEAF : "rgba(242,239,231,0.04)", color: on ? "#0F1714" : INK }}>
                  <span aria-hidden style={{ fontSize: "0.9rem", lineHeight: 1, color: on ? "#0F1714" : LEAF }}>{on ? "✓" : "+"}</span>
                  {lang === "en" ? a.labelEn : a.label}
                  <span style={{ color: on ? "rgba(15,23,20,0.7)" : INK_MUTE }}>{kr(a.price)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Overslag */}
      <div className="lg:col-span-2 rounded-2xl p-7 md:p-8 flex flex-col" style={{ background: "rgba(242,239,231,0.04)", border: `1px solid ${LINE}`, backdropFilter: "blur(6px)" }}>
        <p className="eyebrow mb-5">{t("Dit overslag", "Your estimate")}</p>

        <div className="space-y-3 flex-1">
          <SummaryRow label={<>{t("Festsal", "Hall")}<span style={{ color: INK_MUTE }}> · {guests} {t("gæster", "guests")}</span></>} value={salTotal} active={festsalOk} />
          <SummaryRow label={<>{t("Tilvalg", "Add-ons")}{addonIds.length > 0 && <span style={{ color: INK_MUTE }}> · {addonIds.length} {t("valgt", "selected")}</span>}</>} value={addonsTotal} active={addonIds.length > 0} />
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
              <p className="mt-2.5 text-center" style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: INK_DIM }}>{`${t("Festsalen kræver minimum", "The hall requires a minimum of")} ${MIN_GUESTS_FESTSAL} ${t("gæster", "guests")}`}</p>
            </>
          )}
        </div>
      </div>
    </CalculatorShell>
  );
}
