import { LegalLayout, LSection, LP, LUL } from "~/components/LegalLayout";
import { useT } from "~/lib/i18n";

export function meta() {
  return [
    { title: "Handelsbetingelser – Svaleholm Gæstegaard Roskilde" },
    { name: "description", content: "Vilkår og betingelser for ophold hos Svaleholm Gæstegaard Roskilde – priser, betaling, afbestilling og ansvar." },
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
          "Disse handelsbetingelser gælder for dit ophold hos Svaleholm Gæstegaard Roskilde. Betingelserne udgør sammen med den konkrete aftale grundlaget for din booking.",
          "These terms apply to your stay at Svaleholm Gæstegaard Roskilde. Together with the specific agreement, they form the basis of your booking."
        )}</LP>
        <LUL items={[
          "Svaleholm Gæstegaard Roskilde",
          "Frederiksborgvej 390, 4000 Roskilde",
          t("Telefon: +45 71 53 13 79", "Phone: +45 71 53 13 79"),
          "E-mail: kontakt@svaleholmroskilde.dk",
          t("CVR-nr.: 38891197", "Company reg. no.: 38891197"),
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
          "En booking er bindende, når betalingen er modtaget. Betaling sker forud via et sikkert betalingslink, som skal betales senest 2 dage før ankomst. Når betalingen er modtaget, sender vi automatisk en kvittering med moms og CVR samt dørkoden til jeres ophold.",
          "A booking is binding once payment has been received. Payment is made in advance via a secure payment link, due no later than 2 days before arrival. Once payment is received, we automatically send a receipt with VAT and CVR along with the door code for your stay."
        )}</LP>
      </LSection>

      <LSection heading={t("4. Afbestilling og ændringer", "4. Cancellation and changes")}>
        <LP>{t(
          "Ønsker du at afbestille eller ændre en booking, skal du kontakte os hurtigst muligt. Du betaler kun for de nætter, du bruger. Vilkårene for afbestilling fremgår af din bekræftelse.",
          "If you wish to cancel or change a booking, please contact us as soon as possible. You only pay for the nights you use. The cancellation terms are stated in your confirmation."
        )}</LP>
      </LSection>

      <LSection heading={t("5. Gæstens ansvar", "5. Guest responsibilities")}>
        <LP>{t(
          "Gæsten er ansvarlig for, at lokaler og inventar behandles med omhu, og for eventuelle skader forårsaget af gæsten eller gæstens ledsagere under opholdet. Lokalerne afleveres ryddede efter aftale.",
          "The guest is responsible for treating the premises and furnishings with care, and for any damage caused by the guest or their companions during the stay. The premises are to be left tidy as agreed."
        )}</LP>
      </LSection>

      <LSection heading={t("6. Ansvarsbegrænsning", "6. Limitation of liability")}>
        <LP>{t(
          "Svaleholm Gæstegaard Roskilde er ikke ansvarlig for gæsters personlige ejendele eller for forhold uden for vores kontrol (force majeure). Vores erstatningsansvar er begrænset til det beløb, der er betalt for den pågældende booking.",
          "Svaleholm Gæstegaard Roskilde is not liable for guests' personal belongings or for circumstances beyond our control (force majeure). Our liability is limited to the amount paid for the booking in question."
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
