export interface Room {
  slug: string;
  name: string;
  tagline: string;
  taglineEn: string;
  shortDescription: string;
  shortDescriptionEn: string;
  description: string;
  descriptionEn: string;
  size: string;
  bed: string;
  occupancy: string;
  occupancyEn: string;
  priceFrom: string;
  heroImage: string;
  gallery: string[];
  amenities: string[];
  amenitiesEn: string[];
}

export const ROOMS: Room[] = [
  {
    slug: "svalereden",
    name: "Svalereden",
    tagline: "Et intimt fristed med varm stemning",
    taglineEn: "An intimate retreat with a warm atmosphere",
    shortDescription:
      "Vores mest intime værelse med udsigt over gårdspladsens historiske ege.",
    shortDescriptionEn:
      "Our most intimate room, overlooking the historic oaks of the courtyard.",
    description:
      "Svalereden er skabt til ro og nærvær. Her møder klassiske materialer moderne komfort i en varm, nordisk ramme med fokus på detaljen.",
    descriptionEn:
      "Svalereden is made for calm and presence. Here classic materials meet modern comfort in a warm, Nordic setting with an eye for detail.",
    size: "28 m²",
    bed: "King",
    occupancy: "2 gæster",
    occupancyEn: "2 guests",
    priceFrom: "DKK 2.495",
    heroImage: "/images/bygning-have.jpg",
    gallery: [
      "/images/have-sti.jpg",
      "/images/lounge.jpg",
      "/images/natur-1.jpg",
    ],
    amenities: ["Brændeovn", "Clawfoot badekar", "Fri minibar", "Morgenmad inkluderet"],
    amenitiesEn: ["Wood stove", "Clawfoot bathtub", "Complimentary minibar", "Breakfast included"],
  },
  {
    slug: "haven",
    name: "Haven",
    tagline: "Direkte adgang til rosenhaven",
    taglineEn: "Direct access to the rose garden",
    shortDescription:
      "Vågn op til duften af blomster og fuglekvidder med privat terrasse.",
    shortDescriptionEn:
      "Wake to the scent of flowers and birdsong, with a private terrace.",
    description:
      "Haven kombinerer lys, luft og private udendørs arealer. Perfekt til gæster, der ønsker nærhed til naturen uden at gå på kompromis med luksus.",
    descriptionEn:
      "Haven combines light, air and private outdoor space. Perfect for guests who want closeness to nature without compromising on luxury.",
    size: "32 m²",
    bed: "King",
    occupancy: "2 gæster",
    occupancyEn: "2 guests",
    priceFrom: "DKK 2.695",
    heroImage: "/images/have-sti-2.jpg",
    gallery: [
      "/images/have-sti-3.jpg",
      "/images/natur-eng.jpg",
      "/images/bygning-have.jpg",
    ],
    amenities: ["Privat terrasse", "Regnbruser", "Haveadgang", "Velkomstchampagne"],
    amenitiesEn: ["Private terrace", "Rain shower", "Garden access", "Welcome champagne"],
  },
  {
    slug: "taarnet",
    name: "Tårnet",
    tagline: "Panoramaudsigt i historiske rammer",
    taglineEn: "Panoramic views in historic surroundings",
    shortDescription:
      "Placeret i det renoverede tårn med udsigt over søen og godset.",
    shortDescriptionEn:
      "Set in the renovated tower with views over the lake and the estate.",
    description:
      "Tårnet er for jer, der ønsker noget særligt. Et dramatisk rum med højt til loftet, eksklusiv service og udsigt i alle retninger.",
    descriptionEn:
      "Tårnet is for those who want something special. A dramatic room with high ceilings, exclusive service and views in every direction.",
    size: "45 m²",
    bed: "Super King",
    occupancy: "2 gæster",
    occupancyEn: "2 guests",
    priceFrom: "DKK 4.795",
    heroImage: "/images/festsal-facade.jpg",
    gallery: [
      "/images/natur-mark.jpg",
      "/images/gaardsplads.jpg",
      "/images/festsal-lounge.jpg",
    ],
    amenities: ["360° udsigt", "Privat jacuzzi", "Champagneservice", "Sen checkout"],
    amenitiesEn: ["360° view", "Private jacuzzi", "Champagne service", "Late checkout"],
  },
  {
    slug: "biblioteket",
    name: "Biblioteket",
    tagline: "Klassisk charme med moderne komfort",
    taglineEn: "Classic charm with modern comfort",
    shortDescription:
      "Indrettet i det oprindelige bibliotek med bøger, ro og karakter.",
    shortDescriptionEn:
      "Set in the original library, with books, calm and character.",
    description:
      "Biblioteket emmer af atmosfære og historie. Ideelt til gæster, der værdsætter et sanseligt miljø med plads til både hvile og fordybelse.",
    descriptionEn:
      "Biblioteket is full of atmosphere and history. Ideal for guests who value a sensory setting with room for both rest and reflection.",
    size: "38 m²",
    bed: "King",
    occupancy: "2 gæster",
    occupancyEn: "2 guests",
    priceFrom: "DKK 3.295",
    heroImage: "/images/lounge.jpg",
    gallery: [
      "/images/bar.jpg",
      "/images/festsal-drapes.jpg",
      "/images/festsal-lounge.jpg",
    ],
    amenities: ["Arbejdsbord", "Sofahjørne", "Gourmet-tekasse", "Lydsvag zone"],
    amenitiesEn: ["Desk", "Sofa corner", "Gourmet tea box", "Quiet zone"],
  },
  {
    slug: "marken",
    name: "Marken",
    tagline: "Rustik elegance med varme materialer",
    taglineEn: "Rustic elegance with warm materials",
    shortDescription:
      "Eksponerede bjælker og udsigt over de gyldne marker omkring godset.",
    shortDescriptionEn:
      "Exposed beams and views over the golden fields around the estate.",
    description:
      "Marken giver en rolig, jordnær oplevelse med klassiske detaljer og bløde teksturer. Et oplagt valg til en afslappende weekend.",
    descriptionEn:
      "Marken offers a calm, down-to-earth experience with classic details and soft textures. An obvious choice for a relaxing weekend.",
    size: "30 m²",
    bed: "Queen",
    occupancy: "2 gæster",
    occupancyEn: "2 guests",
    priceFrom: "DKK 2.495",
    heroImage: "/images/natur-mark.jpg",
    gallery: [
      "/images/natur-mark-2.jpg",
      "/images/natur-eng.jpg",
      "/images/have-sti.jpg",
    ],
    amenities: ["Eksponerede bjælker", "Kamin", "Morgenmad inkluderet", "Velkomstsnacks"],
    amenitiesEn: ["Exposed beams", "Fireplace", "Breakfast included", "Welcome snacks"],
  },
  {
    slug: "soeen",
    name: "Søen",
    tagline: "Stilhed, vand og privat terrasse",
    taglineEn: "Stillness, water and a private terrace",
    shortDescription:
      "Med terrasse mod den stille sø er dette rummet for total afkobling.",
    shortDescriptionEn:
      "With a terrace facing the still lake, this is the room for total unwinding.",
    description:
      "Søen er designet til gæster, der vil helt ned i tempo. Her er fokus på udsigt, natur og en stille luksusoplevelse tæt på vandet.",
    descriptionEn:
      "Søen is designed for guests who want to slow right down. The focus is on views, nature and a quiet luxury experience close to the water.",
    size: "35 m²",
    bed: "King",
    occupancy: "2 gæster",
    occupancyEn: "2 guests",
    priceFrom: "DKK 3.295",
    heroImage: "/images/natur-eng.jpg",
    gallery: [
      "/images/natur-2.jpg",
      "/images/natur-3.jpg",
      "/images/have-sti-2.jpg",
    ],
    amenities: ["Søudsigt", "Privat båd", "Fiskesæt", "Morgenmad på terrassen"],
    amenitiesEn: ["Lake view", "Private boat", "Fishing set", "Breakfast on the terrace"],
  },
  {
    slug: "vinterstuen",
    name: "Vinterstuen",
    tagline: "Lys, varme og udsigt året rundt",
    taglineEn: "Light, warmth and views all year round",
    shortDescription:
      "Et rummeligt værelse med bløde farver, pejs og badekar ved vinduet.",
    shortDescriptionEn:
      "A spacious room with soft colours, a fireplace and a bathtub by the window.",
    description:
      "Vinterstuen er indrettet til komfort i alle sæsoner med varme materialer, dæmpet belysning og store vinduespartier mod naturen.",
    descriptionEn:
      "Vinterstuen is furnished for comfort in every season, with warm materials, soft lighting and large windows onto nature.",
    size: "33 m²",
    bed: "Super King",
    occupancy: "2 gæster",
    occupancyEn: "2 guests",
    priceFrom: "DKK 2.895",
    heroImage: "/images/festsal-lounge.jpg",
    gallery: [
      "/images/lounge.jpg",
      "/images/bar.jpg",
      "/images/festsal-drapes.jpg",
    ],
    amenities: ["Gulvvarme", "Badekar ved vinduet", "Pejs", "Premium sengetøj"],
    amenitiesEn: ["Underfloor heating", "Bathtub by the window", "Fireplace", "Premium bed linen"],
  },
  {
    slug: "mestersuiten",
    name: "Mestersuiten",
    tagline: "Vores mest eksklusive suite",
    taglineEn: "Our most exclusive suite",
    shortDescription:
      "En komplet suiteoplevelse med separat stue, butler-service og ekstra privatliv.",
    shortDescriptionEn:
      "A complete suite experience with a separate lounge, butler service and extra privacy.",
    description:
      "Mestersuiten er designet som en privat verden med plads, ro og service på højeste niveau. Velegnet til særlige anledninger.",
    descriptionEn:
      "Mestersuiten is designed as a private world with space, calm and service at the highest level. Ideal for special occasions.",
    size: "75 m²",
    bed: "Super King",
    occupancy: "2-3 gæster",
    occupancyEn: "2-3 guests",
    priceFrom: "DKK 6.995",
    heroImage: "/images/gaardsplads-2.jpg",
    gallery: [
      "/images/gaardsplads.jpg",
      "/images/bygning-have.jpg",
      "/images/festsal-facade.jpg",
    ],
    amenities: ["Separat stue", "Walk-in closet", "Privat butler", "Transferservice"],
    amenitiesEn: ["Separate lounge", "Walk-in closet", "Private butler", "Transfer service"],
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return ROOMS.find((room) => room.slug === slug);
}
