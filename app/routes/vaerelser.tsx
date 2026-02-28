import { Link } from "react-router";
import { motion } from "framer-motion";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { ROOMS } from "~/lib/rooms";

export function meta() {
  return [
    { title: "Værelser – Svaleholm Roskilde" },
    {
      name: "description",
      content:
        "Udforsk alle vores værelser og suiter. Hvert rum har sin egen stemning, planløsning og detaljer.",
    },
  ];
}

export default function Vaerelser() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName="Svaleholm" />
      <main className="flex-1 pt-20">
        <section
          className="relative overflow-hidden section-padding-sm"
          style={{ background: "#F8F7F4" }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-24 -left-20 w-80 h-80 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(212,193,169,0.25) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />
            <div
              className="absolute -bottom-20 right-0 w-96 h-96 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(184,159,128,0.18) 0%, transparent 68%)",
                filter: "blur(28px)",
              }}
            />
          </div>

          <motion.div
            className="relative max-w-3xl mx-auto px-6 text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow mb-4">Svaleholm Roskilde</p>
            <h1 className="heading-section gradient-text mb-6">Vores Værelser</h1>
            <p
              style={{
                color: "#6B7280",
                fontSize: "1.03rem",
                lineHeight: 1.8,
                maxWidth: "560px",
                margin: "0 auto",
              }}
            >
              Otte unikke rum med hver sin identitet. Fra intime værelser til
              vores største suite.
            </p>
          </motion.div>
        </section>

        <section className="section-padding" style={{ background: "#F8F7F4" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {ROOMS.map((room, index) => (
                <motion.article
                  key={room.slug}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: (index % 2) * 0.08 }}
                  viewport={{ once: true, margin: "-70px" }}
                  className="glass rounded-2xl overflow-hidden card-shadow card-shadow-hover"
                >
                  <Link to={`/vaerelser/${room.slug}`} className="block">
                    <div className="overflow-hidden" style={{ height: "260px" }}>
                      <img
                        src={room.heroImage}
                        alt={room.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    <div className="p-7">
                      <p className="eyebrow mb-3">{room.tagline}</p>
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h2 className="heading-card" style={{ color: "#1E293B" }}>
                          {room.name}
                        </h2>
                        <span
                          className="px-2.5 py-1 rounded text-xs"
                          style={{
                            background: "#EFEAE2",
                            color: "#7C644A",
                            fontWeight: 600,
                          }}
                        >
                          Fra {room.priceFrom}
                        </span>
                      </div>

                      <p
                        style={{
                          color: "#6B7280",
                          lineHeight: 1.75,
                          fontSize: "0.95rem",
                          marginBottom: "1.25rem",
                        }}
                      >
                        {room.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {[room.size, room.bed, room.occupancy].map((chip) => (
                          <span
                            key={chip}
                            className="px-2.5 py-1 rounded text-xs"
                            style={{ background: "#F1F0EC", color: "#4B5563" }}
                          >
                            {chip}
                          </span>
                        ))}
                      </div>

                      <span className="btn-dark" style={{ fontSize: "0.875rem", padding: "0.68rem 1.35rem" }}>
                        Se Værelse
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer siteName="Svaleholm Roskilde" />
    </div>
  );
}
