/**
 * llms[.]txt route — served at /llms.txt
 *
 * A curated, LLM-friendly Markdown summary of the site (business overview, NAP,
 * key pages, prices, FAQ). Emerging convention for AI answer engines (GEO).
 */
import type { Route } from "./+types/llms[.]txt";
import { SITE_URL, SITE_NAME, NAP, PRICE_RANGE, MAX_GUESTS, NUMBER_OF_ROOMS, SAME_AS } from "~/lib/site";

export function loader(_args: Route.LoaderArgs) {
  const body = `# ${SITE_NAME}

> Historisk festgård og overnatningssted på landet tæt på Roskilde på Sjælland.
> Festsal til bryllup og fejring (op til ${MAX_GUESTS} gæster) og ${NUMBER_OF_ROOMS} enkle
> værelser til overnatning. Alle priser er inkl. moms.

## Kontakt (NAP)

- Navn: ${SITE_NAME}
- Adresse: ${NAP.streetAddress}, ${NAP.postalCode} ${NAP.addressLocality}, Danmark
- Telefon: ${NAP.telephoneDisplay}
- E-mail: ${NAP.email}
- Område: Roskilde, Sjælland, Danmark
${SAME_AS.map((u) => `- Profil: ${u}`).join("\n")}

## Det tilbyder vi

- Festsal til bryllup, runde fødselsdage, konfirmation, barnedåb, jubilæum,
  firmaevent, julefrokost og børnefødselsdage. Plads til op til ${MAX_GUESTS} gæster
  (minimum 30 ved leje af sal). Egen catering er tilladt; køkkenfaciliteter er til rådighed.
- Overnatning i op til ${NUMBER_OF_ROOMS} enkle værelser uden eget bad, med 4 fælles bad
  og toiletter, fælles køkken og fælles opholdsrum. Nem selvcheck-in via dørkode.

## Priser (inkl. moms, vejledende)

- Festsal pr. time: fra 1.800 kr
- Festsal, aften (kl. 17–24): 9.000 kr
- Festsal, heldag (kl. 9–24): 15.000 kr
- Festsal, weekend (fre–søn): 26.000 kr
- Overnatning: 650 kr pr. værelse pr. nat
- Samlet prisinterval: ${PRICE_RANGE}

## Vigtige sider

- [Forside](${SITE_URL}/): Overblik over ophold og fejring.
- [Fest & events](${SITE_URL}/tjenester): Bryllup, fest, konfirmation, firmaevent i festsalen.
- [Ophold & overnatning](${SITE_URL}/vaerelser): Enkle værelser fra 650 kr pr. nat.
- [Priser & booking](${SITE_URL}/priser): Prisberegner for festsal og overnatning.
- [Inspiration](${SITE_URL}/inspiration): Idéer til, hvordan gården kan bruges + FAQ.
- [Galleri](${SITE_URL}/galleri): Billeder af festsal, gård, ophold og natur.
- [Kontakt](${SITE_URL}/kontakt): Kontaktoplysninger og forespørgselsformular.

## Ofte stillede spørgsmål

- Hvor mange gæster er der plads til? Op til ${MAX_GUESTS} gæster i festsalen (min. 30 ved leje af sal).
- Må vi selv stå for mad og drikke? Ja – der er køkkenfaciliteter til catering, og I bestemmer selv.
- Har værelserne eget bad? Nej – værelserne er enkle med fælles bad, køkken og opholdsrum.
- Hvordan foregår check-in? Nem selvcheck-in via dørkode.
- Hvor ligger gården? ${NAP.streetAddress}, ${NAP.postalCode} ${NAP.addressLocality} – på landet tæt på Roskilde.
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
