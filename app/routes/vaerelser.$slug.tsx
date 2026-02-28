import type { Route } from "./+types/vaerelser.$slug";
import { Link, data } from "react-router";
import { motion } from "framer-motion";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { ROOMS, getRoomBySlug } from "~/lib/rooms";

export function loader({ params }: Route.LoaderArgs) {
  const slug = params.slug ?? "";
  const room = getRoomBySlug(slug);

  if (!room) {
    throw data(null, { status: 404, statusText: "Værelse ikke fundet" });
  }

  return { room };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "Værelse ikke fundet | Svaleholm Roskilde" }];
  return [
    { title: `${data.room.name} – Værelser | Svaleholm Roskilde` },
    {
      name: "description",
      content: `${data.room.name}: ${data.room.shortDescription} Fra ${data.room.priceFrom} pr. nat.`,
    },
  ];
}

export default function VaerelseDetalje({ loaderData }: Route.ComponentProps) {
  const { room } = loaderData;
  const related = ROOMS.filter((candidate) => candidate.slug !== room.slug).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName="Svaleholm" />

      <main className="flex-1 pt-20" style={{ background: "#F8F7F4" }}>
        <section className="relative overflow-hidden" style={{ minHeight: "66vh" }}>
          <img
            src={room.heroImage}
            alt={room.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, rgba(248,247,244,0.88) 0%, rgba(248,247,244,0.78) 45%, rgba(248,247,244,0.5) 100%)",
            }}
          />

          <motion.div
            className="relative max-w-7xl mx-auto px-6 py-18 md:py-24 lg:py-28"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="eyebrow mb-4">{room.tagline}</p>
            <h1 className="heading-hero mb-5" style={{ color: "#1E293B", maxWidth: "12ch" }}>
              {room.name}
            </h1>
            <p
              style={{
                maxWidth: "600px",
                color: "#4B5563",
                lineHeight: 1.8,
                fontSize: "1.05rem",
                marginBottom: "2rem",
              }}
            >
              {room.description}
            </p>

            <div className="flex flex-wrap gap-2.5 mb-8">
              {[room.size, room.bed, room.occupancy].map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1.5 rounded-full text-xs"
                  style={{ background: "rgba(255,255,255,0.8)", color: "#4B5563" }}
                >
                  {chip}
                </span>
              ))}
              <span
                className="px-3 py-1.5 rounded-full text-xs"
                style={{ background: "#E6D9C8", color: "#5E4833", fontWeight: 600 }}
              >
                Fra {room.priceFrom}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/kontakt" className="btn-primary">
                Forespørg på dette værelse
              </Link>
              <Link to="/vaerelser" className="btn-dark">
                Se alle værelser
              </Link>
            </div>
          </motion.div>
        </section>

        <section className="section-padding-sm" style={{ background: "#F8F7F4" }}>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              className="lg:col-span-2 glass rounded-2xl p-7 md:p-9 card-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <p className="eyebrow mb-4">Faciliteter</p>
              <h2 className="heading-sub mb-5" style={{ color: "#1E293B" }}>
                Komfort i detaljen
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="flex items-center gap-2.5 text-sm"
                    style={{ color: "#4B5563" }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: "#B89F80" }}
                    />
                    {amenity}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.aside
              className="glass rounded-2xl p-7 card-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <p className="eyebrow mb-3">Booking</p>
              <h3 className="heading-sub mb-4" style={{ color: "#1E293B" }}>
                Klar til ophold?
              </h3>
              <p style={{ color: "#6B7280", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                Kontakt os for tilgængelighed, ønsker og et skræddersyet tilbud.
              </p>
              <div
                className="rounded-xl px-4 py-3 mb-4"
                style={{ background: "#EFEAE2", color: "#5E4833", fontWeight: 600 }}
              >
                Fra {room.priceFrom} pr. nat
              </div>
              <Link to="/kontakt" className="btn-primary w-full text-center">
                Send forespørgsel
              </Link>
            </motion.aside>
          </div>
        </section>

        <section className="section-padding-sm" style={{ background: "#F1F0EC" }}>
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <p className="eyebrow mb-4">Galleri</p>
              <h2 className="heading-section gradient-text">Placeholder billeder</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {room.gallery.map((src, index) => (
                <motion.div
                  key={src}
                  className="overflow-hidden rounded-2xl card-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  viewport={{ once: true, margin: "-40px" }}
                >
                  <img
                    src={src}
                    alt={`${room.name} billede ${index + 1}`}
                    className="w-full h-full object-cover min-h-[230px] transition-transform duration-500 hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding-sm" style={{ background: "#F8F7F4" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
              <div>
                <p className="eyebrow mb-3">Flere muligheder</p>
                <h2 className="heading-sub" style={{ color: "#1E293B" }}>
                  Udforsk andre værelser
                </h2>
              </div>
              <Link to="/vaerelser" className="btn-dark">
                Se alle værelser
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((item, index) => (
                <motion.article
                  key={item.slug}
                  className="glass rounded-xl overflow-hidden card-shadow card-shadow-hover"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: index * 0.07 }}
                  viewport={{ once: true, margin: "-40px" }}
                >
                  <Link to={`/vaerelser/${item.slug}`} className="block">
                    <img
                      src={item.heroImage}
                      alt={item.name}
                      className="w-full h-44 object-cover"
                    />
                    <div className="p-5">
                      <h3 className="heading-sub mb-2" style={{ color: "#1E293B" }}>
                        {item.name}
                      </h3>
                      <p style={{ color: "#6B7280", fontSize: "0.92rem", lineHeight: 1.7 }}>
                        {item.shortDescription}
                      </p>
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
