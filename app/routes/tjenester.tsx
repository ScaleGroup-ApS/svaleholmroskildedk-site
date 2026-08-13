import { Link } from "react-router";
import { motion } from "framer-motion";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { SvaleFlock } from "~/components/Svale";
import { EventPakkeBeregnerSection } from "~/components/Prisberegner";
import { useT } from "~/lib/i18n";

export function meta() {
  return [
    { title: "Events – Svaleholm Roskilde" },
    { name: "description", content: "Fejr livets store øjeblikke i Svaleholms festsal – bryllupper, fester og børnefødselsdage i naturnære rammer tæt på Roskilde." },
  ];
}

export default function Tjenester() {
  const t = useT();

  const EVENTS = [
    {
      title: t("Bryllupper", "Weddings"),
      desc: t(
        "Vores festsal danner en smuk og naturnær ramme om jeres store dag. Med plads til op til 150 gæster og haven lige uden for døren skabes en fejring, familien husker i mange år frem.",
        "Our hall makes a beautiful, nature-close setting for your big day. With room for up to 150 guests and the garden just outside the door, you can create a celebration the family will remember for years to come."
      ),
      capacity: t("Op til 150 gæster", "Up to 150 guests"),
      img: "/images/festsal-fest-1.png",
      includes: [
        t("Festsalen hele dagen", "The hall for the whole day"),
        t("Adgang til haven og de grønne omgivelser", "Access to the garden and green surroundings"),
        t("Plads til op til 150 gæster", "Room for up to 150 guests"),
        t("Mulighed for overnatning i vores værelser", "The option of staying overnight in our rooms"),
        t("Fleksibel opstilling af sal", "Flexible layout of the hall"),
      ],
    },
    {
      title: t("Fester", "Parties"),
      desc: t(
        "Runde fødselsdage, konfirmationer, jubilæer og andre mærkedage fortjener rammer, der matcher anledningen. Festsalen er lys, rummelig og lige til at gøre til jeres egen.",
        "Milestone birthdays, confirmations, anniversaries and other special occasions deserve a setting to match. The hall is bright, spacious and ready to make your own."
      ),
      capacity: t("Op til 150 gæster", "Up to 150 guests"),
      img: "/images/festsal-fest-2.png",
      includes: [
        t("Festsalen til jeres arrangement", "The hall for your event"),
        t("Fri opstilling af borde og stole", "Free arrangement of tables and chairs"),
        t("Køkkenfaciliteter til catering", "Kitchen facilities for catering"),
        t("Grønne udearealer omkring gården", "Green outdoor areas around the farm"),
        t("Overnatning kan tilkøbes", "Overnight stays available as an add-on"),
      ],
    },
    {
      title: t("Børnefødselsdage", "Children's birthdays"),
      desc: t(
        "Fejr de mindste i trygge og naturnære omgivelser. Festsalen og de grønne udearealer giver masser af plads til leg, hygge og gode stunder for både børn og voksne.",
        "Celebrate the little ones in safe, nature-close surroundings. The hall and the green outdoor areas offer plenty of room for play, togetherness and good times for children and grown-ups alike."
      ),
      capacity: t("Familier & børn", "Families & children"),
      img: "/images/gaardsplads.jpg",
      includes: [
        t("Festsal med god plads til leg", "A hall with plenty of room to play"),
        t("Grønne udearealer til udendørs leg", "Green outdoor areas for outdoor play"),
        t("Køkken til kage og forplejning", "A kitchen for cake and refreshments"),
        t("Rolige omgivelser tæt på Roskilde", "Peaceful surroundings close to Roskilde"),
        t("Nem parkering ved gården", "Easy parking at the farm"),
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#0F1714" }}>
      <Header siteName="Svaleholm" />
      <main className="flex-1">

        {/* Page Hero */}
        <section className="relative flex items-end overflow-hidden" style={{ height: "62vh", minHeight: "460px" }}>
          <div className="absolute inset-0" style={{ inset: "-8% 0" }}>
            <img src="/images/festsal-hvid-2.png" alt="Festsalen pyntet i hvidt med draperier og lyskæder" className="w-full h-full object-cover ken-burns" />
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,23,20,0.6) 0%, rgba(15,23,20,0.35) 40%, #0F1714 100%)" }} />
          <SvaleFlock count={2} />
          <motion.div
            className="relative z-10 max-w-7xl mx-auto px-6 w-full"
            style={{ paddingBottom: "clamp(2.5rem, 6vh, 4rem)" }}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow mb-4">{t("Fest & selskaber", "Celebrations & events")}</p>
            <h1 className="heading-hero" style={{ color: "#F2EFE7", fontSize: "clamp(3rem, 8vw, 7rem)" }}>{t("Fejring i festsalen", "Celebrate in the hall")}</h1>
            <p style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,231,0.75)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "52ch", marginTop: "1.5rem" }}>
              {t(
                "Saml dine kære til en uforglemmelig fest – Svaleholm har salen, stedet og de naturnære rammer til at gøre dagen særlig.",
                "Gather your loved ones for an unforgettable celebration – Svaleholm has the hall, the setting and the nature-close surroundings to make the day special."
              )}
            </p>
          </motion.div>
        </section>

        {/* Event-pakke beregner – øverst på siden */}
        <EventPakkeBeregnerSection />

        {/* Events */}
        <section className="section-padding" style={{ background: "#0F1714" }}>
          <div className="max-w-7xl mx-auto px-6 flex flex-col gap-[clamp(4rem,10vh,8rem)]">
            {EVENTS.map((event, i) => (
              <motion.div
                key={event.title}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <div className={`lg:col-span-7 overflow-hidden group ${i % 2 !== 0 ? "lg:order-2" : ""}`} style={{ borderRadius: "2px" }}>
                  <img
                    src={event.img}
                    alt={event.title}
                    className="w-full object-cover transition-transform duration-[1600ms] group-hover:scale-105"
                    style={{ height: "clamp(300px, 46vh, 520px)", filter: "saturate(0.92)" }}
                  />
                </div>
                <div className={`lg:col-span-5 ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                  <p className="eyebrow mb-4">{event.capacity}</p>
                  <h2 className="heading-section mb-6" style={{ color: "#F2EFE7" }}>{event.title}</h2>
                  <p style={{ color: "rgba(242,239,231,0.7)", lineHeight: 1.9, marginBottom: "2rem", maxWidth: "48ch" }}>{event.desc}</p>
                  <ul className="mb-9" style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                    {event.includes.map(item => (
                      <li key={item} className="flex items-baseline gap-3" style={{ fontFamily: "var(--font-body)", color: "rgba(242,239,231,0.78)", fontSize: "0.95rem" }}>
                        <span style={{ color: "#7EA57C", fontSize: "0.7rem" }}>✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to="/kontakt" className="btn-dark">{t("Få et uforpligtende tilbud", "Get a no-obligation quote")}</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
      <Footer siteName="Svaleholm Roskilde" />
    </div>
  );
}
