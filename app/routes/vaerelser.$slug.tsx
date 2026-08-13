import type { Route } from "./+types/vaerelser.$slug";
import { Link, data } from "react-router";
import { motion } from "framer-motion";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { SvaleFlock } from "~/components/Svale";
import { ROOMS, getRoomBySlug } from "~/lib/rooms";
import { useT, useLang } from "~/lib/i18n";

export function loader({ params }: Route.LoaderArgs) {
  const slug = params.slug ?? "";
  const room = getRoomBySlug(slug);

  if (!room) {
    throw data(null, { status: 404, statusText: "Værelse ikke fundet" });
  }

  return { room };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [{ title: "Værelse ikke fundet | Svaleholm Roskilde" }];
  return [
    { title: `${loaderData.room.name} – Værelser | Svaleholm Roskilde` },
    {
      name: "description",
      content: `${loaderData.room.name}: ${loaderData.room.shortDescription} Fra ${loaderData.room.priceFrom} pr. nat.`,
    },
  ];
}

export default function VaerelseDetalje({ loaderData }: Route.ComponentProps) {
  const { room } = loaderData;
  const t = useT();
  const { lang } = useLang();
  const related = ROOMS.filter((candidate) => candidate.slug !== room.slug).slice(0, 3);
  const amenities = lang === "en" ? room.amenities.map((_, i) => room.amenitiesEn[i]) : room.amenities;

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#0F1714" }}>
      <Header siteName="Svaleholm" />

      <main className="flex-1" style={{ background: "#0F1714" }}>
        {/* Hero */}
        <section className="relative flex items-end overflow-hidden" style={{ minHeight: "66vh" }}>
          <div className="absolute inset-0" style={{ inset: "-8% 0" }}>
            <img
              src={room.heroImage}
              alt={room.name}
              className="w-full h-full object-cover ken-burns"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(15,23,20,0.55) 0%, rgba(15,23,20,0.3) 38%, rgba(15,23,20,0.85) 82%, #0F1714 100%)" }}
          />

          <SvaleFlock count={2} />

          <motion.div
            className="relative z-10 max-w-7xl mx-auto px-6 w-full"
            style={{ paddingBottom: "clamp(2.5rem, 7vh, 4.5rem)" }}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="eyebrow mb-4">{lang === "en" ? room.taglineEn : room.tagline}</p>
            <h1 className="heading-hero mb-5" style={{ color: "#F2EFE7", maxWidth: "14ch" }}>
              {room.name}
            </h1>
            <p
              style={{ maxWidth: "600px", color: "rgba(242,239,231,0.8)", lineHeight: 1.85, fontSize: "1.05rem", marginBottom: "2rem" }}
            >
              {lang === "en" ? room.descriptionEn : room.description}
            </p>

            <div className="flex flex-wrap gap-2.5 mb-8">
              {[room.size, room.bed, lang === "en" ? room.occupancyEn : room.occupancy].map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1.5 rounded-full text-xs"
                  style={{ background: "rgba(242,239,231,0.06)", color: "rgba(242,239,231,0.8)", border: "1px solid rgba(242,239,231,0.14)" }}
                >
                  {chip}
                </span>
              ))}
              <span
                className="px-3 py-1.5 rounded-full text-xs"
                style={{ background: "rgba(201,169,106,0.16)", color: "#C9A96A", fontWeight: 600 }}
              >
                {t("Fra", "From")} {room.priceFrom}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/kontakt" className="btn-primary">
                {t("Forespørg på dette værelse", "Enquire about this room")}
              </Link>
              <Link to="/vaerelser" className="btn-ghost">
                {t("Se alle værelser", "See all rooms")}
              </Link>
            </div>
          </motion.div>
        </section>

        <section className="section-padding-sm" style={{ background: "#0F1714" }}>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              className="lg:col-span-2 glass card-shadow p-7 md:p-9"
              style={{ borderRadius: "2px" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <p className="eyebrow mb-4">{t("Faciliteter", "Facilities")}</p>
              <h2 className="heading-sub mb-6" style={{ color: "#F2EFE7" }}>
                {t("Komfort i detaljen", "Comfort in the detail")}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: "rgba(242,239,231,0.78)" }}
                  >
                    <span style={{ color: "#7EA57C", fontSize: "0.7rem" }}>✦</span>
                    {amenity}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.aside
              className="glass card-shadow p-7"
              style={{ borderRadius: "2px" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <p className="eyebrow mb-3">{t("Booking", "Booking")}</p>
              <h3 className="heading-sub mb-4" style={{ color: "#F2EFE7" }}>
                {t("Klar til ophold?", "Ready to stay?")}
              </h3>
              <p style={{ color: "rgba(242,239,231,0.68)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                {t(
                  "Kontakt os for tilgængelighed, ønsker og et skræddersyet tilbud.",
                  "Contact us for availability, wishes and a tailored quote.",
                )}
              </p>
              <div
                className="rounded-xl px-4 py-3 mb-4"
                style={{ background: "rgba(201,169,106,0.12)", color: "#C9A96A", fontWeight: 600, border: "1px solid rgba(242,239,231,0.1)" }}
              >
                {t("Fra", "From")} {room.priceFrom} {t("pr. nat", "per night")}
              </div>
              <Link to="/kontakt" className="btn-primary w-full text-center">
                {t("Send forespørgsel", "Send enquiry")}
              </Link>
            </motion.aside>
          </div>
        </section>

        <section className="section-padding-sm" style={{ background: "#14201B", borderTop: "1px solid rgba(242,239,231,0.08)", borderBottom: "1px solid rgba(242,239,231,0.08)" }}>
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <p className="eyebrow mb-4">{t("Galleri", "Gallery")}</p>
              <h2 className="heading-section" style={{ color: "#F2EFE7" }}>{t("Stedet i billeder", "The place in pictures")}</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {room.gallery.map((src, index) => (
                <motion.div
                  key={src}
                  className="overflow-hidden card-shadow group"
                  style={{ borderRadius: "2px" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  viewport={{ once: true, margin: "-40px" }}
                >
                  <img
                    src={src}
                    alt={`${room.name} billede ${index + 1}`}
                    className="w-full h-full object-cover min-h-[230px] transition-transform duration-[1400ms] group-hover:scale-105"
                    style={{ filter: "saturate(0.92)" }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding-sm" style={{ background: "#0F1714" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
              <div>
                <p className="eyebrow mb-3">{t("Flere muligheder", "More options")}</p>
                <h2 className="heading-sub" style={{ color: "#F2EFE7" }}>
                  {t("Udforsk andre værelser", "Explore other rooms")}
                </h2>
              </div>
              <Link to="/vaerelser" className="btn-dark">
                {t("Se alle værelser", "See all rooms")}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((item, index) => (
                <motion.article
                  key={item.slug}
                  className="glass overflow-hidden card-shadow card-shadow-hover"
                  style={{ borderRadius: "2px" }}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: index * 0.07 }}
                  viewport={{ once: true, margin: "-40px" }}
                >
                  <Link to={`/vaerelser/${item.slug}`} className="block group">
                    <div className="overflow-hidden h-44">
                      <img
                        src={item.heroImage}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                        style={{ filter: "saturate(0.92)" }}
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="heading-sub mb-2" style={{ color: "#F2EFE7" }}>
                        {item.name}
                      </h3>
                      <p style={{ color: "rgba(242,239,231,0.66)", fontSize: "0.92rem", lineHeight: 1.7 }}>
                        {lang === "en" ? item.shortDescriptionEn : item.shortDescription}
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
