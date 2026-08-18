// ─────────────────────────────────────────────────────────────────────────────
// schema.org structured data (JSON-LD) builders.
//
// Everything is modelled as a single connected @graph so search engines and
// AI answer engines (GEO) resolve one business entity. Per-page nodes reference
// the shared business/organization/website nodes by @id instead of repeating
// them, which keeps the markup consistent and de-duplicated.
// ─────────────────────────────────────────────────────────────────────────────

import {
  SITE_URL,
  SITE_NAME,
  LEGAL_NAME,
  NAP,
  GEO,
  MAP_URL,
  SAME_AS,
  PRICE_RANGE,
  AREA_SERVED,
  MAX_GUESTS,
  NUMBER_OF_ROOMS,
  LOGO,
  RATING,
  VAT_ID,
  abs,
} from "./site";

type Node = Record<string, unknown>;

export const ORG_ID = `${SITE_URL}/#organization`;
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const postalAddress = (): Node => ({
  "@type": "PostalAddress",
  streetAddress: NAP.streetAddress,
  postalCode: NAP.postalCode,
  addressLocality: NAP.addressLocality,
  addressRegion: NAP.addressRegion,
  addressCountry: NAP.addressCountry,
});

/** Organization node — the legal entity behind the site. */
export function organizationNode(): Node {
  const node: Node = {
    "@type": "Organization",
    "@id": ORG_ID,
    name: LEGAL_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: abs(LOGO) },
    image: abs(LOGO),
    email: NAP.email,
    telephone: NAP.telephone,
    address: postalAddress(),
    sameAs: SAME_AS,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: NAP.telephone,
      email: NAP.email,
      areaServed: AREA_SERVED,
      availableLanguage: ["Danish", "English"],
    },
  };
  if (VAT_ID) node.vatID = VAT_ID;
  return node;
}

/** WebSite node. */
export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "da-DK",
    publisher: { "@id": ORG_ID },
  };
}

/**
 * The core LocalBusiness + EventVenue node. This is the entity every page's
 * `about`/`provider`/`itemReviewed` points at. AggregateRating is only added
 * when real Google numbers exist in `RATING` (no fabricated ratings).
 */
export function localBusinessNode(): Node {
  const node: Node = {
    "@type": ["LocalBusiness", "EventVenue"],
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    image: abs("/images/festsal-hvid-1.png"),
    logo: abs(LOGO),
    telephone: NAP.telephone,
    email: NAP.email,
    priceRange: PRICE_RANGE,
    currenciesAccepted: "DKK",
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    hasMap: MAP_URL,
    areaServed: AREA_SERVED.map((name) => ({ "@type": "AdministrativeArea", name })),
    maximumAttendeeCapacity: MAX_GUESTS,
    sameAs: SAME_AS,
    parentOrganization: { "@id": ORG_ID },
    knowsLanguage: ["da", "en"],
  };
  if (RATING) {
    node.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: RATING.value,
      reviewCount: RATING.count,
      bestRating: 5,
      worstRating: 1,
    };
  }
  return node;
}

/** Individual guest reviews (no per-review star rating is fabricated). */
export function reviewNodes(
  reviews: Array<{ author: string; body: string }>,
): Node[] {
  return reviews.map((r) => ({
    "@type": "Review",
    itemReviewed: { "@id": BUSINESS_ID },
    author: { "@type": "Person", name: r.author },
    reviewBody: r.body,
    inLanguage: "da",
  }));
}

/** BreadcrumbList from a list of { name, path } (path relative to SITE_URL, "" = home). */
export function breadcrumb(items: Array<{ name: string; path: string }>): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

/** WebPage node linking a page into the site graph. */
export function webPageNode(opts: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "CollectionPage" | "ContactPage" | "AboutPage";
  primaryImage?: string;
}): Node {
  const url = `${SITE_URL}${opts.path}`;
  const node: Node = {
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: "da-DK",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
  };
  if (opts.primaryImage) node.primaryImageOfPage = abs(opts.primaryImage);
  return node;
}

/** An OfferCatalog of the event packages (real prices from Prisberegner.tsx). */
export function eventOfferCatalogNode(): Node {
  const offers: Array<{ name: string; price: string; unit?: string; desc: string }> = [
    { name: "Timepakke – festsal pr. time", price: "1800", unit: "HUR", desc: "Leje af festsalen pr. time (min. 3 timer)." },
    { name: "Aftenpakke – festsal kl. 17–24", price: "9000", desc: "Festsalen en hel aften." },
    { name: "Heldagspakke – festsal kl. 9–24", price: "15000", desc: "Festsalen en hel dag." },
    { name: "Weekendpakke – festsal fre–søn", price: "26000", desc: "Festsalen hele weekenden." },
  ];
  return {
    "@type": "OfferCatalog",
    name: "Fest- og eventpakker",
    itemListElement: offers.map((o) => ({
      "@type": "Offer",
      name: o.name,
      description: o.desc,
      price: o.price,
      priceCurrency: "DKK",
      ...(o.unit ? { priceSpecification: { "@type": "UnitPriceSpecification", price: o.price, priceCurrency: "DKK", unitCode: o.unit } } : {}),
      availability: "https://schema.org/InStock",
      seller: { "@id": BUSINESS_ID },
      areaServed: AREA_SERVED,
    })),
  };
}

/** Service nodes per event type (wedding, party, kids' birthday, company event). */
export function eventServiceNodes(
  services: Array<{ name: string; description: string }>,
): Node[] {
  return services.map((s) => ({
    "@type": "Service",
    name: s.name,
    description: s.description,
    serviceType: s.name,
    provider: { "@id": BUSINESS_ID },
    areaServed: AREA_SERVED,
    audience: { "@type": "Audience", geographicArea: { "@type": "AdministrativeArea", name: "Roskilde" } },
  }));
}

/** LodgingBusiness node for the rooms/stay, with a from-price Offer. */
export function lodgingNode(opts: { description: string }): Node {
  return {
    "@type": "LodgingBusiness",
    "@id": `${SITE_URL}/vaerelser#lodging`,
    name: "Ophold på Svaleholm Gaard",
    description: opts.description,
    url: `${SITE_URL}/vaerelser`,
    image: abs("/images/bygning-have.jpg"),
    telephone: NAP.telephone,
    email: NAP.email,
    address: postalAddress(),
    geo: { "@type": "GeoCoordinates", latitude: GEO.latitude, longitude: GEO.longitude },
    priceRange: "fra 650 kr",
    numberOfRooms: NUMBER_OF_ROOMS,
    petsAllowed: false,
    areaServed: AREA_SERVED,
    parentOrganization: { "@id": ORG_ID },
    makesOffer: {
      "@type": "Offer",
      name: "Overnatning pr. værelse pr. nat",
      price: "650",
      priceCurrency: "DKK",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "650",
        priceCurrency: "DKK",
        unitCode: "DAY",
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "DAY" },
      },
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Fælles opholdsrum", value: true },
      { "@type": "LocationFeatureSpecification", name: "Fælles bad og toilet (4 stk.)", value: true },
      { "@type": "LocationFeatureSpecification", name: "Fælles køkken", value: true },
      { "@type": "LocationFeatureSpecification", name: "Selvcheck-in", value: true },
      { "@type": "LocationFeatureSpecification", name: "Have og naturområde", value: true },
    ],
  };
}

/** ImageGallery node from a list of { src, caption }. */
export function imageGalleryNode(
  images: Array<{ src: string; caption: string }>,
  opts: { name: string; description: string; path: string },
): Node {
  return {
    "@type": "ImageGallery",
    "@id": `${SITE_URL}${opts.path}#gallery`,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    image: images.map((img) => ({
      "@type": "ImageObject",
      contentUrl: abs(img.src),
      caption: img.caption,
    })),
  };
}

/** FAQPage node from question/answer pairs. */
export function faqNode(faqs: Array<{ q: string; a: string }>): Node {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Wrap nodes into a JSON-LD document with a shared @context. */
export function graph(...nodes: Array<Node | Node[]>): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.flat(),
  };
}

/** The site-wide identity nodes injected on every page (root layout). */
export function siteGraph(
  opts: { reviews?: Array<{ author: string; body: string }> } = {},
): Record<string, unknown> {
  const nodes: Node[] = [organizationNode(), websiteNode(), localBusinessNode()];
  if (opts.reviews?.length) nodes.push(...reviewNodes(opts.reviews));
  return graph(...nodes);
}
