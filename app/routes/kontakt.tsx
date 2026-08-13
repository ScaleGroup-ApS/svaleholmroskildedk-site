import type { Route } from "./+types/kontakt";
import { Form, Link, useActionData, useNavigation, useSearchParams, redirect } from "react-router";
import { motion } from "framer-motion";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { SvaleFlock } from "~/components/Svale";
import { useT, useLang } from "~/lib/i18n";
import { sendContactEmail } from "~/lib/mailer.server";

export function meta() {
  return [
    { title: "Kontakt – Svaleholm Roskilde" },
    { name: "description", content: "Kontakt Svaleholm Roskilde for spørgsmål om ophold, selskaber og events. Vi ser frem til at høre fra dig." },
  ];
}

const SHOW_FORM = true; // Set to false to hide the contact form

// Felter der kan komme med fra prisberegneren (via query-string).
const ENQUIRY_FIELDS: { key: string; da: string; en: string }[] = [
  { key: "ophold",    da: "Ophold",                        en: "Stay" },
  { key: "vaerelser", da: "Værelser",                      en: "Rooms" },
  { key: "naetter",   da: "Nætter",                        en: "Nights" },
  { key: "ankomst",   da: "Ankomst",                       en: "Arrival" },
  { key: "fest",      da: "Fest / event",                  en: "Celebration / event" },
  { key: "type",      da: "Type",                          en: "Type" },
  { key: "pakke",     da: "Pakke",                         en: "Package" },
  { key: "antal",     da: "Antal",                         en: "Quantity" },
  { key: "gaester",   da: "Gæster",                        en: "Guests" },
  { key: "dato",      da: "Dato",                          en: "Date" },
  { key: "tilvalg",   da: "Tilvalg",                       en: "Add-ons" },
  { key: "total",     da: "Vejledende total (inkl. moms)", en: "Guideline total (incl. VAT)" },
];

function fmtVal(key: string, raw: string): string {
  if (raw === "ja") return "Ja";
  if (key === "total") return `${new Intl.NumberFormat("da-DK").format(Number(raw) || 0)} kr`;
  if (key === "tilvalg") return raw.split(",").join(", ");
  return raw;
}

// ── Server action: sender henvendelsen som e-mail ─────────────────────────────
export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const name = String(form.get("name") ?? "").trim();
  const phone = String(form.get("phone") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();

  if (!name || !phone) {
    return { ok: false as const, error: "validation" };
  }

  const enquiry = ENQUIRY_FIELDS
    .map((f) => {
      const v = form.get(f.key);
      return v ? { label: f.da, value: fmtVal(f.key, String(v)) } : null;
    })
    .filter((x): x is { label: string; value: string } => x !== null);

  const result = await sendContactEmail({
    name,
    phone,
    email: email || undefined,
    message: message || undefined,
    enquiry,
  });

  if (result.ok) {
    return redirect('/tak');
  }

  return { ok: false as const, error: result.error };
}

export default function Kontakt() {
  const t = useT();
  const { lang } = useLang();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const sending = navigation.state === "submitting";
  const [searchParams] = useSearchParams();

  const success = actionData?.ok === true;
  const validationError = actionData && !actionData.ok && actionData.error === "validation";
  const sendError = actionData && !actionData.ok && actionData.error !== "validation";

  // Beregner-felter fra URL'en (fx /kontakt?ophold=ja&vaerelser=2&total=1300)
  const enquiryRows = ENQUIRY_FIELDS
    .map((f) => {
      const raw = searchParams.get(f.key);
      return raw ? { key: f.key, raw, label: lang === "en" ? f.en : f.da, value: fmtVal(f.key, raw) } : null;
    })
    .filter((x): x is { key: string; raw: string; label: string; value: string } => x !== null);

  const CONTACT_ITEMS = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
        </svg>
      ),
      label: t("Adresse", "Address"),
      value: t("Frederiksborgvej 388\n4000 Roskilde, Danmark", "Frederiksborgvej 388\n4000 Roskilde, Denmark"),
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
        </svg>
      ),
      label: t("Telefon", "Phone"),
      value: "71 53 13 79",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
        </svg>
      ),
      label: t("E-mail", "E-mail"),
      value: "kontakt@svaleholmroskilde.dk",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#0F1714" }}>
      <Header siteName="Svaleholm" />
      <main className="flex-1">

        {/* Page Hero */}
        <section className="relative flex items-end overflow-hidden" style={{ height: "48vh", minHeight: "360px" }}>
          <div className="absolute inset-0" style={{ inset: "-8% 0" }}>
            <img src="/images/have-sti.jpg" alt="Havesti ved Svaleholm" className="w-full h-full object-cover ken-burns" />
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,23,20,0.6) 0%, rgba(15,23,20,0.4) 40%, #0F1714 100%)" }} />
          <SvaleFlock count={2} />
          <motion.div
            className="relative z-10 max-w-7xl mx-auto px-6 w-full"
            style={{ paddingBottom: "clamp(2.5rem, 6vh, 4rem)" }}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow mb-4">{t("Vi er her for dig", "We're here for you")}</p>
            <h1 className="heading-hero" style={{ color: "#F2EFE7", fontSize: "clamp(2.8rem, 7vw, 6rem)" }}>
              {t("Lad os", "Let's")} <span className="accent-italic">{t("tale sammen", "talk")}</span>
            </h1>
            <p style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,231,0.75)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "54ch", marginTop: "1.5rem" }}>
              {t("Uanset om du vil booke et ophold, planlægge en fejring eller blot stille et spørgsmål – vi svarer hurtigt og personligt.", "Whether you want to book a stay, plan a celebration or simply ask a question – we reply quickly and personally.")}
            </p>
          </motion.div>
        </section>

        {/* Two-col layout */}
        <section className="section-padding" style={{ background: "#0F1714" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

              {/* Left: Contact info */}
              <motion.div
                className={SHOW_FORM ? "lg:col-span-2" : "lg:col-span-5 max-w-2xl"}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <h2 className="heading-section mb-3" style={{ color: "#F2EFE7" }}>{t("Find os", "Find us")}</h2>
                <p style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,231,0.7)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
                  {t("Vi glæder os til at høre fra dig og hjælpe med at skabe en oplevelse, der passer præcis til dine ønsker og behov.", "We look forward to hearing from you and helping to create an experience tailored precisely to your wishes and needs.")}
                </p>

                <div className="space-y-5 mb-10">
                  {CONTACT_ITEMS.map(item => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-lg" style={{ background: "rgba(201,169,106,0.12)", color: "#C9A96A", border: "1px solid rgba(242,239,231,0.1)" }}>
                        {item.icon}
                      </div>
                      <div>
                        <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.66rem", color: "#7EA57C", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                          {item.label}
                        </p>
                        <p style={{ fontFamily: "var(--font-body)", color: "#F2EFE7", lineHeight: 1.55, whiteSpace: "pre-line", fontSize: "0.95rem" }}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map */}
                <div className="overflow-hidden" style={{ height: "250px", borderRadius: "2px", border: "1px solid rgba(242,239,231,0.12)", position: "relative" }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d35439.42!2d12.0803!3d55.6415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4652e2d22f1c13e1%3A0x4f40b8c3bb0e2c87!2sRoskilde!5e0!3m2!1sda!2sdk!4v1700000000000!5m2!1sda!2sdk"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "grayscale(0.35) contrast(0.9) brightness(0.85)" }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={t("Svaleholm Roskilde på kort", "Svaleholm Roskilde on the map")}
                  />
                </div>
              </motion.div>

              {/* Right: Form */}
              {SHOW_FORM && (
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <div className="glass card-shadow p-8 md:p-10" style={{ borderRadius: "2px" }}>
                  {success ? (
                    <motion.div
                      className="py-10 text-center"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #C9A96A, #7EA57C)" }}>
                        <svg className="w-8 h-8" style={{ color: "#0F1714" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="heading-card mb-3" style={{ color: "#F2EFE7" }}>{t("Tak for din besked!", "Thank you for your message!")}</h3>
                      <p style={{ color: "rgba(242,239,231,0.7)", lineHeight: 1.8, marginBottom: "2rem" }}>
                        {t("Vi har modtaget din henvendelse og vender tilbage inden for 24 timer på hverdage.", "We have received your enquiry and will get back to you within 24 hours on weekdays.")}
                      </p>
                      <Link to="/kontakt" className="btn-dark">
                        {t("Send en ny besked", "Send another message")}
                      </Link>
                    </motion.div>
                  ) : (
                    <Form method="post">
                      <h3 className="heading-card mb-7" style={{ color: "#F2EFE7" }}>{t("Send os en besked", "Send us a message")}</h3>

                      {/* Opsummering fra prisberegner */}
                      {enquiryRows.length > 0 && (
                        <div className="mb-7 rounded-lg p-5" style={{ background: "rgba(126,165,124,0.10)", border: "1px solid rgba(126,165,124,0.32)" }}>
                          <p className="mb-3" style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", fontWeight: 600, color: "#7EA57C", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                            {t("Din forespørgsel", "Your enquiry")}
                          </p>
                          <div className="space-y-1.5">
                            {enquiryRows.map((r) => (
                              <div key={r.key} className="flex items-baseline justify-between gap-4" style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem" }}>
                                <span style={{ color: "rgba(242,239,231,0.6)" }}>{r.label}</span>
                                <span style={{ color: "#F2EFE7", fontWeight: 500, textAlign: "right" }}>{r.value}</span>
                              </div>
                            ))}
                          </div>
                          {/* Sendes med i formularen */}
                          {enquiryRows.map((r) => (
                            <input key={r.key} type="hidden" name={r.key} value={r.raw} />
                          ))}
                        </div>
                      )}

                      {/* Fejl-banner ved sendefejl / manglende opsætning */}
                      {sendError && (
                        <div className="mb-6 rounded-lg p-4" style={{ background: "rgba(201,169,106,0.10)", border: "1px solid rgba(201,169,106,0.34)" }}>
                          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "#E4CFA0", lineHeight: 1.6 }}>
                            {t(
                              "Vi kunne ikke sende beskeden automatisk lige nu. Ring til os på 71 53 13 79 eller skriv til ",
                              "We couldn't send your message automatically right now. Please call us on +45 71 53 13 79 or write to "
                            )}
                            <a href="mailto:kontakt@svaleholmroskilde.dk" style={{ color: "#C9A96A", textDecoration: "underline" }}>kontakt@svaleholmroskilde.dk</a>.
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        <div>
                          <label htmlFor="cf-name" className="block mb-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", fontWeight: 500, color: "#7EA57C", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                            {t("Navn", "Name")} *
                          </label>
                          <input id="cf-name" name="name" type="text" className="input-field" placeholder={t("Dit fulde navn", "Your full name")} required autoComplete="name" />
                        </div>
                        <div>
                          <label htmlFor="cf-phone" className="block mb-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", fontWeight: 500, color: "#7EA57C", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                            {t("Nummer", "Number")} *
                          </label>
                          <input id="cf-phone" name="phone" type="tel" className="input-field" placeholder="+45 XX XX XX XX" required autoComplete="tel" />
                        </div>
                      </div>

                      <div className="mb-5">
                        <label htmlFor="cf-email" className="block mb-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", fontWeight: 500, color: "#7EA57C", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                          {t("E-mail", "E-mail")}
                        </label>
                        <input id="cf-email" name="email" type="email" className="input-field" placeholder={t("Så vi kan svare på mail", "So we can reply by e-mail")} autoComplete="email" />
                      </div>

                      <div className="mb-7">
                        <label htmlFor="cf-message" className="block mb-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", fontWeight: 500, color: "#7EA57C", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                          {t("Besked", "Message")}
                        </label>
                        <textarea id="cf-message" name="message" className="input-field" rows={5} placeholder={t("Fortæl os om dine ønsker og planer...", "Tell us about your wishes and plans...")} style={{ resize: "vertical" }} />
                      </div>

                      {validationError && (
                        <p className="mb-4" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "#E4CFA0" }}>
                          {t("Udfyld venligst navn og telefonnummer.", "Please fill in your name and phone number.")}
                        </p>
                      )}

                      <motion.button
                        type="submit"
                        disabled={sending}
                        className="btn-primary w-full"
                        style={sending ? { opacity: 0.6, cursor: "wait" } : undefined}
                        whileHover={sending ? undefined : { translateY: -3 }}
                        whileTap={sending ? undefined : { translateY: 0 }}
                      >
                        {sending ? t("Sender...", "Sending...") : t("Send Besked", "Send message")}
                      </motion.button>

                      <p className="mt-4 text-center" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "rgba(242,239,231,0.4)" }}>
                        {t("Vi svarer indenfor 24 timer på hverdage. Din information behandles fortroligt.", "We reply within 24 hours on weekdays. Your information is treated confidentially.")}
                      </p>
                    </Form>
                  )}
                </div>
              </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Extra strip */}
        <section style={{ background: "#14201B", borderTop: "1px solid rgba(242,239,231,0.08)", padding: "clamp(3rem, 8vh, 5rem) 1.5rem" }}>
          <div className="max-w-3xl mx-auto text-center">
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#F2EFE7", fontStyle: "italic", lineHeight: 1.5 }}>
              {t("\"Det er en fornøjelse at lytte til dine drømme og hjælpe med at gøre dem til virkelighed.\"", "\"It is a pleasure to listen to your dreams and help make them come true.\"")}
            </p>
            <p className="mt-4 eyebrow">
              {t("— team Svaleholm Roskilde", "— team Svaleholm Roskilde")}
            </p>
          </div>
        </section>

      </main>
      <Footer siteName="Svaleholm Roskilde" />
    </div>
  );
}
