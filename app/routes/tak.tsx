import { Link } from "react-router";
import { motion } from "framer-motion";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { SvaleFlock } from "~/components/Svale";
import { useT } from "~/lib/i18n";

export function meta() {
  return [
    { title: "Tak – Svaleholm Roskilde" },
    { name: "description", content: "Tak for din besked — vi vender tilbage inden for 24 timer på hverdage." },
  ];
}

export default function Tak() {
  const t = useT();
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#0F1714" }}>
      <Header siteName="Svaleholm" />
      <main className="flex-1">
        <section className="relative flex items-end overflow-hidden" style={{ height: "36vh", minHeight: "240px" }}>
          <div className="absolute inset-0" style={{ inset: "-8% 0" }}>
            <img src="/images/have-sti.jpg" alt="Havesti ved Svaleholm" className="w-full h-full object-cover ken-burns" />
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,23,20,0.6) 0%, rgba(15,23,20,0.4) 40%, #0F1714 100%)" }} />
          <SvaleFlock count={2} />
          <motion.div
            className="relative z-10 max-w-4xl mx-auto px-6 w-full py-12"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-hero" style={{ color: "#F2EFE7", fontSize: "clamp(2rem, 4.5vw, 3rem)" }}>
              {t("Tak for din besked!", "Thank you for your message!")}
            </h1>
            <p style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,231,0.75)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "64ch", marginTop: "1rem" }}>
              {t("Vi har modtaget din henvendelse og vender tilbage inden for 24 timer på hverdage.", "We have received your enquiry and will get back to you within 24 hours on weekdays.")}
            </p>
            <div className="mt-8">
              <Link to="/kontakt" className="btn-ghost">
                {t("Tilbage til kontakt", "Back to contact")}
              </Link>
              <Link to="/" className="ml-4 btn-primary">
                {t("Gå til forsiden", "Go to homepage")}
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer siteName="Svaleholm Roskilde" />
    </div>
  );
}
