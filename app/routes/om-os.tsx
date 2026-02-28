import type { Route } from "./+types/om-os";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { getPageBySlug, getSiteInfo } from "~/lib/wp-api";
import { buildMeta, buildPageJsonLd, getFeaturedImageUrl, stripHtml } from "~/lib/seo";
import { JsonLd } from "~/components/JsonLd";

export async function loader({ request }: Route.LoaderArgs) {
  const siteUrl = new URL(request.url).origin;
  const [page, siteInfo] = await Promise.all([
    getPageBySlug("om-os").catch(() => null),
    getSiteInfo().catch(() => null),
  ]);
  return { page, siteInfo, siteUrl };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "Om Os | Svaleholm Roskilde" }];
  const { siteInfo, page, siteUrl } = data;
  const siteName = siteInfo?.name ?? "Svaleholm Roskilde";
  const title = `Vores Historie | ${siteName}`;
  const description = page?.excerpt?.rendered
    ? stripHtml(page.excerpt.rendered)
    : "Lær historien bag Svaleholm Roskilde at kende. En passioneret vision om at bevare det bedste fra fortiden og forene det med nutidens luksus.";
  return [
    ...buildMeta({
      title,
      description,
      url: `${siteUrl}/om-os`,
      siteName,
      siteUrl,
      type: "website",
      image: page ? getFeaturedImageUrl(page) : undefined,
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/om-os` },
  ];
}

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  viewport: { once: true, margin: "-80px" },
};

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80&auto=format&fit=crop", alt: "Svaleholms facade", span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop", alt: "Historisk dør detalje", span: "" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&auto=format&fit=crop", alt: "Haven", span: "" },
  { src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80&auto=format&fit=crop", alt: "Naturen ved Svaleholm", span: "col-span-2" },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&auto=format&fit=crop", alt: "Det omkringliggende landskab", span: "" },
];

export default function OmOs({ loaderData }: Route.ComponentProps) {
  const { page, siteInfo, siteUrl } = loaderData;
  const siteName = siteInfo?.name ?? "Svaleholm Roskilde";
  return (
    <div className="flex flex-col min-h-screen">
      {page && <JsonLd data={buildPageJsonLd({ page, siteInfo, siteUrl })} />}
      <Header siteName={siteName} />
      <main className="flex-1 pt-20">

        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: "#1E293B", padding: "5rem 1.5rem 6rem" }}>
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=60&auto=format&fit=crop"
              alt=""
              aria-hidden
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, #1E293B 100%)" }} />
          </div>
          <motion.div
            className="relative z-10 max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow mb-5">Vores Fortælling</p>
            <h1 className="heading-section text-white mb-6">Vores Historie</h1>
            <p style={{ fontFamily: "var(--font-body)", color: "rgba(248,247,244,0.65)", fontSize: "1.0625rem", lineHeight: 1.75, maxWidth: "560px", margin: "0 auto" }}>
              Fra et forfaldent herregårdsanlæg til et af Danmarks mest eftertragtede oplevelsesdestinationer – historien om Svaleholm er en fortælling om kærlighed til sted, håndværk og mennesker.
            </p>
          </motion.div>
        </section>

        {/* Manifest */}
        <section className="section-padding" style={{ background: "#F8F7F4" }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <motion.div {...fadeUp}>
              <p className="eyebrow mb-6">Vores Vision</p>
              <h2 className="heading-section gradient-text mb-10">
                Et Manifest for Nærvær.
              </h2>
              <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "2.5rem" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)", color: "#1E293B", lineHeight: 1.8, fontStyle: "italic", marginBottom: "1.75rem" }}>
                  "I en verden, der bevæger sig hurtigere og hurtigere, mener vi, at det vigtigste vi kan give vores gæster, er tid. Tid til at ånde, til at mærke efter, til at forbinde med det essentielle."
                </p>
                <p style={{ color: "#6B7280", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                  Da familien Holst overtog Svaleholm i 2016 efter årtiers forfald, var visionen klar: at restaurere ejendommen med den største respekt for dens arkitektoniske arv, men udruste den med alt, hvad nutidens kræsne rejsende forventer.
                </p>
                <p style={{ color: "#6B7280", lineHeight: 1.85 }}>
                  Hvert rum, hvert møbel og hvert træ i haven er gennemtænkt. Vi har brugt lokale håndværkere, genbrugte materialer og samarbejdet med nordiske kunstnere for at skabe et sted, der føles unikt, autentisk og levende.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Meet the hosts */}
        <section className="section-padding" style={{ background: "#F1F0EC" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-80px" }}
                className="relative"
              >
                <div className="overflow-hidden rounded-xl" style={{ aspectRatio: "4/3", boxShadow: "0 20px 50px rgba(30,41,59,0.12)" }}>
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6d5de31d?w=900&q=80&auto=format&fit=crop"
                    alt="Katrine og Anders Holst"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {/* Brass accent line */}
                <div className="absolute -bottom-3 left-8 right-8 h-0.5" style={{ background: "linear-gradient(90deg, transparent, #B89F80 30%, #D4C1A9 50%, #B89F80 70%, transparent)" }} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <p className="eyebrow mb-5">Mød Jeres Værter</p>
                <h2 className="heading-section gradient-text mb-7">
                  Katrine & Anders Holst
                </h2>
                <p style={{ color: "#6B7280", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                  Katrine og Anders lærte hinanden at kende på en restaurantskole i Frankrig og deler den dag i dag en fælles passion for gastronomi, design og det personlige møde med gæster.
                </p>
                <p style={{ color: "#6B7280", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                  Efter år i hotelbranchen i henholdsvis London og København drømte de om at skabe noget, der var mere end et hotel. Et sted med en sjæl. Et hjem for midlertidige gæster. Svaleholm blev svaret på den drøm.
                </p>
                <p style={{ color: "#6B7280", lineHeight: 1.85, marginBottom: "2.5rem" }}>
                  "Vi ønsker, at alle, der kommer her, føler sig set og velkomne. At de tager hjem med en fornemmelse af, at de har oplevet noget særligt – noget, der ikke kan genfindes nogen anden steder."
                </p>
                <Link to="/kontakt" className="btn-primary">Skriv til Os</Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="section-padding" style={{ background: "#F8F7F4" }}>
          <div className="max-w-7xl mx-auto px-6">
            <motion.div className="text-center mb-14" {...fadeUp}>
              <p className="eyebrow mb-4">Stedet i Billeder</p>
              <h2 className="heading-section gradient-text">Galleri</h2>
            </motion.div>
            <motion.div
              className="grid grid-cols-3 grid-rows-3 gap-3 md:gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, staggerChildren: 0.05 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              {GALLERY.map((img, i) => (
                <motion.div
                  key={i}
                  className={`overflow-hidden rounded-xl ${img.span}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.07 }}
                  viewport={{ once: true }}
                  style={{ minHeight: "200px", boxShadow: "0 4px 16px rgba(30,41,59,0.07)" }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    style={{ minHeight: "200px" }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding" style={{ background: "#1E293B" }}>
          <div className="max-w-7xl mx-auto px-6">
            <motion.div className="text-center mb-14" {...{ ...fadeUp, whileInView: { opacity: 1, y: 0 } as typeof fadeUp["whileInView"] }}>
              <p className="eyebrow mb-4">Hvad Vi Tror På</p>
              <h2 className="heading-section text-white">Vores Værdier</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: "🌿", title: "Bæredygtighed", desc: "Vi arbejder aktivt for at mindske vores miljøpåvirkning. Fra lokal mad til grøn energi – naturen er vores nabo, og vi tager det ansvar alvorligt." },
                { icon: "🤝", title: "Nærvær", desc: "Vi tror på det personlige møde. Hos os mødes du altid af et menneske med tid og lyst til at gøre din oplevelse uforglemmelig." },
                { icon: "✨", title: "Håndværk", desc: "Fra det håndplukkede sengetøj til den lokalt producerede morgenmad – vi sætter en ære i detaljen og i det, der er lavet med omhu." },
              ].map((v, i) => (
                <motion.div
                  key={i}
                  className="glass rounded-xl p-8 card-shadow"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl mb-4">{v.icon}</div>
                  <h3 className="heading-card mb-3" style={{ color: "#1E293B" }}>{v.title}</h3>
                  <p style={{ color: "#6B7280", lineHeight: 1.75, fontSize: "0.9375rem" }}>{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer siteName={siteName} siteDescription={siteInfo?.description} />
    </div>
  );
}
