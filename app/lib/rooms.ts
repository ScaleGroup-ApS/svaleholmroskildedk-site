export interface Room {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  description: string;
  size: string;
  bed: string;
  occupancy: string;
  priceFrom: string;
  heroImage: string;
  gallery: string[];
  amenities: string[];
}

export const ROOMS: Room[] = [
  {
    slug: "svalereden",
    name: "Svalereden",
    tagline: "Et intimt fristed med varm stemning",
    shortDescription:
      "Vores mest intime værelse med udsigt over gårdspladsens historiske ege.",
    description:
      "Svalereden er skabt til ro og nærvær. Her møder klassiske materialer moderne komfort i en varm, nordisk ramme med fokus på detaljen.",
    size: "28 m²",
    bed: "King",
    occupancy: "2 gæster",
    priceFrom: "DKK 2.495",
    heroImage:
      "https://placehold.co/1600x1000/F3EDE4/3C3A36?text=Svalereden",
    gallery: [
      "https://placehold.co/1200x800/EFE7DB/3C3A36?text=Svalereden+Stue",
      "https://placehold.co/1200x800/F5F0E8/3C3A36?text=Svalereden+Bad",
      "https://placehold.co/1200x800/E9E0D1/3C3A36?text=Svalereden+Detalje",
    ],
    amenities: ["Brændeovn", "Clawfoot badekar", "Fri minibar", "Morgenmad inkluderet"],
  },
  {
    slug: "haven",
    name: "Haven",
    tagline: "Direkte adgang til rosenhaven",
    shortDescription:
      "Vågn op til duften af blomster og fuglekvidder med privat terrasse.",
    description:
      "Haven kombinerer lys, luft og private udendørs arealer. Perfekt til gæster, der ønsker nærhed til naturen uden at gå på kompromis med luksus.",
    size: "32 m²",
    bed: "King",
    occupancy: "2 gæster",
    priceFrom: "DKK 2.695",
    heroImage: "https://placehold.co/1600x1000/F1EEE3/3C3A36?text=Haven",
    gallery: [
      "https://placehold.co/1200x800/EEE4D4/3C3A36?text=Haven+Sovezone",
      "https://placehold.co/1200x800/F6F2E9/3C3A36?text=Haven+Terrasse",
      "https://placehold.co/1200x800/EDE6D8/3C3A36?text=Haven+Bad",
    ],
    amenities: ["Privat terrasse", "Regnbruser", "Haveadgang", "Velkomstchampagne"],
  },
  {
    slug: "taarnet",
    name: "Tårnet",
    tagline: "Panoramaudsigt i historiske rammer",
    shortDescription:
      "Placeret i det renoverede tårn med udsigt over søen og godset.",
    description:
      "Tårnet er for jer, der ønsker noget særligt. Et dramatisk rum med højt til loftet, eksklusiv service og udsigt i alle retninger.",
    size: "45 m²",
    bed: "Super King",
    occupancy: "2 gæster",
    priceFrom: "DKK 4.795",
    heroImage: "https://placehold.co/1600x1000/EDE7DA/3C3A36?text=Taarnet",
    gallery: [
      "https://placehold.co/1200x800/EEE6D8/3C3A36?text=Taarnet+Sovezone",
      "https://placehold.co/1200x800/F4EFE6/3C3A36?text=Taarnet+Lounge",
      "https://placehold.co/1200x800/E7DDCD/3C3A36?text=Taarnet+Udsigt",
    ],
    amenities: ["360° udsigt", "Privat jacuzzi", "Champagneservice", "Sen checkout"],
  },
  {
    slug: "biblioteket",
    name: "Biblioteket",
    tagline: "Klassisk charme med moderne komfort",
    shortDescription:
      "Indrettet i det oprindelige bibliotek med bøger, ro og karakter.",
    description:
      "Biblioteket emmer af atmosfære og historie. Ideelt til gæster, der værdsætter et sanseligt miljø med plads til både hvile og fordybelse.",
    size: "38 m²",
    bed: "King",
    occupancy: "2 gæster",
    priceFrom: "DKK 3.295",
    heroImage:
      "https://placehold.co/1600x1000/F0EADF/3C3A36?text=Biblioteket",
    gallery: [
      "https://placehold.co/1200x800/EEE5D7/3C3A36?text=Biblioteket+Seng",
      "https://placehold.co/1200x800/F5EFE7/3C3A36?text=Biblioteket+Laesehjoerne",
      "https://placehold.co/1200x800/ECE2D3/3C3A36?text=Biblioteket+Detaljer",
    ],
    amenities: ["Arbejdsbord", "Sofahjørne", "Gourmet-tekasse", "Lydsvag zone"],
  },
  {
    slug: "marken",
    name: "Marken",
    tagline: "Rustik elegance med varme materialer",
    shortDescription:
      "Eksponerede bjælker og udsigt over de gyldne marker omkring godset.",
    description:
      "Marken giver en rolig, jordnær oplevelse med klassiske detaljer og bløde teksturer. Et oplagt valg til en afslappende weekend.",
    size: "30 m²",
    bed: "Queen",
    occupancy: "2 gæster",
    priceFrom: "DKK 2.495",
    heroImage: "https://placehold.co/1600x1000/EEE8DD/3C3A36?text=Marken",
    gallery: [
      "https://placehold.co/1200x800/EDE3D4/3C3A36?text=Marken+Sovezone",
      "https://placehold.co/1200x800/F4EFE7/3C3A36?text=Marken+Stue",
      "https://placehold.co/1200x800/E7DDCE/3C3A36?text=Marken+Udsigt",
    ],
    amenities: ["Eksponerede bjælker", "Kamin", "Morgenmad inkluderet", "Velkomstsnacks"],
  },
  {
    slug: "soeen",
    name: "Søen",
    tagline: "Stilhed, vand og privat terrasse",
    shortDescription:
      "Med terrasse mod den stille sø er dette rummet for total afkobling.",
    description:
      "Søen er designet til gæster, der vil helt ned i tempo. Her er fokus på udsigt, natur og en stille luksusoplevelse tæt på vandet.",
    size: "35 m²",
    bed: "King",
    occupancy: "2 gæster",
    priceFrom: "DKK 3.295",
    heroImage: "https://placehold.co/1600x1000/EEEADE/3C3A36?text=Soeen",
    gallery: [
      "https://placehold.co/1200x800/EEE4D6/3C3A36?text=Soeen+Seng",
      "https://placehold.co/1200x800/F4F0E8/3C3A36?text=Soeen+Terrasse",
      "https://placehold.co/1200x800/E8DFD0/3C3A36?text=Soeen+Bad",
    ],
    amenities: ["Søudsigt", "Privat båd", "Fiskesæt", "Morgenmad på terrassen"],
  },
  {
    slug: "vinterstuen",
    name: "Vinterstuen",
    tagline: "Lys, varme og udsigt året rundt",
    shortDescription:
      "Et rummeligt værelse med bløde farver, pejs og badekar ved vinduet.",
    description:
      "Vinterstuen er indrettet til komfort i alle sæsoner med varme materialer, dæmpet belysning og store vinduespartier mod naturen.",
    size: "33 m²",
    bed: "Super King",
    occupancy: "2 gæster",
    priceFrom: "DKK 2.895",
    heroImage:
      "https://placehold.co/1600x1000/F0EBE2/3C3A36?text=Vinterstuen",
    gallery: [
      "https://placehold.co/1200x800/EEE5D8/3C3A36?text=Vinterstuen+Seng",
      "https://placehold.co/1200x800/F5F0E8/3C3A36?text=Vinterstuen+Badekar",
      "https://placehold.co/1200x800/ECE3D5/3C3A36?text=Vinterstuen+Pejs",
    ],
    amenities: ["Gulvvarme", "Badekar ved vinduet", "Pejs", "Premium sengetøj"],
  },
  {
    slug: "mestersuiten",
    name: "Mestersuiten",
    tagline: "Vores mest eksklusive suite",
    shortDescription:
      "En komplet suiteoplevelse med separat stue, butler-service og ekstra privatliv.",
    description:
      "Mestersuiten er designet som en privat verden med plads, ro og service på højeste niveau. Velegnet til særlige anledninger.",
    size: "75 m²",
    bed: "Super King",
    occupancy: "2-3 gæster",
    priceFrom: "DKK 6.995",
    heroImage:
      "https://placehold.co/1600x1000/EEE7DB/3C3A36?text=Mestersuiten",
    gallery: [
      "https://placehold.co/1200x800/EEE4D5/3C3A36?text=Mestersuiten+Sovezone",
      "https://placehold.co/1200x800/F4EFE8/3C3A36?text=Mestersuiten+Stue",
      "https://placehold.co/1200x800/E8DECF/3C3A36?text=Mestersuiten+Bad",
    ],
    amenities: ["Separat stue", "Walk-in closet", "Privat butler", "Transferservice"],
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return ROOMS.find((room) => room.slug === slug);
}
