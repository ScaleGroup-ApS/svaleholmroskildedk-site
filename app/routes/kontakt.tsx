import { Link } from "react-router";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

export function meta() {
  return [
    { title: "Kontakt – Svaleholm Roskilde" },
    { name: "description", content: "Kontakt Svaleholm Roskilde for spørgsmål om ophold, selskaber og events. Vi ser frem til at høre fra dig." },
  ];
}

const TOPICS = [
  { value: "ophold", label: "Forespørgsel på ophold" },
  { value: "selskab", label: "Forespørgsel på selskab/event" },
  { value: "bryllup", label: "Bryllupsforespørgsel" },
  { value: "firma", label: "Firmaforespørgsel" },
  { value: "andet", label: "Andet" },
];

const CONTACT_ITEMS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
      </svg>
    ),
    label: "Adresse",
    value: "Svaleholm Allé 1\n4000 Roskilde, Danmark",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
      </svg>
    ),
    label: "Telefon",
    value: "+45 46 XX XX XX",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
      </svg>
    ),
    label: "E-mail",
    value: "hej@svaleholm.dk",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    label: "Reception",
    value: "Man–Søn: 08:00 – 20:00",
  },
];

export default function Kontakt() {
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", topic: "ophold", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName="Svaleholm" />
      <main className="flex-1 pt-20">

        {/* Page Hero */}
        <section className="section-padding-sm" style={{ background: "#F8F7F4", borderBottom: "1px solid #E2E8F0" }}>
          <motion.div
            className="max-w-3xl mx-auto px-6 text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow mb-4">Vi er Her for Dig</p>
            <h1 className="heading-section gradient-text mb-6">Lad Os Tale Sammen</h1>
            <p style={{ fontFamily: "var(--font-body)", color: "#6B7280", fontSize: "1.0625rem", lineHeight: 1.75 }}>
              Uanset om du vil booke et ophold, planlægge en fejring eller blot stille et spørgsmål – vi svarer hurtigt og personligt.
            </p>
          </motion.div>
        </section>

        {/* Two-col layout */}
        <section className="section-padding" style={{ background: "#F8F7F4" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

              {/* Left: Contact info (45%) */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <h2 className="heading-section gradient-text mb-3">Find Os</h2>
                <p style={{ fontFamily: "var(--font-body)", color: "#6B7280", lineHeight: 1.75, marginBottom: "2.5rem" }}>
                  Vi glæder os til at høre fra dig og hjælpe med at skabe en oplevelse, der passer præcis til dine ønsker og behov.
                </p>

                {/* Contact details */}
                <div className="space-y-5 mb-10">
                  {CONTACT_ITEMS.map(item => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg, #F1F0EC, #E8E5DF)", color: "#B89F80" }}>
                        {item.icon}
                      </div>
                      <div>
                        <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.8125rem", color: "#B89F80", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                          {item.label}
                        </p>
                        <p style={{ fontFamily: "var(--font-body)", color: "#1E293B", lineHeight: 1.5, whiteSpace: "pre-line", fontSize: "0.9375rem" }}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map placeholder */}
                <div className="overflow-hidden rounded-xl" style={{ height: "250px", boxShadow: "0 4px 16px rgba(30,41,59,0.08)", background: "#F1F0EC", position: "relative" }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d35439.42!2d12.0803!3d55.6415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4652e2d22f1c13e1%3A0x4f40b8c3bb0e2c87!2sRoskilde!5e0!3m2!1sda!2sdk!4v1700000000000!5m2!1sda!2sdk"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "sepia(20%) contrast(90%) brightness(105%)" }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Svaleholm Roskilde på kort"
                  />
                </div>
              </motion.div>

              {/* Right: Form (55%) */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <div className="glass rounded-2xl p-8 md:p-10 card-shadow">
                  {submitted ? (
                    <motion.div
                      className="py-10 text-center"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #D4C1A9, #B89F80)" }}>
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="heading-card mb-3" style={{ color: "#1E293B" }}>Tak for din besked!</h3>
                      <p style={{ color: "#6B7280", lineHeight: 1.75, marginBottom: "2rem" }}>
                        Vi har modtaget din henvendelse og vender tilbage inden for 24 timer på hverdage.
                      </p>
                      <button onClick={() => setSubmitted(false)} className="btn-dark" style={{ fontSize: "0.875rem" }}>
                        Send en ny besked
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate>
                      <h3 className="heading-card mb-7" style={{ color: "#1E293B" }}>Send Os En Besked</h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        <div>
                          <label className="block mb-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 500, color: "#4B5563", letterSpacing: "0.03em" }}>
                            Navn *
                          </label>
                          <input
                            type="text"
                            className="input-field"
                            placeholder="Dit fulde navn"
                            required
                            value={formState.name}
                            onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block mb-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 500, color: "#4B5563", letterSpacing: "0.03em" }}>
                            E-mail *
                          </label>
                          <input
                            type="email"
                            className="input-field"
                            placeholder="din@email.dk"
                            required
                            value={formState.email}
                            onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        <div>
                          <label className="block mb-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 500, color: "#4B5563", letterSpacing: "0.03em" }}>
                            Telefon
                          </label>
                          <input
                            type="tel"
                            className="input-field"
                            placeholder="+45 XX XX XX XX"
                            value={formState.phone}
                            onChange={e => setFormState(s => ({ ...s, phone: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block mb-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 500, color: "#4B5563", letterSpacing: "0.03em" }}>
                            Emne *
                          </label>
                          <select
                            className="input-field"
                            required
                            value={formState.topic}
                            onChange={e => setFormState(s => ({ ...s, topic: e.target.value }))}
                            style={{ appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23B89F80' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center", backgroundSize: "1.25rem" }}
                          >
                            {TOPICS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="mb-7">
                        <label className="block mb-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 500, color: "#4B5563", letterSpacing: "0.03em" }}>
                          Besked *
                        </label>
                        <textarea
                          className="input-field"
                          rows={5}
                          placeholder="Fortæl os om dine ønsker og planer..."
                          required
                          value={formState.message}
                          onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                          style={{ resize: "vertical" }}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        className="btn-primary w-full"
                        style={{ fontSize: "1rem", padding: "1rem 2rem" }}
                        whileHover={{ translateY: -3, boxShadow: "0 16px 40px rgba(184, 159, 128, 0.4)" }}
                        whileTap={{ translateY: 0 }}
                      >
                        Send Besked
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      </motion.button>

                      <p className="mt-4 text-center" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "#9CA3AF" }}>
                        Vi svarer indenfor 24 timer på hverdage. Din information behandles fortroligt.
                      </p>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Extra strip */}
        <section style={{ background: "#F1F0EC", borderTop: "1px solid #E2E8F0", padding: "3rem 1.5rem" }}>
          <div className="max-w-7xl mx-auto text-center">
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", color: "#6B7280", fontStyle: "italic" }}>
              "Det er en fornøjelse at lytte til dine drømme og hjælpe med at gøre dem til virkelighed."
            </p>
            <p className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "#B89F80", letterSpacing: "0.1em" }}>
              — Katrine Holst, Medejer
            </p>
          </div>
        </section>

      </main>
      <Footer siteName="Svaleholm Roskilde" />
    </div>
  );
}
