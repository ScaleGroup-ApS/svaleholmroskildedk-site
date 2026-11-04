/**
 * llms[.]txt route — served at /llms.txt
 *
 * A curated, LLM-friendly Markdown summary of the site (business overview, NAP,
 * key pages, prices, FAQ). Emerging convention for AI answer engines (GEO).
 */
import type { Route } from "./+types/llms[.]txt";
import { SITE_URL, SITE_NAME, NAP, NIGHTLY_PRICE, MIN_NIGHTS, NUMBER_OF_ROOMS, SAME_AS } from "~/lib/site";
import { landingPagesByCategory, landingPagePath } from "~/lib/landingPages";

export function loader(_args: Route.LoaderArgs) {
  const lodging = landingPagesByCategory("overnatning");
  const usecases = landingPagesByCategory("usecase");
  const lpLine = (p: (typeof lodging)[number]) =>
    `- [${p.jsonLdName}](${SITE_URL}${landingPagePath(p)})`;

  const body = `# ${SITE_NAME}

> Indkvartering til håndværkere på bygge- og renoveringsprojekter nær Roskilde på
> Sjælland. Op til ${NUMBER_OF_ROOMS} enkle værelser eller hele huset til ét sjak. Fælles køkken,
> fakturabetaling mod CVR, nem selvcheck-in. ${NIGHTLY_PRICE} kr pr. nat inkl. moms, min. ${MIN_NIGHTS} nætter.

## Kontakt (NAP)

- Navn: ${SITE_NAME}
- Adresse: ${NAP.streetAddress}, ${NAP.postalCode} ${NAP.addressLocality}, Danmark
- Telefon: ${NAP.telephoneDisplay}
- E-mail: ${NAP.email}
- Område: Roskilde, Sjælland, Danmark
${SAME_AS.map((u) => `- Profil: ${u}`).join("\n")}

## Det tilbyder vi

- Indkvartering til håndværkere og mandskab på projekt nær Roskilde: op til
  ${NUMBER_OF_ROOMS} enkle værelser med fælles køkken, 4 fælles bad og toiletter samt
  fælles opholdsrum.
- Hele huset kan lejes eksklusivt til ét firmas sjak – vi laver en skræddersyet
  aftale ud fra antal mand og periode.
- Nem digital selvcheck-in via dørkode, så sjakket kan ankomme og rejse
  fleksibelt.
- Wifi, fælles vaskemaskine og parkering til varevogne på pladsen.
- Fakturabetaling: vi fakturerer virksomheden direkte mod CVR, så
  administrationen er enkel for byggelederen.

## Priser

- ${NIGHTLY_PRICE} kr pr. nat inkl. moms, minimum ${MIN_NIGHTS} nætter.
- Ved leje af hele huset eller længere ophold laver vi en skræddersyet aftale
  ud fra antal mand og periode.

## Vigtige sider

- [Forside](${SITE_URL}/): Overblik over håndværkerindkvartering nær Roskilde.
- [Indkvartering til håndværkere](${SITE_URL}/indkvartering-haandvaerkere): Hvad vi tilbyder sjak og entreprenører.
- [Værelser](${SITE_URL}/vaerelser): Enkle værelser fra ${NIGHTLY_PRICE} kr pr. nat.
- [Priser](${SITE_URL}/priser): Priser og betingelser for indkvartering.
- [Kontakt](${SITE_URL}/kontakt): Kontaktoplysninger og forespørgselsformular.

## Indkvartering i nærområdet

${lodging.map(lpLine).join("\n")}

## Til byggeprojektet

${usecases.map(lpLine).join("\n")}

## Ofte stillede spørgsmål

- Kan I fakturere firmaet mod CVR? Ja. Vi laver en fast aftale og fakturerer
  virksomheden mod CVR, så administrationen er enkel for byggelederen.
- Kan vi leje hele huset til sjakket? Ja. Hele huset kan lejes eksklusivt, så
  sjakket bor samlet. Vi laver en skræddersyet aftale ud fra antal mand og
  periode.
- Er der et fælles køkken? Ja, der er fælles køkken, hvor sjakket selv kan
  lave mad efter arbejdsdagen.
- Er der wifi, vaskemaskine og parkering til varevogne? Ja. Der er wifi,
  fælles vaskemaskine og god parkering til varevogne på pladsen ved gården.
- Hvor mange nætter skal man bo minimum? Minimum ${MIN_NIGHTS} nætter.
- Hvad koster en overnatning? ${NIGHTLY_PRICE} kr pr. nat inkl. moms, minimum ${MIN_NIGHTS} nætter.
- Hvor ligger Svaleholm Gaard? ${NAP.streetAddress}, ${NAP.postalCode} ${NAP.addressLocality} – nær Roskilde på Sjælland.
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
