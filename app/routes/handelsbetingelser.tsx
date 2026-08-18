import { LegalLayout, LSection, LP, LUL } from "~/components/LegalLayout";
import { useT } from "~/lib/i18n";

export function meta() {
  return [
    { title: "Handelsbetingelser – Svaleholm Gaard Roskilde" },
    { name: "description", content: "Vilkår og betingelser for booking af festsal og overnatning hos Svaleholm Gaard Roskilde – priser, betaling, afbestilling og ansvar." },
    { name: "robots", content: "noindex" },
  ];
}

export default function Handelsbetingelser() {
  const t = useT();
  return (
    <LegalLayout
      eyebrow={t("Vilkår", "Terms")}
      title={t("Handelsbetingelser", "Terms & conditions")}
      updated={t("Senest opdateret: august 2026", "Last updated: August 2026")}
    >
      <LSection heading={t("1. Generelt", "1. General")}>
        <LP>{t(
          "Disse handelsbetingelser gælder for leje af festsal og overnatning hos Svaleholm Gaard Roskilde. Betingelserne udgør sammen med den konkrete aftale grundlaget for din booking.",
          "These terms apply to the rental of the event hall and accommodation at Svaleholm Gaard Roskilde. Together with the specific agreement, they form the basis of your booking."
        )}</LP>
        <LUL items={[
          "Svaleholm Gaard Roskilde",
          "Frederiksborgvej 388, 4000 Roskilde",
          t("Telefon: +45 71 53 13 79", "Phone: +45 71 53 13 79"),
          "E-mail: kontakt@svaleholmroskilde.dk",
          t("CVR-nr.: (udfyldes)", "Company reg. no.: (to be added)"),
        ]} />
      </LSection>

      <LSection heading={t("2. Priser", "2. Prices")}>
        <LP>{t(
          "Alle priser er angivet i danske kroner og er inkl. moms. Priser i prisberegneren er vejledende, indtil en booking er bekræftet skriftligt af os. Vi tager forbehold for pris- og trykfejl.",
          "All prices are in Danish kroner and include VAT. Prices in the price calculator are guideline figures until a booking is confirmed by us in writing. We reserve the right to correct pricing and typographical errors."
        )}</LP>
      </LSection>

      <LSection heading={t("3. Booking og betaling", "3. Booking and payment")}>
        <LP>{t(
          "En booking er bindende, når vi har bekræftet den skriftligt. Betalingsvilkår, herunder eventuelt depositum og betalingsfrist, fremgår af din bekræftelse eller faktura.",
          "A booking is binding once we have confirmed it in writing. Payment terms, including any deposit and payment deadline, are stated in your confirmation or invoice."
        )}</LP>
      </LSection>

      <LSection heading={t("4. Afbestilling og ændringer", "4. Cancellation and changes")}>
        <LP>{t(
          "Ønsker du at afbestille eller ændre en booking, skal du kontakte os hurtigst muligt. Vilkårene for afbestilling, herunder eventuel tilbagebetaling af depositum, aftales i forbindelse med bookingen og fremgår af din bekræftelse.",
          "If you wish to cancel or change a booking, please contact us as soon as possible. Cancellation terms, including any refund of a deposit, are agreed at the time of booking and stated in your confirmation."
        )}</LP>
      </LSection>

      <LSection heading={t("5. Gæstens ansvar", "5. Guest responsibilities")}>
        <LP>{t(
          "Lejer er ansvarlig for, at lokaler og inventar behandles med omhu, og for eventuelle skader forårsaget af lejer eller lejers gæster i lejeperioden. Lokalerne afleveres ryddede efter aftale.",
          "The renter is responsible for treating the premises and furnishings with care, and for any damage caused by the renter or their guests during the rental period. The premises are to be left tidy as agreed."
        )}</LP>
      </LSection>

      <LSection heading={t("6. Ansvarsbegrænsning", "6. Limitation of liability")}>
        <LP>{t(
          "Svaleholm Gaard Roskilde er ikke ansvarlig for gæsters personlige ejendele eller for forhold uden for vores kontrol (force majeure). Vores erstatningsansvar er begrænset til det beløb, der er betalt for den pågældende booking.",
          "Svaleholm Gaard Roskilde is not liable for guests' personal belongings or for circumstances beyond our control (force majeure). Our liability is limited to the amount paid for the booking in question."
        )}</LP>
      </LSection>

      <LSection heading={t("7. Persondata", "7. Personal data")}>
        <LP>{t(
          "Vi behandler dine personoplysninger i overensstemmelse med vores privatlivspolitik.",
          "We process your personal data in accordance with our privacy policy."
        )}</LP>
      </LSection>

      <LSection heading={t("8. Lovvalg og klager", "8. Governing law and complaints")}>
        <LP>{t(
          "Aftalen er underlagt dansk ret. Har du en klage, er du velkommen til at kontakte os på kontakt@svaleholmroskilde.dk, så vi kan finde en løsning.",
          "The agreement is governed by Danish law. If you have a complaint, you are welcome to contact us at kontakt@svaleholmroskilde.dk so we can find a solution."
        )}</LP>
      </LSection>
    </LegalLayout>
  );
}
